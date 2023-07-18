import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import { signinRouter } from './routes/auth/signin.js';
import { signoutRouter } from './routes/auth/signout.js';
import { signupRouter } from './routes/auth/signup.js';
import { addUserRouter } from './routes/user/add-user.js';
import { deleteUserRouter } from './routes/user/delete-user.js';
import { getUserRouter } from './routes/user/get-user.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(addUserRouter);
app.use(deleteUserRouter);
app.use(getUserRouter);

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://drthrex88:Tumbis@cluster0.qbmrcts.mongodb.net/?retryWrites=true&w=majority');
        console.log('Connected to mongoDB');
    } catch(err) {
        console.log(err);
    }
    app.listen(5000, () => {
        console.log("Listening at port: 5000!!!")
    });
};

start();