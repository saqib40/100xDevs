import express from "express";

export const app = express();
app.use(express.json());

app.post("/sum", (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    const answer = a + b;

    res.json({
        answer
    })
});

// since we are testing 
// we are making the app listen aka live
// typically in most code bases we have parallel to this file 
// bin.ts where we import the app and make it listen
// this file is typically used by tests
// so in a way you seperate the logic to make the server live