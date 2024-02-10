import Lesson from './lesson';
import Word from './word';
import User from './user';
import { sequelize } from '../db';

Lesson.hasMany(Word, {
    foreignKey: 'lesson_id',
    as: 'words'
})

Lesson.belongsTo(User, {
    foreignKey: 'user_id'
})

Word.belongsTo(Lesson, {
    foreignKey: 'lesson_id'
})

Word.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Lesson, {
    foreignKey: 'user_id',
})

User.hasMany(Word, {
    foreignKey: 'user_id',
})

export { Lesson, Word, User, sequelize};