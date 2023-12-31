import { Row, Col, Button } from 'react-bootstrap';
import LetterBox from './LetterBox';
import { WordMapItem } from './WordMapProvider';
import { HOSTNAME, PORT } from '../utils/constants';

interface WordComponentProps {
	wordItem: WordMapItem
}

const Word: React.FC<WordComponentProps> = ({wordItem}) => {
	let textareaRefArray: React.RefObject<HTMLTextAreaElement>[] = [];
	return (
	<>
	<Row style={{marginBottom: '5px', padding: '5px'}}>
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
			<audio 
                controls src={`http://${HOSTNAME}:${PORT}${wordItem?.audio_file}`}
                autoPlay={true}
            >
			<a href={`http://${HOSTNAME}:${PORT}${wordItem?.audio_file}`}> Download audio </a>
			</audio>
			: ''
			}
		</Col>
	</Row>
	</>
	)
}

export default Word