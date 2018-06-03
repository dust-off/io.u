const request = require('request')

describe('calc', () => {
    it('should multiply 2 by 2', () => {
        expect(2*2).toBe(4)
    })
})

describe('get messages', () => {
    it('should get response with status code 200', (done) => {
        request.get('http://localhost:3001/messages/Dustin', (err, res) => {
            expect(res.statusCode).toBe(200)
            done()
        })
    })
    it('should get multiple messages', (done) => {
        request.get('http://localhost:3001/messages', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done()
        })
    })
})

describe('get messages from specific user', () => {
    it('should return status code 200 from /messages/:id', (done) => {
        request.get('http://localhost:3001/messages/Dustin', (err, res) => {
            expect(res.statusCode).toBe(200)
            done()
        })
    })
    it('should return an array of messages', (done) => {
        request.get('http://localhost:3001/messages/Dustin', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done()
        })
    })
})