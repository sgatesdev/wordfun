import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Word from './components/Word';
import { useState } from 'react';
import { useEffect } from 'react'
import { useContext } from 'react';
import { WordMapContext, WordMapItem } from './components/WordMapProvider';
import { getRandomIcon } from './components/StatusIcons';

function App() {
  const { words, updateWord, correct, setCorrect } = useContext(WordMapContext)

  useEffect(() => {
    getLesson()
  }, [])

 const getLesson = async () => {
		try {
			let res = await fetch(`http://localhost:8080/list`);
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
      {wordPosition !== undefined ? <Word wordIndex={wordPosition} key={`${wordPosition}`}/> : ''}
      <Row className="text-center p-3">
      {getRandomIcon(correct) }
      </Row>
    </Container>
  );
}

export default App;