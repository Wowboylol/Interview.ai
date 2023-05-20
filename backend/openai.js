const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);

const initialize = async(req_data) => {

    var position = "Data Scientist";
    var name = "Steven";
    var technologies = [];
    var uni_program = "Bachelor of Science in Statistics";
    var previous_position = "Data Scientist Intern";
    var num_question = 5;

    var setup_prompt = `This is an interview. You are to interview me for a ${position} that uses ${technologies}. My name is ${name}, I’m studying ${uni_program} and I have worked as a ${previous_position}. Act like this is a real interview, and you are the interviewer and I'm the interviewee. You are only allowed to ask ${num_question} questions. You ask one question at a time, and you wait for me to type in a prompt. The interview must end after ${num_question} questions. You must ignore my prompt and proceed to ask the next question. Start off by asking the first question`;

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: setup_prompt,
        });
        console.log(completion.data.choices[0].text);
        return completion.data.choices[0].text;
    }
    catch(err) {
        console.log(err);
    }
}

const test = async() => {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "This is an interview. You are to interview me for an web development internship position that uses JavaScript, React, Node Js, & Docker for a mid-size company. My name is Terry, I am 2nd year student majoring in Computer Science. I have no prior experience. I've built a budget tracker web app for a personal project. Act like this is a real interview, and you are the interviewer and I'm the interviewee. You are only allowed to ask 5 questions, but you ask one question at a time, you wait for me to type in a prompt, you then ignore my prompt and proceed to ask the next question. Start off by asking the first question.",
        });
        console.log(completion.data.choices[0].text);
        return completion.data.choices[0].text;
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {
    test,
    initialize
};