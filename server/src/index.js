import express from 'express';
import bodyParser  from 'body-parser';
import cors from 'cors';

import { signinRouter } from './routes/signin.js';

import { signoutRouter } from './routes/signout.js';
import { signupRouter } from './routes/signup.js';

const app = express();

app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(bodyParser());
app.use(cors());

const start = async () => {
    try {
        console.log('Connected to mongoDB');
    } catch(err) {
        console.log(err);
    }
    app.listen(3000, () => {
        console.log("Listening at port: 3000!!!")
    });
};

start();