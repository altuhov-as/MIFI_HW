import { createServer } from 'node:http'

const server = createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
    })
    response.end('Сервер работает')
})

server.listen(3000, '127.0.0.1', () => {
    console.log('Сервер: http://127.0.0.1:3000')
})
