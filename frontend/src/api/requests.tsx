import { Word } from '../types'
import { HOSTNAME, PORT } from '../utils/constants'

export const getLesson = async (updateWord: Function, lessonId: string) => {
    try {
        let res = await fetch(`http://${HOSTNAME}:${PORT}/lessons/${lessonId}`);
        let data = await res.json();
        data.words.forEach((word: Word, index: number) => {
            if (word.answer == undefined || word.answer.length == 0) {
                let letterState = word!.text!.split('').map((letter: string) => {
                    return {letter: '', correct: false, answer: letter}
                })
                word.answer = letterState
            }
            word.index = index
            updateWord(index, word)
        })
    }
    catch(err) {
        console.warn(err)
    }
}

export const createWordResult = async (wordItem: Word) => {
    if (!wordItem) {
        return
    }
    let req = {...wordItem, correct: true}
    try {
        let res = await fetch(`http://${HOSTNAME}:${PORT}/words/${wordItem.id}`, 
            {
                method: 'PUT', 
                body: JSON.stringify(req),
                headers: {
                    'Content-Type': 'application/json'
                }
            },
        );
        console.log(JSON.stringify(req))
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

export const sendLessonComplete = async (id: string) => {
    let req = { complete: true }
    const res = await fetch(`http://${HOSTNAME}:${PORT}/lessons/${id}`, 
        {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)}
    );
    
    if (res.ok) {
        console.log("LESSON COMPLETE")
    } else {
        console.log("LESSON FAILED")
    }
}

export const createWorksheet = async (id:string): Promise<string> => {
    try {
        // let req = {letter_banks: letterBanks}
        const res = await fetch(`http://${HOSTNAME}:${PORT}/lessons/${id}/worksheet`, 
            {method: 'GET', body: null}
        );
 
        if (res.ok) {
            console.log("CREATED WORKSHEET", res)        
            // get URL for worksheet from response
            let blob = await res.blob();
            const url = URL.createObjectURL(blob);
    
            // create a hidden anchor element and programmatically click it
            const a = document.createElement('a');
            a.href = url;
            a.target="_blank"
            a.download = 'worksheet.pdf'; // replace 'filename' with the actual filename
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            return url
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