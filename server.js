const express = require('express');
const bodyParser = require('body-parser');
const { mLab } = require('./credentials')

const db = require('./db/mongo')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/messages', (req, res) => {
    db.allMessages()
        .then(messages => {
            res.send(messages)
        })
        .catch(err => {
            res.sendStatus(500)
            console.log(err)
        })
})

app.post('/messages', async (req, res) => {
    const savedMessage = await db.saveMsg(req.body)

    const censored = await db.checkForProfanity()

    if (censored) {
        await db.deleteMsg(censored)
    } else {
        io.emit('message', req.body)
    }

    res.sendStatus(200)
        
        // .catch((err) => {
        //     res.sendStatus(500)
        //     console.log(err)
        // })
})

io.on('connection', (socket) => {
    console.log('user connected')
})

const server = http.listen(3001, () => console.log( 'listening on port', server.address().port))