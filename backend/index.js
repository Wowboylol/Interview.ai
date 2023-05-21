const express = require('express');
const cors = require('cors');
const session = require('express-session');
const ai = require('./openai');
const db = require('./database');

const app = express();
const port = 4200;

app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

function isLoggedIn(req,res,next){
    if (req.session.user){
        return next()
    }
    res.redirect('/auth');
}

app.get('/auth', isLoggedIn, (req,res) => {
    res.redirect('/view-prompts');
})

app.post('/api/login', async (req,res) => {
    var email = req.body.email;
    var password = req.body.password;
    
    var user = await db.login(email, password);
    if(!user) {
        console.log("INVALID LOGIN");
        res.status(401).send("Invalid login");
    }
    else if(user) {
        console.log("SUCCESSFUL LOGIN", user);
        req.session.user = {id: user._id, email: email };
        req.session.regenerate(function (err) {
            if (err) next(err)
            
            req.session.save(function (err) {
              if (err) return next(err)
            });
        });
        res.status(200).send("Successful login");
    }
});

app.get('/api/profile', (req,res) => {
    console.log("Session user:" + JSON.stringify(req.session.user));
    res.json(req.session.user);
});


app.post('/api/start', async (req, res) => {
    console.log(req.body);
    ai.clearMemory();
    const response = await ai.initialize(req.body.position, req.body.name, req.body.technologies);
    ai.appendToMemory(" Here is the chat log so far: You: " + response + " ");
    res.status(200).json({
        message: response
    })
});

app.get('/api/prompt', async (req, res) => {
    var user_input = ai.getMemory() + " What is a data science?"; //temporary variable for testing
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