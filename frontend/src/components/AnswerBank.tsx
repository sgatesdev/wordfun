import { WordMapItem } from './WordMapProvider';

interface AnswerBankProps {
	wordItem: WordMapItem,
    show: boolean,
}

const AnswerBank = ({wordItem, show}: AnswerBankProps) => {
    if (wordItem === undefined || wordItem.answer === undefined || !show) {
        return <></>
    }
    let copy = [...wordItem.answer]
    let bank = copy.sort((a,b) => b.answer.localeCompare(a.answer)).map((letterMapItem, index) => {
        let key = `${wordItem.text}-${index}`
        if (letterMapItem.correct) {
            return <h3 key={key} style={{textDecoration: 'line-through', color: 'gray', paddingRight: '1px'}}>{letterMapItem.answer.toUpperCase()}</h3>
        } else {
            return <h3 key={key} style={{paddingRight: '1px'}}>{letterMapItem.answer.toUpperCase()}</h3>
        }
    })
    return (
    <>
    {bank}
    </>
    )
}

export default AnswerBank