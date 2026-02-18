// script.js - Полная логика ИС (Лабораторная 4)

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Установка года
    const yearSpan = document.getElementById('copyrightYear');
    if (yearSpan) yearSpan.textContent = `© ${new Date().getFullYear()} Валетова А.Ю.`;

    // ==========================================
    // БАЗА ДАННЫХ (С АДРЕСАМИ И ОПИСАНИЯМИ)
    // ==========================================
    const BASE_ADDRESS = "Санкт-Петербург, Невский проспект, д. 100, ";
    const now = new Date();

    // Генерация времени для тестов
    const timePlus1h = new Date(now.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16);
    const timePlus5h = new Date(now.getTime() + 5 * 60 * 60 * 1000).toISOString().slice(0, 16);
    const timePlus24h = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16);

    // Исходные данные курсов (Мероприятия)
    let eventsData = [
        {id: 1, title: "Введение в Python", format: "Лекция", direction: "Программирование", level: "Начальный", duration: 2, price: 0, place: "Аудитория 101", address: BASE_ADDRESS + "Корпус C, 3 этаж, ауд. 101", startTime: timePlus24h, desc: "Базовый курс по самому популярному языку программирования. Вы узнаете про переменные, циклы и функции."},
        {id: 2, title: "Основы HTML и CSS", format: "Мастер-класс", direction: "Веб-разработка", level: "Начальный", duration: 3, price: 1500, place: "Аудитория 202", address: BASE_ADDRESS + "Главный корпус, 1 этаж, ауд. 202", startTime: timePlus1h, desc: "Практическое занятие по верстке первых веб-страниц. Создадите свой сайт-визитку."},
        {id: 3, title: "Алгоритмы и структуры данных", format: "Лекция", direction: "Программирование", level: "Средний", duration: 2, price: 2000, place: "Аудитория 105", address: BASE_ADDRESS + "Корпус A, 2 этаж, ауд. 105", startTime: timePlus5h, desc: "Разбор сортировок, поисков и работы со списками.must have для любого разработчика."},
        {id: 4, title: "Практикум по SQL", format: "Практикум", direction: "Базы данных", level: "Средний", duration: 3, price: 2500, place: "Компьютерный класс", address: BASE_ADDRESS + "Корпус B, 3 этаж, комп. класс", startTime: timePlus24h, desc: "Научимся писать сложные запросы, джоины и работать с транзакциями."},
        {id: 5, title: "Основы UX/UI дизайна", format: "Мастер-класс", direction: "Дизайн", level: "Начальный", duration: 2, price: 1800, place: "Аудитория 301", address: BASE_ADDRESS + "Главный корпус, 2 этаж, ауд. 301", startTime: timePlus1h, desc: "Принципы удобства интерфейсов. Разберем ошибки новичков в дизайне."},
        {id: 6, title: "Git для командной работы", format: "Практикум", direction: "Программирование", level: "Средний", duration: 2, price: 1200, place: "Компьютерный класс", address: BASE_ADDRESS + "Корпус B, 3 этаж, комп. класс", startTime: timePlus24h, desc: "Системы контроля версий. Ветвление, мержи и решение конфликтов."},
        {id: 7, title: "Введение в JavaScript", format: "Лекция", direction: "Веб-разработка", level: "Начальный", duration: 2, price: 1500, place: "Аудитория 202", address: BASE_ADDRESS + "Главный корпус, 1 этаж, ауд. 202", startTime: timePlus5h, desc: "Оживляем сайты. События, DOM, базовый синтаксис JS."},
        {id: 8, title: "Разработка REST API", format: "Практикум", direction: "Программирование", level: "Продвинутый", duration: 3, price: 3000, place: "Компьютерный класс", address: BASE_ADDRESS + "Корпус B, 3 этаж, комп. класс", startTime: timePlus24h, desc: "Архитектура современных веб-сервисов. Методы GET, POST, PUT, DELETE."},
        {id: 9, title: "Основы кибербезопасности", format: "Лекция", direction: "ИБ", level: "Средний", duration: 2, price: 2200, place: "Аудитория 105", address: BASE_ADDRESS + "Корпус A, 2 этаж, ауд. 105", startTime: timePlus1h, desc: "Виды угроз, защита данных, основы криптографии."},
        {id: 10, title: "Анализ данных в Excel", format: "Тренинг", direction: "Карьера", level: "Начальный", duration: 2, price: 1000, place: "Аудитория 301", address: BASE_ADDRESS + "Главный корпус, 2 этаж, ауд. 301", startTime: timePlus24h, desc: "Сводные таблицы, формулы ВПР, визуализация данных."},
        {id: 11, title: "Визуализация данных", format: "Практикум", direction: "Аналитика", level: "Начальный", duration: 2, price: 1500, place: "Компьютерный класс", address: BASE_ADDRESS + "Корпус B, 3 этаж, комп. класс", startTime: timePlus5h, desc: "Как делать понятные графики и дашборды."},
        {id: 12, title: "Введение в машинное обучение", format: "Лекция", direction: "ИИ", level: "Средний", duration: 3, price: 3500, place: "Аудитория 101", address: BASE_ADDRESS + "Корпус C, 3 этаж, ауд. 101", startTime: timePlus24h, desc: "Что такое нейросети, обучение моделей и применение AI."},
        {id: 13, title: "Проектирование БД", format: "Практикум", direction: "Базы данных", level: "Средний", duration: 3, price: 2800, place: "Компьютерный класс", address: BASE_ADDRESS + "Корпус B, 3 этаж, комп. класс", startTime: timePlus1h, desc: "Нормализация, ER-диаграммы, создание надежной структуры БД."},
        {id: 14, title: "Основы DevOps", format: "Лекция", direction: "DevOps", level: "Продвинутый", duration: 2, price: 3200, place: "Аудитория 105", address: BASE_ADDRESS + "Корпус A, 2 этаж, ауд. 105", startTime: timePlus24h, desc: "CI/CD, контейнеризация Docker, мониторинг систем."},
        {id: 15, title: "Командная разработка ПО", format: "Тренинг", direction: "Программирование", level: "Средний", duration: 2, price: 2000, place: "Аудитория 202", address: BASE_ADDRESS + "Главный корпус, 1 этаж, ауд. 202", startTime: timePlus5h, desc: "Agile, Scrum, взаимодействие в команде разработчиков."}
    ];

    // Данные пользователей
    let usersDB = [
        {id: 1, login: "user01", email: "user01@mail.ru", pass: "qwerty123", role: "user"},
        {id: 2, login: "user02", email: "user02@mail.ru", pass: "abc123", role: "user"},
        {id: 3, login: "admin", email: "admin@mail.ru", pass: "admin123", role: "admin"},
        {id: 4, login: "guest1", email: "guest1@mail.ru", pass: "Guest223", role: "guest"},
        {id: 5, login: "manager", email: "manager@mail.ru", pass: "manager123", role: "user"}
    ];

    // Мои записи (хранятся в памяти пока страница открыта)
    let myBookings = [];

    // Счетчик ошибок входа
    let loginAttempts = 0;
    const MAX_ATTEMPTS = 5;

    // Справочники для форм
    const formatsList = ["Лекция", "Мастер-класс", "Практикум", "Тренинг", "Курс"];
    const directionsList = ["Программирование", "Веб-разработка", "Базы данных", "Дизайн", "ИБ", "Аналитика", "ИИ", "DevOps", "Карьера", "Менеджмент", "Тестирование"];

    // ==========================================
    // ЛОГИКА АВТОРИЗАЦИИ (index.html)
    // ==========================================
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const guestBtn = document.getElementById('guestBtn');
        if (guestBtn) {
            guestBtn.addEventListener('click', () => window.location.href = 'guest_view.html');
        }

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (loginAttempts >= MAX_ATTEMPTS) {
                alert("🚫 Слишком много попыток. Обновите страницу.");
                return;
            }
            const role = document.querySelector('input[name="roleRadio"]:checked').value;
            const email = document.getElementById('inputEmail').value.trim();
            const pass = document.getElementById('inputPassword').value.trim();

            if (!email.includes('@') || pass.length < 6) {
                alert("⚠️ Некорректный формат данных!");
                loginAttempts++;
                return;
            }

            const user = usersDB.find(u => u.email === email && u.pass === pass && u.role === role);
            if (user) {
                loginAttempts = 0;
                window.location.href = (role === 'admin') ? 'admin_panel.html' : 'user_dashboard.html';
            } else {
                loginAttempts++;
                alert(`❌ Ошибка входа! Попытка ${loginAttempts}/${MAX_ATTEMPTS}`);
                if (loginAttempts >= MAX_ATTEMPTS) {
                    document.querySelectorAll('#loginForm input').forEach(i => i.disabled = true);
                }
            }
        });
    }

    // ==========================================
    // ЛОГИКА АДМИНА (admin_panel.html)
    // ==========================================
    const adminCoursesTable = document.getElementById('adminCoursesTable');
    const adminUsersTable = document.getElementById('adminUsersTable');

    // Отрисовка курсов
    function renderAdminCourses() {
        if (!adminCoursesTable) return;
        adminCoursesTable.innerHTML = '';
        eventsData.forEach((ev, index) => {
            const row = `
                <tr>
                    <td>${ev.id}</td>
                    <td>${ev.title}</td>
                    <td><span class="badge bg-info">${ev.format}</span></td>
                    <td>${ev.direction}</td>
                    <td>${ev.price} ₽</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-warning" onclick="editCourse(${index})"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteCourse(${index})"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>`;
            adminCoursesTable.innerHTML += row;
        });
    }
    if (adminCoursesTable) renderAdminCourses();

    // Удаление курса
    window.deleteCourse = function(index) {
        if(confirm('Вы уверены, что хотите удалить этот курс?')) {
            eventsData.splice(index, 1);
            // Пересчитываем ID для красоты
            eventsData.forEach((e, i) => e.id = i + 1);
            renderAdminCourses();
            alert('Курс удален!');
        }
    };

    // Редактирование курса
    window.editCourse = function(index) {
        const ev = eventsData[index];
        const newTitle = prompt("Название курса:", ev.title);
        if (!newTitle || newTitle.length < 3) return alert("Название слишком короткое!");
        
        const newPrice = prompt("Цена (руб):", ev.price);
        if (isNaN(newPrice) || newPrice < 0) return alert("Некорректная цена!");

        const newDir = prompt("Направление (из списка: Программирование, Веб-разработка...):", ev.direction);
        
        eventsData[index].title = newTitle;
        eventsData[index].price = parseInt(newPrice);
        eventsData[index].direction = newDir;
        
        renderAdminCourses();
        alert('Курс обновлен!');
    };

    // Добавление курса (через модальное окно Bootstrap)
    const addCourseForm = document.getElementById('addCourseForm');
    if (addCourseForm) {
        // Заполняем селекты
        const fmtSel = document.getElementById('newFormat');
        const dirSel = document.getElementById('newDirection');
        if(fmtSel) formatsList.forEach(f => fmtSel.innerHTML += `<option value="${f}">${f}</option>`);
        if(dirSel) directionsList.forEach(d => dirSel.innerHTML += `<option value="${d}">${d}</option>`);

        addCourseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('newTitle').value;
            const price = parseInt(document.getElementById('newPrice').value);
            const format = document.getElementById('newFormat').value;
            const direction = document.getElementById('newDirection').value;
            const duration = parseInt(document.getElementById('newDuration').value);

            if (title.length < 3 || isNaN(price) || price < 0) {
                alert("Проверьте корректность данных!");
                return;
            }

            const newId = eventsData.length > 0 ? Math.max(...eventsData.map(e => e.id)) + 1 : 1;
            eventsData.push({
                id: newId,
                title: title,
                format: format,
                direction: direction,
                level: "Начальный",
                duration: duration,
                price: price,
                place: "Аудитория X",
                address: BASE_ADDRESS + "Новый корпус",
                startTime: timePlus24h,
                desc: "Новый курс от администрации."
            });
            
            renderAdminCourses();
            // Закрыть модалку
            const modalEl = document.getElementById('addCourseModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();
            addCourseForm.reset();
            alert('Курс успешно добавлен!');
        });
    }

    // Отрисовка пользователей
    function renderAdminUsers() {
        if (!adminUsersTable) return;
        adminUsersTable.innerHTML = '';
        usersDB.forEach((u, index) => {
            const row = `
                <tr>
                    <td>${u.id}</td>
                    <td>${u.login}</td>
                    <td>${u.email}</td>
                    <td>${u.role.toUpperCase()}</td>
                    <td><span class="badge bg-success">Активен</span></td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteUser(${index})"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>`;
            adminUsersTable.innerHTML += row;
        });
    }
    if (adminUsersTable) renderAdminUsers();

    window.deleteUser = function(index) {
        if(confirm('Удалить пользователя?')) {
            usersDB.splice(index, 1);
            renderAdminUsers();
        }
    };
    
    // Добавление пользователя (упрощенно через промпт для краткости, можно вынести в модалку аналогично курсам)
    const addUserBtn = document.getElementById('addUserBtn');
    if(addUserBtn) {
        addUserBtn.addEventListener('click', () => {
            const login = prompt("Логин нового пользователя:");
            const email = prompt("Email:");
            if(!login || !email.includes('@')) return alert("Некорректные данные");
            usersDB.push({id: usersDB.length+1, login: login, email: email, pass: "123456", role: "user"});
            renderAdminUsers();
            alert("Пользователь добавлен!");
        });
    }


    // ==========================================
    // ЛОГИКА ПОЛЬЗОВАТЕЛЯ (user_dashboard.html)
    // ==========================================
    const catalogTableBody = document.getElementById('catalogTableBody');
    const myBookingsTableBody = document.querySelector('#myBookingsTable tbody');
    const noBookingsMsg = document.getElementById('noBookingsMsg');

    // Отрисовка каталога
    function renderCatalog() {
        if (!catalogTableBody) return;
        catalogTableBody.innerHTML = '';
        eventsData.forEach(ev => {
            const dateObj = new Date(ev.startTime);
            const dateStr = dateObj.toLocaleDateString('ru-RU') + ' ' + dateObj.toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'});
            
            const row = `
                <tr>
                    <td>
                        <strong>${ev.title}</strong><br>
                        <small class="text-muted">${ev.desc.substring(0, 60)}...</small>
                    </td>
                    <td>${dateStr}<br><small>${ev.address}</small></td>
                    <td>${ev.price} ₽</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-success" onclick="initBooking(${ev.id})">
                            <i class="bi bi-cart-check"></i> Записаться
                        </button>
                    </td>
                </tr>`;
            catalogTableBody.innerHTML += row;
        });
    }
    if (catalogTableBody) renderCatalog();

    // Инициация записи (проверка дублей -> Оплата)
    window.initBooking = function(id) {
        // Проверка на дубль
        if (myBookings.some(b => b.id === id)) {
            alert("⚠️ Вы уже записаны на этот курс! Повторная запись невозможна.");
            // Переключаем на вкладку моих записей
            const triggerEl = document.querySelector('#mybookings-tab');
            const tab = new bootstrap.Tab(triggerEl);
            tab.show();
            return;
        }

        const event = eventsData.find(e => e.id === id);
        
        // Открытие окна оплаты
        const payModal = new bootstrap.Modal(document.getElementById('paymentModal'));
        document.getElementById('payCourseName').textContent = event.title;
        document.getElementById('payAmount').textContent = event.price;
        
        // Сохраняем временный объект события для завершения после оплаты
        window.tempBookingEvent = event;
        payModal.show();
    };

    // Обработка формы оплаты
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const cardNum = document.getElementById('cardNumber').value.replace(/\s/g, '');
            
            if (cardNum.length !== 16 || isNaN(cardNum)) {
                alert("❌ Неверный номер карты (должно быть 16 цифр)!");
                return;
            }

            // Имитация процесса
            const btn = this.querySelector('button[type="submit"]');
            const oldText = btn.textContent;
            btn.textContent = "Обработка платежа...";
            btn.disabled = true;

            setTimeout(() => {
                // Успех
                const event = window.tempBookingEvent;
                myBookings.push(event);
                
                // Закрываем оплату
                const payModalEl = document.getElementById('paymentModal');
                const payModal = bootstrap.Modal.getInstance(payModalEl);
                payModal.hide();
                paymentForm.reset();
                btn.textContent = oldText;
                btn.disabled = false;

                // Показываем финальное окно
                const dateObj = new Date(event.startTime);
                const finalMsg = `✅ Ваша запись успешно оплачена!\n\nКурс: ${event.title}\nАдрес: ${event.address}\nВремя: ${dateObj.toLocaleDateString()} в ${dateObj.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}\n\nЖдем вас!`;
                alert(finalMsg);

                renderMyBookings();
                
                // Переключаем вкладку
                const triggerEl = document.querySelector('#mybookings-tab');
                const tab = new bootstrap.Tab(triggerEl);
                tab.show();

            }, 1500);
        });
    }

    // Отрисовка моих записей
    function renderMyBookings() {
        if (!myBookingsTableBody) return;
        myBookingsTableBody.innerHTML = '';
        if (myBookings.length === 0) {
            noBookingsMsg.style.display = 'block';
            return;
        }
        noBookingsMsg.style.display = 'none';

        myBookings.forEach((b, idx) => {
            const dateObj = new Date(b.startTime);
            const dateStr = dateObj.toLocaleDateString('ru-RU') + ' ' + dateObj.toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'});
            const hoursLeft = (dateObj - new Date()) / (1000*60*60);

            const row = `
                <tr>
                    <td><strong>${b.title}</strong></td>
                    <td>${dateStr}<br><small>${b.address}</small></td>
                    <td><span class="badge bg-success">Оплачено</span></td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-danger" onclick="cancelBooking(${idx}, ${hoursLeft}, '${b.title}')">Отменить</button>
                    </td>
                </tr>`;
            myBookingsTableBody.innerHTML += row;
        });
    }

    // Отмена записи
    window.cancelBooking = function(idx, hours, title) {
        if (hours < 3) {
            alert(`⛔ Невозможно отменить запись на "${title}", так как мероприятие состоится через ${Math.floor(hours)} ч. ${Math.round((hours%1)*60)} мин.\nПриносим извинения.`);
        } else {
            if(confirm("Вы уверены, что хотите отменить запись? Средства будут возвращены.")) {
                myBookings.splice(idx, 1);
                renderMyBookings();
                alert("Запись отменена. Возврат оформлен.");
            }
        }
    };
});
