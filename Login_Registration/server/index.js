const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const UserModel = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://root:root@book-store-mern.yjxaibx.mongodb.net/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email })
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).json({ message: "Success" });
            } else { 
                res.status(400).json({ message: "The password is incorrect"});
                
            }
        });

        } else {
            res.status(400).json({ message: "No record exists"});
        }
    })
    .catch(err => {
        res.status(500).json({ message: "An error occurred" });
        console.log(err);
    });
});

app.post('/register', (req, res) => {

    const { email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: "Error hashing password" });
        }

        UserModel.create({ email: email, password: hash })
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ message: err.message }));
});
});

app.listen(3001, () => {
    console.log("Server is running");
});