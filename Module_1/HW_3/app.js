// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  // TODO: верните все попытки, прошедшие или не прошедшие порог.
  return []
}

function renderAttempts(attempts) {
  // TODO: соберите строки списка через forEach и строковый аккумулятор.
  // Перед вставкой имени вызовите готовую escapeHtml().
}

function startFilter() {
  // TODO: найдите форму, select, счётчик и список через querySelector().
  // TODO: подпишитесь на submit через addEventListener().
  // В обработчике вызовите preventDefault(), прочитайте value,
  // выберите попытки и замените innerHTML счётчика и списка.
}

startFilter()
