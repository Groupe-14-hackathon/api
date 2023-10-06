export default (sequelize, DataTypes) => {
    return sequelize.define('Festival', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: {
          msg: "Name can't be null"
        },
        unique: {
            msg: 'Name already used'
        }
      },
      date: {
        type: DataTypes.STRING
      }
    })
  }