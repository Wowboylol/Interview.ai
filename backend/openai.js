const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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"
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
    memory += setup_prompt;

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: setup_prompt,
            max_tokens: 500
        });
        console.log(completion.data.choices[0].text);
        return completion.data.choices[0].text;
    }
    catch(err) {
        console.log(err);
    }
}

// Continue generating interview questions based on setup prompt
const getNextResponse = async(input_prompt) => {
    var user_prompt = input_prompt; // !!! temporary, req_data variable will not come as string format in final version, need to extract

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: user_prompt,
            max_tokens: 400
        });
        console.log(completion.data.choices[0].text);
        return completion.data.choices[0].text;
    }
    catch(err) {
        console.log(err);
    }
}

// Append given string to memory
const appendToMemory = (str) => {
    memory += str;
}

const getMemory = () => {
    return memory;
}

module.exports = {
    initialize,
    getNextResponse,
    appendToMemory,
    getMemory
};