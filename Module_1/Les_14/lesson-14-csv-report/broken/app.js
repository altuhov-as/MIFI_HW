import { readFile, writeFile } from 'node:fs/promises'
import { parse } from 'csv-parse/sync'

const inputPath = process.argv[2]
const allowedStatuses = ['paid', 'new', 'cancelled']
const requiredColumns = ['order_id', 'date', 'category', 'city', 'amount', 'status', 'comment']

function checkColumns(records) {
  if (records.length === 0) {
    throw new Error('CSV не содержит строк данных')
  }

  const columns = Object.keys(records[0])
  const missingColumns = requiredColumns.filter((column) => !columns.includes(column))

  if (missingColumns.length > 0) {
    throw new Error(`Нет обязательных столбцов: ${missingColumns.join(', ')}`)
  }
}

function validateOrders(records) {
  const validOrders = []
  const errors = []

  records.forEach((record, index) => {
    const amount = Number(record.amount)
    const hasRequiredFields =
      record.order_id && record.date && record.category && record.city && record.status
    const hasValidAmount = Number.isFinite(amount) && amount > 0
    const hasValidStatus = allowedStatuses.includes(record.status)

    if (!hasRequiredFields || !hasValidAmount || !hasValidStatus) {
      errors.push(index + 2)
      return
    }

    validOrders.push({
      order_id: record.order_id,
      date: record.date,
      category: record.category,
      city: record.city,
      amount: record.amount,
      status: record.status,
      comment: record.comment,
    })
  })

  return { validOrders, errors }
}

function buildSummary(paidOrders) {
  const summary = {}

  paidOrders.forEach((order) => {
    if (!summary[order.category]) {
      summary[order.category] = { count: 0, total: 0 }
    }

    summary[order.category].count += 1
    summary[order.category].total += order.amount
  })

  return summary
}

function buildReportCsv(summary) {
  const lines = ['category,paid_orders,total_amount']

  Object.keys(summary).forEach((category) => {
    const values = summary[category]
    lines.push(`${category},${values.count},${values.total}`)
  })

  return `\uFEFF${lines.join('\n')}\n`
}

async function main() {
  if (!inputPath) {
    console.log('Использование: node app.js <путь-к-csv>')
    process.exitCode = 1
    return
  }

  try {
    const text = readFile(inputPath, 'utf8')
    const records = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
    })
    checkColumns(records)
    const validation = validateOrders(records)
    const paidOrders = validation.validOrders.filter((order) => order.status === 'оплачен')
    const total = paidOrders.reduce((sum, order) => sum + order.amount, 0)
    const summary = buildSummary(paidOrders)

    console.log(`Строк в файле: ${records.length}`)
    console.log(`Корректных строк: ${validation.validOrders.length}`)
    console.log(`Ошибочных строк: ${validation.errors.length}`)
    console.log(`Строки с ошибками: ${validation.errors.join(', ')}`)
    console.log(`Оплаченных заказов: ${paidOrders.length}`)
    console.log(`Общая сумма: ${total} ₽`)
    console.log('По категориям:')

    Object.keys(summary).forEach((category) => {
      const values = summary[category]
      console.log(`${category}: ${values.count} шт., ${values.total} ₽`)
    })

    await writeFile('report.csv', buildReportCsv(summary), 'utf8')
    console.log('Отчёт сохранён: report.csv')
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

