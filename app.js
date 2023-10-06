import express from 'express'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
import { initDb } from './src/db/sequelize.js'
import cors from 'cors'

// routes

import login from './src/routes/login.js'
import register from './src/routes/register.js'
import getAccountInfo from './src/routes/getAccountInfo.js'
import removeAccount from './src/routes/removeAccount.js'
import updateEmail from './src/routes/updateEmail.js'
import updatePassword from './src/routes/updatePassword.js'
import buyTicket from './src/routes/buyTicket.js'
import getTicket from './src/routes/getTicket.js'
import getFestivalList from './src/routes/getFestivalList.js'
import getFestival from './src/routes/getFestival.js'

const app = express()
const port = process.env.PORT || 3000

app
.use(favicon('./favicon.ico'))
.use(bodyParser.json())
.use(cors())

initDb()

// Points de terminaisons

app.get('/', (req, res) => {
    res.json('Hello, fest-api is ready to use !')
})

login(app)
register(app)
getAccountInfo(app)
removeAccount(app)
updateEmail(app)
updatePassword(app)
buyTicket(app)
getTicket(app)
getFestivalList(app)
getFestival(app)

// Gestion d'erreurs
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée !'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Appli démarée sur: http://localhost:${port}`))