var md5 = require('md5');
var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://lsa105:gXOiiWxouLYFvgAy@notes.xobu7vs.mongodb.net/interview?retryWrites=true&w=majority");

var db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error"));

var Schema = mongoose.Schema;
var promptSchema = new Schema({
    user_id: {type: String, required: true},
    name: {type: String},
    position: {type: String},
    job_reqs: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});
var userSchema = new Schema({
    email: {type: String},
    password: {type: String, minlength: 5},
    createdAt: {type: Date, default: Date.now}
});

var Prompt = mongoose.model("Prompt", promptSchema);
var User = mongoose.model("User", userSchema);

// Login accepts an email and non-hashed password
// Returns a user object if user exists, null otherwise
// Note: The password in user object is hashed
const login = async(email, password) => {
    return await User.findOne({ 'email': email, 'password': md5(password) })
        .then((user) => {
            if (user) {
                console.log("User found!");
                return user;
            }
            else {
                console.log("User not found!");
                return null;
            }
        })
        .catch((err)=>{
            console.log(err);
            return null;
        });
}

// Returns true if user exists already
var userExists = async (email) => {
    return await User.findOne({email: email});
}

// This function is for testing purposes only
var addUser = async(email, password) => {
    var newUser = new User({
        email: email,
        password: md5(password)
    });
    
    try {
        if(await userExists(email)) throw new Error("User already exists!");
        await newUser.save();
        return true;
    }
    catch(error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    login
};