document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Установка года в футере
    const yearSpan = document.getElementById('copyrightYear');
    if (yearSpan) yearSpan.textContent = `© ${new Date().getFullYear()} Валетова А.Ю.`;

    // ==========================================
    // ВАШИ ДАННЫЕ ИЗ ЛАБ 1 (Таблица 1)
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

        roleRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const role = this.value;
                if (role === 'guest') {
                    roleDesc.textContent = "Режим гостя: только просмотр.";
                    roleDesc.className = "alert alert-secondary mt-3 small";
                    emailInput.disabled = true; passInput.disabled = true;
                    loginBtn.textContent = "Войти как Гость";
                } else if (role === 'admin') {
                    roleDesc.textContent = "Права администратора: полный доступ (CRUD).";
                    roleDesc.className = "alert alert-danger mt-3 small";
                    emailInput.disabled = false; passInput.disabled = false;
                    loginBtn.textContent = "Войти как Админ";
                } else {
                    roleDesc.textContent = "Права пользователя: просмотр и запись.";
                    roleDesc.className = "alert alert-info mt-3 small";
                    emailInput.disabled = false; passInput.disabled = false;
                    loginBtn.textContent = "Войти";
                }
            });
        });

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const role = document.querySelector('input[name="roleRadio"]:checked').value;
            if (role === 'admin') window.location.href = 'admin.html';
            else window.location.href = 'user_form.html';
        });
    }

    // ==========================================
    // ЛОГИКА СТРАНИЦЫ АДМИНА (admin.html)
    // ==========================================
    const eventsTableBody = document.getElementById('eventsTableBody');
    if (eventsTableBody) {
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
            eventsTableBody.innerHTML += row;
        });
    }

    // ==========================================
    // ЛОГИКА СТРАНИЦЫ ФОРМЫ (user_form.html)
    // ==========================================
    const regForm = document.getElementById('registrationForm');
    const eventSelect = document.getElementById('eventSelect');
    
    if (regForm && eventSelect) {
        // Заполняем выпадающий список данными
        eventsData.forEach(event => {
            const option = document.createElement('option');
            option.value = event.id;
            option.textContent = `${event.title} (${event.price} ₽)`;
            eventSelect.appendChild(option);
        });

        const fioInput = document.getElementById('studentFio');
        const errorFio = document.getElementById('errorFio');

        regForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            if (fioInput.value.trim().length < 3) {
                fioInput.classList.add('is-invalid');
                errorFio.textContent = "Введите ФИО полностью!";
                isValid = false;
            } else {
                fioInput.classList.remove('is-invalid');
                errorFio.textContent = "";
            }
            if (eventSelect.value === "") {
                eventSelect.classList.add('is-invalid');
                isValid = false;
            } else {
                eventSelect.classList.remove('is-invalid');
            }

            if (isValid) {
                alert(`✅ Заявка принята!\nСтудент: ${fioInput.value}\nМероприятие: ${eventSelect.options[eventSelect.selectedIndex].text}`);
                regForm.reset();
            }
        });
        
        fioInput.addEventListener('input', function() {
            if (this.value.trim().length >= 3) {
                this.classList.remove('is-invalid');
                errorFio.textContent = "";
            }
        });
    }
});