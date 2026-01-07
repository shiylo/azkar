
// получаю в переменную классы

// const headerBurger = document.querySelector('.burger');
// const headerMenu = document.querySelector('.header__menu');
// const headBody = document.getElementsByTagName('body')[0];

// //Присваивание класса active когда нажимаю на headerBurger
//   headerBurger.addEventListener('click', function(e) {
//   headerBurger.classList.toggle('active');
//   headerMenu.classList.toggle('active');
//   headBody.classList.toggle('lock');
// });

// document.addEventListener('keyup', function(e){
//   if(e.code === 'Escape'){
//       headerBurger.classList.remove('active');
//       headerMenu.classList.remove('active');
//       headBody.classList.remove('lock');
//   }
// });


// $(document).ready(function(){
//   $('.block__title').click(function(event){
//     $(this).toggleClass('active').next().slideToggle(300);
//   });
// });


// Бургер-меню
$(document).ready(function() {
    $('.burger').click(function(event) {
        $('.burger, .header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
    
    // Закрытие меню при клике на ссылку
    $('.header__link').click(function() {
        $('.burger, .header__menu').removeClass('active');
        $('body').removeClass('lock');
    });
});

// Аккордеон для азкаров
$(document).ready(function() {
    $('.block__title').click(function(event) {
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).next('.block__text').slideUp(300);
        } else {
            $('.block__title').removeClass('active');
            $('.block__text').slideUp(300);
            $(this).addClass('active');
            $(this).next('.block__text').slideDown(300);
        }
    });
});

// Функционал счетчиков для азкаров
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех счетчиков
    initCounters();
});

function initCounters() {
    // Находим все контейнеры с счетчиками
    const counterContainers = document.querySelectorAll('.counter-container');
    
    counterContainers.forEach((container, index) => {
        // Элементы счетчика
        const plusBtn = container.querySelector('.plus');
        const minusBtn = container.querySelector('.minus');
        const resetBtn = container.querySelector('.counter-reset');
        const valueDisplay = container.querySelector('.counter-value');
        
        // Уникальный ID для каждого счетчика (можно использовать номер азкара)
        const azkarTitle = container.closest('.azkar__content').querySelector('.azkar__num').textContent;
        const counterId = `azkar_counter_${index}_${azkarTitle.replace(/\s+/g, '_')}`;
        
        // Загружаем сохраненное значение из localStorage
        let count = parseInt(localStorage.getItem(counterId)) || 0;
        valueDisplay.textContent = count;
        
        // Обработчик для кнопки "+"
        plusBtn.addEventListener('click', function() {
            count++;
            updateCounter();
            animateCounter(container, 'plus');
        });
        
        // Обработчик для кнопки "-"
        minusBtn.addEventListener('click', function() {
            if (count > 0) {
                count--;
                updateCounter();
                animateCounter(container, 'minus');
            }
        });
        
        // Обработчик для кнопки сброса
        resetBtn.addEventListener('click', function() {
            if (confirm('Сбросить счетчик?')) {
                count = 0;
                updateCounter();
                container.classList.add('new-count');
                setTimeout(() => container.classList.remove('new-count'), 500);
            }
        });
        
        // Функция обновления счетчика
        function updateCounter() {
            valueDisplay.textContent = count;
            localStorage.setItem(counterId, count);
            
            // Добавляем класс для высоких значений
            if (count >= 10) {
                container.classList.add('high-count');
            } else {
                container.classList.remove('high-count');
            }
            
            // Обновляем индикатор прогресса (если есть)
            updateProgress(container, count);
        }
        
        // Анимация изменения счетчика
        function animateCounter(element, type) {
            element.classList.remove('new-count');
            void element.offsetWidth; // Перезапуск анимации
            element.classList.add('new-count');
            
            // Небольшая вибрация для тактильного отклика (если поддерживается)
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        }
        
        // Инициализируем начальное состояние
        updateCounter();
    });
}

// Функция для обновления индикатора прогресса (опционально)
function updateProgress(container, count) {
    let progressBar = container.querySelector('.counter-progress-bar');
    if (!progressBar) return;
    
    // Максимальное значение для 100% прогресса
    const maxCount = 33; // Например, 33 раза как целевое значение
    const progress = Math.min((count / maxCount) * 100, 100);
    progressBar.style.width = `${progress}%`;
}

// Функция для массового управления счетчиками (опционально)
function resetAllCounters() {
    if (confirm('Сбросить ВСЕ счетчики? Это действие нельзя отменить.')) {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('azkar_counter_')) {
                keysToRemove.push(key);
            }
        }
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
        // Перезагружаем страницу для обновления счетчиков
        location.reload();
    }
}

// Можно добавить кнопку для сброса всех счетчиков в подвале
// document.addEventListener('DOMContentLoaded', function() {
//     const footer = document.querySelector('.footer');
//     const resetAllBtn = document.createElement('button');
//     resetAllBtn.textContent = 'Сбросить все счетчики';
//     resetAllBtn.className = 'reset-all-btn';
//     resetAllBtn.addEventListener('click', resetAllCounters);
//     footer.appendChild(resetAllBtn);
// });