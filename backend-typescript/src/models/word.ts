import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import { v4 as uuidv4 } from 'uuid';
import Lesson from './lesson';
import User from './user';

class Word extends Model {
  public id?: string;
  public lesson_id?: string;
  public user_id?: string;
  public text?: string;
  public answer?: string;
  public correct?: boolean;
  public created?: Date;
  public updated?: Date;
}

Word.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    lesson_id: {
        type: DataTypes.UUID,
        references: {
            model: Lesson,
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    },
    text: {
      type: new DataTypes.STRING(255),
    },
    answer: {
      type: new DataTypes.JSON,
    },
    correct: {
        type: new DataTypes.BOOLEAN,
    },
  },
  {
    tableName: 'words',
    sequelize,
    hooks: {
        beforeCreate: (word: Word) => {
            word.id = uuidv4();
            word.user_id = 'b78df6b5-cb5b-4d80-b71f-4b535f6d411a';
        },
    },
    timestamps: true,
  }
);

export default Word;