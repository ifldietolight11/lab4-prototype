// script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Установка года в футере
    const yearSpan = document.getElementById('copyrightYear');
    if (yearSpan) yearSpan.textContent = `© ${new Date().getFullYear()} Валетова А.Ю.`;

    // ==========================================
    // БАЗА ДАННЫХ (Из Лаб 1)
    // ==========================================
    const eventsData = [
        {id: 1, title: "Введение в Python", format: "Лекция", direction: "Программирование", level: "Начальный", duration: 2, price: 0},
        {id: 2, title: "Основы HTML и CSS", format: "Мастер-класс", direction: "Веб-разработка", level: "Начальный", duration: 3, price: 1500},
        {id: 3, title: "Алгоритмы и структуры данных", format: "Лекция", direction: "Программирование", level: "Средний", duration: 2, price: 2000},
        {id: 4, title: "Практикум по SQL", format: "Практикум", direction: "Базы данных", level: "Средний", duration: 3, price: 2500},
        {id: 5, title: "Основы UX/UI дизайна", format: "Мастер-класс", direction: "Дизайн", level: "Начальный", duration: 2, price: 1800},
        {id: 6, title: "Git для командной работы", format: "Практикум", direction: "Программирование", level: "Средний", duration: 2, price: 1200},
        {id: 7, title: "Введение в JavaScript", format: "Лекция", direction: "Веб-разработка", level: "Начальный", duration: 2, price: 1500},
        {id: 8, title: "Разработка REST API", format: "Практикум", direction: "Программирование", level: "Продвинутый", duration: 3, price: 3000},
        {id: 9, title: "Основы кибербезопасности", format: "Лекция", direction: "ИБ", level: "Средний", duration: 2, price: 2200},
        {id: 10, title: "Анализ данных в Excel", format: "Тренинг", direction: "Карьера", level: "Начальный", duration: 2, price: 1000},
        {id: 11, title: "Визуализация данных", format: "Практикум", direction: "Аналитика", level: "Начальный", duration: 2, price: 1500},
        {id: 12, title: "Введение в машинное обучение", format: "Лекция", direction: "ИИ", level: "Средний", duration: 3, price: 3500},
        {id: 13, title: "Проектирование БД", format: "Практикум", direction: "Базы данных", level: "Средний", duration: 3, price: 2800},
        {id: 14, title: "Основы DevOps", format: "Лекция", direction: "DevOps", level: "Продвинутый", duration: 2, price: 3200},
        {id: 15, title: "Командная разработка ПО", format: "Тренинг", direction: "Программирование", level: "Средний", duration: 2, price: 2000}
    ];

    // Данные пользователей (из Лаб 1, Таблица 6)
    const usersDB = [
        {email: "admin@mail.ru", pass: "admin123", role: "admin"},
        {email: "user01@mail.ru", pass: "qwerty123", role: "user"},
        {email: "user02@mail.ru", pass: "abc123", role: "user"}
    ];

    // Переменная для счетчика ошибок
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

        // Обработка смены роли (для описания справа)
        roleRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const role = this.value;
                if (role === 'guest') {
                    roleDesc.textContent = "Режим гостя: только просмотр каталога.";
                    roleDesc.className = "alert alert-secondary mt-3 small";
                    // Поля можно не блокировать, так как гость войдет без пароля
                } else if (role === 'admin') {
                    roleDesc.textContent = "Права администратора: полный доступ (CRUD).";
                    roleDesc.className = "alert alert-danger mt-3 small";
                } else {
                    roleDesc.textContent = "Права пользователя: просмотр и запись.";
                    roleDesc.className = "alert alert-info mt-3 small";
                }
            });
        });

        // Обработка отправки формы
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Проверка блокировки
            if (loginAttempts >= MAX_ATTEMPTS) {
                showMessage("Слишком много неудачных попыток. Попробуйте позже.", true);
                return;
            }

            const selectedRole = document.querySelector('input[name="roleRadio"]:checked').value;
            const email = emailInput.value.trim();
            const password = passInput.value.trim();

            // ВАЛИДАЦИЯ ФОРМАТА
            if (!email.includes('@') || password.length < 6) {
                showMessage("Некорректный формат данных. Проверьте Email и пароль.", true);
                return;
            }

            // ЛОГИКА ГОСТЯ
            if (selectedRole === 'guest') {
                window.location.href = 'guest_view.html';
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
                showMessage(`Ошибка входа! Неверный логин или пароль. Попытка ${loginAttempts} из ${MAX_ATTEMPTS}.`, true);
                
                if (loginAttempts >= MAX_ATTEMPTS) {
                    emailInput.disabled = true;
                    passInput.disabled = true;
                    loginBtn.disabled = true;
                    showMessage("Аккаунт временно заблокирован за подозрительную активность.", true);
                }
            }
        });

        function showMessage(text, isError) {
            loginMessage.textContent = text;
            loginMessage.className = isError ? "alert alert-danger" : "alert alert-success";
            loginMessage.classList.remove('d-none');
        }
    }

    // ==========================================
    // ЛОГИКА СТРАНИЦЫ АДМИНА (admin_panel.html)
    // ==========================================
    const adminTableBody = document.getElementById('adminEventsTable');
    if (adminTableBody) {
        eventsData.forEach(event => {
            const row = `
                <tr>
                    <td>${event.id}</td>
                    <td><strong>${event.title}</strong></td>
                    <td><span class="badge bg-info">${event.format}</span></td>
                    <td>${event.direction}</td>
                    <td>${event.level}</td>
                    <td>${event.duration} ч.</td>
                    <td>${event.price} ₽</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-warning"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `;
            adminTableBody.innerHTML += row;
        });
    }

    // ==========================================
    // ЛОГИКА СТРАНИЦЫ ПОЛЬЗОВАТЕЛЯ (user_dashboard.html)
    // ==========================================
    const userSelect = document.getElementById('userEventSelect');
    if (userSelect) {
        eventsData.forEach(event => {
            const option = document.createElement('option');
            option.value = event.id;
            option.textContent = `${event.title} (${event.price} ₽)`;
            userSelect.appendChild(option);
        });
    }
});
