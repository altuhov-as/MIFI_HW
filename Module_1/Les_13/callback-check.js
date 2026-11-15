import { readFile, writeFile } from 'node:fs'

readFile('./data/message.txt', 'utf8', (error, text) => {
    if (error) { console.log(`Ошибка чтения: ${error.code}`); return }
    writeFile('./data/copy.txt', text, 'utf8', (error) => {
        if (error) { console.log(`Ошибка записи: ${error.code}`); return }
        readFile('./data/copy.txt', 'utf8', (error, copy) => {
            if (error) { console.log(`Ошибка чтения: ${error.code}`); return }
            console.log(copy.trim())
        })
    })
})