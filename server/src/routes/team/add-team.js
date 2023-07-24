import express from 'express';

import Team from '../../models/team.js';
import { addUserPermission } from '../../middleware/permissions.js';
import verifyToken from '../../middleware/verify-token.js';

const router = express.Router();

router.post('/api/teams/', verifyToken, addUserPermission(["PM"]),
    async (req, res) => {
        try {
            console.log('ADD TEAM')
            const {name, members} = req.body;

            const {id} = req.user;
                                            
            await Team.create({name, projectManagerId: id, members});

            res.json({message: `team created`});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as addTeamRouter };