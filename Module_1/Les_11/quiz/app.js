const questions = [
    // A: добавьте три объекта вопросов.
]

let playerName = ''
let currentQuestionIndex = 0
let score = 0

const startScreen = document.querySelector('#start-screen')
const quizScreen = document.querySelector('#quiz-screen')
const resultScreen = document.querySelector('#result-screen')
const startForm = document.querySelector('#start-form')
const playerNameInput = document.querySelector('#player-name')
const startError = document.querySelector('#start-error')
const progressElement = document.querySelector('#progress')
const questionElement = document.querySelector('#question')
const answerForm = document.querySelector('#answer-form')
const answerError = document.querySelector('#answer-error')
const resultTitle = document.querySelector('#result-title')
const resultText = document.querySelector('#result-text')
const resultMessage = document.querySelector('#result-message')
const restartButton = document.querySelector('#restart-button')

const answerInputs = [
    document.querySelector('#answer-input-0'),
    document.querySelector('#answer-input-1'),
    document.querySelector('#answer-input-2'),
]

const answerElements = [
    document.querySelector('#answer-0'),
    document.querySelector('#answer-1'),
    document.querySelector('#answer-2'),
]

function startQuiz(event) {
    event.preventDefault()

    const enteredName = playerNameInput.value.trim()

    if (enteredName === '') {
        startError.textContent = 'Введите имя'
        return
    }

    playerName = enteredName
    currentQuestionIndex = 0
    score = 0
    startError.textContent = ''
    startScreen.hidden = true
    resultScreen.hidden = true
    quizScreen.hidden = false
    progressElement.textContent = playerName
    showQuestion()
}

function showQuestion() {
    // B: покажите текущий вопрос и очистите прошлый выбор.
}

function submitAnswer(event) {
    event.preventDefault()
    // C: проверьте выбор, измените счёт и индекс.
}

function showResult() {
    // D: покажите результат.
}

function restartQuiz() {
    // D: верните приложение к форме имени.
}

startForm.addEventListener('submit', startQuiz)
answerForm.addEventListener('submit', submitAnswer)
restartButton.addEventListener('click', restartQuiz)