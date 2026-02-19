// script.js - ФИНАЛЬНАЯ ВЕРСИЯ СО СТАТИСТИКОЙ И МЕНЕДЖЕРОМ

console.log("✅ СКРИПТ ЗАГРУЖЕН!");

// === ДАННЫЕ (ЦЕНА PYTHON ИЗМЕНЕНА НА 1400) ===
const BASE_ADDRESS = "Санкт-Петербург, Невский проспект, д. 100, ";
const now = new Date();

const timePlus1h = new Date(now.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16);
const timePlus5h = new Date(now.getTime() + 5 * 60 * 60 * 1000).toISOString().slice(0, 16);
const timePlus24h = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16);

let eventsData = [
    {id: 1, title: "Введение в Python", format: "Лекция", direction: "Программирование", level: "Начальный", duration: 2, price: 1400, address: BASE_ADDRESS + "Корпус C, 3 этаж, ауд. 101", startTime: timePlus24h, desc: "Базовый курс по Python."}, // ЦЕНА ИЗМЕНЕНА
    {id: 2, title: "Основы HTML и CSS", format: "Мастер-класс", direction: "Веб-разработка", level: "Начальный", duration: 3, price: 1500, address: BASE_ADDRESS + "Главный корпус, 1 этаж, ауд. 202", startTime: timePlus1h, desc: "Верстка первых страниц."},
    {id: 3, title: "Алгоритмы и структуры данных", format: "Лекция", direction: "Программирование", level: "Средний", duration: 2, price: 2000, address: BASE_ADDRESS + "Корпус A, 2 этаж, ауд. 105", startTime: timePlus5h, desc: "Сортировки и поиск."},
    {id: 4, title: "Практикум по SQL", format: "Практикум", direction: "Базы данных", level: "Средний", duration: 3, price: 2500, address: BASE_ADDRESS + "Корпус B, 3 этаж, комп. класс", startTime: timePlus24h, desc: "Сложные запросы."},
    {id: 5, title: "Основы UX/UI дизайна", format: "Мастер-класс", direction: "Дизайн", level: "Начальный", duration: 2, price: 1800, address: BASE_ADDRESS + "Главный корпус, 2 этаж, ауд. 301", startTime: timePlus1h, desc: "Прототипирование интерфейсов."},
    {id: 6, title: "Git для командной работы", format: "Практикум", direction: "Программирование", level: "Средний", duration: 2, price: 1200, address: BASE_ADDRESS + "Корпус B, 3 этаж, комп. класс", startTime: timePlus24h, desc: "Контроль версий."},
    {id: 7, title: "Введение в JavaScript", format: "Лекция", direction: "Веб-разработка", level: "Начальный", duration: 2, price: 1500, address: BASE_ADDRESS + "Главный корпус, 1 этаж, ауд. 202", startTime: timePlus5h, desc: "Интерактивность сайтов."},
    {id: 8, title: "Разработка REST API", format: "Практикум", direction: "Программирование", level: "Продвинутый", duration: 3, price: 3000, address: BASE_ADDRESS + "Корпус B, 3 этаж, комп. класс", startTime: timePlus24h, desc: "Архитектура веб-сервисов."},
    {id: 9, title: "Основы кибербезопасности", format: "Лекция", direction: "ИБ", level: "Средний", duration: 2, price: 2200, address: BASE_ADDRESS + "Корпус A, 2 этаж, ауд. 105", startTime: timePlus1h, desc: "Защита данных."},
    {id: 10, title: "Анализ данных в Excel", format: "Тренинг", direction: "Карьера", level: "Начальный", duration: 2, price: 1000, address: BASE_ADDRESS + "Главный корпус, 2 этаж, ауд. 301", startTime: timePlus24h, desc: "Сводные таблицы."},
    {id: 11, title: "Визуализация данных", format: "Практикум", direction: "Аналитика", level: "Начальный", duration: 2, price: 1500, address: BASE_ADDRESS + "Корпус B, 3 этаж, комп. класс", startTime: timePlus5h, desc: "Графики и дашборды."},
    {id: 12, title: "Введение в машинное обучение", format: "Лекция", direction: "ИИ", level: "Средний", duration: 3, price: 3500, address: BASE_ADDRESS + "Корпус C, 3 этаж, ауд. 101", startTime: timePlus24h, desc: "Нейросети и AI."},
    {id: 13, title: "Проектирование БД", format: "Практикум", direction: "Базы данных", level: "Средний", duration: 3, price: 2800, address: BASE_ADDRESS + "Корпус B, 3 этаж, комп. класс", startTime: timePlus1h, desc: "ER-диаграммы."},
    {id: 14, title: "Основы DevOps", format: "Лекция", direction: "DevOps", level: "Продвинутый", duration: 2, price: 3200, address: BASE_ADDRESS + "Корпус A, 2 этаж, ауд. 105", startTime: timePlus24h, desc: "CI/CD и Docker."},
    {id: 15, title: "Командная разработка ПО", format: "Тренинг", direction: "Программирование", level: "Средний", duration: 2, price: 2000, address: BASE_ADDRESS + "Главный корпус, 1 этаж, ауд. 202", startTime: timePlus5h, desc: "Agile и Scrum."}
];

let usersDB = [
    {id: 1, login: "user01", email: "user01@mail.ru", pass: "qwerty123", role: "user", active: true},
    {id: 2, login: "user02", email: "user02@mail.ru", pass: "abc123", role: "user", active: true},
    {id: 3, login: "admin", email: "admin@mail.ru", pass: "admin123", role: "admin", active: true},
    {id: 4, login: "guest1", email: "guest1@mail.ru", pass: "Guest223", role: "guest", active: false},
    {id: 5, login: "manager", email: "manager@mail.ru", pass: "manager123", role: "manager", active: true} // Менеджер
];

// Глобальные счетчики для статистики (имитация базы)
let globalStats = {
    transactions: 124,
    cancellations: 15,
    newUsersToday: 8
};

let myBookings = []; // Записи текущего пользователя
let loginAttempts = 0;
const MAX_ATTEMPTS = 5;

const formatsList = ["Лекция", "Мастер-класс", "Практикум", "Тренинг", "Курс"];
const directionsList = ["Программирование", "Веб-разработка", "Базы данных", "Дизайн", "ИБ", "Аналитика", "ИИ", "DevOps", "Карьера", "Менеджмент", "Тестирование"];
const rolesList = ["user", "admin", "manager", "guest"];

document.addEventListener('DOMContentLoaded', () => {
    
    // === ОБЩИЙ ФУТЕР ДЛЯ ВСЕХ СТРАНИЦ ===
    updateFooterStats();

    // === АВТОРИЗАЦИЯ ===
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const guestBtn = document.getElementById('guestBtn');
        if (guestBtn) guestBtn.addEventListener('click', () => window.location.href = 'guest_view.html');

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (loginAttempts >= MAX_ATTEMPTS) { alert("🚫 Слишком много попыток."); return; }
            const role = document.querySelector('input[name="roleRadio"]:checked').value;
            const email = document.getElementById('inputEmail').value.trim();
            const pass = document.getElementById('inputPassword').value.trim();

            if (!email.includes('@') || pass.length < 6) { alert("⚠️ Некорректный формат!"); loginAttempts++; return; }

            const user = usersDB.find(u => u.email === email && u.pass === pass && u.role === role);
            if (user) {
                if (!user.active && role !== 'admin') { alert("⛔ Аккаунт заблокирован."); return; }
                loginAttempts = 0;
                if (role === 'admin') window.location.href = 'admin_panel.html';
                else if (role === 'manager') window.location.href = 'manager_dashboard.html';
                else window.location.href = 'user_dashboard.html';
            } else {
                loginAttempts++;
                alert(`❌ Ошибка входа! Попытка ${loginAttempts}/${MAX_ATTEMPTS}`);
                if (loginAttempts >= MAX_ATTEMPTS) document.querySelectorAll('#loginForm input').forEach(i => i.disabled = true);
            }
        });
    }

    // === ЛОГИКА АДМИНА ===
    const adminCoursesTable = document.getElementById('adminCoursesTable');
    const adminUsersTable = document.getElementById('adminUsersTable');
    
    // Виджеты админа
    const adminNewUsersWidget = document.getElementById('adminNewUsers');
    const adminTotalCoursesWidget = document.getElementById('adminTotalCourses');
    
    if(adminNewUsersWidget) adminNewUsersWidget.innerText = globalStats.newUsersToday;
    if(adminTotalCoursesWidget) adminTotalCoursesWidget.innerText = eventsData.length;

    if (adminCoursesTable) {
        adminCoursesTable.innerHTML = '';
        eventsData.forEach((ev, index) => {
            adminCoursesTable.innerHTML += `<tr>
                <td>${ev.id}</td><td>${ev.title}</td><td><span class="badge bg-info">${ev.format}</span></td>
                <td>${ev.direction}</td><td>${ev.price} ₽</td><td><small>${ev.address}</small></td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-warning" onclick="editCourse(${index})"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteCourse(${index})"><i class="bi bi-trash"></i></button>
                </td></tr>`;
        });
    }

    window.deleteCourse = function(index) {
        if(confirm('Удалить курс?')) { eventsData.splice(index, 1); renderAdminCourses(); }
    };
    // Перерисовка админки после удаления
    function renderAdminCourses() {
        if(!adminCoursesTable) return;
        adminCoursesTable.innerHTML = '';
        eventsData.forEach((ev, index) => {
             adminCoursesTable.innerHTML += `<tr>
                <td>${ev.id}</td><td>${ev.title}</td><td><span class="badge bg-info">${ev.format}</span></td>
                <td>${ev.direction}</td><td>${ev.price} ₽</td><td><small>${ev.address}</small></td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-warning" onclick="editCourse(${index})"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteCourse(${index})"><i class="bi bi-trash"></i></button>
                </td></tr>`;
        });
        if(adminTotalCoursesWidget) adminTotalCoursesWidget.innerText = eventsData.length;
    }

    window.editCourse = function(index) {
        const ev = eventsData[index];
        const newTitle = prompt("Название:", ev.title);
        if (!newTitle || newTitle.length < 3) return alert("Короткое название!");
        const newPrice = prompt("Цена:", ev.price);
        if (isNaN(newPrice) || newPrice < 0) return alert("Неверная цена!");
        const newAddr = prompt("Адрес:", ev.address);
        
        eventsData[index].title = newTitle;
        eventsData[index].price = parseInt(newPrice);
        eventsData[index].address = newAddr;
        renderAdminCourses();
    };

    const addCourseForm = document.getElementById('addCourseForm');
    if (addCourseForm) {
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
            const address = document.getElementById('newAddress').value;
            const duration = parseInt(document.getElementById('newDuration').value);

            if (title.length < 3 || isNaN(price) || price < 0 || !address) { alert("Заполните все поля!"); return; }

            const newId = eventsData.length > 0 ? Math.max(...eventsData.map(e => e.id)) + 1 : 1;
            eventsData.push({ id: newId, title, format, direction, level: "Начальный", duration, price, address, startTime: timePlus24h, desc: "Новый курс." });
            renderAdminCourses();
            bootstrap.Modal.getInstance(document.getElementById('addCourseModal')).hide();
            addCourseForm.reset();
            alert('Курс добавлен!');
        });
    }

    if (adminUsersTable) {
        adminUsersTable.innerHTML = '';
        usersDB.forEach((u, index) => {
            const statusBadge = u.active ? '<span class="badge bg-success">Активен</span>' : '<span class="badge bg-secondary">Не активен</span>';
            const btnAction = u.active 
                ? `<button class="btn btn-sm btn-outline-warning" onclick="toggleUserStatus(${index})">Заблокировать</button>`
                : `<button class="btn btn-sm btn-outline-success" onclick="toggleUserStatus(${index})">Разблокировать</button>`;
            
            adminUsersTable.innerHTML += `<tr>
                <td>${u.id}</td><td>${u.login}</td><td>${u.email}</td><td>${u.role.toUpperCase()}</td>
                <td>${statusBadge}</td>
                <td class="text-center">
                    ${btnAction}
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteUser(${index})"><i class="bi bi-trash"></i></button>
                </td></tr>`;
        });
    }

    window.toggleUserStatus = function(index) {
        usersDB[index].active = !usersDB[index].active;
        if(adminUsersTable) {
             usersDB.forEach((u, i) => {
                // Простая перерисовка статуса без полного ререндера таблицы для краткости
                // В реальном проекте лучше вызвать renderAdminUsers()
             });
             location.reload(); // Для простоты перезагружаем страницу чтобы увидеть изменения
        }
    };

    window.deleteUser = function(index) {
        if(confirm('Удалить пользователя?')) { usersDB.splice(index, 1); location.reload(); }
    };
    
    const addUserBtn = document.getElementById('addUserBtn');
    if(addUserBtn) {
        addUserBtn.addEventListener('click', () => {
            const login = prompt("Логин:");
            const email = prompt("Email:");
            const role = prompt("Роль (user/admin/manager/guest):", "user");
            if(!login || !email.includes('@') || !rolesList.includes(role.toLowerCase())) return alert("Некорректные данные!");
            usersDB.push({id: usersDB.length+1, login, email, pass: "123456", role: role.toLowerCase(), active: true});
            globalStats.newUsersToday++;
            if(adminNewUsersWidget) adminNewUsersWidget.innerText = globalStats.newUsersToday;
            alert("Пользователь добавлен!");
            location.reload();
        });
    }

    // === ЛОГИКА ПОЛЬЗОВАТЕЛЯ ===
    const catalogTableBody = document.getElementById('catalogTableBody');
    const myBookingsTableBody = document.querySelector('#myBookingsTable tbody');
    const noBookingsMsg = document.getElementById('noBookingsMsg');

    if (catalogTableBody) {
        catalogTableBody.innerHTML = '';
        eventsData.forEach(ev => {
            const dateObj = new Date(ev.startTime);
            const dateStr = dateObj.toLocaleDateString('ru-RU') + ' ' + dateObj.toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'});
            catalogTableBody.innerHTML += `
                <tr>
                    <td><strong>${ev.title}</strong><br><small class="text-muted">${ev.desc.substring(0, 50)}...</small></td>
                    <td>${dateStr}<br><small class="text-danger">${ev.address}</small></td>
                    <td>${ev.price} ₽</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-success" onclick="initBooking(${ev.id})">Записаться</button>
                    </td>
                </tr>`;
        });
    }

    window.initBooking = function(id) {
        if (myBookings.some(b => b.id === id)) {
            alert("⚠️ Вы уже записаны на этот курс!");
            const triggerEl = document.querySelector('#mybookings-tab');
            if(triggerEl) new bootstrap.Tab(triggerEl).show();
            return;
        }
        const event = eventsData.find(e => e.id === id);
        if (!event) return;
        
        document.getElementById('mCourseName').innerText = event.title;
        document.getElementById('mCoursePrice').innerText = event.price;
        
        const modal = new bootstrap.Modal(document.getElementById('payModal'));
        modal.show();
        
        document.getElementById('btnPay').onclick = () => processPayment(event, modal);
    };

    const cardNum = document.getElementById('cardNum');
    const cardDate = document.getElementById('cardDate');

    if (cardNum) {
        cardNum.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '').substring(0, 16);
            e.target.value = val.replace(/(.{4})/g, '$1 ').trim();
        });
    }
    if (cardDate) {
        cardDate.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '').substring(0, 4);
            if (val.length >= 2) e.target.value = val.substring(0, 2) + '/' + val.substring(2);
            else e.target.value = val;
        });
    }

    function processPayment(course, modal) {
        const num = document.getElementById('cardNum').value.replace(/\s/g, '');
        if (num.length !== 16) { alert("Введите 16 цифр карты!"); return; }

        const btn = document.getElementById('btnPay');
        btn.disabled = true; btn.innerText = "Обработка...";

        setTimeout(() => {
            myBookings.push(course);
            globalStats.transactions++;
            
            modal.hide();
            btn.disabled = false; btn.innerText = "Оплатить";
            document.getElementById('cardNum').value = '';
            document.getElementById('cardDate').value = '';
            document.getElementById('cardCvv').value = '';

            alert(`Оплата прошла! Курс "${course.title}" забронирован.`);
            
            const triggerEl = document.querySelector('#myTab button[data-bs-target="#mybookings"]');
            if(triggerEl) new bootstrap.Tab(triggerEl).show();
            
            renderBookings();
        }, 1000);
    }

    function renderBookings() {
        if (!myBookingsTableBody) return;
        myBookingsTableBody.innerHTML = '';
        if (myBookings.length === 0) { noBookingsMsg.style.display = 'block'; return; }
        noBookingsMsg.style.display = 'none';

        myBookings.forEach((b, index) => {
            const dateObj = new Date(b.startTime);
            const dateStr = dateObj.toLocaleDateString('ru-RU') + ' ' + dateObj.toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'});
            const hoursLeft = (dateObj - new Date()) / (1000*60*60);

            myBookingsTableBody.innerHTML += `
                <tr>
                    <td><b>${b.title}</b></td>
                    <td>${dateStr}<br><small>${b.address}</small></td>
                    <td><span class="badge bg-success">Оплачено</span></td>
                    <td><button class="btn btn-sm btn-danger" onclick="cancelBooking(${index}, ${hoursLeft}, '${b.title}')">Отменить</button></td>
                </tr>`;
        });
    }

    window.cancelBooking = (index, hours, title) => {
        if (hours < 3) {
            alert(`⛔ Невозможно отменить "${title}", так как до начала менее 3 часов.`);
        } else {
            if(confirm("Отменить запись?")) {
                myBookings.splice(index, 1);
                globalStats.cancellations++;
                renderBookings();
                alert("Запись отменена.");
            }
        }
    };

    // === ЛОГИКА МЕНЕДЖЕРА ===
    const managerStatsCards = document.getElementById('managerStatsCards');
    const managerCoursesTable = document.getElementById('managerCoursesTable');

    if (managerStatsCards) {
        // Подсчет записей на каждый курс
        const courseCounts = {};
        eventsData.forEach(c => courseCounts[c.id] = 0);
        // В реальном приложении мы бы брали все записи всех пользователей из БД
        // Здесь для демо возьмем текущие + случайные числа для реалистичности
        myBookings.forEach(b => { if(courseCounts[b.id] !== undefined) courseCounts[b.id]++; });
        
        // Добавим фейковые данные для массовости
        for(let id in courseCounts) { courseCounts[id] += Math.floor(Math.random() * 15); }

        let totalCourses = eventsData.length;
        let totalTransactions = globalStats.transactions + Math.floor(Math.random() * 50);
        let totalCancellations = globalStats.cancellations + Math.floor(Math.random() * 5);

        managerStatsCards.innerHTML = `
            <div class="col-md-3"><div class="card text-white bg-primary mb-3"><div class="card-body"><h5 class="card-title">Всего курсов</h5><p class="card-text display-6">${totalCourses}</p></div></div></div>
            <div class="col-md-3"><div class="card text-white bg-success mb-3"><div class="card-body"><h5 class="card-title">Транзакции</h5><p class="card-text display-6">${totalTransactions}</p></div></div></div>
            <div class="col-md-3"><div class="card text-white bg-warning mb-3"><div class="card-body"><h5 class="card-title">Отмены</h5><p class="card-text display-6">${totalCancellations}</p></div></div></div>
            <div class="col-md-3"><div class="card text-white bg-info mb-3"><div class="card-body"><h5 class="card-title">Пользователей сегодня</h5><p class="card-text display-6">${globalStats.newUsersToday}</p></div></div></div>
        `;
    }

    if (managerCoursesTable) {
        managerCoursesTable.innerHTML = '';
        eventsData.forEach(c => {
            // Считаем записи (текущие + фейковые)
            let count = 0;
            myBookings.forEach(b => { if(b.id === c.id) count++; });
            count += Math.floor(Math.random() * 15); // Фейк для демо

            managerCoursesTable.innerHTML += `
                <tr>
                    <td>${c.id}</td>
                    <td><b>${c.title}</b></td>
                    <td>${c.format}</td>
                    <td>${c.direction}</td>
                    <td><span class="badge bg-primary">${count} чел.</span></td>
                    <td>${c.price} ₽</td>
                </tr>
            `;
        });
    }
});

// Функция обновления футера со случайным числом онлайн
function updateFooterStats() {
    const footerEl = document.getElementById('liveUsersFooter');
    if (footerEl) {
        // Генерируем случайное число от 12 до 45
        const randomUsers = Math.floor(Math.random() * (45 - 12 + 1)) + 12;
        footerEl.innerHTML = `👥 Сейчас на сайте: <b>${randomUsers}</b> пользователей`;
    }
}
