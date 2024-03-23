import React, { createContext, useState } from 'react';

export type WordLetterMap = {
	letter: string,
    answer: string,
	correct: boolean,
}

export type WordMapItem = {
    id?: string
    index?: number
    text?: string
    audio_file?: string
    answer?: Array<WordLetterMap>
    correct?: boolean
    saved?: boolean
    answerKey?: string[]
}

interface ContextType {
    words: Array<WordMapItem>,
    lessonComplete: boolean,
    setLessonComplete: Function,
    updateWord: Function,
    updateState: Function,
    wordPosition: number,
    setWordPosition: Function,
    nextWord: Function,
    prevWord: Function,
}

interface WordMapProviderProps {
    children: React.ReactNode;
}

export const WordMapContext = createContext<ContextType>({
    words: [],
    lessonComplete: false,
    // stores whether entire word is correct, sits at index level - not cached
    setLessonComplete: () => {},
    updateWord: () => {},
    updateState: () => {},
    // manage position in word array
    wordPosition: 0,
    setWordPosition: () => {},
    // navigation
    nextWord: () => {},
    prevWord: () => {},
})

export const WordMapProvider: React.FC<WordMapProviderProps> = ({children}) => {
    const [words, setWords] = useState<Array<WordMapItem>>([])
    const [lessonComplete, setLessonComplete] = useState(false)

    const updateWord = (position: number, word: WordMapItem) => {
        setWords(prevWords => {
            let newWords = [...prevWords]
            newWords[position] = word
            return newWords
        })
    }

    const updateState = (wordIndex: number, statePosition: number, letterMapItem: WordLetterMap) => {
        setWords(prevWords => {
            let newWords = [...prevWords]
            let word = newWords[wordIndex]
            if (word && word.answer) {
            word.answer[statePosition] = letterMapItem
            }
            return newWords
        })
    }

    // manage current word
    const [wordPosition, setWordPosition] = useState<number>(0)

    const prevWord = () => {
        let prevPosition = wordPosition - 1
        if (prevPosition < 0) {
            prevPosition = 0
        }
        setWordPosition(prevPosition)
    }

    const nextWord = () => {
        let nextPosition = wordPosition + 1
        if (nextPosition > words.length - 1) {
            nextPosition = words.length - 1
        }
        setWordPosition(nextPosition)
    }

    let value = {
        words,
        lessonComplete,
        setLessonComplete,
        updateWord,
        updateState,
        wordPosition,
        setWordPosition,
        nextWord,
        prevWord,
    }

    return (
        <WordMapContext.Provider value={value}>
            {children}
        </WordMapContext.Provider>
    )
}