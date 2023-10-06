import { Ticket } from '../db/sequelize.js'
import { ValidationError, UniqueConstraintError} from 'sequelize'

export default (app) => {
    app.post('/api/ticket/buy', (req, res) => {
        console.log(req.body)
        const {
            transaction,
            festival
        } = res.body
        
        if(transaction) {
            Ticket.create({
                transaction,
                festival
            }).then((ticket) => {
                const message = `Le ticket pour ${req.body.festival} a bien été créer.`
                res.json({ message, festival, transaction })
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
        }
    })
}
