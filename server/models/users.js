const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    matchPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 36],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 36],
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: [6],
        },
      },
      dob: DataTypes.DATE,
      otp: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.password = bcrypt.hashSync(user.password, salt);
        },
        beforeUpdate: (user, options) => {
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
