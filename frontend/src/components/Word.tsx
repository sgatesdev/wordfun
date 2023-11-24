import { Row, Col, Button } from 'react-bootstrap';
import LetterBox from './LetterBox';
import { useState, useEffect } from 'react';

type WordMap = {
	letter: string,
	correct: boolean,
}

interface WordProps {
	word?: string;
	audio?: string;
}

const Word: React.FC<WordProps> = ({word,audio}) => {
	const letters = word?.split('')
	const start = new Array<WordMap>()

	letters?.forEach((l,i) => {
		start[i] = {letter: '', correct: false}
	})

	const [map, setMap] = useState(start);

	useEffect(() => {
	}, [map])

	const updateMap = (pos: number, value: WordMap) => {
	   setMap(prevMap => {
		   let newMap = [...prevMap]
		   newMap[pos] = value
		   return newMap
	   })
	};

	return (
	<>
	<Row style={{borderTop: '5px solid gray', marginBottom: '5px', padding: '5px'}}>
		<Col className="text-center">
		{
			letters?.map((letter, index) => {
				return <LetterBox key={index} position={index} answer={letter} updateMap={updateMap}/>
			})
		}
		</Col>
	</Row>
	<Row>
		<Col className="text-center">
			<audio controls src={`http://localhost:8080${audio}`}>
			<a href={`http://localhost:8080${audio}`}> Download audio </a>
			</audio>
		</Col>
	</Row>
	</>
	)
}

export default Word