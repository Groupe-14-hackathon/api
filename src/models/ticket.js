export default (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      festival: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isDate: {
            msg: "Must be a date"
          }
        },
        unique: {
          msg: 'Festival already exists'
        }
      },
      user: {
        type: DataTypes.STRING
      }
    })
  }
  