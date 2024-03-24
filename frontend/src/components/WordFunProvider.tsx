import React, { createContext, useState } from 'react';
import { Word, Lesson, WordLetterMap } from '../types';
import { useNavigate, useLocation } from 'react-router-dom';

interface WordFunProviderProps {
    children: React.ReactNode;
}

export const WordFunContext = createContext<{
    words: Array<Word>,
    lessons: Lesson[],
    lessonComplete: boolean,
    selectedLesson: string,
    showSuccessModal: boolean,
    showChooseLesson: boolean,
    showNewLesson: boolean,
    setLessons: Function,
    setLessonComplete: Function,
    setSelectedLesson: Function,
    setShowSuccessModal: Function,
    setShowChooseLesson: Function,
    setShowNewLesson: Function,
    updateWord: Function,
    updateState: Function,
    wordPosition: number,
    setWordPosition: Function,
    nextWord: Function,
    prevWord: Function,
    changeLessonId: Function
}>({
    words: [],
    lessons: [],
    lessonComplete: false,
    selectedLesson: '',
    showSuccessModal: false,
    showChooseLesson: false,
    showNewLesson: false,
    setLessons: () => {},
    // stores whether entire word is correct, sits at index level - not cached
    setLessonComplete: () => {},
    setSelectedLesson: () => {},
    setShowSuccessModal: () => {},
    setShowChooseLesson: () => {},
    setShowNewLesson: () => {},
    updateWord: () => {},
    updateState: () => {},
    // manage position in word array
    wordPosition: 0,
    setWordPosition: () => {},
    // navigation
    nextWord: () => {},
    prevWord: () => {},
    changeLessonId: () => {}
})

export const WordFunContextProvider: React.FC<WordFunProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [words, setWords] = useState<Array<Word>>([])
    const [lessonComplete, setLessonComplete] = useState(false)
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [selectedLesson, setSelectedLesson] = useState('')
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showChooseLesson, setShowChooseLesson] = useState(false);
    const [showNewLesson, setShowNewLesson] = useState(false);

    const updateWord = (position: number, word: Word) => {
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

    // navigation
    const changeLessonId = (newLessonId: string) => {
        navigate({
          pathname: location.pathname,
          search: `?lessonId=${newLessonId}`
        });
    };

    return (
        <WordFunContext.Provider value={{
            words,
            lessons,
            lessonComplete,
            selectedLesson,
            showSuccessModal,
            showChooseLesson,
            showNewLesson,
            setLessons,
            setLessonComplete,
            setSelectedLesson,
            setShowSuccessModal,
            setShowChooseLesson,
            setShowNewLesson,
            updateWord,
            updateState,
            wordPosition,
            setWordPosition,
            nextWord,
            prevWord,
            changeLessonId
        }}>
            { children }
        </WordFunContext.Provider>
    )
}