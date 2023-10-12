import { Ticket } from '../db/sequelize.js'
import { ValidationError, UniqueConstraintError } from 'sequelize'
import auth from '../auth/auth.js'

export default (app) => {
    app.post('/api/ticket/buy', auth, async (req, res) => {
        console.log(req.body)
        const {
            transaction,
            UserId,
            FestivalId,
            amount
        } = req.body

        if (transaction) {
            if (amount > 1) {
                try {
                    const tickets = []
                    for (let index = 0; index < amount; index++) {
                        await Ticket.create({
                            transaction,
                            UserId,
                            FestivalId
                        }).then((ticket) => tickets.push(ticket))
                    }
                    const message = `Le ticket pour ${transaction} a bien été créer.`
                    res.json({ message, tickets })                        
                } catch (error) {
                    if (error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message, error })
                    }
                    if (error instanceof UniqueConstraintError) {
                        return res.status(400).json({ message: error.message, error })
                    }
                    const message = 'Le ticket n\'a pas pu être créer. Réessayer dans quelques intants'
                    res.status(500).json({ message, error })
                } return
            }

            await Ticket.create({
                transaction,
                UserId,
                FestivalId
            }).then((ticket) => {
                const message = `Le ticket pour ${transaction} a bien été créer.`
                res.json({ message, ticket })
            }).catch(error => {
                    if (error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message, error })
                    }
                    if (error instanceof UniqueConstraintError) {
                        return res.status(400).json({ message: error.message, error })
                    }
                    const message = 'Le ticket n\'a pas pu être créer. Réessayer dans quelques intants'
                    res.status(500).json({ message, error })
                })
        }
    })
}
