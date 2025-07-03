const words = ["Замеряем", "Рисуем", "Считаем", "Доставляем", "Собираем"];
const el = document.getElementById('typed-text');
let wordIndex = 0;
let charIndex = 0;
let direction = 1; // 1 - печать, -1 - удаление

function typeEffect() {
  const word = words[wordIndex];
  el.textContent = word.substring(0, charIndex);

  if (direction === 1) {
    if (charIndex < word.length) {
      charIndex++;
      setTimeout(typeEffect, 150);
    } else {
      direction = -1;
      setTimeout(typeEffect, 600); // пауза перед удалением
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 100);
    } else {
      direction = 1;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 300); // пауза перед новым словом
    }
  }
}

typeEffect();


// ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК

document.querySelectorAll('.tabs').forEach(tabsBlock => {
  const tabBtns = tabsBlock.querySelectorAll('.tab-btn');
  const tabContentWrap = tabsBlock.nextElementSibling; // .tab-content-wrap должен идти сразу после .tabs
  const tabContents = tabContentWrap.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Снимаем активность только в текущем блоке
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      tabContents.forEach(content => {
        if (content.getAttribute('data-tab') === tab) {
          content.classList.add('active');
        }
      });
    });
  });
});

// СЛАЙДЕР

const items = document.querySelectorAll('.slider-wrap .item');
const prevBtn = document.querySelector('.rassrochka .prev');
const nextBtn = document.querySelector('.rassrochka .next');
let current = 0;

// Функция для отображения текущего слайда
function showItem(index) {
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

// Начальное состояние
showItem(current);

// Обработчики кнопок
prevBtn.addEventListener('click', function() {
    current = (current - 1 + items.length) % items.length;
    showItem(current);
});

nextBtn.addEventListener('click', function() {
    current = (current + 1) % items.length;
    showItem(current);
});

// СЛАЙДЕР 2

(function() {
    const reviewSlides = document.querySelectorAll('.review-slider .review-slide');
    const reviewPrevBtn = document.querySelector('.review-prev');
    const reviewNextBtn = document.querySelector('.review-next');
    let reviewCurrent = 0;

    function showReviewSlide(index) {
        reviewSlides.forEach((slide, i) => {
            slide.classList.toggle('review-active', i === index);
        });
    }

    reviewPrevBtn.addEventListener('click', function() {
        reviewCurrent = (reviewCurrent - 1 + reviewSlides.length) % reviewSlides.length;
        showReviewSlide(reviewCurrent);
    });

    reviewNextBtn.addEventListener('click', function() {
        reviewCurrent = (reviewCurrent + 1) % reviewSlides.length;
        showReviewSlide(reviewCurrent);
    });

    // Инициализация
    showReviewSlide(reviewCurrent);
})();



// JS для аккордеона
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function() {
    const item = btn.closest('.faq-item');
    // Открыть только один
    document.querySelectorAll('.faq-item').forEach(i => {
      if (i !== item) i.classList.remove('open');
    });
    item.classList.toggle('open');
  });
});

// ГАЛЕРЕЯ

const images = document.querySelectorAll('.gallery');

// Создание элементов
const sliderOverlay = document.createElement('div');
sliderOverlay.className = 'gallery-slider-overlay';

const sliderImage = document.createElement('img');
sliderImage.className = 'gallery-slider-image';

const closeButton = document.createElement('button');
closeButton.className = 'gallery-slider-close';
closeButton.textContent = '×';

const prevButton = document.createElement('button');
prevButton.className = 'gallery-slider-prev';
prevButton.textContent = '←';

const nextButton = document.createElement('button');
nextButton.className = 'gallery-slider-next';
nextButton.textContent = '→';

sliderOverlay.appendChild(sliderImage);
sliderOverlay.appendChild(closeButton);
sliderOverlay.appendChild(prevButton);
sliderOverlay.appendChild(nextButton);
document.body.appendChild(sliderOverlay);

let currentIndex = 0;

function showImage(index) {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  currentIndex = index;
  sliderImage.src = images[currentIndex].src;
  sliderOverlay.classList.add('active');
}

images.forEach((img, idx) => {
  img.addEventListener('click', () => showImage(idx));
});

closeButton.addEventListener('click', () => {
  sliderOverlay.classList.remove('active');
});

prevButton.addEventListener('click', () => {
  showImage(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
  showImage(currentIndex + 1);
});
