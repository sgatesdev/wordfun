import {Word} from './word';

export type Lesson = {
   id?: string;
   user_id?: string;
   name?: string;
   words?: Word[];
   complete?: boolean;
   createdAt?: Date;
   updatedAt?: Date;
}