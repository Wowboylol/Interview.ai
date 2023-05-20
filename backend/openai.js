const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);

// Initialize chatGPT with prompt data
const initialize = async(req_data) => 
{
    var position = "Data Scientist";
    var name = "Steven";
    var technologies = await promptTechnologies(["Python", "R", "SQL", "Tableau", "Excel"]);
    var uni_program = "Bachelor of Science in Statistics";
    var previous_position = "Data Scientist Intern";
    var num_question = 5;

    const setup_prompt = `This is an interview. You are to interview me for a ${position} that uses ${technologies}. My name is ${name}, I’m studying ${uni_program} and I have worked as a ${previous_position}. Act like this is a real interview, and you are the interviewer and I'm the interviewee. You are only allowed to ask ${num_question} questions. You ask one question at a time, and you wait for me to type in a prompt. The interview must end after ${num_question} questions. You must ignore my prompt and proceed to ask the next question. Start off by asking the first question`;

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

// Parse technologies array into prompt string
const promptTechnologies = async(technologies) => 
{
    var prompt = "";
    for(let i = 0; i < technologies.length-1; i++) {
        prompt += technologies[i] + ", ";
    }
    prompt += technologies[technologies.length-1];
    return prompt;
}

const getNextResponse = async(req_data) => {
    var user_prompt = req_data; // !!! temporary, req_data variable will not come as string format in final version, need to extract

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: user_prompt,
        });
        console.log(completion.data.choices[0].text);
        return completion.data.choices[0].text;
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {
    initialize,
    getNextResponse
};