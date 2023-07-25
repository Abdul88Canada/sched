import express from 'express';

import Project from '../../models/project.js';

import {getUserPermission} from '../../middleware/permissions.js';
import verifyToken from '../../middleware/verify-token.js';

const router = express.Router();

router.get('/api/projects/:id', verifyToken, getUserPermission(["PM"]),
    async (req, res) => {
        try {
            const id = req.params.id;
    
            const exsitingProject = await Project.findOne({_id: id});
        
            if (!exsitingProject) return res.status(400).json({message: 'Project dosen\'t exsit.'});

            if(exsitingProject.projectManagerId == req.user.id) {
                res.status(200).json({result: exsitingProject});
            }
            else {
                return res.status(401).json('Unauthorized');
            }

        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as getProjectRouter };