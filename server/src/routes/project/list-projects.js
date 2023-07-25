import express from 'express';

import Project from '../../models/project.js';

import verifyToken from '../../middleware/verify-token.js';

const router = express.Router();

router.get('/api/projects/', verifyToken,
    async (req, res) => {
        const {id} = req.user;
        try {
            const projects = await Project.find({projectManagerId: id});
            res.status(200).json({result: projects});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as listProjectRouter };