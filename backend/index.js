const express = require('express');
const ai = require('./openai');

const app = express();
const port = 4200;

app.use(express.json());

app.get('/api/start', async (req, res) => {
    const response = await ai.initialize(req);
    res.send(response);
});

app.get('/api/prompt', async (req, res) => {
    req = "I was homeless, and a data scientist gave me a piece of bread, so I want to be data scientist.";
    const response = await ai.getNextResponse(req);
    res.send(response);
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});