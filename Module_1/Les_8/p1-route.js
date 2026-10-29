const route = {
    city: 'Москва',
    start: { city: 'Тула' },
    finish: { city: 'Калуга' },
};
const field = 'finish';

console.log(route[field].city);
console.log(route.start.city);
console.log(route.city);
