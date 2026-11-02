document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.querySelector('#task-list');

    function toggleTask(event) {
        if (!event.target.classList.contains('task-item')) {
            return;
        }
        event.target.classList.toggle('done');
    }

    taskList.addEventListener('click', toggleTask);

    const newTask = document.createElement('li');
    newTask.classList.add('task-item');
    newTask.textContent = 'Отправить заявку';
    taskList.append(newTask);
});