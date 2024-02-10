import express from 'express';
import lessonRoutes from './lessons'
import wordRoutes from './words'
import fileRoutes from './files'

const router = express.Router();

router.use('/lessons', lessonRoutes);
router.use('/words', wordRoutes);
router.use('/files', fileRoutes);

export default router
