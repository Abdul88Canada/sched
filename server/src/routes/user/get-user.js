import express from 'express';

import User from '../../models/user.js';

import getUserPermission from '../../middleware/permissions.js';

const router = express.Router();

router.get('/api/users/:id', getUserPermission(["PM"]),
    async (req, res) => {
        try {
            const id = req.params.id;
    
            const exsitingUser = await User.findOne({_id: id});
        
            if (!exsitingUser) return res.status(400).json({message: 'User dosen\'t exsit.'});

            res.status(200).json({result: exsitingUser});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as getUserRouter };