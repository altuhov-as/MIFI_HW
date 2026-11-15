import { createServer } from 'node:http'

const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'text/plain; charset=utf-8')

    if (request.url === '/hello') {
        response.statusCode = 200
        response.end('Привет')
        return
    }

    response.statusCode = 404
    response.end('Не найдено')
})

server.listen(3004, '127.0.0.1', () => {
    console.log('Сервер: http://127.0.0.1:3004')
})
