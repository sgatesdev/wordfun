export type WordLetterMap = {
	letter: string,
    answer: string,
	correct: boolean,
}

export type Word = {
    id?: string
    index?: number
    text?: string
    audio_file?: string
    answer?: Array<WordLetterMap>
    correct?: boolean
    saved?: boolean
    answerKey?: string[]
}

export type Lesson = {
   id?: string;
   user_id?: string;
   name?: string;
   words?: Word[];
   complete?: boolean;
   createdAt?: Date;
   updatedAt?: Date;
}