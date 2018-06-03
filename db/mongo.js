const mongoose = require('mongoose');
const { mLab } = require('../credentials')

const dbUrl = `mongodb://${mLab.user}:${mLab.password}@ds241570.mlab.com:41570/chat_test_v1`

mongoose.Promise = Promise;

Message = mongoose.model('Message', {
    name: String,
    message: String,
})

mongoose.connect(dbUrl, (err) => {
    console.log('mongoDB connection', err)
})

module.exports = {
    allMessages: () => {
        return Message.find({})
    },
    saveMsg: (text) => {
        const message = new Message(text)
        return message.save()
    },
    checkForProfanity: () => {
        return Message.findOne({ message: 'badword' })
    },
    deleteMsg: (msg) => {
        return Message.remove({ _id: msg.id })
    },
}
