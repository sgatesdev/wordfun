import { Row, Col, Button } from 'react-bootstrap';
import LetterBox from './LetterBox';
import { Word } from '../types';
import { HOSTNAME, PORT } from '../utils/constants';

interface WordComponentProps {
	wordItem: Word
}

const WordComponent: React.FC<WordComponentProps> = ({wordItem}) => {
	let textareaRefArray: React.RefObject<HTMLTextAreaElement>[] = [];

	return (
	<>
	<Row style={{marginBottom: '5px', padding: '5px'}}>
		<Col className="text-center">
		{
			// TODO restore state here
			wordItem?.answer && wordItem.answer.map((letterMapItem, index) => {
				if (wordItem.index === undefined) {
					return
				}
				return <LetterBox
					key={`${wordItem.id}-${index}`} 
					position={index} 
					letterMapItem={letterMapItem} 
					wordIndex={wordItem.index} 
					letterBoxRefs={textareaRefArray}
				/>
			})
		}
		{/* {getAnswerBank()} */}
		</Col>
	</Row>
	<Row>
		<Col className="text-center">
			{wordItem?.text != undefined ?
			<audio 
                controls src={`http://${HOSTNAME}:${PORT}/files/audio/${wordItem.text}.mp3`}
                autoPlay={true}
            >
			<a href={`http://${HOSTNAME}:${PORT}/files/audio/${wordItem.text}.mp3`}> Download audio </a>
			</audio>
			: ''
			}
		</Col>
	</Row>
	</>
	)
}

export default WordComponent