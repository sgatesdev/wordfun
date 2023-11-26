import { Row, Col, Button } from 'react-bootstrap';
import LetterBox from './LetterBox';
import { useState, useEffect, useContext, useRef } from 'react';
import { WordLetterMap, WordMapContext, WordMapItem } from './WordMapProvider';

interface WordComponentProps {
	wordItem: WordMapItem
}

const Word: React.FC<WordComponentProps> = ({wordItem}) => {
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