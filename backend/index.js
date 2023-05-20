const express = require('express');
const ai = require('./openai');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/prompt', (req, res) => {
    console.log(req.query);
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

(async() => {
    const response = await ai.test();
})();