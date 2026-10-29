const exhibit = { title: 'Спутник', year: 1957 };

console.log('for...in:');
for (const name in exhibit) {
    console.log(`${name}: ${exhibit[name]}`);
}

console.log('for...of:');
const names = Object.keys(exhibit);
for (const name of names) {
    console.log(`${name}: ${exhibit[name]}`);
}