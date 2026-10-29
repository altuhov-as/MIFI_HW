const catalogJson = '[{"title":"Солярис","year":1961},{"title":"Мы","year":1924},{"title":"Пикник на обочине","year":1972}]'

const catalog = JSON.parse(catalogJson)
console.log(catalog)

const filteredBooks = catalog.filter((book) => book.year >= 1950)

const newBooks = filteredBooks.map((book) => {
    const { title, year } = book
    return { newTitle: title, newYear: year }
})

console.log(newBooks)

const answerJSON = JSON.stringify(newBooks)

console.log(`Подходящих книг: ${newBooks.length}`)
console.log("Строка результата: ", answerJSON)
console.log(`длину массива после обратного JSON.parse(): ${JSON.parse(answerJSON).length}`)