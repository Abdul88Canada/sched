import express from 'express';
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../../models/user.js';

const router = express.Router();

router.post('/api/users/signup',
    async (req, res) => {
        try {
            const {email, password, confirmPassword} = req.body;
    
            const exsitingUser = await User.findOne({email});
        
            if (exsitingUser) return res.status(400).json({message: 'User already exsit.'});
        
            if(password !== confirmPassword) return res.status(400).json({message: 'Passwords don\'t match.'});
        
            const hashedPassword = await bcrypt.hash(password, 12);
        
            const result = await User.create({email, password: hashedPassword, role: "PM"});
        
            const token = jwt.sign({email: result.email, id: result._id, role: result.role}, 'test');
        
            res.json({message: 'Welcome!', token});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as signupRouter };