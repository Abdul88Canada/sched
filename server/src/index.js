import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import { signinRouter } from './routes/signin.js';

import { signoutRouter } from './routes/signout.js';
import { signupRouter } from './routes/signup.js';
import { testRouter } from './routes/test.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(testRouter);

app.use(cors());

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://drthrex88:Tumbis@cluster0.qbmrcts.mongodb.net/?retryWrites=true&w=majority');
        console.log('Connected to mongoDB');
    } catch(err) {
        console.log(err);
    }
    app.listen(3000, () => {
        console.log("Listening at port: 3000!!!")
    });
};

start();