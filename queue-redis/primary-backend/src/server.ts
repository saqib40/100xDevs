import express from "express";
import type { Request, Response } from "express";
import client from "./client.js";

const app = express();

app.use(express.json());

async function startServer() {
    try {
        await client.connect();
        console.log("connected to redis");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        })
    } catch(error) {
        console.error("Failed to connect to redis", error);
    }
}

startServer();

interface ReqInterface {
    problemId : number,
    code : string,
    language : string
}

app.post("/submit", async(req: Request<{}, {}, ReqInterface>, res: Response) => {
    try {
        const { problemId, code, language } = req.body;
        await client.lPush("problems", JSON.stringify({
            problemId,
            code, 
            language}));
        res.status(200).send("Submission received and stored.");
    } catch(error) {
        console.error("Redis error:", error);
        res.status(500).send("Failed to store submission.");
    }
})