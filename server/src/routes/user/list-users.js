import express from 'express';

import User from '../../models/user.js';

import {listUsersPermission} from '../../middleware/permissions.js';

const router = express.Router();

router.get('/api/users/', listUsersPermission(["PM"]),
    async (req, res) => {
        try {

        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as getUserRouter };