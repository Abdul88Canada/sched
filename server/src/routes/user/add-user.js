import express from 'express';
import bcrypt from 'bcrypt';

import User from '../../models/user.js';
import { addUserPermission } from '../../middleware/permissions.js';
import verifyToken from '../../middleware/verify-token.js';

const router = express.Router();

router.post('/api/users/', verifyToken, addUserPermission(["PM"]),
    async (req, res) => {
        try {
            
            const {email, password, id} = req.body;
    
            const exsitingUser = await User.findOne({email});
        
            if (exsitingUser) return res.status(400).json({message: 'User already exsit.'});
                
            const hashedPassword = await bcrypt.hash(password, 12);
        
            await User.create({email, password: hashedPassword, isProjectManager: false, firstTimeUser: true, projectManagerId: id});

            res.json({message: `user added`});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as addUserRouter };