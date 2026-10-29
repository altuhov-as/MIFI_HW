const configJson = '{"name":"Музей", "city":"Москва", "director":"Марина"}';
const config = JSON.parse(configJson);
const field = 'city';

console.log(`Город: ${config[field].toUpperCase()}`);

const { director: leader } = config;
console.log(`Руководитель: ${leader.toUpperCase()}`);