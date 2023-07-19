import express from 'express';
import bcrypt from 'bcrypt';
import verifyToken from '../../middleware/verify-token.js';

import User from '../../models/user.js';
import {deleteUserPermission} from '../../middleware/permissions.js';

const router = express.Router();

router.delete('/api/users/:id', verifyToken, deleteUserPermission(["PM"]),
    async (req, res) => {
        try {
            const id = req.params.id;
    
            const exsitingUser = await User.findOne({_id: id});
        
            if (!exsitingUser) return res.status(400).json({message: 'User dosen\'t exsit.'});
            
            if(exsitingUser.projectManagerId == req.body.id) {
                await User.findByIdAndDelete({_id: id});
                res.json({message: `user deleted`});
            }
            else {
                return res.status(401).json('Unauthorized');
            }           
            

            
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as deleteUserRouter };