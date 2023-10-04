import { User } from '../db/sequelize.js'
import auth from '../auth/auth.js'
import bcrypt from 'bcrypt'

export default (app) => {
    app.post('/api/removeuser', auth, (req, res) => {
        console.log(req.body);
        User.findOne({ where: { email: req.body.email } }).then(user => {
            if(!user) {
                const message = `L'utilisateur demandé n'existe pas.`
                return res.status(404).json({ message })
            }
  
            return bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if(!isPasswordValid) {
                    const message = `Le mot de passe est incorrect.`
                    return res.status(401).json({ message })
                }
  
            // password correct
            
            User.destroy({
                where: {
                    email: req.body.email
                }
            }).then(email => {
                    const message = `L'utilisateur ${req.body.email} has been deleted`
                    res.json({ message, email })
                })
                .catch(error => {
                    const message = 'Error while deleting user'
                    res.status(500).json({ message, data: error })
                })
            })
        })
    })
}