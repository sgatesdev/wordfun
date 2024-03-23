import { Col, Row, Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Word from '../components/Word';
import { useState, useMemo, useEffect, useContext } from 'react';
import { WordMapContext, WordMapItem } from '../components/WordMapProvider';
import { getRandomIcon } from '../components/StatusIcons';
import { useWindowSize } from '@react-hook/window-size'
import Confetti from 'react-confetti'
import AnswerBank from '../components/AnswerBank';
import WordList from '../components/WordList';
import { createWordResult, getLesson, sendLessonComplete, refreshLesson, createWorksheet } from '../api/requests';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lesson } from '../types/lesson';
import {HOSTNAME, PORT} from '../utils/constants'

const Game = () => {
    const { 
        words, 
        updateWord,
        wordPosition,
        nextWord, 
        prevWord, 
        setWordPosition,
        setLessonComplete,
        lessonComplete
    } = useContext(WordMapContext)

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
    const [show, setShow] = useState(false);
    const [showChooseLesson, setShowChooseLesson] = useState(false);
    const [showNewLesson, setShowNewLesson] = useState(false);
    const [showAnswerBank, setShowAnswerBank] = useState<boolean>(false)

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const lessonId = queryParams.get('lessonId')

    useEffect(() => {
        console.log("RENDERING COMPONENT")
    }, [])

    // hooks
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
        if (lessonId && numCorrect === words.length && !lessonComplete) {
            setShow(true)
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
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [selectedLesson, setSelectedLesson] = useState('')
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

    const navigate = useNavigate();
    const changeLessonId = (newLessonId: string) => {
        navigate({
          pathname: location.pathname,
          search: `?lessonId=${newLessonId}`
        });
      };

    const [newLessonName, setNewLessonName] = useState('')
    const createLesson = async () => {
        let res = await fetch(`http://${HOSTNAME}:${PORT}/lessons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: newLessonName})
        })
        if (!res.ok) {
            console.warn("lesson creation failed")
            return
        }
        let data = await res.json()
        changeLessonId(data.id)
        setShowNewLesson(false)
    }

    return (
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
            {/* <Button variant="warning" onClick={() => setShowNewLesson(true)}>New Lesson</Button> */}
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

        <Modal show={showChooseLesson || (!lessonId && !showNewLesson)} onHide={() => setShowChooseLesson(false)} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Choose a Lesson</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Last Update</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {lessons && lessons.map((lesson, index) => (
                        <tr 
                            key={lesson.id} 
                            onClick={() => setSelectedLesson(lesson.id!)}
                            className={selectedLesson === lesson.id ? 'table-primary' : ''}
                        >
                            <td>{index + 1}</td>
                            <td>{formatDate(lesson.updatedAt)}</td>
                            <td>{lesson.complete ? 'Finished' : 'In Progress'}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => {
                        setShowChooseLesson(false)
                        setShowNewLesson(true)}
                    }>New Lesson</Button>
                    <Button variant="secondary" onClick={() => {
                        setShowChooseLesson(false)
                        changeLessonId(selectedLesson)
                    }}>
                        Select
                    </Button>
                    <Button variant="secondary" onClick={() => setShowChooseLesson(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
        </Modal>

        <Modal show={showNewLesson} onHide={() => setShowNewLesson(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Lesson</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" 
                    value={newLessonName}
                    onChange={(e) => setNewLessonName(e.target.value)}
                    placeholder="Lesson Name" />
                    <Button variant="primary" onClick={createLesson}>Create</Button>
                </Modal.Body>
        </Modal>

        <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>AWESOME JOB HAILEY!</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body> */}
                <iframe width="500" height="315" src="https://www.youtube.com/embed/LlhKZaQk860?si=ePalezEn4_E31qhf&amp;controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                {/* </Modal.Body> */}
        </Modal>

        {wordPosition !== undefined && words[wordPosition]?.correct && <Confetti width={width} height={height} />}
        </Container>
    );
}

function formatDate(date: Date | undefined) {
    if (!date) return;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const hour = ('0' + d.getHours()).slice(-2);
    const mins = ('0' + d.getMinutes()).slice(-2);
    return month + '-' + day + '-' + year + ' ' + hour + ':' + mins;
  }

export default Game;
