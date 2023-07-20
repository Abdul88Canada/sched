import express from 'express';

import Team from '../../models/team.js';

import {getUserPermission} from '../../middleware/permissions.js';
import verifyToken from '../../middleware/verify-token.js';

const router = express.Router();

router.get('/api/teams/:id', verifyToken, getUserPermission(["PM"]),
    async (req, res) => {
        try {
            const id = req.params.id;
    
            const exsitingTeam = await Team.findOne({_id: id});
        
            if (!exsitingTeam) return res.status(400).json({message: 'Team dosen\'t exsit.'});

            if(exsitingTeam.projectManagerId == req.user.id) {
                res.status(200).json({result: exsitingTeam});
            }
            else {
                return res.status(401).json('Unauthorized');
            }

        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as getTeamRouter };