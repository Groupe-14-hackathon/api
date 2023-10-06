import { Festival } from '../db/sequelize.js'
import auth from '../auth/auth.js'

export default (app) => {
  app.get('/api/festival/:id', (req, res) => {
    Festival.findByPk(req.params.id)
      .then(festival => {
        const message = 'Un festival a bien été trouvé.'
        res.json({ message, data: festival })
      })
      .catch(error => {
        const message = 'Le festival n\'a pas pu être récupéré. Réessayer dans quelques intants'
        res.status(500).json({ message, data: error })
      })
  })
}