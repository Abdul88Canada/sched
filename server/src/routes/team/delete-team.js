import express from 'express';
import verifyToken from '../../middleware/verify-token.js';

import Team from '../../models/team.js';
import {deleteUserPermission} from '../../middleware/permissions.js';

const router = express.Router();

router.delete('/api/teams/:id', verifyToken, deleteUserPermission(["PM"]),
    async (req, res) => {
        try {
            const id = req.params.id;
    
            const exsitingTeam = await Team.findOne({_id: id});
        
            if (!exsitingTeam) return res.status(400).json({message: 'Team dosen\'t exsit.'});
            
            if(exsitingTeam.projectManagerId == req.user.id) {
                await Team.findByIdAndDelete({_id: id});
                res.json({message: `team deleted`});
            }
            else {
                return res.status(401).json('Unauthorized');
            }           
            

            
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as deleteTeamRouter };