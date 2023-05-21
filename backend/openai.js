const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);

// Initialize chatGPT with setup prompt
const initialize = async(input_prompt) => 
{
    const setup_prompt = input_prompt;

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

module.exports = {
    initialize,
    getNextResponse
};