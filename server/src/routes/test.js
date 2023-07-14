import express from 'express';


const router = express.Router();

router.post('/api/users/test',
    async (req, res) => {
        try {        
            res.status(200).json({message: 'Welcome!'});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
});

export { router as testRouter };