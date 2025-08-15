
const lenis = new Lenis({
    duration: 1.2, // Smoothness speed
    easing: t => 1 - Math.pow(1 - t, 4), // Ease-out feel
    smoothWheel: true,
    smoothTouch: false // Keep touch scrolling natural on mobile
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

// ===== Плавное появление блоков при скролле =====
// ===== Отправка формы в WhatsApp =====


// ===== Плавное появление блоков при скролле =====
const fadeElems = document.querySelectorAll(".services, .portfolio, .about, .contacts, .reviews, .calculator");

function fadeInOnScroll() {
    fadeElems.forEach(elem => {
        let position = elem.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;
        if (position < windowHeight - 100) {
            elem.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", fadeInOnScroll);
fadeInOnScroll(); // чтобы при загрузке уже видно было
// ===== Бургер-меню =====
// const hamMenu = document.querySelector('.ham-menu')
// const offScreenMenu = document.querySelector('.off-screen-menu')
// hamMenu.addEventListener('click', () => {hamMenu.classList.toggle('active'); offScreenMenu.classList.toggle('active');})
// ===== Бургер-меню =====
const burger = document.getElementById("burger");
const nav = document.querySelector("nav");
burger.addEventListener("click", () => {
    
    burger.classList.toggle("active");
    burger.classList.toggle("opening-color", burger.classList.contains("active"));
    nav.classList.remove("closing");
    nav.classList.toggle("opening");
    document.body.classList.toggle('no-scroll');
    

});

// Закрывать меню при клике на ссылку
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        burger.classList.remove("active");
        nav.classList.remove("opening");
        nav.classList.toggle("closing");
        document.body.classList.remove('no-scroll');
    });
});

// Swiper init
const swiper = new Swiper('.reviewsSwiper', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.reviewsSwiper .swiper-pagination',
        clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});

// Калькулятор
// Калькулятор
document.getElementById('priceCalc').addEventListener('input', function () {
    const serviceText = document.querySelector('.custom-select-calc .select-trigger').textContent.trim();
    const width = parseFloat(document.getElementById('width').value) || 0;
    const height = parseFloat(document.getElementById('height').value) || 0;

    // цены за м²
    const prices = {
        'Баннер': 2000,
        'Лайтбокс': 5000,
        'Стенд': 3000
    };

    const area = width * height;
    const total = area * (prices[serviceText] || 0);
    document.getElementById('totalPrice').textContent = total.toLocaleString();
});

// Кастомный селект для калькулятора
const calcTrigger = document.querySelector('.custom-select-calc .select-trigger');
const calcOptions = document.querySelector('.custom-select-calc .select-options');

calcTrigger.addEventListener('click', () => {
    calcOptions.classList.toggle('open');
});

calcOptions.querySelectorAll('div').forEach(opt => {
    opt.addEventListener('click', () => {
        calcTrigger.textContent = opt.textContent;
        calcOptions.classList.remove('open');

        // Пересчёт после выбора
        document.getElementById('priceCalc').dispatchEvent(new Event('input'));
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-calc')) {
        calcOptions.classList.remove('open');
    }
});


// Логика для липкого хэдера
// Находим хедер и hero
const header = document.getElementById('header');
const hero = document.getElementById('hero');

const stickyOffset = 570; // на сколько раньше включать липкость
const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;

// Создаём наблюдатель
const observer = new IntersectionObserver(
    ([entry]) => {
        if (!entry.isIntersecting) {
            header.classList.add('is-sticky');
        } else {
            header.classList.remove('is-sticky');
        }
    },
    {
        root: null,
        threshold: 0,
        // Включаем липкость раньше на stickyOffset
        rootMargin: `-${headerHeight + stickyOffset}px 0px 0px 0px`
    }
);

// Запускаем наблюдение за hero
observer.observe(hero);



const portfolioSwiper = new Swiper(".portfolioSwiper", {
  loop: true,
  spaceBetween: 20,
  centeredSlides: true,
  slidesPerView: 1,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".portfolioSwiper .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".portfolioSwiper .swiper-button-next",
    prevEl: ".portfolioSwiper .swiper-button-prev",
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});
// ===== Добавим анимацию через CSS класс =====

AOS.init({
            once: true, // Анимация только один раз
            offset: 100 // Смещение срабатывания
        });

// Поля формы заказа
const nameInput = document.querySelector('#orderForm input[type="text"]');
const phoneInput = document.getElementById('phone');
let selectedServiceOrder = "";

// Автозаглавная буква
nameInput.addEventListener('input', function () {
    this.value = this.value
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
});

// Формат телефона
phoneInput.addEventListener('input', function () {
    let digits = this.value.replace(/\D/g, '');
    if (!digits) {
        this.value = '';
        return;
    }
    if (digits.startsWith('8')) digits = '7' + digits.slice(1);
    digits = digits.substring(0, 11);

    let formatted = '+7';
    if (digits.length > 1) formatted += ' ' + digits.substring(1, 4);
    if (digits.length > 4) formatted += ' ' + digits.substring(4, 7);
    if (digits.length > 7) formatted += ' ' + digits.substring(7, 9);
    if (digits.length > 9) formatted += ' ' + digits.substring(9, 11);

    this.value = formatted.trim();
});

// Кастомный селект для формы заказа
document.querySelectorAll('.custom-select-contact').forEach(select => {
    const selected = select.querySelector('.select-selected');
    const items = select.querySelector('.select-items');

    selected.addEventListener('click', () => {
        items.classList.toggle('show');
    });

    items.querySelectorAll('div').forEach(option => {
        option.addEventListener('click', () => {
            selected.textContent = option.textContent;
            selectedServiceOrder = option.textContent;
            items.classList.remove('show');
        });
    });

    document.addEventListener('click', e => {
        if (!select.contains(e.target)) items.classList.remove('show');
    });
});

// Отправка в WhatsApp
document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = nameInput.value.trim();
    let phone = phoneInput.value.trim();
    let order = this.querySelector("textarea").value.trim();

    let message = `Здравствуйте! Меня зовут ${name}. Мой номер: ${phone}. 
Хочу заказать: ${order}. 
Услуга: ${selectedServiceOrder || 'Не выбрано'}`;

    let whatsappUrl = `https://wa.me/77761161988?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
});







