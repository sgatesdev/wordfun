import { v4 as uuidv4 } from 'uuid';

export const buildLesson = (wordList: string[], recentWords: string[], newLessonId: string): object[] => {
    // configure how we want to break word list into groups
    const groups = [
        {charBegin: 1, charEnd: 4, numWords: 2},
        {charBegin: 4, charEnd: 6, numWords: 5},
        {charBegin: 7, charEnd: undefined, numWords: 3}
    ]

    wordList = wordList.sort((a, b) => a.length - b.length);

    let finalList: string[] = []
    groups.forEach((group, i) => {   
        const words = getWords(group, wordList, recentWords)
        finalList.push(...words)
    })

    const words = finalList
        .sort(() => Math.random() - 0.5)
        .map((word) => {
            return {id: uuidv4(), text: word, answer: '', correct: false, lesson_id: newLessonId, user_id: 'b78df6b5-cb5b-4d80-b71f-4b535f6d411a'}
        })

    return words;
}

const getWords = (params: any, wordList: string[], recentWords: string[]): string[] => {
    const {charBegin, charEnd, numWords} = params;

    // first, whittle down list to the words that fit our range
    let filteredWordList = wordList.filter(word => {
        if (charEnd) {
            return word.length >= charBegin && word.length < charEnd
        } else {
            return word.length >= charBegin
        }
    })

    // filter out any recent words
    filteredWordList = filteredWordList
        .filter(word => !recentWords.includes(word))
        .sort(() => Math.random() - 0.5);

    // if we still don't have enough words, add random words from recentWords
    if (filteredWordList.length < numWords) {
        console.log('adding from recent words')
        let randomizedWords = recentWords
            .filter((word) => !filteredWordList.includes(word))
            .sort(() => Math.random() - 0.5);
        filteredWordList = [...filteredWordList, ...randomizedWords.slice(0, numWords - filteredWordList.length)];
    }

    // if there still aren't enough words, add from the original list
    if (filteredWordList.length < numWords) {
        console.log('adding from wordList')
        let randomizedWords = wordList
            .filter((word) => !filteredWordList.includes(word))
            .sort(() => Math.random() - 0.5);
        filteredWordList = [...filteredWordList, ...randomizedWords.slice(0, numWords - filteredWordList.length)];
    }
    console.log(filteredWordList.length, numWords)
    return filteredWordList.slice(0, numWords);
}