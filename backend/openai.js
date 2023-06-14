require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI
});

const openai = new OpenAIApi(configuration);

var memory = "";

// Initialize chatGPT with setup prompt
const initialize = async(position, name, job_reqs) => 
{
    const setup_prompt = `This is an interview. You are to interview me for a ${position} that 
        requires ${job_reqs}. My name is ${name}. Act like this is a real interview, and you 
        are the interviewer and I'm the interviewee. Your only task is to generate 5 questions 
        MAX that you would ask an interviewee to ensure they are a good fit based on the 
        previous information. Do not respond to the questions you generated.`;
    appendToMemory(setup_prompt);

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: setup_prompt,
            max_tokens: 500
        });
        console.log(completion.data.choices[0].text);
        appendToMemory(" Here is the chat log so far: You: " + completion.data.choices[0].text + " ");
        return parseResponse(completion.data.choices[0].text);
    }
    catch(err) {
        console.log(err);
    }
}

const getFollowUp = async(question) => 
{
    const setup_prompt = `You now have to ask 
    this question: ${question}, word for word. You must not reply to the question. Then, you must ask at least and at most one follow-up question 
    to the response. After the user responds to the follow-up question you must end the conversation. `;

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: memory + setup_prompt,
            max_tokens: 500
        });
        console.log(completion.data.choices[0].text);
        return parseResponse(completion.data.choices[0].text);
    }
    catch(err) {
        console.log(err);
    }
}

// Parse response into an array of questions
const parseResponse = (response) => {
    var questions = response.split(/\r?\n/); 

    for(var i = 0; i < questions.length; i++) {
        if(questions[i] == " " || questions[i] == "") {
            questions.splice(i, 1);
            i--;
        }
    }
    return questions;
}

// Continue generating interview questions based on setup prompt
const getNextQuestion = async() => {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: memory + "Provide the user with the next question please.",
            max_tokens: 400
        });
        console.log(completion.data.choices[0].text);
        appendToMemory("You: " + completion.data.choices[0].text);

        // APPEND USER INPUT TO MEMORY HERE

        return completion.data.choices[0].text;
    }
    catch(err) {
        console.log(err);
    }
}

// Append given string to memory
const appendToMemory = (str) => {
    memory += " " + str + " ";
}

// Get memory
const getMemory = () => {
    return memory;
}

// Clear memory
const clearMemory = () => {
    memory = "";
}

module.exports = {
    initialize,
    getNextQuestion,
    appendToMemory,
    getMemory,
    clearMemory,
    getFollowUp
};