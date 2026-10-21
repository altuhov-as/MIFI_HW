const bill = 1600;
const people = 5;
const rest = bill % people;
if (rest === 0) {
    console.log('Счёт делится нацело');
} else {
    console.log(`Лишних рублей: ${rest}`);
}
