import { readFile, writeFile } from 'node:fs/promises'
import { parse } from 'csv-parse/sync'

const inputPath = process.argv[2]

function buildReportCsv(summary) {
  const lines = ['category,total_amount']

  Object.keys(summary).forEach((category) => {
    lines.push(`${category},${summary[category]}`)
  })

  return `\uFEFF${lines.join('\n')}\n`
}

async function main() {
  if (!inputPath) {
    console.log('Использование: node mini.js <путь-к-csv>')
    process.exitCode = 1
    return
  }

  try {
    const text = await readFile(inputPath, 'utf8')
    const orders = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
    })
    const validOrders = []
    const errors = []

    orders.forEach((order, index) => {
      const amount = Number(order.amount)
      const isValid =
        order.order_id && order.category && Number.isFinite(amount) && amount > 0

      if (!isValid) {
        errors.push(index + 2)
        return
      }

      validOrders.push({
        order_id: order.order_id,
        category: order.category,
        amount: amount,
        status: order.status,
        comment: order.comment,
      })
    })

    const paidOrders = validOrders.filter((order) => order.status === 'paid')
    const summary = {}
    let total = 0

    paidOrders.forEach((order) => {
      total += order.amount

      if (!summary[order.category]) {
        summary[order.category] = 0
      }

      summary[order.category] += order.amount
    })

    await writeFile('mini-report.csv', buildReportCsv(summary), 'utf8')
    console.log(`Строк в файле: ${orders.length}`)
    console.log(`Корректных строк: ${validOrders.length}`)
    console.log(`Ошибочных строк: ${errors.length}`)
    console.log(`Общая сумма: ${total} ₽`)
    console.log('Отчёт сохранён: mini-report.csv')
  } catch (error) {
    if (error.code) {
      console.log(`Ошибка: ${error.code}`)
    } else {
      console.log(`Ошибка: ${error.message}`)
    }
    process.exitCode = 1
  }
}

main()
