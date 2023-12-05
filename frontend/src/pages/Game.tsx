import { Col, Row } from 'react-bootstrap';
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
  const { words, updateWord, correct, setCorrect } = useContext(WordMapContext)

  useEffect(() => {
    getLesson()
  }, [])

 const getLesson = async () => {
    let port = process.env?.REACT_APP_WORDFUN_PORT || '8080'
    let hostname = window.location.hostname;
		try {
			let res = await fetch(`http://${hostname}:${port}/list`);
			let data = await res.json();

            data.forEach((word: WordMapItem, index: number) => {
                let letterState = word!.word!.split('').map((letter: string) => {
                return {letter: '', correct: false, answer: letter}
                })
                word.state = letterState
                word.index = index
                updateWord(index, word)
            })
		}
		catch(err) {
			console.warn(err)
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

  useEffect(() => {
    setCorrect(false)
  }, [wordPosition])

  useEffect(() => {
    checkCorrect()
  }, [words])

  const checkCorrect = () => {
		console.log("HERE CHECKING HANDLETYPING")
    let wordItem = words[wordPosition]
		let numCorrect = wordItem?.state?.filter((letterMapItem) => letterMapItem.correct)
		if (numCorrect?.length === wordItem?.state?.length) {
			console.log("TRUE")
			setCorrect(true)
		} else {
			console.log("FALSE")
			setCorrect(false)
		}
	}

  const [showAnswerBank, setShowAnswerBank] = useState<boolean>(false)

  const getAnswerBank = () => {
    let wordItem = words[wordPosition]
    if (wordItem === undefined || wordItem.state === undefined) {
      return
    }
    let copy = [...wordItem.state]
		let bank = copy.sort((a,b) => b.answer.localeCompare(a.answer)).map((letterMapItem, index) => {
			if (letterMapItem.correct) {
				return <h3 style={{textDecoration: 'line-through', color: 'gray', paddingRight: '1px'}}>{letterMapItem.answer.toUpperCase()}</h3>
			} else {
				return <h3 style={{paddingRight: '1px'}}>{letterMapItem.answer.toUpperCase()}</h3>
			}
		})
		return bank
	}

  const [ width, height ] = useWindowSize()

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
        <Col className="text-center"><h3>{wordPosition + 1} OF {words && words?.length}</h3></Col>
        <Col className="text-end"><Button variant="warning" onClick={refreshLesson}>New Lesson</Button></Col>
      </Row>
      {wordPosition !== undefined ? <Word wordItem={words[wordPosition]} key={`${wordPosition}`}/> : ''}
      <Row className="p-3">
          <Col className="d-flex" style={{justifyContent: 'center', alignItems: 'center'}}>
          <button className="btn btn-success" style={{marginRight: '5px'}} onClick={() => setShowAnswerBank(!showAnswerBank)}>{showAnswerBank ? 'Hide Letters' : 'Show Letters'}</button>
          {showAnswerBank ? getAnswerBank() : ''}
          </Col>
      </Row>
      <Row className="text-center p-3">
      {getRandomIcon(correct)}
      {correct && <Confetti width={width} height={height} />}
      </Row>
    </Container>
  );
}

export default Game;
