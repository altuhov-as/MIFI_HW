import { readFile, writeFile } from 'node:fs/promises'

async function main() {
    await writeFile('./data/example.txt', 'Пример\n', 'utf8')
    const text = await readFile('./data/example.txt', 'utf8')
    console.log(text.trim())
}

main()
