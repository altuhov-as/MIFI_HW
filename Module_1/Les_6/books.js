const books = [
    { title: 'Дюна', pages: 604 },
    { title: 'Солярис', pages: 288 }
]

console.log(books[1].title)
for (let i = 0; i < books.length; i++) {
    console.log(books[i].title, books[i].pages)
}