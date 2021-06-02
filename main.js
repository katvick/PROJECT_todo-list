var form = document.getElementById("addForm");
var itemsList = document.getElementById("items");
var filter = document.getElementById("filter");

// Добавление новой задачи прослушка события
form.addEventListener("submit", addItemByBtn);

// Удаление элемента - прослушка клика
itemsList.addEventListener("click", removeItem);

// Фильтрация списка дел - прослушка ввода
filter.addEventListener("keyup", filterItems);

// Добавление новой задачи функция
function addItem(task) {
    // Создаем элемент для новой задачи
    var newElement = document.createElement("li");
    newElement.className = "list-group-item";

    // Добавим текст в новый элемент
    var newTextNode = document.createTextNode(task);
    newElement.appendChild(newTextNode);

    // Создаем кнопку
    var deleteBtn = document.createElement("button");
    // Добавляем текст
    deleteBtn.appendChild(document.createTextNode("Удалить"));
    // Добавляем CSS class
    deleteBtn.className = "btn btn-light btn-sm float-right";
    // Добавляем data атрибут
    deleteBtn.dataset.action = "delete";

    // Помещаем кнопку внутрь тега li
    newElement.appendChild(deleteBtn);
    console.log("addItem -> newElement", newElement);

    // Добавляем новую задачу в список со всеми задачами
    itemsList.append(newElement);

}

// Добавление новой задачи по кнопке
function addItemByBtn(e) {
    // Отменяем отправку формы
    e.preventDefault();

    // Находим инпут с текстом для новой задачи
    var newItemInput = document.getElementById("newItemText");
    // Получаем текст из инпута
    var newItemText = newItemInput.value;
    // Добавляем новую задачу с полученным текстом
    addItem(newItemText);

    // Сохраняем задачу на localStorage
    setLocalStorage();

    // Очистим поле добавления новой задачи
    // newItemInput.value = "";

    // Генерируем новую тестовую задачу
    generateTestTask();

}

// Удаление элемента - ф-я
function removeItem(e) {
    if (
        e.target.hasAttribute("data-action") &&
        e.target.getAttribute("data-action") == "delete"
    ) {
        if (confirm("Удалить задачу?")) {
            e.target.parentNode.remove();
        }
    }
    
    setLocalStorage();
}

// Фильтрация списка дел ф-я
function filterItems(e) {
    // Получаем фразу для поиска и переводим ее в нижний регистр
    var searchedText = e.target.value.toLowerCase();

    // 1. Получаем списко всех задач
    var items = itemsList.querySelectorAll("li");

    // 2. Перебираем циклом все найденные теги li с задачами
    items.forEach(function(item) {
        // Получаем текст задачи из списка и переводим его в нижний регистр
        var itemText = item.firstChild.textContent.toLowerCase();

        // Проверяем вхождение искомой подстроки в текст задачи
        if (itemText.indexOf(searchedText) != -1) {
            // Если вхождение есть - показываем элемент с задачей
            item.style.display = "block";
        } else {
            // Если вхождения нет - скрываем элемент с задачей
            item.style.display = "none";
        }
    });
}

// Генерация тестовой задачи
function generateTestTask() {

    let arrExampleItem = [
        'Приготовить завтрак',
        'Съездить на вокзал',
        'Заправить авто',
        'Переобуться',
        'Заехать в гараж',
        'Сходить в спортзал',
        'Посмотреть урок по JS',
        'Сделать домашку',
        'Приготовить ужин'
    ]

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    getRandomInt(arrExampleItem.length);

    // вставляем тестовый пример в UI
    function insertInUI() {
        var random = getRandomInt(arrExampleItem.length);
        var randomItem = arrExampleItem[random];
        document.querySelector('#newItemText').value = randomItem;
    }

    insertInUI();

}

// Формирование массива из задач
function generateArrTasks() {
    let itemsArr = itemsList.querySelectorAll("li");
    let tasksArr = [];
    
    for (let i = 0; i < itemsArr.length; i++) {
        let task = itemsArr[i].firstChild.textContent;
        tasksArr.push(task);
    }
    
	// console.log("TCL: addItem -> tasksArr", tasksArr)
    return tasksArr;
}

// Сохранение массива данных в localStorage
function setLocalStorage() {
    let tasksArr = generateArrTasks();
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

// Получение данных из localStorage
function getLocalStorage() {
    let tasksArr = JSON.parse(localStorage.getItem("tasks"));
	console.log("TCL: getLocalStorage -> tasksArr", tasksArr);
    
    if (tasksArr === null) return;
    else tasksArr.forEach(item => addItem(item));
}

generateTestTask();
getLocalStorage();