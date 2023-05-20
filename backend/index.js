const express = require('express');
const ai = require('./openai');

const app = express();
const port = 4200;

app.use(express.json());

app.get('/api/prompt', async (req, res) => {
    const response = await ai.test();
    res.send(response);
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});