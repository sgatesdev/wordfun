import React, { createContext, useState } from 'react';

export type WordLetterMap = {
	letter: string,
    answer: string,
	correct: boolean,
}

export type WordMapItem = {
    index?: number
    word?: string
    audio_file?: string
    state?: Array<WordLetterMap>
    correct?: boolean
    saved?: boolean
    answerKey?: string[]
}

interface ContextType {
    words: Array<WordMapItem>;
    correct: boolean,
    setCorrect: Function,
    updateWord: Function
    updateState: Function
}

interface WordMapProviderProps {
    children: React.ReactNode;
}

export const WordMapContext = createContext<ContextType>({
    words: [],
    correct: false,
    // stores whether entire word is correct, sits at index level - not cached
    setCorrect: () => {},
    updateWord: () => {},
    updateState: () => {}
})

export const WordMapProvider: React.FC<WordMapProviderProps> = ({children}) => {
  const [words, setWords] = useState<Array<WordMapItem>>([])
  const [correct, setCorrect] = useState(false)

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
      if (word && word.state) {
        word.state[statePosition] = letterMapItem
      }
      return newWords
    })
  }

  return (
    <WordMapContext.Provider value={{words, correct, setCorrect, updateWord, updateState}}>
      {children}
    </WordMapContext.Provider>
  )
}