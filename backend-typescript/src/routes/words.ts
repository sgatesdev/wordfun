import express, { Request, Response } from 'express';
import { Lesson, Word } from '../models';

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

router.put('/:id', async (req: Request, res: Response) => {
    // res.send('update single word' + req.params.id);
    try {
        console.log("test:", req.body)

        await Word.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('There was an error updating the words');
    }
});

export default router