const socket = io()

$(() => {
    $("#send").click(() => {
        let msg = { name: $('#name').val(), text: $("#message").val()}
        console.log(msg)
        postMsg(msg)
    })
    getMsg()
})

socket.on('message', addMsg)

function addMsg(message) {
    $("#messages").append(`<h4> ${message.name} </h4> <p> ${message.text} </p>`)
}

function getMsg() {
    $.get('http://localhost:3001/messages', (data) => {
        data.forEach(addMsg);
    })
}

function postMsg(msg) {
    $.post('http://localhost:3001/messages', msg, (data) => {
        console.log('posting', data)
        data.forEach(addMsg);
    })
}