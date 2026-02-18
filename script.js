// script.js - Логика для Лабораторной работы №4

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Установка года в футере
    const yearSpan = document.getElementById('copyrightYear');
    if (yearSpan) yearSpan.textContent = `© ${new Date().getFullYear()} Валетова А.Ю.`;

    // ==========================================
    // БАЗА ДАННЫХ (Из Лаб 1)
    // Добавлено поле startTime для проверки времени отмены
    // ==========================================
    const now = new Date();
    
    // Генерируем время: некоторые курсы через 1 час (для теста блокировки), некоторые через 5 часов
    const timePlus1h = new Date(now.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16);
    const timePlus5h = new Date(now.getTime() + 5 * 60 * 60 * 1000).toISOString().slice(0, 16);
    const timePlus24h = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16);

    const eventsData = [
        {id: 1, title: "Введение в Python", format: "Лекция", direction: "Программирование", level: "Начальный", duration: 2, price: 0, startTime: timePlus24h},
        {id: 2, title: "Основы HTML и CSS", format: "Мастер-класс", direction: "Веб-разработка", level: "Начальный", duration: 3, price: 1500, startTime: timePlus1h}, // Через 1 час (нельзя отменить)
        {id: 3, title: "Алгоритмы и структуры данных", format: "Лекция", direction: "Программирование", level: "Средний", duration: 2, price: 2000, startTime: timePlus5h},
        {id: 4, title: "Практикум по SQL", format: "Практикум", direction: "Базы данных", level: "Средний", duration: 3, price: 2500, startTime: timePlus24h},
        {id: 5, title: "Основы UX/UI дизайна", format: "Мастер-класс", direction: "Дизайн", level: "Начальный", duration: 2, price: 1800, startTime: timePlus1h}, // Через 1 час
        {id: 6, title: "Git для командной работы", format: "Практикум", direction: "Программирование", level: "Средний", duration: 2, price: 1200, startTime: timePlus24h},
        {id: 7, title: "Введение в JavaScript", format: "Лекция", direction: "Веб-разработка", level: "Начальный", duration: 2, price: 1500, startTime: timePlus5h},
        {id: 8, title: "Разработка REST API", format: "Практикум", direction: "Программирование", level: "Продвинутый", duration: 3, price: 3000, startTime: timePlus24h},
        {id: 9, title: "Основы кибербезопасности", format: "Лекция", direction: "ИБ", level: "Средний", duration: 2, price: 2200, startTime: timePlus1h},
        {id: 10, title: "Анализ данных в Excel", format: "Тренинг", direction: "Карьера", level: "Начальный", duration: 2, price: 1000, startTime: timePlus24h},
        {id: 11, title: "Визуализация данных", format: "Практикум", direction: "Аналитика", level: "Начальный", duration: 2, price: 1500, startTime: timePlus5h},
        {id: 12, title: "Введение в машинное обучение", format: "Лекция", direction: "ИИ", level: "Средний", duration: 3, price: 3500, startTime: timePlus24h},
        {id: 13, title: "Проектирование БД", format: "Практикум", direction: "Базы данных", level: "Средний", duration: 3, price: 2800, startTime: timePlus1h},
        {id: 14, title: "Основы DevOps", format: "Лекция", direction: "DevOps", level: "Продвинутый", duration: 2, price: 3200, startTime: timePlus24h},
        {id: 15, title: "Командная разработка ПО", format: "Тренинг", direction: "Программирование", level: "Средний", duration: 2, price: 2000, startTime: timePlus5h}
    ];

    // Пользователи (Из Таблицы 6 Лаб 1)
    const usersDB = [
        {id: 1, login: "user01", email: "user01@mail.ru", pass: "qwerty123", role: "user"},
        {id: 2, login: "user02", email: "user02@mail.ru", pass: "abc123", role: "user"},
        {id: 3, login: "admin", email: "admin@mail.ru", pass: "admin123", role: "admin"},
        {id: 4, login: "guest1", email: "guest1@mail.ru", pass: "Guest223", role: "guest"},
        {id: 5, login: "manager", email: "manager@mail.ru", pass: "manager123", role: "user"}
    ];

    // Хранилище записей пользователя (в памяти)
    let myBookings = [];

    // Переменная для счетчика ошибок входа
    let loginAttempts = 0;
    const MAX_ATTEMPTS = 5;

    // ==========================================
    // ЛОГИКА СТРАНИЦЫ АВТОРИЗАЦИИ (index.html)
    // ==========================================
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        const roleRadios = document.querySelectorAll('input[name="roleRadio"]');
        const roleDesc = document.getElementById('roleDescription');
        const emailInput = document.getElementById('inputEmail');
        const passInput = document.getElementById('inputPassword');
        const loginBtn = document.getElementById('loginBtn');
        const loginMessage = document.getElementById('loginMessage');
        const guestBtn = document.getElementById('guestBtn');

        // Обработка кнопки ГОСТЬ внизу формы
        if (guestBtn) {
            guestBtn.addEventListener('click', function() {
                window.location.href = 'guest_view.html';
            });
        }

        // Обработка смены роли (радио-кнопки)
        roleRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const role = this.value;
                if (role === 'admin') {
                    roleDesc.textContent = "Права администратора: полный доступ (CRUD), управление пользователями.";
                    roleDesc.className = "alert alert-danger mt-3 small";
                } else {
                    roleDesc.textContent = "Права пользователя: просмотр и запись на мероприятия.";
                    roleDesc.className = "alert alert-info mt-3 small";
                }
            });
        });

        // Обработка отправки формы
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Проверка блокировки
            if (loginAttempts >= MAX_ATTEMPTS) {
                showMessage("🚫 Слишком много неудачных попыток. Попробуйте позже.", true);
                return;
            }

            const selectedRole = document.querySelector('input[name="roleRadio"]:checked').value;
            const email = emailInput.value.trim();
            const password = passInput.value.trim();

            // ВАЛИДАЦИЯ ФОРМАТА
            if (!email.includes('@') || password.length < 6) {
                showMessage("⚠️ Некорректный формат данных. Проверьте Email и пароль.", true);
                loginAttempts++;
                return;
            }

            // ПРОВЕРКА ПАРОЛЯ (Имитация БД)
            const userFound = usersDB.find(u => u.email === email && u.pass === password && u.role === selectedRole);

            if (userFound) {
                // Успешный вход
                loginAttempts = 0; // Сброс счетчика
                if (selectedRole === 'admin') {
                    window.location.href = 'admin_panel.html';
                } else {
                    window.location.href = 'user_dashboard.html';
                }
            } else {
                // Ошибка входа
                loginAttempts++;
                showMessage(`❌Ошибка входа! Неверный логин или пароль. Попытка ${loginAttempts} из ${MAX_ATTEMPTS}.`, true);
                
                if (loginAttempts >= MAX_ATTEMPTS) {
                    emailInput.disabled = true;
                    passInput.disabled = true;
                    loginBtn.disabled = true;
                    showMessage("🔒 Аккаунт временно заблокирован за подозрительную активность.", true);
                }
            }
        });

        function showMessage(text, isError) {
            if(loginMessage) {
                loginMessage.textContent = text;
                loginMessage.className = isError ? "alert alert-danger" : "alert alert-success";
                loginMessage.classList.remove('d-none');
            }
        }
    }

    // ==========================================
    // ЛОГИКА СТРАНИЦЫ АДМИНА (admin_panel.html)
    // ==========================================
    const adminCoursesTable = document.getElementById('adminCoursesTable');
    const adminUsersTable = document.getElementById('adminUsersTable');

    if (adminCoursesTable) {
        eventsData.forEach(event => {
            const row = `
                <tr>
                    <td>${event.id}</td>
                    <td><strong>${event.title}</strong></td>
                    <td><span class="badge bg-info">${event.format}</span></td>
                    <td>${event.direction}</td>
                    <td>${event.price} ₽</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-warning"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-outline-danger" onclick="alert('Курс удален (демо)')"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `;
            adminCoursesTable.innerHTML += row;
        });

        // Обработка формы добавления курса
        const addCourseForm = document.getElementById('addCourseForm');
        if(addCourseForm) {
            addCourseForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('✅ Новый курс успешно добавлен в базу данных!');
                // Здесь можно добавить логику добавления строки в таблицу
                const modalEl = document.getElementById('addCourseModal');
                const modal = bootstrap.Modal.getInstance(modalEl);
                modal.hide();
                addCourseForm.reset();
            });
        }
    }

    if (adminUsersTable) {
        usersDB.forEach(user => {
            const statusBadge = user.role === 'admin' ? '<span class="badge bg-success">Активен</span>' : '<span class="badge bg-secondary">Активен</span>';
            const row = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.login}</td>
                    <td>${user.email}</td>
                    <td>${user.role.toUpperCase()}</td>
                    <td>${statusBadge}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-primary"><i class="bi bi-person-gear"></i></button>
                        <button class="btn btn-sm btn-outline-danger" onclick="alert('Пользователь удален (демо)')"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `;
            adminUsersTable.innerHTML += row;
        });
    }

    // ==========================================
    // ЛОГИКА СТРАНИЦЫ ПОЛЬЗОВАТЕЛЯ (user_dashboard.html)
    // ==========================================
    const catalogTableBody = document.getElementById('catalogTableBody');
    const myBookingsTableBody = document.querySelector('#myBookingsTable tbody');
    const noBookingsMsg = document.getElementById('noBookingsMsg');

    if (catalogTableBody) {
        eventsData.forEach(event => {
            const dateObj = new Date(event.startTime);
            const dateStr = dateObj.toLocaleDateString('ru-RU') + ' ' + dateObj.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'});

            const row = `
                <tr>
                    <td>
                        <strong>${event.title}</strong><br>
                        <small class="text-muted">${event.format} | ${event.level}</small>
                    </td>
                    <td>${dateStr}</td>
                    <td><strong>${event.price} ₽</strong></td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-success" onclick="bookEvent(${event.id})">
                            <i class="bi bi-calendar-check"></i> Записаться
                        </button>
                    </td>
                </tr>
            `;
            catalogTableBody.innerHTML += row;
        });
    }

    // Функция записи на событие (глобальная)
    window.bookEvent = function(id) {
        const event = eventsData.find(e => e.id === id);
        if (event) {
            myBookings.push(event);
            renderMyBookings();
            // Переключаем вкладку на "Мои записи"
            const triggerEl = document.querySelector('#mybookings-tab');
            const tab = new bootstrap.Tab(triggerEl);
            tab.show();
            alert(`✅ Вы успешно записались на курс "${event.title}"!`);
        }
    };

    // Функция отрисовки моих записей
    function renderMyBookings() {
        if (!myBookingsTableBody) return;

        myBookingsTableBody.innerHTML = '';
        
        if (myBookings.length === 0) {
            noBookingsMsg.style.display = 'block';
            return;
        }
        noBookingsMsg.style.display = 'none';

        myBookings.forEach((booking, index) => {
            const dateObj = new Date(booking.startTime);
            const dateStr = dateObj.toLocaleDateString('ru-RU') + ' ' + dateObj.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'});
            
            const row = `
                <tr>
                    <td><strong>${booking.title}</strong></td>
                    <td>${dateStr}</td>
                    <td><span class="badge bg-success">Забронировано</span></td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-danger" onclick="cancelBooking(${index})">
                            Отменить
                        </button>
                    </td>
                </tr>
            `;
            myBookingsTableBody.innerHTML += row;
        });
    }

    // Функция отмены бронирования с проверкой времени
    window.cancelBooking = function(index) {
        const booking = myBookings[index];
        const now = new Date();
        const startTime = new Date(booking.startTime);
        const diffMs = startTime - now;
        const diffHours = diffMs / (1000 * 60 * 60);

        if (diffHours < 3) {
            // Меньше 3 часов
            alert(`⛔ Невозможно отменить запись на мероприятие "${booking.title}", так как оно состоится через ${Math.floor(diffHours)} ч. ${Math.round((diffHours % 1) * 60)} мин.\n\nПриносим свои извинения.`);
        } else {
            // Больше 3 часов - открываем модальное окно возврата
            const refundModal = new bootstrap.Modal(document.getElementById('refundModal'));
            document.getElementById('refundCourseName').textContent = booking.title;
            document.getElementById('refundAmount').textContent = booking.price;
            
            // Сохраняем индекс для удаления после подтверждения
            window.currentCancelIndex = index;
            
            refundModal.show();
        }
    };

    // Обработка формы возврата средств
    const refundForm = document.getElementById('refundForm');
    if (refundForm) {
        refundForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Имитация обработки платежа
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = "Обработка...";
            btn.disabled = true;

            setTimeout(() => {
                alert(`💰 Возврат средств (${document.getElementById('refundAmount').textContent} ₽) успешно оформлен!\nСредства поступят на карту в течение 3 дней.`);
                
                // Удаляем запись из списка
                if (window.currentCancelIndex !== undefined) {
                    myBookings.splice(window.currentCancelIndex, 1);
                    renderMyBookings();
                }

                // Закрываем модалку
                const modalEl = document.getElementById('refundModal');
                const modal = bootstrap.Modal.getInstance(modalEl);
                modal.hide();
                
                // Сброс формы
                refundForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});
