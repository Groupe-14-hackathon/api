import { Sequelize, DataTypes } from 'sequelize'
import UserModel from '../models/user.js'
import TicketModel from '../models/ticket.js'
import FestivalModel from '../models/festival.js'
import bcrypt from 'bcrypt'

const sequelize = new Sequelize('yfest', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgresql',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})

export const User = UserModel(sequelize, DataTypes)
export const Ticket = TicketModel(sequelize, DataTypes)
export const Festival = FestivalModel(sequelize, DataTypes)

User.hasMany(Ticket, {
  foreignKey: {
    name: 'UserId'
  }
});
Ticket.belongsTo(User);
Festival.hasMany(Ticket, {
  foreignKey: {
    name: 'FestivalId'
  }
});
Ticket.belongsTo(Festival);

export const initDb = () => {
  return sequelize.sync({ force: true }).then(_ => {
    const admin_pass = 'admin'
    bcrypt.hash(admin_pass, 10)
      .then(hash => User.create({ email: 'admin@admin.com', password: hash }))
      .then(user => console.log(user.toJSON()))
      .then(async () => {
        await Festival.create({ nom: 'Tommorowland', date: '10/10/2002' })
          .then(festival => console.log(festival.toJSON()))

        await Festival.create({ nom: 'Jul', date: '10/10/2002' })
          .then(festival => console.log(festival.toJSON()))

        Ticket.create({ transaction: 'No-01', UserId: 1, FestivalId: 1 })
          .then(ticket => console.log(ticket.toJSON()))
      })

    console.log('La base de donnée a bien été initialisée !')

  })
}