import express, { Request, Response } from 'express';
import fs from 'fs';
import Sequelize from 'sequelize';
import PDFDocument from 'pdfkit';

import { Lesson, Word } from '../models';
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
            include: [{model: Word, as: 'words'}],
            order: [['createdAt', 'DESC']]
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
            include: [{model: Word, as: 'words', order: ['createdAt', 'ASC']}]
        });
        res.send(lesson);
    } catch (error) {
        console.error(error);
        res.status(500).send('There was an error retrieving the lesson');
    }
});

const randomizeWords = (input:string) => {
    const characters = input.toUpperCase().split('');
    for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
    }
    return characters.join(''); 
}

router.get('/:id/worksheet', async (req: Request, res: Response) => {
    try {
        const lesson = await Lesson.findByPk(req.params.id, {
            include: [{model: Word, as: 'words', order: ['createdAt', 'ASC']}]
        });

        const words = lesson?.dataValues?.words as Word[];
        if (!words) return;

        const doc = new PDFDocument()
        doc.pipe(fs.createWriteStream('worksheet.pdf'));
        doc.pipe(res)

        doc.fontSize(12);
        doc.text('WORDFUN!', 50, 50);
        doc.text(`Lesson: ${lesson?.dataValues.name}`, 50, 70);

        let y = 100;
        const boxWidth = 30;
        const boxHeight = 30;
        const padding = 10;

        words.forEach((word, i) => {
            const answer = word?.dataValues?.text
            if (!answer) return;

            const randomWord = randomizeWords(answer);
            doc.text(`${i+1}. ${randomWord}`, 50, y);
            console.log(randomWord)
            let x = 50;
            for (let i = 0; i < randomWord.length; i++) {
                doc.rect(x, y + 20, boxWidth, boxHeight).stroke();
                x += boxWidth + padding;
            }
    
            y += boxHeight + 3 * padding; // Move y down for the next word
        });

        doc.fontSize(8);
        doc.text(`${lesson?.dataValues.id}`, 50, y+10);
        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('There was an error retrieving the lesson');
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        console.log(req.body, req.params.id)
        await Lesson.update(req.body, {
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

router.delete('/:id', (req: Request, res: Response) => {
    res.send('delete single lesson' + req.params.id);
});

export default router