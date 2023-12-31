import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Word from '../components/Word';
import { useState } from 'react';
import { useEffect } from 'react'
import { useContext } from 'react';
import { WordMapContext, WordMapItem } from '../components/WordMapProvider';
import { getRandomIcon } from '../components/StatusIcons';
import { useWindowSize } from '@react-hook/window-size'
import Confetti from 'react-confetti'
import AnswerBank from '../components/AnswerBank';
import WordList from '../components/WordList';
import { createWordResult, getLesson, lessonComplete, refreshLesson } from '../api/requests';

const Game = () => {
    const { 
        words, 
        updateWord,
        wordPosition,
        nextWord, 
        prevWord, 
    } = useContext(WordMapContext)

    const checkCorrect = async () => {
        let wordItem = words[wordPosition]
        let numCorrect = wordItem?.state?.filter((letterMapItem) => letterMapItem.correct)
        if (numCorrect?.length === wordItem?.state?.length && !wordItem?.correct) {
            let id = await createWordResult(wordItem)
            updateWord(wordPosition, {...wordItem, correct: true, wordResultId: id})
        }
    }

    const [ width, height ] = useWindowSize()
    const correct = wordPosition !== undefined && words[wordPosition]?.correct
    const [show, setShow] = useState(false);
    const [showAnswerBank, setShowAnswerBank] = useState<boolean>(false)

    // hooks
    useEffect(() => {
        getLesson(updateWord)
    }, [])

    useEffect(() => {
        checkCorrect()
        if (!show) {
            lessonComplete(setShow, words)
        }
    }, [words])

    return (
        <Container style={{marginTop: '15px'}}>
        <Row>
        <Col><img src="title.png" alt="Wordfun with Hailey!" style={{height: '100%', width: '100%'}}/></Col>
        </Row>
        <Row style={{justifyContent: 'space-between', marginTop: '20px', marginBottom: '15px'}}>
        <Col className="text-left">
        <Button variant="secondary" style={{marginRight: '5px'}} onClick={() => prevWord()}>Previous Word</Button>
        <Button variant="primary" onClick={() => nextWord()}>Next Word</Button>
        </Col>
        <Col className="text-end"><Button variant="warning" onClick={refreshLesson}>New Lesson</Button></Col>
        </Row>
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

        <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>AWESOME JOB HAILEY!</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body> */}
                <iframe width="500" height="315" src="https://www.youtube.com/embed/LlhKZaQk860?si=ePalezEn4_E31qhf&amp;controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                {/* </Modal.Body> */}
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                </Modal.Footer> */}
                {/* <Button variant="secondary" style={{width: '15rem'}} onClick={() => setShow(false)}>
                Close
                </Button> */}
        </Modal>

        {wordPosition !== undefined && words[wordPosition]?.correct && <Confetti width={width} height={height} />}
        </Container>
    );
}

export default Game;
