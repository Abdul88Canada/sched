import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import jwt  from 'jsonwebtoken';

import { validateRequest } from '../middleware/validate-request.js';
import { BadRequestError } from '../errors/bad-request.js';
import { User } from '../models/user.js';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20})
            .withMessage('Password must be between 4 and 20 characters')
    ], 
    validateRequest,
    async (req, res) => {
        const { email, password } = req.body;

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            throw new BadRequestError('Email in use');
        }

        const auth = User.build({email,  password});
        await auth.save();

        // generate JWT
        const userJwt = jwt.sign({
            id: auth.id,
            email: auth.email,
        }, 'process.env.JWT_KEY!');

        // store it on session object
        req.session = {
            jwt: userJwt
        };

        res.status(201).send(auth);
});

export { router as signupRouter };