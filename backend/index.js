const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const ai = require('./openai');
const db = require('./database');

const app = express();
const port = 4200;
var saved_session;

app.use(session({
    name: 'session',
    secret : 'yourSecret',
    resave : false,
    maxAge: 30*60*1000,
    saveUninitialized : false,
}));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

function isLoggedIn(req,res,next){
    if(saved_session){
        return next()
    }
    else {
        res.status(401).json({session: false});
    }
}

app.get('/api/relogin', isLoggedIn, (req,res) => {
    res.status(200).json({session: true});
})

app.post('/api/login', async (req,res) => {
    var email = req.body.email;
    var password = req.body.password;
    
    var user = await db.login(email, password);
    if(!user) {
        res.status(400).json({
            message: "Invalid login"
        })
    }
    else if(user) {
        req.session.user = {id: user._id, email: user.email};
        saved_session = req.session.user;
        console.log(saved_session);
        res.status(200).json({
            message: "Login successful"
        })
    }
});

app.get('/api/profile', (req,res) => {
    console.log("Session user:" + JSON.stringify(saved_session));
    res.json(saved_session);
});

app.post('/api/create-prompt', async (req,res) => {
    var user_id = saved_session.id;
    var name = req.body.name;
    var position = req.body.position;
    var job_reqs = req.body.job_reqs;
    
    try {
        db.addPrompt(user_id, name, position, job_reqs);
        res.status(200).send("Prompt created successfully");
    }
    catch(error) {
        res.status(500).send("Error creating prompt");
    }
});

app.get('/api/view-prompts', async (req,res) => {
    if(!saved_session) 
    {
        res.status(401).json({session: false});
    }
    else
    {
        var user_id = saved_session.id;
        var prompts = await db.getPrompts(user_id);
        res.json(prompts);
    }
});

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