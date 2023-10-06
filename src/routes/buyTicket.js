import { Ticket } from '../db/sequelize.js'
import { ValidationError, UniqueConstraintError } from 'sequelize'

export default (app) => {
    app.post('/api/ticket/buy', (req, res) => {
        console.log(req.body)
        const {
            transaction,
            UserId,
            FestivalId,
            amount
        } = req.body

        if (transaction) {
            if (amount > 1) {
                for (let index = 0; index < amount; index++) {
                    Ticket.create({
                        transaction,
                        UserId,
                        FestivalId
                    }).then((ticket) => {
                        const message = `Le ticket pour ${transaction} a bien été créer.`
                        res.json({ message, ticket })
                        number--
                    })
                        .catch(error => {
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
            }
            Ticket.create({
                transaction,
                UserId,
                FestivalId
            }).then((ticket) => {
                const message = `Le ticket pour ${transaction} a bien été créer.`
                res.json({ message, ticket })
            })
                .catch(error => {
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
