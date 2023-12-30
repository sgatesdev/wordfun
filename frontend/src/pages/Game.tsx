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

const Game = () => {
    let port = process.env?.REACT_APP_WORDFUN_PORT || '8080'
    let hostname = window.location.hostname;

    const { words, updateWord } = useContext(WordMapContext)
    // const [correct, setCorrect] = useState<boolean>(false)
    let lessonFetchPending = false

    useEffect(() => {
        if (!lessonFetchPending) {
            lessonFetchPending = true
            getLesson()
        }
    }, [])

    const getLesson = async () => {
        let port = process.env?.REACT_APP_WORDFUN_PORT || '8080'
        let hostname = window.location.hostname;
        try {
            let res = await fetch(`http://${hostname}:${port}/lesson`);
            let data = await res.json();

            data.forEach((word: WordMapItem, index: number) => {
                let letterState = word!.word!.split('').map((letter: string) => {
                    return {letter: '', correct: false, answer: letter}
                })
                word.state = letterState
                word.index = index
                word.correct = false
                updateWord(index, word)
            })
        }
        catch(err) {
            console.warn(err)
        }
    }

    const createWordResult = async (wordItem: WordMapItem) => {
        if (!wordItem) {
            return
        }
        let req = {Word: wordItem.word, Correct: true}
        try {
            let res = await fetch(`http://${hostname}:${port}/word`, {method: 'POST', body: JSON.stringify(req)});
            if (res.ok) {
                console.log("RESULT SAVED")
            } else {
                console.log("RESULT FAILED")
            }
        } catch(err) {
            console.warn(err)
            console.log("RESULT FAILED")
        }
    }

    const refreshLesson = () => {
        window.location.reload()
    }

    const [wordPosition, setWordPosition] = useState<number>(0)

    const prevWord = () => {
        let prevPosition = wordPosition - 1
        if (prevPosition < 0) {
            prevPosition = 0
        }
        setWordPosition(prevPosition)
    }

    const nextWord = () => {
        let nextPosition = wordPosition + 1
        if (nextPosition > words.length - 1) {
            nextPosition = words.length - 1
        }
        setWordPosition(nextPosition)
    }

    // useEffect(() => {
    //     setCorrect(false)
    // }, [wordPosition])

    // todo: convert to component
    const lessonComplete = async () => {
        let correctWords = words.filter((wordItem) => wordItem.correct)
        if (correctWords.length === words.length && correctWords.length > 1) {
            setShow(true)

            let req = {words: words.map((wordItem) => wordItem.word)}
            const res = await fetch(`http://${hostname}:${port}/lesson`, 
                {method: 'POST', body: JSON.stringify(req)}
            );
            
            if (res.ok) {
                console.log("LESSON COMPLETE")
            } else {
                console.log("LESSON FAILED")
            }
        }
        
    }

    useEffect(() => {
        checkCorrect()
        lessonComplete()
    }, [words])

    const checkCorrect = async () => {
        let wordItem = words[wordPosition]
        let numCorrect = wordItem?.state?.filter((letterMapItem) => letterMapItem.correct)
        if (numCorrect?.length === wordItem?.state?.length && !wordItem?.correct) {
            let id = await createWordResult(wordItem)
            updateWord(wordPosition, {...wordItem, correct: true, wordResultId: id})
        }
    }

    const [showAnswerBank, setShowAnswerBank] = useState<boolean>(false)

    // todo: convert to component
    const getAnswerBank = () => {
        let wordItem = words[wordPosition]
        if (wordItem === undefined || wordItem.state === undefined) {
            return
        }
        let copy = [...wordItem.state]
        let bank = copy.sort((a,b) => b.answer.localeCompare(a.answer)).map((letterMapItem, index) => {
            // let key = `${wordItem.word}-${Date.now()}-${letterMapItem.answer}`
            if (letterMapItem.correct) {
                return <h3 style={{textDecoration: 'line-through', color: 'gray', paddingRight: '1px'}}>{letterMapItem.answer.toUpperCase()}</h3>
            } else {
                return <h3 style={{paddingRight: '1px'}}>{letterMapItem.answer.toUpperCase()}</h3>
            }
        })
        return bank
    }

    // todo: convert to component
    const listOfWords = () => {
        let copy = [...words]
        let list = copy.map((wordItem, index) => {
            let letters = wordItem?.state?.map((letterMapItem) => letterMapItem.letter).join('')
            if (letters == '') letters = wordItem?.word?.split('').map((letter) => '_' ).join('')
            let style = {border: '1px solid black'}
            return <li 
                key={index} style={wordPosition == index ? style : {}} 
                className="list-group-item" 
                onClick={() => setWordPosition(index)}>{letters}</li>
        })
        return (
            <div className="p-3 text-center" style={{width:'15rem'}}>
            {/* <h3>Lesson Progress</h3> */}
            <ol className="list-group">
            {list}
            </ol>
            </div>
        )
    }

    const [ width, height ] = useWindowSize()

    const correct = wordPosition !== undefined && words[wordPosition]?.correct

    const [show, setShow] = useState(false);

    return (
        <Container style={{marginTop: '15px'}}>
        <Row>
        <Col><img src="title.png" style={{height: '100%', width: '100%'}}/></Col>
        {/* <Form.Control type="text" placeholder="Enter word" onInput={handleFormInput}/> */}
        </Row>
        <Row style={{justifyContent: 'space-between', marginTop: '20px', marginBottom: '15px'}}>
        <Col className="text-left">
        <Button variant="secondary" style={{marginRight: '5px'}} onClick={prevWord}>Previous Word</Button>
        <Button variant="primary" onClick={nextWord}>Next Word</Button>
        </Col>
        <Col className="text-end"><Button variant="warning" onClick={refreshLesson}>New Lesson</Button></Col>
        </Row>
        <Row style={{borderTop: '5px solid gray'}}>
            <Col className="col-2">
                {listOfWords()}
            </Col>
            <Col>
                {wordPosition !== undefined ? <Word wordItem={words[wordPosition]} key={`${wordPosition}`}/> : ''}
                <Row className="p-3">
                <Col className="d-flex" style={{justifyContent: 'center', alignItems: 'center'}}>
                <button className="btn btn-success" style={{marginRight: '5px'}} onClick={() => setShowAnswerBank(!showAnswerBank)}>{showAnswerBank ? 'Hide Letters' : 'Show Letters'}</button>
                {showAnswerBank ? getAnswerBank() : ''}
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
                <Modal.Body>GREAT JOB HAILEY! WOOOOOOOOOOOOOOOO</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
        </Modal>

        {wordPosition !== undefined && words[wordPosition]?.correct && <Confetti width={width} height={height} />}
        </Container>
    );
}

export default Game;
