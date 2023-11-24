import { Row, Col, Button } from 'react-bootstrap';
import LetterBox from './LetterBox';
import { useState, useEffect, useContext } from 'react';
import { WordMapContext, WordMapItem } from './WordMapProvider';
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

	const checkCorrect = () => {
		let numCorrect = wordItem?.state?.filter((letterMapItem) => letterMapItem.correct)
		if (numCorrect?.length === wordItem?.state?.length) {
			setCorrect(true)
		} else {
			setCorrect(false)
		}
	}

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
				return <LetterBox key={index} position={index} letterMapItem={letterMapItem} wordIndex={wordItem.index} checkCorrect={checkCorrect}/>
			})
		}
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