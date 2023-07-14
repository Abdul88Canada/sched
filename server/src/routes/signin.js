import express from 'express';
import { body } from 'express-validator';
import jwt  from 'jsonwebtoken';

import User from '../models/user.js';

const router = express.Router();

router.post('/api/users/signin',
    async (req, res) => {
        const {email, password} = req.body;
        try {
            const user = await User.find({email});
    
            if (!user) res.status(404).json({message: 'User doesn\'t exsit.'});
    
            const isPasswordCorrect = await bcrypt.compare(password, exsitingUser.password);
    
            if(!isPasswordCorrect) return res.status(404).json({message: 'Invalid cred.'});
    
            const token = jwt.sign({email: exsitingUser.email, id: exsitingUser._id}, 'test', {expiresIn: '1h'});
    
            res.status(200).json({message: 'Welcome!', token});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as signinRouter };