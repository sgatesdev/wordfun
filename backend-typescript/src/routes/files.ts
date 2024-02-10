import express from 'express';
const router = express.Router();

router.use('/audio', express.static('files/audio'));

export default router