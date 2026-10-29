const route = {
    number: "M7",
    start: { city: "Москва", stop: "Киевский вокзал" },
    finish: { city: "Калуга", stop: "Площадь Победы" },
    minutes: 180
}

// Маршрут: М7
// Отправление: Киевский вокзал
// {"route":"М7","from":"Москва","to":"Калуга","minutes":180}
// Проверка: Калуга

const { number, start, finish, minutes } = route
console.log(start)

const summary = {
    route: number,
    from: start.city,
    to: finish.city,
    minutes: minutes
}

const summaryJSON = JSON.stringify(summary)
console.log(summary)

console.log(`Маршрут: ${route["number"]}`)
console.log(`Отправление: ${route.start.stop}`)
console.log(JSON.stringify(summary))
console.log(`Проверка ${JSON.parse(summaryJSON)["to"]}`)
