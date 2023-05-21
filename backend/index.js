const express = require('express');
const cors = require('cors');
const ai = require('./openai');

const app = express();
const port = 4200;

app.use(cors());
app.use(express.json());

app.post('/api/start', async (req, res) => {
    console.log(req.body);
    ai.clearMemory();
    const response = await ai.initialize(req.body.position, req.body.name, req.body.technologies);
    res.status(200).json({
        message: response
    })
});

app.get('/api/prompt', async (req, res) => {
    const response = await ai.getNextQuestion();
    res.status(200).json({
        message: response
     })
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});