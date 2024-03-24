import { WordFunContext } from './WordFunProvider'
import { useContext } from 'react'

const WordList = () => {
    const { words, wordPosition, setWordPosition } = useContext(WordFunContext)

    let copy = [...words]
    let list = copy
        .map((wordItem, index) => {
            let letters = wordItem?.answer?.map((letterMapItem) => letterMapItem.letter).join('')
            if (letters === '') letters = wordItem?.text?.split('').map((letter) => '_' ).join('')
            let style = {
                cursor: 'pointer', 
                border: wordPosition === index ? '1px solid black' : '',
                backgroundColor: wordPosition === index ?  '#e6e9eb' : ''
            }

            return (<li 
                key={index} style={style} 
                className="list-group-item" 
                onClick={() => setWordPosition(index)}
                >{letters}</li>)
        })
    return (
        <div className="p-3 text-center" style={{width:'15rem'}}>
        {/* <h3>Lesson Progress</h3> */}
        <ol className="list-group">
        {list}
        </ol>
        </div>
    )
}

export default WordList