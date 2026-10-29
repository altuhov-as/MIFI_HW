const bookJson = '{"title":"Пикник на обочине","year":1972}';

console.log(`До parse: ${typeof bookJson}`);

const book = JSON.parse(bookJson);
console.log(book);
book.year = 1974;

const updatedJson = JSON.stringify(book);
console.log(typeof updatedJson)
console.log(`Название: ${book.title}`);
console.log(`После stringify: ${updatedJson}`);