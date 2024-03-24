import { Col, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Word from '../components/Word';
import { useState, useMemo, useEffect, useContext } from 'react';
import { WordFunContext } from '../components/WordFunProvider';
import { getRandomIcon } from '../components/StatusIcons';
import { useWindowSize } from '@react-hook/window-size'
import Confetti from 'react-confetti'
import AnswerBank from '../components/AnswerBank';
import WordList from '../components/WordList';
import { createWordResult, getLesson, sendLessonComplete, refreshLesson, createWorksheet } from '../api/requests';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lesson } from '../types';
import { HOSTNAME, PORT } from '../utils/constants'

import CreateLessonModal from '../components/CreateLessonModal';
import ShowSuccessModal from '../components/ShowSuccessModal';
import ChooseLessonModal from '../components/ChooseLessonModal';

const Game = () => {
    const { 
        words, 
        updateWord,
        wordPosition,
        nextWord, 
        prevWord, 
        setWordPosition,
        setLessonComplete,
        lessonComplete,
        setShowChooseLesson,
        showChooseLesson,
        setLessons,
        setShowSuccessModal,
    } = useContext(WordFunContext)

    const checkCorrect = async () => {
        let wordItem = words[wordPosition]
        if (wordItem && wordItem.correct) {
            return
        }

        let numCorrect = wordItem?.answer?.filter((letterMapItem) => letterMapItem.correct)
        if (numCorrect?.length === wordItem?.answer?.length && !wordItem?.correct) {
            let id = await createWordResult(wordItem)
            updateWord(wordPosition, {...wordItem, correct: true, wordResultId: id})
        }
    }

    const [ width, height ] = useWindowSize()
    const correct = wordPosition !== undefined && words[wordPosition]?.correct
    const [showAnswerBank, setShowAnswerBank] = useState<boolean>(false)

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const lessonId = queryParams.get('lessonId')

    useEffect(() => {
        if (!lessonId) {
            setShowChooseLesson(true)
            return
        }
        setLessonComplete(false)
        setWordPosition(0)
        getLesson(updateWord, lessonId)
    }, [lessonId])

    useEffect(() => {
        checkCorrect()
        const numCorrect = words.filter((wordItem) => wordItem.correct).length
        if (numCorrect === 0 || words.length === 0) return
        if (lessonId && numCorrect === words.length && !lessonComplete) {
            setShowSuccessModal(true)
            sendLessonComplete(lessonId)
            setLessonComplete(true)
        }
    }, [words])

    const worksheetMode = async () => {
        if (!lessonId) {
            return
        }
        await createWorksheet(lessonId)
    }

    // TODO: place in component
    useEffect(() => {
      if (showChooseLesson) {
        fetch(`http://${HOSTNAME}:${PORT}/lessons`)
          .then(response => response.json())
          .then(data => {
            data.forEach((lesson:Lesson) => lesson.words = [])
            setLessons(data)
          });
      }
    }, [showChooseLesson]);

    return (
        <>
        <Container style={{marginTop: '15px'}}>
        <Row>
        <Col className="text-center"><img src="title.png" alt="Wordfun" style={{height: '10rem'}}/></Col>
        </Row>
        <Row style={{justifyContent: 'space-between', marginTop: '20px', marginBottom: '15px'}}>
        <Col className="text-left">
        <Button variant="secondary" style={{marginRight: '5px'}} onClick={() => prevWord()}>Previous Word</Button>
        <Button variant="primary" onClick={() => nextWord()}>Next Word</Button>
        </Col>
        <Col className="text-end">
            <Button variant="danger" style={{marginRight: '5px'}} onClick={worksheetMode}>Worksheet</Button>
            <Button variant="warning" onClick={() => setShowChooseLesson(true)}>Change Lesson</Button>
        </Col>
        </Row>
        {lessonId &&
            <Row style={{borderTop: '5px solid gray'}}>
                <Col className="col-2">
                    <WordList />
                </Col>
                <Col>
                    {wordPosition !== undefined ? <Word wordItem={words[wordPosition]} key={`${wordPosition}`}/> : ''}
                    <Row className="p-3">
                    <Col className="d-flex" style={{justifyContent: 'center', alignItems: 'center'}}>
                    <button className="btn btn-success" style={{marginRight: '5px'}} onClick={() => setShowAnswerBank(!showAnswerBank)}>{showAnswerBank ? 'Hide Letters' : 'Show Letters'}</button>
                    <AnswerBank wordItem={words[wordPosition]} show={showAnswerBank}/>
                    </Col>
                    </Row>
                    <Row className="text-center p-3">
                    <Col>
                    {getRandomIcon(correct !== undefined ? correct : false)}
                    </Col>
                    </Row>
                </Col>
            </Row>
        }
        {wordPosition !== undefined && words[wordPosition]?.correct && <Confetti width={width} height={height} />}
        </Container>
        <CreateLessonModal />
        <ShowSuccessModal />
        <ChooseLessonModal />
        </>
    );
}

export default Game;
