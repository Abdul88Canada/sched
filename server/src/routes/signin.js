import express from 'express';
import { body } from 'express-validator';
import jwt  from 'jsonwebtoken';

import { User } from '../models/user.js';
import { validateRequest } from '../middleware/validate-request.js';
import { Password } from '../services/password.js';


const router = express.Router();

router.post('/api/users/signin', [
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Please enter a password')
    ],
    validateRequest,
    async (req, res) => {
        const { userName, password } = req.body;
    
        const existingUser = await Authentication.findOne({ userName });

        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }

        const passwordsMatch = await Password.compare(String(existingUser.password), password);

        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials');
        }

        const user = await User.findOne({ userName })

        // generate JWT
        const userJwt = jwt.sign({
            userName: user.userName,
        },'process.env.JWT_KEY!');

        res.status(200).json({message: "Welcome", token: userJwt});
});

export { router as signinRouter };