require('dotenv').config();
var md5 = require("md5");
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

var Schema = mongoose.Schema;
var promptSchema = new Schema({
  user_id: { type: String, required: true },
  name: { type: String },
  position: { type: String },
  job_reqs: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
var userSchema = new Schema({
  email: { type: String },
  password: { type: String, minlength: 5 },
  createdAt: { type: Date, default: Date.now },
});

var Prompt = mongoose.model("Prompt", promptSchema);
var User = mongoose.model("User", userSchema);

// Login accepts an email and non-hashed password
// Returns a user object if user exists, null otherwise
// Note: The password in user object is hashed
const login = async (email, password) => {
  return await User.findOne({ email: email, password: md5(password) })
    .then((user) => {
      if (user) {
        console.log("User found!");
        return user;
      } else {
        console.log("User not found!");
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

// Add a prompt to the database
// Returns true if successful, false otherwise
var addPrompt = async (user_id, name, position, job_reqs) => {
  var newPrompt = new Prompt({
    user_id: user_id,
    name: name,
    position: position,
    job_reqs: job_reqs,
  });

  try {
    await newPrompt.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Get all prompts based on user_id
// Returns an array of prompts
var getPrompts = async (user_id) => {
  return await Prompt.find({ user_id: user_id });
};

// Updates a prompt based on prompt_id
// Returns true if successful, false otherwise
var updatePrompt = async (prompt_id, name, position, job_reqs) => {
  return await Prompt.updateOne(
    { _id: prompt_id },
    { name, position, job_reqs, updatedAt: Date.now() }
  ).then((result) => {
    if (result.modifiedCount > 0) {
      console.log("Prompt updated!");
      return true;
    } else {
      console.log("Prompt not updated!");
      return false;
    }
  });
};

var deletePrompt = async (prompt_id) => {
  return await Prompt.deleteOne({ _id: prompt_id }).then((result) => {
    if (result.modifiedCount > 0) {
      console.log("Prompt deleted!");
      return true;
    } else {
      console.log("Prompt not deleted!");
      return false;
    }
  });
};

// Helper function: returns true if user exists already
var userExists = async (email) => {
  return await User.findOne({ email: email });
};

// Register a new user to database and return true if successful, false otherwise
var register = async (email, password) => {
  var newUser = new User({
    email: email,
    password: md5(password),
  });

  try {
    if (await userExists(email)) throw new Error("User already exists!");
    await newUser.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// addPrompt("646d66bd039d408348f0d1a8", "John", "Software Developer", "C++, Java, Python");
// addPrompt("646d66bd039d408348f0d1a8", "Celene", "Full-stack Web Developer", "React, Node.js, MongoDB, Express.js");
// addPrompt("646d66bd039d408348f0d1a8", "Steve", "Software Quality Assurance", "JUnit, Selenium, Postman, Jira");
// addPrompt("646d66bd039d408348f0d1a8", "Angela", "Front-end Web Developer", "HTML, CSS, Angular, Bootstrap");
// addUser("test@test.com", "test123");

// (async () => {
//     var prompts = await getPrompts("646d66bd039d408348f0d1a8");
//     console.log(prompts);
// })();

module.exports = {
  login,
  addPrompt,
  getPrompts,
  updatePrompt,
  deletePrompt,
  register,
};
