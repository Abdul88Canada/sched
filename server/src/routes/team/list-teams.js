import express from 'express';

import Team from '../../models/user.js';

import verifyToken from '../../middleware/verify-token.js';

const router = express.Router();

router.get('/api/teams/', verifyToken,
    async (req, res) => {
        const {id} = req.user;
        try {
            const teams = await Team.find({projectManagerId: id});
            res.status(200).json({result: teams});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as listTeamsRouter };