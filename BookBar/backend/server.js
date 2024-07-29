import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import userModel from "./models/userModel";
import usersRoute from "./routes/usersRoute";
import booksRoute from "./routes/booksRoute"; // Assuming this is a route handler for books

const app = express();

const mongoDBURL = "mongodb+srv://root:root@book-store-mern.yjxaibx.mongodb.net/user"; // Or import from config

app.use(express.json());
app.use(cors());

mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('App connected to database');
})
.catch((error) => {
    console.log(error);
});

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to the Book Shoppe');
});

app.use('/books', booksRoute);

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    userModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        res.status(200).json({ message: "Success" });
                    } else {
                        res.status(400).json({ message: "The password is incorrect" });
                    }
                });
            } else {
                res.status(400).json({ message: "No record exists" });
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

        userModel.create({ email: email, password: hash })
            .then(user => res.status(201).json(user))
            .catch(err => res.status(500).json({ message: err.message }));
    });
});

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
});