import { useState } from 'react';
import { useContext } from 'react';

interface LetterBoxProps {
	position: number;
	answer?: string;
	updateMap: Function;
}

const LetterBox: React.FC<LetterBoxProps>  = ({position,answer,updateMap}) => {
	const [letter, setLetter] = useState('')
	const [status, setStatus] = useState('20px solid gray')
	const [correct, setCorrect] = useState(false)

	const handleFocus = (e:React.FocusEvent<HTMLTextAreaElement>) => {
		if (e == null) {
		  return
		}
	   
		// Place the cursor at the end of the text
		e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
	}

	const handleInput = (e:React.FormEvent<HTMLTextAreaElement>) => {
	  if (e == null) {
	    return
	  }
   
	  let text = e.currentTarget.value
	  if (text.length > 1) {
	    text = text.charAt(text.length - 1)
	  }
	  
	  text = text.toUpperCase()

	  setLetter(text.toUpperCase())
	  e.currentTarget.value = text.toUpperCase()
	  console.log("HERE", position, text, answer)
	  if (text === answer?.toUpperCase()) {
	    setStatus('5px solid green')
	//     setCorrect(true)
	     let w = { letter: text, correct: true }
		updateMap(position, w)
	  } else {
	    setStatus('5px solid red')
	    let w = { letter: text, correct: false }
	    updateMap(position, w)
	  }
	}

	return(
	<textarea 
		onFocus={(e) => handleFocus(e)}
		onInput={(e) => handleInput(e)}
		style={{fontSize:'25px', width:'50px', height:'50px', border: status, resize: 'none', overflow:'hidden', textAlign:'center', caretColor: 'transparent'}}
		disabled={correct}
		value={letter}
   	/>
   	)
}

export default LetterBox