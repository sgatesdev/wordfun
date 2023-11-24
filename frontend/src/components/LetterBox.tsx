import { useState, useEffect, useRef, useContext } from 'react';
import { WordMapContext, WordLetterMap } from './WordMapProvider';
interface LetterBoxProps {
	wordIndex: number,
	position: number,
	letterMapItem: WordLetterMap,
	checkCorrect: Function
}

const LetterBox: React.FC<LetterBoxProps>  = ({position,wordIndex,letterMapItem,checkCorrect}) => {
	const [letter, setLetter] = useState('')
	const [status, setStatus] = useState('5px solid gray')
	const [correct, setCorrect] = useState(false)

	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleFocus = (e:React.FocusEvent<HTMLTextAreaElement>) => {
		if (e == null) {
		  return
		}
	   
		// Place the cursor at the end of the text
		e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
	}

	useEffect(() => {
		if (textareaRef.current && letterMapItem.letter !== "") {
			textareaRef.current.value = letterMapItem.letter
			textareaRef.current?.dispatchEvent(new Event('input', { bubbles: true }))
		}
	}, [letterMapItem])

	let { words, updateWord } = useContext(WordMapContext)
	let {answer} = letterMapItem
	
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

	  if (text === answer?.toUpperCase()) {
	    	setStatus('5px solid green')
	     let w = { letter: text, correct: true, answer: answer }
		// updateMap(position, w)
		let word = words[wordIndex]
		if (word && word.state) {
			word.state[position] = w
			setCorrect(true)
		}
	  } else if (answer) {
	    setStatus('5px solid red')
	    let w = { letter: text, correct: false, answer: answer }
		let word = words[wordIndex]
		if (word && word.state) {
			word.state[position] = w
			setCorrect(false)
		}
	  }
	  checkCorrect()
	}

	return(
	<textarea 
		ref={textareaRef}
		onFocus={(e) => handleFocus(e)}
		onInput={(e) => handleInput(e)}
		style={{fontSize:'40px', width:'75px', height:'75px', border: status, resize: 'none', overflow:'hidden', textAlign:'center', caretColor: 'transparent', marginRight:'5px'}}
		disabled={correct}
		value={letter}
   	/>
   	)
}

export default LetterBox