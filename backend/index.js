const express = require('express');

const app = express();
const port = 3000;

var options = {
    index: 'index.html',
    dotfiles: 'ignore',
    extensions: ['html','css','json','js']
};

app.use(express.json());

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

