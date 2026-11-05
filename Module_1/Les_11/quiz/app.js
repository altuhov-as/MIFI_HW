const questions = [
    {
        text: 'Какой метод округляет число до ближайшего целого?',
        answers: ['Math.floor()', 'Math.round()', 'toFixed(2)'],
        correctIndex: 1,
    },
    {
        text: 'Какой селектор находит элемент с id="score"?',
        answers: ['.score', '#score', 'score'],
        correctIndex: 1,
    },
    {
        text: 'Что возвращает filter()?',
        answers: ['Новый массив', 'Одно число', 'Последний элемент'],
        correctIndex: 0,
    },
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
    const currentQuestion = questions[currentQuestionIndex]

    progressElement.textContent = `${playerName} | Вопрос ${currentQuestionIndex + 1} из ${questions.length}`
    questionElement.textContent = currentQuestion.text

    answerElements.forEach((element, index) => {
        element.textContent = currentQuestion.answers[index]
        answerInputs[index].checked = false
    })
    answerError.textContent = ''
}
function submitAnswer(event) {
    event.preventDefault()
    // C: проверьте выбор, измените счёт и индекс.
    let selectedIndex = -1

    answerInputs.forEach((input) => {
        if (input.checked) {
            selectedIndex = Number(input.value)
        }

    });
    if (selectedIndex === -1) {
        answerError.textContent = "Выберите вариант ответа"
        return
    }

    const currentQuestion = questions[currentQuestionIndex]
    if (selectedIndex === currentQuestion.correctIndex) {
        score += 1
    }

    currentQuestionIndex += 1

    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showResult()
    }
}
function showResult() {
    // D: покажите результат.
    quizScreen.hidden = true
    resultScreen.hidden = false
    resultTitle.textContent = `${playerName}, готово`
    const percent = Math.round((score / questions.length) * 100)
    resultText.textContent = `Результат: ${score} из ${questions.length} ${percent}%`
    if (percent == 100) {
        resultMessage.textContent = 'Все ответы правильные'
    } else if (percent >= 67) {
        resultMessage.textContent = 'Большинство ответов правильные'
    } else {
        resultMessage.textContent = 'Пройдите викторину еще раз и проверьте расхождения.'
    }


}

function restartQuiz() {
    // D: верните приложение к форме имени.
    currentQuestionIndex = 0
    score = 0
    startError.textContent = ""
    answerError.textContent = ""

    answerInputs.forEach((input) => {
        if (input.checked) {
            input.checked = false
        }
    })

    startScreen.hidden = false
    resultScreen.hidden = true
    quizScreen.hidden = true

}

startForm.addEventListener('submit', startQuiz)
answerForm.addEventListener('submit', submitAnswer)
restartButton.addEventListener('click', restartQuiz)