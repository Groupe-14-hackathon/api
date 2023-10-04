import { Sequelize, DataTypes } from 'sequelize'
import UserModel from '../models/user.js'
import bcrypt from 'bcrypt'

const sequelize = new Sequelize('yfest', 'postgres', 'toto', {
  host: 'localhost',
  dialect: 'postgresql',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
export const User = UserModel(sequelize, DataTypes)

export const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {    
    const admin_pass = 'admin'
    bcrypt.hash(admin_pass, 10)
        .then(hash => User.create({ email: 'admin@admin.com', password: hash }))
        .then(user => console.log(user.toJSON()))

    console.log('La base de donnée a bien été initialisée !')

  })
}