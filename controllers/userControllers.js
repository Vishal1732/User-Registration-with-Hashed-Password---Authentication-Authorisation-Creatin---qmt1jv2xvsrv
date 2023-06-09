const users   =require("../models/user.js");
const bcrypt = require('bcrypt');

//to look the user schema look ../models/user.js

const registerUser =async (req, res) => {

    //Write you code here
     const name = req.body.name;
    const email  = req.body.email;
    const password = req.body.password;
    const DOB = req.body.DOB;


    // Generate a salt to be used for hashing
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    var newuser = {
        "name":name,
        "email":email,
        "password": hashedPassword,
        "DOB":DOB
    };
    users.create(newuser).then((user) => {
        res.send(user._id);
    })
    .catch((error) => {
        res.status(404).send(error.message);
    });
}

module.exports = { registerUser };
