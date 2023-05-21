const express = require('express');
const cors = require('cors');
const ai = require('./openai');

const app = express();
const port = 4200;

app.use(cors());
app.use(express.json());

app.post('/api/start', async (req, res) => {
    console.log(req.body);
    const response = await ai.initialize(req.body.position, req.body.name, req.body.technologies);
    ai.appendToMemory(" Here is the chat log so far: You: " + response + " ");
    res.status(200).json({
        message: response
    })
});

app.get('/api/prompt', async (req, res) => {
    var user_input = " What is a data science?"; //temporary variable for testing
    ai.appendToMemory("Me: " + user_input + " ");
    const response = await ai.getNextResponse(user_input);
    ai.appendToMemory("You: " + response + " ");
    res.status(200).json({
        message: response
     })
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});