import { readFile } from 'node:fs/promises'

async function main() {
    try {
        const text = await readFile('./data/message.txt', 'utf8')
        console.log(text.trim())
    } catch (error) {
        console.log(`Ошибка чтения: ${error.code}`)
    } finally {
        console.log('Попытка чтения завершена')
    }
}

main()
