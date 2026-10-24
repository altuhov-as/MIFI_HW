const books = [
    { title: 'Первая книга', pages: 180 },
    { title: 'Вторая книга', pages: 300 },
    { title: 'Третья книга', pages: 420 }
]
const limit = 300
for (let i = 0; i < books.length; i++) {
    if (books[i].pages > limit) {
        console.log(books[i].title)
    }
}
console.log('Проверка закончена')
