console.log("Загрузка temperature.js ")

export function celsiusToFahrenheit(celsius) {
    console.log(`Передан аргумент ${celsius}`)
    return Math.round((celsius * 9) / 5 + 32)
}
