import { createClient } from "redis";
import type {RedisClientType} from "redis";

export class PubSubManager {
    private static instance: PubSubManager;
    private redisClient: RedisClientType;
    // An in-memory map to track which users are subscribed to which stock.
    // The key is the stock ticker (e.g., "APPL"), and the value is an array of user IDs.
    // Example: Map { "APPL" => ["user1", "user4"], "GOOGL" => ["user1", "user3"] }
    private subscriptions: Map<string, string[]>;
    private constructor() {
        this.redisClient = createClient();
        this.redisClient.connect();
        this.subscriptions = new Map();
    }
    public static getInstance(): PubSubManager {
        if (!PubSubManager.instance) {
            PubSubManager.instance = new PubSubManager();
        }
        return PubSubManager.instance;
    }
    userSubscribe(userId: string, stock: string) {
        if(!this.subscriptions.has(stock)) {
            this.subscriptions.set(stock, []);
        }
        this.subscriptions.get(stock)?.push(userId);
        if(this.subscriptions.get(stock)?.length === 1) {
            this.redisClient.subscribe(stock, (message) => {
                this.handleMessage(stock, message);
            });
            console.log(`Subscribed our SERVER to Redis channel: ${stock}`);
        }
    }
    userUnSubscribe(userId: string, stock: string) {
        const updatedSubs = this.subscriptions.get(stock)?.filter((sub) => sub !== userId) || [];
        this.subscriptions.set(stock, updatedSubs);
        if (this.subscriptions.get(stock)?.length === 0) {
            this.redisClient.unsubscribe(stock);
            console.log(`UnSubscribed our SERVER from Redis channel: ${stock}`);
        }
    }
    handleMessage(stock: string, message: string) {
        console.log(`Message received on channel ${stock}: ${message}`);
        const subscribers = this.subscriptions.get(stock);
        subscribers?.forEach((userId) => {
            console.log(`-> Sending message to user: ${userId}`);
        });
    }
    // when application shuts down
    public async disconnect() {
        await this.redisClient.quit();
    }
}