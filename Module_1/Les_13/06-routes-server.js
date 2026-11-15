import { createServer } from 'node:http'

const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'text/plain; charset=utf-8')

    if (request.url === '/') {
        response.statusCode = 200
        response.end("Главная")
        return
    }
    if (request.url === '/status') {
        response.statusCode = 200
        response.end("Статус: работает")
        return
    }

    response.statusCode = 404
    response.end("Не найдено")

})

server.listen(3001, '127.0.0.1', () => {
    console.log('Сервер: http://127.0.0.1:3001')
})
