const PASSING_PERCENTAGE = 67

function isArray(value) {
  return Array.isArray(value)
}

export function validateQuizData(data) {
  // TODO: проверьте корень, quizTitle, correctAnswers и attempts.
  // Для массивов вызывайте готовую функцию isArray(value).
  // У каждой попытки должны быть непустое имя и массив answers нужной длины.

  // 1. корень: объект, но не null и не массив
  if (!data || typeof data !== 'object' || isArray(data)) {
    return false
  }

  // 2. quizTitle: непустая строка
  if (typeof data.quizTitle !== 'string' || !data.quizTitle.trim()) {
    return false
  }

  // 3. correctAnswers: непустой массив
  if (!isArray(data.correctAnswers) || data.correctAnswers.length === 0) {
    return false
  }

  // 4. attempts: непустой массив
  if (!isArray(data.attempts) || data.attempts.length === 0) {
    return false
  }

  // 5-7. каждая попытка
  for (let i = 0; i < data.attempts.length; i++) {
    const attempt = data.attempts[i]

    // 5. попытка: объект, но не null и не массив
    if (!attempt || typeof attempt !== 'object' || isArray(attempt)) {
      return false
    }

    // 6. name: непустая после trim() строка
    if (typeof attempt.name !== 'string' || !attempt.name.trim()) {
      return false
    }

    // 7. answers: массив той же длины, что correctAnswers
    if (!isArray(attempt.answers) || attempt.answers.length !== data.correctAnswers.length) {
      return false
    }
  }

  return true
}

export function calculateAttempt(attempt, correctAnswers) {
  // TODO: посчитайте score, percentage и passed для одной попытки.
  // Процент округлите через Math.round(); порог хранится в PASSING_PERCENTAGE.

  // score — число совпадений по индексу
  let score = 0
  for (let i = 0; i < correctAnswers.length; i++) {
    if (attempt.answers[i] === correctAnswers[i]) {
      score++
    }
  }

  // percentage — округлённый процент
  const percentage = Math.round((score / correctAnswers.length) * 100)

  // passed — порог 67%
  const passed = percentage >= PASSING_PERCENTAGE

  return {
    name: attempt.name.trim(),
    score,
    percentage,
    passed
  }
}

export function calculateReport(data) {
  // TODO: рассчитайте все попытки и сводку.
  // При равном score оставьте первого лучшего участника.

  // Рассчитаем все попытки
  const attempts = data.attempts.map(attempt =>
    calculateAttempt(attempt, data.correctAnswers)
  )

  // averagePercentage — среднее по уже округлённым процентам
  const sum = attempts.reduce((acc, a) => acc + a.percentage, 0)
  const averagePercentage = Math.round(sum / attempts.length)

  // passedCount — число попыток с passed: true
  const passedCount = attempts.filter(a => a.passed).length

  // best — участник с максимальным percentage (при равенстве — первый)
  let best = attempts[0]
  for (let i = 1; i < attempts.length; i++) {
    if (attempts[i].percentage > best.percentage) {
      best = attempts[i]
    }
  }

  return {
    quizTitle: data.quizTitle.trim(),
    questionCount: data.correctAnswers.length,
    participantCount: attempts.length,
    averagePercentage,
    passedCount,
    threshold: PASSING_PERCENTAGE,
    best,
    attempts
  }
}
