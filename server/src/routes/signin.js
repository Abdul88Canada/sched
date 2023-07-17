import express from 'express';
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';


import User from '../models/user.js';

const router = express.Router();

router.post('/api/users/signin',
    async (req, res) => {
        const {email, password} = req.body;
        try {
            const user = await User.find({email});
    
            if (!user) res.status(404).json({message: 'User doesn\'t exsit.'});
            console.log(user);
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
            if(!isPasswordCorrect) return res.status(404).json({message: 'Invalid cred.'});
    
            const token = jwt.sign({email: user.email, id: user._id}, 'test');
    
            res.json({message: 'Welcome!', token});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as signinRouter };