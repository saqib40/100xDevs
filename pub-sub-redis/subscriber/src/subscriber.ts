import client from "./client.js";

async function startSubscriber() {
    try {
        console.log("Subscriber connecting")
        await client.connect();
        console.log('Subscriber connected');
        await client.subscribe("problems", (msg: string) => {
            console.log("Msg received");
            console.log(msg);
        });
    } catch(error) {
        console.log(error);
    }
}
startSubscriber();