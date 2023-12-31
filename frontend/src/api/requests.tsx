import {WordMapItem} from '../components/WordMapProvider'
import {HOSTNAME, PORT} from '../utils/constants'

export const getLesson = async (updateWord: Function) => {
    try {
        let res = await fetch(`http://${HOSTNAME}:${PORT}/lesson`);
        let data = await res.json();

        data.forEach((word: WordMapItem, index: number) => {
            let letterState = word!.word!.split('').map((letter: string) => {
                return {letter: '', correct: false, answer: letter}
            })
            word.state = letterState
            word.index = index
            word.correct = false
            updateWord(index, word)
        })
    }
    catch(err) {
        console.warn(err)
    }
}

export const createWordResult = async (wordItem: WordMapItem) => {
    if (!wordItem) {
        return
    }
    let req = {Word: wordItem.word, Correct: true}
    try {
        let res = await fetch(`http://${HOSTNAME}:${PORT}/word`, {method: 'POST', body: JSON.stringify(req)});
        if (res.ok) {
            console.log("RESULT SAVED")
        } else {
            console.log("RESULT FAILED")
        }
    } catch(err) {
        console.warn(err)
        console.log("RESULT FAILED")
    }
}

export const lessonComplete = async (setShow: (flag:boolean) => void, words: WordMapItem[]) => {
    let correctWords = words.filter((wordItem) => wordItem.correct)
    if (correctWords.length === words.length && correctWords.length > 1) {
        setShow(true)

        let req = {words: words.map((wordItem) => wordItem.word)}
        const res = await fetch(`http://${HOSTNAME}:${PORT}/lesson`, 
            {method: 'POST', body: JSON.stringify(req)}
        );
        
        if (res.ok) {
            console.log("LESSON COMPLETE")
        } else {
            console.log("LESSON FAILED")
        }
    }
    
}

export const refreshLesson = () => {
    window.location.reload()
}