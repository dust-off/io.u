const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const dbUrl = `mongodb://<dbuser>:<dbpassword>@ds241570.mlab.com:41570/chat_test_v1`

const messages = [{
    name: 'bob',
    text: 'whats up?'
},{
     name: 'john',
     text: 'Nothin much'
}]

app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/messages', (req, res) => {
    console.log(req.body)
    io.emit('message', req.body)
    messages.push(req.body)
    res.sendStatus(200, messages)
})

io.on('connection', (socket) => {
    console.log('user connected')
})

const server = http.listen(3001, () => console.log( 'listening on port', server.address().port))