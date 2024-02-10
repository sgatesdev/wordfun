import express, { Request, Response } from 'express';
import fs from 'fs';
import Sequelize from 'sequelize';

import Word from '../models/word';
import { Lesson } from '../models';
import { buildLesson } from '../utils/lessons';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        // examine audio file dir
        const directoryPath = `${process.cwd()}/files/audio`;
        const files = await fs.promises.readdir(directoryPath)
        const wordList = files.map(file => {
            return file.split('.mp3')[0];
        })
        // res.send(filtered);

        // get words from db
        const words = await Word.findAll({
            where: {
                user_id: 'b78df6b5-cb5b-4d80-b71f-4b535f6d411a',
                createdAt: {
                    [Sequelize.Op.gte]: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000)
                },
                // correct: true
            },
            order: [['createdAt', 'DESC']]
        });

        let recentWords = words.map(word => word.text!)

        // create lesson
        const newLesson = await Lesson.create({
            name: req.body.name || 'New Lesson',
            complete: false,
            user_id: 'b78df6b5-cb5b-4d80-b71f-4b535f6d411a'
        });

        const newLessonWords:any = buildLesson(wordList, recentWords, newLesson.id!);
        const newWords = await Word.bulkCreate(newLessonWords, {
            updateOnDuplicate: ['answer', 'correct', 'updatedAt'],
            hooks: true
        });

        const lesson = {
            ...newLesson.dataValues,
            words: newWords
        }
        res.status(200).send(lesson);
    } catch(error) {
        console.error(error);
        res.status(500).send('There was an error creating the lesson');
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const lessons = await Lesson.findAll({
            include: [{model: Word, as: 'words'}]
        });
        res.send(lessons);
    } catch (error) {
        console.error(error);
        res.status(500).send('There was an error creating the lesson');
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const lesson = await Lesson.findByPk(req.params.id, {
            include: [{model: Word, as: 'words'}]
        });
        res.send(lesson);
    } catch (error) {
        console.error(error);
        res.status(500).send('There was an error retrieving the lesson');
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    // res.send('update single lesson' + req.params.id);
    try {
        console.log(req.body)
        await Lesson.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        const words = req.body.words;
        await Word.bulkCreate(words, {
            updateOnDuplicate: ['answer', 'correct', 'updatedAt']
        });
        res.status(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('There was an error updating the words');
    }
});

router.delete('/:id', (req: Request, res: Response) => {
    res.send('delete single lesson' + req.params.id);
});

export default router