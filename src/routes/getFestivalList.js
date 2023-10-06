import { Festival } from '../db/sequelize.js'
import { ValidationError, UniqueConstraintError} from 'sequelize'

export default (app) => {
    app.get('/api/festival/list', (req, res) => {
        Festival.findAll().then((data) => {
            res.json({ data })
        })
        .catch(error => {
            if (error instanceof ValidationError) {
              return res.status(400).json({ message: error.message, error})
            }
            if (error instanceof UniqueConstraintError) {
              return res.status(400).json({ message: error.message, error})
            }
            const message = 'La liste n\'a pas pu être créer. Réessayer dans quelques intants'
            res.status(500).json({ message, error: error })
          })
    })
}
