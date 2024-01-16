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

export const createWorksheet = async (letterBanks:string[]): Promise<string> => {
    try {
        let req = {letter_banks: letterBanks}
        const res = await fetch(`http://${HOSTNAME}:${PORT}/lesson/worksheet`, 
            {method: 'POST', body: JSON.stringify(req)}
        );
 
        if (res.ok) {
            console.log("CREATED WORKSHEET")        
            // get URL for worksheet from response
            let {link} = await res.json()
            link = `http://${HOSTNAME}:${PORT}${link}`

            // create a hidden anchor element and programmatically click it
            const a = document.createElement('a');
            a.href = link;
            a.target="_blank"
            a.download = 'worksheet.pdf'; // replace 'filename' with the actual filename
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            return link
        }
        return "Worksheet failed to create."
    } catch(err) {
        console.log(err)
        return "Worksheet failed to create."
    }
}

export const refreshLesson = () => {
    window.location.reload()
}