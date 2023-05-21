const express = require('express');
const cors = require('cors');
const ai = require('./openai');

const app = express();
const port = 4200;

app.use(cors());
app.use(express.json());

var memory;

function clear_memory()
{
    memory = "";
}

// Fills memory with user stats (such as university, year level, major, etc.)
function initialize_stats (req_data)
{
    var position = "Data Scientist";
    var job_requirement = "knows Data Science";
    var interviewee_name = "Steven";
    memory += `This is an interview. You are to interview me for a ${position} that requires ${job_requirement} My name is ${interviewee_name}. Act like this is a real interview, and you are the interviewer and I'm the interviewee.`
}

app.get('/api/start', async (req, res) => {
    console.log(req.body);
    initialize_stats (req);
    const response = await ai.initialize(memory);
    res.send(response);
    //res.status(200).json({
    //    message: response
    //})
    memory += " Here is the chat log so far: You: " + response + " ";
});

app.get('/api/prompt', async (req, res) => {
    var user_input = " What is a data science?"; //temporary variable for testing
    memory += "Me: " + user_input + " ";
    const response = await ai.getNextResponse(user_input);
    res.send(response);
    memory += "You: " + response + " ";
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});