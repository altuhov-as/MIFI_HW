const readline = require('node:readline/promises')

function ticketPrice(category) {
    switch (category) {
        case 1: {
            return 300
        }
        case 2: {
            return 500
        }
        case 3: {
            return 900
        }
        default:
            return 0
    }
}

function maxTickets(budget, price) {
    if (price === 0) return 0
    let count_ticket = 0
    while (budget >= price) {
        budget -= price
        count_ticket += 1
    }
    return count_ticket
}

function printTicketResult(category, budget) {
    // переменную price вычисляю, чтоб вставить значения. Можно вызвать дважды функцию при выводе текста
    // но это дважды вычисления одного и того же значения, 
    const price = ticketPrice(category)
    if (price === 0) {
        console.log("неизвестная категория")
    }
    else {
        console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${maxTickets(budget, price)} шт.`)
    }

}

function deliveryPrice(distance, total) {
    if (total >= 3000 || distance <= 3) return 0
    if (distance <= 10) return 200

    return 200 + (distance - 10) * 25;
}

function printDelivery(distance, total) {
    console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${deliveryPrice(distance, total)} руб.`)
}

function printSteps(height) {
    if (height < 1) {
        console.log("Количество ступеней должно быть положительным числом")
    }
    else {
        let built_count = 0
        for (let i = 1; i <= height; i++) {
            if (i === 4) continue
            // После ступени 10 строительство останавливается: 
            // напечатайте Дальше лестница не построена и выйдите из цикла через break
            if (i > 10) {
                console.log("Дальше лестница не построена")
                break
            }
            console.log(`Ступень ${i}`)
            built_count++
        }
        console.log(`Всего построено: ${built_count}`)
    }
}

async function main() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

    console.log('Выберите задачу:')
    console.log('1 — билетная касса')
    console.log('2 — доставка заказа')
    console.log('3 — лестница')

    const action = Number(await rl.question('Ваш выбор: '))

    switch (action) {
        case 1: {
            const category = Number(await rl.question('Категория билета: '))
            const budget = Number(await rl.question('Бюджет: '))
            printTicketResult(category, budget)
            break
        }
        case 2: {
            const distance = Number(await rl.question('Расстояние: '))
            const total = Number(await rl.question('Сумма заказа: '))
            if (Number.isNaN(distance) || Number.isNaN(total) || distance < 0 || total < 0) {
                console.log('Ошибка: введите корректные положительные числа.');

            } else { printDelivery(distance, total); }
            break
        }
        case 3: {
            const height = Number(await rl.question('Высота лестницы: '))

            printSteps(height)
            break
        }
        default:
            console.log('такой задачи нет')
    }

    rl.close()
}

main()