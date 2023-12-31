import { WordMapItem } from './WordMapProvider';

interface AnswerBankProps {
	wordItem: WordMapItem,
    show: boolean,
}

const AnswerBank: React.FC<AnswerBankProps> = ({wordItem, show}) => {
    if (wordItem === undefined || wordItem.state === undefined || !show) {
        return <></>
    }
    let copy = [...wordItem.state]
    let bank = copy.sort((a,b) => b.answer.localeCompare(a.answer)).map((letterMapItem, index) => {
        // let key = `${wordItem.word}-${Date.now()}-${letterMapItem.answer}`
        if (letterMapItem.correct) {
            return <h3 style={{textDecoration: 'line-through', color: 'gray', paddingRight: '1px'}}>{letterMapItem.answer.toUpperCase()}</h3>
        } else {
            return <h3 style={{paddingRight: '1px'}}>{letterMapItem.answer.toUpperCase()}</h3>
        }
    })
    return (
    <>
    {bank}
    </>
    )
}

export default AnswerBank