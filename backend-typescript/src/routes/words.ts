import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('get all words');
});

router.get('/lesson/:id', (req: Request, res: Response) => {
    res.send('get words by lesson' + req.params.id);
});

router.get('/:id', (req: Request, res: Response) => {
    res.send('get single word' + req.params.id);
});

router.put('/:id', (req: Request, res: Response) => {
    res.send('update single word' + req.params.id);
});

export default router