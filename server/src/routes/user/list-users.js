import express from 'express';

import User from '../../models/user.js';

import {listUsersPermission} from '../../middleware/permissions.js';
import verifyToken from '../../middleware/verify-token.js';

const router = express.Router();

router.get('/api/users/', verifyToken,
    async (req, res) => {
        const {id} = req.user;
        try {
            console.log(id)
            const users = await User.find({projectManagerId: id});
            console.log(users)
            res.status(200).json({result: users});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as listUsersRouter };