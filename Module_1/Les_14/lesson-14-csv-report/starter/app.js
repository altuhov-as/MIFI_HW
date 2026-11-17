import { readFile, writeFile } from 'node:fs/promises'
import { parse } from 'csv-parse/sync'

const inputPath = process.argv[2]
const allowedStatuses = ['paid', 'new', 'cancelled']
const requiredColumns = ['order_id', 'date', 'category', 'city', 'amount', 'status', 'comment']

async function main() {
  // Совместная сборка: добавьте функции выше main, затем замените это тело.
}

main()
