const form = document.querySelector('#request-form')
const list = document.querySelector('#request-list')

function handleSubmit(event) {

    event.preventDefault()
    const formData = new FormData(form)
    const title = formData.get('title')
    const isUrgent = formData.get('isurgent')

    const card = document.createElement('article')
    card.classList.add('request')
    if (isUrgent) card.classList.add('urgent')

    card.textContent = title

    list.append(card)


}

form.addEventListener('submit', handleSubmit)