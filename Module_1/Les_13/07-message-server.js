import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'

const server = createServer(async (request, response) => {
    response.setHeader("Content-Type", "text/plain; charset=utf-8")

    try {
        const message = await readFile('./data/message.txt', 'utf8')
        response.statusCode = 200
        response.end(message.trim())
    } catch (error) {
        response.statusCode = 500
        response.end(`Ошибка чтения: ${error.code}`)
    }
})

server.listen(3005, '127.0.0.1', () => {
    console.log('Сервер: http://127.0.0.1:3005')
})