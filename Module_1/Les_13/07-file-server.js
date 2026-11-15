import { createServer } from 'node:http'
import { promises as fs } from 'node:fs'

const server = createServer(async (req, res) => {

    res.setHeader('Content-Type', "text/plain;charset=utf-8");

    if (req.url === '/catalog') {
        try {
            const catalog = await fs.readFile('./data/catalog.txt', "utf8")
            res.statusCode = 200;
            res.end(catalog.trim())
        } catch (error) {
            res.statusCode = 500;
            res.end(`Ошибка чтения ${error.code}`);
        }
        return
    }
    res.statusCode = 404
    res.end("Не найдено")

})

server.listen(3002, '127.0.0.1', () => {
    console.log('Сервер: http://127.0.0.1:3002')
})