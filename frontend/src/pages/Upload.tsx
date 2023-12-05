import { useState } from 'react';
import CSVReader from 'react-csv-reader';

interface CreateListReq {
    Words: string[]
}

const Upload = () => {
    const [words, setWords] = useState<string[]>([])
    const [uploadMessage, setUploadMessage] = useState<string>('')

    const sendCreate = async () => {
        let port = process.env?.REACT_APP_WORDFUN_PORT || '8080'
        let hostname = window.location.hostname;
        let req:CreateListReq = {Words: words}
        try {
            let res = await fetch(`http://${hostname}:${port}/generate`, {method: 'POST', body: JSON.stringify(req)});
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
            let newWords = data.map((word: string[]) => {
                return word[0]
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