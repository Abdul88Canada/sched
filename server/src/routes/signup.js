import express from 'express';
import { body } from 'express-validator';
import jwt  from 'jsonwebtoken';

import User from '../models/user.js';

const router = express.Router();

router.post('/api/users/signup',
    async (req, res) => {
        try {
            const {email, password, firstName, lastName, confirmPassword} = req.body;
    
            const exsitingUser = await User.findOne({email});
        
            if (exsitingUser) return res.status(400).json({message: 'User already exsit.'});
        
            if(password !== confirmPassword) return res.status(400).json({message: 'Passwords don\'t match.'});
        
            const hashedPassword = await bcrypt.hash(password, 12);
        
            const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});
        
            const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '1h'});
        
            res.status(200).json({message: 'Welcome!', token});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as signupRouter };