// Исходные данные в формате JSON
const sourceJson = `{
  "event": {
    "title": "Ночь в музее",
    "date": "15 ноября, 18:30",
    "place": "Музей космонавтики, проспект Мира, 111",
    "description": "Вечерняя программа с выставкой и экскурсиями",
    "meeting": "Сбор: 18:30. Начало: 19:00."
  },
  "services": [
    { "id": "guide", "title": "  Экскурсия с гидом  ", "price": 500 },
    { "id": "audio", "title": "Аудиогид", "price": 350 },
    { "id": "catalog", "title": "Каталог выставки", "price": 250 }
  ]
}`;

// Разбор JSON-строки в объект данных
function parseData() {
  try {
    return JSON.parse(sourceJson);
  } catch {
    return null;
  }
}

// Формирование отчёта по выбранным услугам
function buildReport(services, guideChecked, audioChecked, catalogChecked) {
  // Фильтрация услуг по состояниям чекбоксов
  const filtered = services.filter((service, index) => {
    if (index === 0) return guideChecked;
    if (index === 1) return audioChecked;
    if (index === 2) return catalogChecked;
  });

  // Пустой выбор — пустой отчёт
  if (filtered.length === 0) {
    return { count: 0, total: 0, items: [] };
  }

  // Преобразование: извлечение title/price, очистка title
  const items = filtered.map(({ title, price }) => ({
    title: title.trim(),
    price,
  }));

  // Подсчёт общей суммы цен
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return { count: items.length, total, items };
}

// Парсим данные при загрузке страницы
const data = parseData();

// Обработка повреждённого JSON
if (!data) {
  document.querySelector('#data-error').hidden = false;
  document.querySelector('#data-error').textContent = 'Ошибка данных';
  document.querySelector('#service-form').hidden = true;
} else {
  // Показываем форму при корректных данных
  document.querySelector('#service-form').hidden = false;
  // Заполняем заголовок и информацию о событии
  document.querySelector('#event-title').textContent = data.event.title;
  document.querySelector('#event-date').textContent = data.event.date;
  document.querySelector('#event-place').textContent = data.event.place;
  document.querySelector('#event-description').textContent = data.event.description;

  // Показ блока программы по клику на кнопку
  document.querySelector('#show-program').addEventListener('click', function () {
    document.querySelector('#program').hidden = false;
    document.querySelector('#program').innerHTML = data.event.meeting;
  });
}

// Обработка отправки формы — формирование отчёта
document.querySelector('#service-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Читаем состояния чекбоксов
  const guideChecked = document.querySelector('#guide').checked;
  const audioChecked = document.querySelector('#audio').checked;
  const catalogChecked = document.querySelector('#catalog').checked;

  // Скрываем ошибки перед проверкой
  const choiceError = document.querySelector('#choice-error');
  const dataError = document.querySelector('#data-error');
  choiceError.hidden = true;
  dataError.hidden = true;

  // Проверка: хотя бы одна услуга должна быть выбрана
  if (!guideChecked && !audioChecked && !catalogChecked) {
    choiceError.hidden = false;
    choiceError.textContent = 'Выберите хотя бы одну услугу';
    document.querySelector('#result').hidden = true;
    document.querySelector('#report-json').hidden = true;
    return;
  }

  // Формируем отчёт
  const report = buildReport(data.services, guideChecked, audioChecked, catalogChecked);

  // Проверка на ошибку данных
  if (!report) {
    dataError.hidden = false;
    dataError.textContent = 'Ошибка данных';
    return;
  }

  // Формируем HTML результата
  const itemsList = report.items.map(function (item) {
    return item.title;
  }).join('<br>');

  const resultHtml = 'Выбрано услуг: ' + report.count + '<br>Итого: ' + report.total + ' руб.<br>' + itemsList;

  document.querySelector('#result').hidden = false;
  document.querySelector('#result').innerHTML = resultHtml;

  // JSON-строка отчёта с проверкой через JSON.parse
  const jsonStr = JSON.stringify(report);
  JSON.parse(jsonStr);

  document.querySelector('#report-json').hidden = false;
  document.querySelector('#report-json').textContent = jsonStr;
});
