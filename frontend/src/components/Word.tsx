import { Row, Col, Button } from 'react-bootstrap';
import LetterBox from './LetterBox';
import { useState, useEffect, useContext, useRef } from 'react';
import { WordLetterMap, WordMapContext, WordMapItem } from './WordMapProvider';

interface WordComponentProps {
	wordIndex: number
}

const Word: React.FC<WordComponentProps> = ({wordIndex}) => {
	const { words, setCorrect } = useContext(WordMapContext)
	const [wordItem, setWord] = useState<WordMapItem | undefined>(undefined)

	useEffect(() => {
		if (words[wordIndex]) {
			setWord(words[wordIndex])
		}
	}, [wordIndex, words])

	useEffect(() => {
		setCorrect(false)
	}, [wordItem])

	const handleTyping = () => {
		let numCorrect = wordItem?.state?.filter((letterMapItem) => letterMapItem.correct)
		if (numCorrect?.length === wordItem?.state?.length) {
			setCorrect(true)
		} else {
			setCorrect(false)
		}
	}

	const getAnswerBank = () => {
		let bank = wordItem?.state?.map((letterMapItem, index) => {
			if (letterMapItem.correct) {
				return <span style={{textDecoration: 'line-through'}}>{letterMapItem.answer}</span>
			} else {
				return <span>{letterMapItem.answer}</span>
			}
		}).sort(() => Math.random() - 0.5)
		return bank
	}

	let textareaRefArray: React.RefObject<HTMLTextAreaElement>[] = [];

	return (
	<>
	<Row style={{borderTop: '5px solid gray', marginBottom: '5px', padding: '5px'}}>
		<Col className="text-center">
		{
			// TODO restore state here
			wordItem?.state && wordItem.state.map((letterMapItem, index) => {
				if (wordItem.index === undefined) {
					return
				}
				return <LetterBox
					key={index} 
					position={index} 
					letterMapItem={letterMapItem} 
					wordIndex={wordItem.index} 
					checkCorrect={handleTyping}
					letterBoxRefs={textareaRefArray}
				/>
			})
		}
		{/* {getAnswerBank()} */}
		</Col>
	</Row>
	<Row>
		<Col className="text-center">
			{wordItem?.audio_file != undefined ?
			<audio controls src={`http://localhost:8080${wordItem?.audio_file}`}>
			<a href={`http://localhost:8080${wordItem?.audio_file}`}> Download audio </a>
			</audio>
			: ''
			}
		</Col>
	</Row>
	</>
	)
}

export default Word