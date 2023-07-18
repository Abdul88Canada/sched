import express from 'express';

import User from '../../models/user.js';

import {listUsersPermission} from '../../middleware/permissions.js';

const router = express.Router();

router.get('/api/users/', listUsersPermission(["PM"]),
    async (req, res) => {
        try {
            const users = await User.find({projectManagerId: req.body.id});
            res.status(200).json({result: users});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as getUserRouter };