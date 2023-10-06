export default (sequelize, DataTypes) => {
    return sequelize.define('Ticket', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      transaction: {
        type: DataTypes.STRING,
        allowNull: {
            msg: "Transaction can't be null"
          },
      }
    })
  }