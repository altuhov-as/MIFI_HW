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
  const attempts = window.reportData.attempts;

  if (!window.reportData || !Array.isArray(window.reportData.attempts)) { return []; }

  console.log(attempts)


  // Масштабируемость
  // Добавить новый фильтр (например, 'pending' или 'review') — дело одной новой строки case.
  switch (filter) {
    case 'passed':
      return window.reportData.attempts.filter(attempt => attempt.passed === true);
    case 'failed':
      return window.reportData.attempts.filter(attempt => attempt.passed === false);
    case 'all':
    default:
      // Возвращаем копию массива, чтобы вызывающий код не мог случайно
      // изменить исходные данные в window.reportData.
      return [...window.reportData.attempts];
  }

}

function renderAttempts(attempts) {
  // TODO: соберите строки списка через forEach и строковый аккумулятор.
  // Перед вставкой имени вызовите готовую escapeHtml().
  const list = document.querySelector('#result-list');
  const count = document.querySelector('#result-count');

  // Чтобы была надпись "Показано n из m, нужно узнать длинну массива или передать массив вторым аргументом
  // function renderAttempts(attempts, total), но так как по условию мы не меняем входные параметры, то получаю длинну здесь"
  const total = window.reportData.attempts.length;

  let html = '';

  count.textContent = `Показано: ${attempts.length} из ${total}`

  attempts.forEach(attempt => {
    html += '<li class="result-item"><span class="result-name">' + escapeHtml(attempt.name) + '</span></li>';
  });

  list.innerHTML = html;
}

function startFilter() {
  // TODO: найдите форму, select, счётчик и список через querySelector().
  // TODO: подпишитесь на submit через addEventListener().
  // В обработчике вызовите preventDefault(), прочитайте value,
  // выберите попытки и замените innerHTML счётчика и списка.
  const form = document.querySelector('form');
  const select = document.querySelector('select');

  // Значение получаю, но ни где не использую
  const count = document.querySelector('#result-count');
  const list = document.querySelector('#result-list');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const filter = select.value;
    const attempts = selectAttempts(filter);

    renderAttempts(attempts);
  });

}

startFilter()
