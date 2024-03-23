
export type Word = {
    id?: string;
    lesson_id?: string;
    user_id?: string;
    text?: string;
    answer?: string;
    correct?: boolean;
    created?: Date;
    updated?: Date;
}