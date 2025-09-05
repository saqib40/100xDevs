import client from "./client.js";

async function processSubmission(submission: string) {
    const { problemId, code, language } = JSON.parse(submission);

    console.log(`Processing submission for problemId ${problemId}...`);
    console.log(`Code: ${code}`);
    console.log(`Language: ${language}`);
    // Simulating processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Finished processing submission for problemId ${problemId}. Now publishing...`);
    await client.publish("problems", "Problem solved successfully");
}

async function startWorker() {
    try {
        await client.connect();
        console.log("Worker connected to Redis.");
        while (true) {
            try {
                const submission = await client.brPop("problems", 0);
                if (submission) {
                    await processSubmission(submission.element);
                }
            } catch (error) {
                console.error("Error processing submission:", error);
            }
        }
    } catch(error) {
        console.error("Failed to connect to Redis", error);
    }
}
startWorker();