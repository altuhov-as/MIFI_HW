const pages = [120, 80, 200]
let total = 0
for (let i = 0; i < pages.length; i++) {
    total += pages[i]
    console.log(i, pages[i], total)
}
console.log('Всего', total)
