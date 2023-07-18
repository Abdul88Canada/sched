import express from 'express';
import bcrypt from 'bcrypt';

import User from '../../models/user.js';
import {deleteUserPermission} from '../../middleware/permissions.js';

const router = express.Router();

router.delete('/api/users/:id', deleteUserPermission(["PM"]),
    async (req, res) => {
        try {
            const id = req.params.id;
    
            const exsitingUser = await User.findOne({_id: id});
        
            if (!exsitingUser) return res.status(400).json({message: 'User dosen\'t exsit.'});
                        
            await User.findByIdAndDelete({_id: id});

            res.json({message: `user deleted`});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as deleteUserRouter };