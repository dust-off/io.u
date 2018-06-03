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

app.post('/messages', (req, res) => {
    db.saveMsg(req.body)
        .then(() => {
            console.log('saved')
            return db.checkForProfanity()
        })
        .then((censored, err) => {
            if(censored) {
                console.log('censored word found')
                console.log(censored)
                return db.deleteMsg(censored)
            }
            io.emit('message', req.body)
            res.sendStatus(200)
        })
        .catch((err) => {
            res.sendStatus(500)
            console.log(err)
        })
})

io.on('connection', (socket) => {
    console.log('user connected')
})

const server = http.listen(3001, () => console.log( 'listening on port', server.address().port))