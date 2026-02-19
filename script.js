// script.js - ФИНАЛЬНАЯ ВЕРСИЯ С ИСПРАВЛЕНИЯМИ

document.addEventListener('DOMContentLoaded', function() {
    
    console.log("✅ Script.js загружен успешно!");

    // 1. Установка года
    const yearSpan = document.getElementById('copyrightYear');
    if (yearSpan) yearSpan.textContent = `© ${new Date().getFullYear()} Валетова А.Ю.`;

    // ==========================================
    // БАЗА ДАННЫХ
    // ==========================================
    const BASE_ADDRESS = "Санкт-Петербург, Невский проспект, д. 100, ";
    const now = new Date();

    const timePlus1h = new Date(now.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16);
    const timePlus5h = new Date(now.getTime() + 5 * 60 * 60 * 1000).toISOString().slice(0, 16);
    const timePlus24h = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16);

    let eventsData = [
        {id: 1, title: "Введение в Python", format: "Лекция", direction: "Программирование", level: "Начальный", duration: 2, price: 0, address: BASE_ADDRESS + "Корпус C, 3 этаж, ауд. 101", startTime: timePlus24h, desc: "Базовый курс по Python."},
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
        {id: 5, login: "manager", email: "manager@mail.ru", pass: "manager123", role: "user", active: true}
    ];

    let myBookings = [];
    let loginAttempts = 0;
    const MAX_ATTEMPTS = 5;

    const formatsList = ["Лекция", "Мастер-класс", "Практикум", "Тренинг", "Курс"];
    const directionsList = ["Программирование", "Веб-разработка", "Базы данных", "Дизайн", "ИБ", "Аналитика", "ИИ", "DevOps", "Карьера", "Менеджмент", "Тестирование"];
    const rolesList = ["user", "admin", "manager", "guest"];

    // ==========================================
    // ЛОГИКА АВТОРИЗАЦИИ
    // ==========================================
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const guestBtn = document.getElementById('guestBtn');
        if (guestBtn) guestBtn.addEventListener('click', () => {
            console.log("Переход в режим гостя");
            window.location.href = 'guest_view.html';
        });

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
                window.location.href = (role === 'admin') ? 'admin_panel.html' : 'user_dashboard.html';
            } else {
                loginAttempts++;
                alert(`❌ Ошибка входа! Попытка ${loginAttempts}/${MAX_ATTEMPTS}`);
                if (loginAttempts >= MAX_ATTEMPTS) document.querySelectorAll('#loginForm input').forEach(i => i.disabled = true);
            }
        });
    }

    // ==========================================
    // ЛОГИКА АДМИНА
    // ==========================================
    const adminCoursesTable = document.getElementById('adminCoursesTable');
    const adminUsersTable = document.getElementById('adminUsersTable');

    function renderAdminCourses() {
        if (!adminCoursesTable) return;
        adminCoursesTable.innerHTML = '';
        eventsData.forEach((ev, index) => {
            const row = `<tr>
                <td>${ev.id}</td><td>${ev.title}</td><td><span class="badge bg-info">${ev.format}</span></td>
                <td>${ev.direction}</td><td>${ev.price} ₽</td><td><small>${ev.address}</small></td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-warning" onclick="editCourse(${index})"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteCourse(${index})"><i class="bi bi-trash"></i></button>
                </td></tr>`;
            adminCoursesTable.innerHTML += row;
        });
    }
    if (adminCoursesTable) renderAdminCourses();

    window.deleteCourse = function(index) {
        if(confirm('Удалить курс?')) { eventsData.splice(index, 1); eventsData.forEach((e, i) => e.id = i + 1); renderAdminCourses(); }
    };

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
            eventsData.push({
                id: newId, title, format, direction, level: "Начальный", duration, price, 
                address, place: "Указан в адресе", startTime: timePlus24h, 
                desc: "Новый курс."
            });
            renderAdminCourses();
            bootstrap.Modal.getInstance(document.getElementById('addCourseModal')).hide();
            addCourseForm.reset();
            alert('Курс добавлен!');
        });
    }

    function renderAdminUsers() {
        if (!adminUsersTable) return;
        adminUsersTable.innerHTML = '';
        usersDB.forEach((u, index) => {
            const statusBadge = u.active ? '<span class="badge bg-success">Активен</span>' : '<span class="badge bg-secondary">Не активен</span>';
            const btnAction = u.active 
                ? `<button class="btn btn-sm btn-outline-warning" onclick="toggleUserStatus(${index})">Заблокировать</button>`
                : `<button class="btn btn-sm btn-outline-success" onclick="toggleUserStatus(${index})">Разблокировать</button>`;
            
            const row = `<tr>
                <td>${u.id}</td><td>${u.login}</td><td>${u.email}</td><td>${u.role.toUpperCase()}</td>
                <td>${statusBadge}</td>
                <td class="text-center">
                    ${btnAction}
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteUser(${index})"><i class="bi bi-trash"></i></button>
                </td></tr>`;
            adminUsersTable.innerHTML += row;
        });
    }
    if (adminUsersTable) renderAdminUsers();

    window.toggleUserStatus = function(index) {
        usersDB[index].active = !usersDB[index].active;
        renderAdminUsers();
    };

    window.deleteUser = function(index) {
        if(confirm('Удалить пользователя?')) { usersDB.splice(index, 1); renderAdminUsers(); }
    };
    
    const addUserBtn = document.getElementById('addUserBtn');
    if(addUserBtn) {
        addUserBtn.addEventListener('click', () => {
            const login = prompt("Логин:");
            const email = prompt("Email:");
            const role = prompt("Роль (user/admin/manager/guest):", "user");
            if(!login || !email.includes('@') || !rolesList.includes(role.toLowerCase())) return alert("Некорректные данные!");
            usersDB.push({id: usersDB.length+1, login, email, pass: "123456", role: role.toLowerCase(), active: true});
            renderAdminUsers();
            alert("Пользователь добавлен!");
        });
    }

    // ==========================================
    // ЛОГИКА ПОЛЬЗОВАТЕЛЯ (ИСПРАВЛЕННАЯ)
    // ==========================================
    const catalogTableBody = document.getElementById('catalogTableBody');
    // Ищем tbody внутри таблицы myBookingsTable
    const myBookingsTableBody = document.querySelector('#myBookingsTable tbody');
    const noBookingsMsg = document.getElementById('noBookingsMsg');

    console.log("Элементы найдены:", !!catalogTableBody, !!myBookingsTableBody);

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
                        <small class="text-muted">${ev.desc ? ev.desc.substring(0, 50) + '...' : ''}</small>
                    </td>
                    <td>${dateStr}</td>
                    <td><small class="text-danger">${ev.address}</small></td>
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

    window.initBooking = function(id) {
        console.log("Нажата кнопка записи на ID:", id);
        
        const isAlreadyBooked = myBookings.some(b => b.id === id);
        if (isAlreadyBooked) {
            alert("⚠️ Вы уже записаны на этот курс!");
            const triggerEl = document.querySelector('#mybookings-tab');
            if(triggerEl) new bootstrap.Tab(triggerEl).show();
            return;
        }

        const event = eventsData.find(e => e.id === id);
        if (!event) return alert("Ошибка: курс не найден");
        
        const payModal = new bootstrap.Modal(document.getElementById('paymentModal'));
        document.getElementById('payCourseName').textContent = event.title;
        document.getElementById('payAmount').textContent = event.price;
        
        window.tempBookingEvent = event;
        payModal.show();
    };

    // ==========================================
    // МАСКИ ДЛЯ КАРТЫ (НОВОЕ)
    // ==========================================
    const cardNumberInput = document.getElementById('cardNumber');
    const cardDateInput = document.getElementById('cardDate');

    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, ''); // Удаляем все нецифры
            value = value.substring(0, 16); // Ограничиваем 16 цифрами
            // Добавляем пробелы каждые 4 символа
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) formattedValue += ' ';
                formattedValue += value[i];
            }
            e.target.value = formattedValue;
        });
    }

    if (cardDateInput) {
        cardDateInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, ''); // Удаляем нецифры
            value = value.substring(0, 4); // Ограничиваем 4 цифрами (ММГГ)
            if (value.length >= 2) {
                e.target.value = value.substring(0, 2) + '/' + value.substring(2);
            } else {
                e.target.value = value;
            }
        });
    }

    // ==========================================
    // ОБРАБОТКА ОПЛАТЫ
    // ==========================================
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cardNumRaw = document.getElementById('cardNumber').value.replace(/\s/g, '');
            if (cardNumRaw.length !== 16 || isNaN(cardNumRaw)) {
                alert("❌ Неверный номер карты (должно быть 16 цифр)!");
                return;
            }

            const btn = this.querySelector('button[type="submit"]');
            const oldText = btn.textContent;
            btn.textContent = "Обработка...";
            btn.disabled = true;

            setTimeout(() => {
                const event = window.tempBookingEvent;
                
                // !!! ДОБАВЛЕНИЕ В МАССИВ !!!
                myBookings.push(event);
                console.log("✅ Запись добавлена в массив myBookings. Всего записей:", myBookings.length);
                console.log("Текущий массив:", myBookings);

                // Закрытие модалки
                const payModalEl = document.getElementById('paymentModal');
                const payModal = bootstrap.Modal.getInstance(payModalEl);
                if(payModal) payModal.hide();
                
                paymentForm.reset();
                btn.textContent = oldText;
                btn.disabled = false;

                const dateObj = new Date(event.startTime);
                const timeStr = dateObj.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
                const dateStr = dateObj.toLocaleDateString('ru-RU');
                
                alert(`✅ Ваша запись успешно оплачена!\n\nКурс: ${event.title}\nАдрес: ${event.address}\nВремя: ${dateStr} в ${timeStr}\n\nЖдем вас!`);

                // !!! ПРИНУДИТЕЛЬНАЯ ОТРИСОВКА !!!
                renderMyBookings();
                
                // Переключение вкладки
                const triggerEl = document.querySelector('#mybookings-tab');
                if(triggerEl) {
                    const tab = new bootstrap.Tab(triggerEl);
                    tab.show();
                    console.log("Вкладка переключена на 'Мои записи'");
                }

            }, 1000);
        });
    }

    function renderMyBookings() {
        console.log("🔄 Запуск функции renderMyBookings()");
        console.log("Количество записей в массиве:", myBookings.length);
        
        if (!myBookingsTableBody) {
            console.error("❌ ОШИБКА: Элемент #myBookingsTable tbody не найден!");
            return;
        }

        myBookingsTableBody.innerHTML = ''; // Полная очистка

        if (myBookings.length === 0) {
            if(noBookingsMsg) noBookingsMsg.style.display = 'block';
            console.log("Записей нет, показано сообщение 'Нет записей'");
            return;
        }
        
        if(noBookingsMsg) noBookingsMsg.style.display = 'none';

        myBookings.forEach((b, idx) => {
            const dateObj = new Date(b.startTime);
            const dateStr = dateObj.toLocaleDateString('ru-RU') + ' ' + dateObj.toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'});
            const hoursLeft = (dateObj - new Date()) / (1000*60*60);

            const row = `
                <tr>
                    <td><strong>${b.title}</strong></td>
                    <td>${dateStr}<br><small class="text-danger">${b.address}</small></td>
                    <td><span class="badge bg-success">Оплачено</span></td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-danger" onclick="cancelBooking(${idx}, ${hoursLeft}, '${b.title.replace(/'/g, "\\'")}')">Отменить</button>
                    </td>
                </tr>`;
            myBookingsTableBody.innerHTML += row;
        });
        console.log("✅ Таблица обновлена. HTML содержимое:", myBookingsTableBody.innerHTML);
    }

    window.cancelBooking = function(idx, hours, title) {
        if (hours < 3) {
            const hoursFloor = Math.floor(hours);
            const mins = Math.round((hours - hoursFloor) * 60);
            alert(`⛔ Невозможно отменить "${title}", так как до начала менее 3 часов (${hoursFloor} ч. ${mins} мин.).`);
        } else {
            if(confirm("Отменить запись? Средства будут возвращены.")) {
                myBookings.splice(idx, 1);
                renderMyBookings();
                alert("Запись отменена.");
            }
        }
    };
});
