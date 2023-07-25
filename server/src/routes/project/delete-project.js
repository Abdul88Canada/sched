import express from 'express';
import verifyToken from '../../middleware/verify-token.js';

import Project from '../../models/project.js';
import {deleteUserPermission} from '../../middleware/permissions.js';

const router = express.Router();

router.delete('/api/projects/:id', verifyToken, deleteUserPermission(["PM"]),
    async (req, res) => {
        try {
            const id = req.params.id;
    
            const exsitingProject = await Project.findOne({_id: id});
        
            if (!exsitingProject) return res.status(400).json({message: 'Project dosen\'t exsit.'});
            
            if(exsitingProject.projectManagerId == req.user.id) {
                await Project.findByIdAndDelete({_id: id});
                res.json({message: `Project deleted`});
            }
            else {
                return res.status(401).json('Unauthorized');
            }           
            

            
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as deleteProjectRouter };