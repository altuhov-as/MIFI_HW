
const list = document.querySelector('#notice-list')
const starterNotices = document.querySelectorAll('.notice')
const count = document.querySelector('#notice-count')
const emptyMessage = document.querySelector('#empty-message')

console.log(starterNotices.length)
starterNotices.forEach((noties) => {
    noties.classList.add('ready')
})

const newNotice = document.createElement('li')
newNotice.classList.add('notice')
newNotice.textContent = "Пароль изменен"
list.append(newNotice)

const allItems = document.querySelectorAll('.notice')

count.innerHTML = `Уведомлений ${allItems.length}`

emptyMessage.hidden = true