const express = require('express');
const cors = require('cors');
const ai = require('./openai');

const app = express();
const port = 4200;

app.use(cors());
// app.use(express.json());

app.post('/api/start', async (req, res) => {
    const response = await ai.initialize(req);
    res.status(200).json({
        message: response
    })
});

app.get('/api/prompt', async (req, res) => {
    req = "I was homeless, and a data scientist gave me a piece of bread, so I want to be data scientist.";
    const response = await ai.getNextResponse(req);
    res.send(response);
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});