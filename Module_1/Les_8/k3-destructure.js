const book = { title: 'Солярис', year: 1961, author: 'Станислав Лем' };
const { title, year: publishedYear } = book;


console.log(`Название: ${title}`);
console.log(`Год: ${publishedYear}`);
console.log(`Исходный год: ${book.year}`);
