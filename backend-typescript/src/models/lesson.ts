import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import { v4 as uuidv4 } from 'uuid';
import User from './user';

class Lesson extends Model {
  public id?: string;
  public user_id?: string;
  public name?: string;
  public complete?: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Lesson.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    },
    name: {
      type: new DataTypes.STRING(255),
    },
    complete: {
      type: new DataTypes.BOOLEAN,
    },
  },
  {
    tableName: 'lessons',
    sequelize,
    hooks: {
        beforeCreate: (lesson: Lesson) => {
            lesson.id = uuidv4();
        }
    },
    timestamps: true,
  }
);

export default Lesson;