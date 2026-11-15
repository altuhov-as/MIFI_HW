import { readFile } from 'node:fs/promises'

const reading = readFile('./data/message.txt', 'utf8')



reading
    .then((text) => {
        console.log(text.trim())
    })
    .catch((error) => {
        console.log(`Ошибка чтения: ${error.code}`)
    })
    .finally(() => {
        console.log('Попытка чтения завершена')
    })

console.log(reading instanceof Promise)
console.log('Чтение началось')
