import express from 'express';

import Project from '../../models/project.js';
import { addUserPermission } from '../../middleware/permissions.js';
import verifyToken from '../../middleware/verify-token.js';

const router = express.Router();

router.post('/api/projects/', verifyToken, addUserPermission(["PM"]),
    async (req, res) => {
        try {
            const {name, teams, description, startDate, endDate} = req.body;

            const {id} = req.user;
                                            
            await Project.create({name, teams, description, startDate, endDate, projectManagerId: id});

            res.json({message: `project created`});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as addProjectRouter };