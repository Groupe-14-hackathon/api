import { Ticket } from '../db/sequelize.js'
import { ValidationError, UniqueConstraintError} from 'sequelize'

export default (app) => {
    app.get('/api/ticket/info', (req, res) => {
        console.log(req.body)
        const {
            UserId,
        } = res.body
        Ticket.findOne({ where: { UserId } })
        
        .then((ticket) => {
            const message = `ticket for user ${UserId}`
            res.json({ message, ticket })
        })
        
        .catch(error => {
            if (error instanceof ValidationError) {
              return res.status(400).json({ message: error.message, error})
            }
            if (error instanceof UniqueConstraintError) {
              return res.status(400).json({ message: error.message, error})
            }
            const message = 'Le ticket n\'a pas pu être créer. Réessayer dans quelques intants'
            res.status(500).json({ message, data: error })
          })
    })
}
