import { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader';
import {HOSTNAME,PORT} from '../utils/constants'

interface CreateListReq {
    Words: string[]
}

const Upload = () => {
    const [words, setWords] = useState<string[]>([])
    const [uploadMessage, setUploadMessage] = useState<string>('')

    useEffect(() => {
        console.log(words)
    }, [setWords])

    const sendCreate = async () => {
        let req:CreateListReq = {Words: words}
        try {
            let res = await fetch(`http://${HOSTNAME}:${PORT}/generate`, {method: 'POST', body: JSON.stringify(req)});
            if (res.ok) {
                setUploadMessage('Upload successful!')
            } else {
                setUploadMessage('Upload failed!')
            }
        } catch(err) {
            console.warn(err)
            setUploadMessage('Upload failed! See log.')
        }

    }

    const clearForm = () => {
        setWords([])
    }

    return (
        <div className="p-5">
        <div>
            <h1>Upload</h1>
        </div>
        <CSVReader onFileLoaded={(data, fileInfo, originalFile) => {
            const newWords:string[] = []
            data.forEach((rowOfWords: string[]) => {
                rowOfWords.forEach((word: string) => {
                    newWords.push(word)
                })
            })
            setWords(newWords)
        }} />
        <div className="p-5">
            <h3>
                {words.length}
            </h3>
            {words.length > 0 ? words.join(', ') : 'Nothing loaded yet.'}
        </div>
        <div>
            <button onClick={() => sendCreate()} disabled={words.length == 0} className="m-2">Create</button>
            <button onClick={() => clearForm()}>Clear</button>
        </div>
        <div>
            {uploadMessage}
        </div>
        </div>
    )
}

export default Upload;