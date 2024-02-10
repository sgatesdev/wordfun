import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import { v4 as uuidv4 } from 'uuid';

class User extends Model {
  public id!: string;
  public username!: string;
  public password!: string;
  public email!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(255),
    },
    password: {
      type: new DataTypes.STRING(255),
    },
    email: {
        type: new DataTypes.STRING(255),
    },
  },
  {
    tableName: 'users',
    sequelize,
    hooks: {
        beforeCreate: (user: User) => {
            user.id = uuidv4();
        }
    },
    timestamps: true,
  }
);

export default User;