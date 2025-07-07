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
prevBtn.addEventListener('click', function () {
  current = (current - 1 + items.length) % items.length;
  showItem(current);
});

nextBtn.addEventListener('click', function () {
  current = (current + 1) % items.length;
  showItem(current);
});

// СЛАЙДЕР 2

(function () {
  const reviewSlides = document.querySelectorAll('.review-slider .review-slide');
  const reviewPrevBtn = document.querySelector('.review-prev');
  const reviewNextBtn = document.querySelector('.review-next');
  let reviewCurrent = 0;

  function showReviewSlide(index) {
    reviewSlides.forEach((slide, i) => {
      slide.classList.toggle('review-active', i === index);
    });
  }

  reviewPrevBtn.addEventListener('click', function () {
    reviewCurrent = (reviewCurrent - 1 + reviewSlides.length) % reviewSlides.length;
    showReviewSlide(reviewCurrent);
  });

  reviewNextBtn.addEventListener('click', function () {
    reviewCurrent = (reviewCurrent + 1) % reviewSlides.length;
    showReviewSlide(reviewCurrent);
  });

  // Инициализация
  showReviewSlide(reviewCurrent);
})();



// JS для аккордеона
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function () {
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

//КВИЗ

// Получаем все элементы, которые открывают квиз
document.querySelectorAll('.open-quiz').forEach(btn => {
  btn.addEventListener('click', function () {
    // Добавляем класс active к .quiz-wrap
    document.querySelector('.quiz-wrap').classList.add('active');
    // Запрещаем прокрутку
    document.body.classList.add('no-scroll');
  });
});

// Получаем все элементы, которые закрывают квиз
document.querySelector('.close-quiz').addEventListener('click', function () {
  document.querySelector('.quiz-wrap').classList.remove('active');
  document.body.classList.remove('no-scroll');
});

// Вопросы квиза
const quizData = [
  {
    question: "Какого цвета вы хотите кухню?",
    answers: [
      "Светлые", "Серые", "Темные", "Пастельные", "С имитацией дерева", "Еще не определились"
    ]
  },
  {
    question: "Какое покрытие предпочитаете?",
    answers: [
      "Матовое", "Глянцевое"
    ]
  },
  {
    question: "Какой конфигурации будет ваша кухня?",
    answers: [
      "Прямая", "Угловая", "П-образная", "Еще не определились"
    ]
  },
  {
    question: "Планируете ли устанавливать посудомоечную машину?",
    answers: [
      "Да, шириной 600", "Да, шириной 450", "Нет"
    ]
  },
  {
    question: "Пожалуйста, введите ваши данные",
    answers: []
  }
];

let currentQuestion = 0;
let userAnswers = [];

function renderQuiz() {
  const quiz = document.getElementById('quiz');
  quiz.innerHTML = '';

  // Прогресс
  const progress = document.createElement('div');
  progress.className = 'progress';
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  progressBar.style.width = ((currentQuestion) / quizData.length * 100) + '%';
  progress.appendChild(progressBar);
  quiz.appendChild(progress);

  // Вопрос
  const q = document.createElement('div');
  q.className = 'question';
  q.textContent = quizData[currentQuestion].question;
  quiz.appendChild(q);

  // Если последний вопрос — показываем инпуты
  if (currentQuestion === quizData.length - 1) {
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Ваше имя';
    nameInput.className = 'input';
    nameInput.autocomplete = 'name';
    nameInput.name = 'name';
    if (userAnswers[currentQuestion]) {
      const savedName = userAnswers[currentQuestion].match(/Имя: (.*)\nТелефон:/);
      if (savedName) nameInput.value = savedName[1];
    }

    const phoneInput = document.createElement('input');
    phoneInput.type = 'tel';
    phoneInput.placeholder = 'Телефон';
    phoneInput.name = 'phone';
    phoneInput.className = 'input';
    phoneInput.autocomplete = 'tel';
    if (userAnswers[currentQuestion]) {
      const savedPhone = userAnswers[currentQuestion].match(/Телефон: (.*)/);
      if (savedPhone) phoneInput.value = savedPhone[1];
    }

  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  function dynamicPhoneMask(event) {
    const matrix = '+375(__)___-__-__';
    let i = 0;
    const def = matrix.replace(/\D/g, '');
    let val = phoneInput.value.replace(/\D/g, '');
    if (def.length >= val.length) val = def;
    phoneInput.value = matrix.replace(/./g, function(a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });
    if (event.type === 'blur') {
      if (phoneInput.value.length < 7) phoneInput.value = '';
    } else {
      setCursorPosition(phoneInput.value.length, phoneInput);
    }
  }

  phoneInput.addEventListener('input', dynamicPhoneMask, false);
  phoneInput.addEventListener('focus', dynamicPhoneMask, false);
  phoneInput.addEventListener('blur', dynamicPhoneMask, false);
    

    quiz.appendChild(nameInput);
    quiz.appendChild(phoneInput);

    // Контейнер для кнопок
    const btnsDiv = document.createElement('div');
    btnsDiv.style.display = 'flex';
    btnsDiv.style.justifyContent = 'space-between';
    btnsDiv.style.marginTop = '24px';

    // Кнопка "Назад"
    if (currentQuestion > 0) {
      const backBtn = document.createElement('button');
      backBtn.className = 'btn';
      backBtn.textContent = 'Назад';
      backBtn.onclick = () => {
        currentQuestion--;
        renderQuiz();
      };
      btnsDiv.appendChild(backBtn);
    } else {
      btnsDiv.appendChild(document.createElement('div'));
    }

    // Кнопка "Отправить"
    const sendBtn = document.createElement('button');
    sendBtn.className = 'btn';
    sendBtn.textContent = 'Отправить';
    sendBtn.onclick = () => {
      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      if (!name || !phone) {
        alert('Пожалуйста, заполните оба поля');
        return;
      }
      userAnswers[currentQuestion] = `Имя: ${name}\nТелефон: ${phone}`;
      showResult();
    };
    btnsDiv.appendChild(sendBtn);

    quiz.appendChild(btnsDiv);
  } else {
    // Ответы
    const answersDiv = document.createElement('div');
    answersDiv.className = 'answers';
    quizData[currentQuestion].answers.forEach((ans, idx) => {
      const btn = document.createElement('button');
      btn.className = 'answer';
      btn.textContent = ans;
      btn.onclick = () => {
        document.querySelectorAll('.answer').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        userAnswers[currentQuestion] = ans;
        nextBtn.disabled = false;
      };
      answersDiv.appendChild(btn);
    });
    quiz.appendChild(answersDiv);

    // Контейнер для кнопок
    const btnsDiv = document.createElement('div');
    btnsDiv.style.display = 'flex';
    btnsDiv.style.justifyContent = 'space-between';
    btnsDiv.style.marginTop = '24px';

    // Кнопка "Назад"
    if (currentQuestion > 0) {
      const backBtn = document.createElement('button');
      backBtn.className = 'btn';
      backBtn.textContent = 'Назад';
      backBtn.onclick = () => {
        currentQuestion--;
        renderQuiz();
      };
      btnsDiv.appendChild(backBtn);
    } else {
      btnsDiv.appendChild(document.createElement('div'));
    }

    // Кнопка "Далее"
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn';
    nextBtn.textContent = 'Далее';
    nextBtn.disabled = !userAnswers[currentQuestion];
    nextBtn.onclick = () => {
      if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        renderQuiz();
      }
    };
    btnsDiv.appendChild(nextBtn);

    quiz.appendChild(btnsDiv);

    // Если уже выбран ответ — выделить его
    if (userAnswers[currentQuestion]) {
      const idx = quizData[currentQuestion].answers.indexOf(userAnswers[currentQuestion]);
      if (idx !== -1) {
        answersDiv.children[idx].classList.add('selected');
        nextBtn.disabled = false;
      }
    }
  }
}

function showResult() {
  const quiz = document.getElementById('quiz');
  quiz.innerHTML = '<div class="result">Спасибо! Ваши ответы отправляются...</div>';

  const answersText = quizData.map((q, i) => `${q.question}\n${userAnswers[i] || '-'}`).join('\n\n');

  function isOk(response) {
    return response.ok;
  }

  fetch(`https://api.telegram.org/botВАШ_ТОКЕН/sendMessage?chat_id=ВАШ_CHAT_ID&text=${encodeURIComponent(answersText)}`)
    .then(isOk)
    .then(ok => {
      if (!ok) throw new Error();
      return fetch('ВАШ_URL_ВЕБ_ПРИЛОЖЕНИЯ', {
        method: 'POST',
        body: JSON.stringify({ answers: answersText }),
        headers: { 'Content-Type': 'application/json' }
      });
    })
    .then(isOk)
    .then(ok => {
      if (!ok) throw new Error();
      quiz.innerHTML = '<div class="result">Ваши ответы успешно отправлены! Мы свяжемся с вами.</div>';
    })
    .catch(() => {
      quiz.innerHTML = `
        <div class="result">
          Что-то пошло не так, повторите попытку.<br><br>
          <button class="btn" id="restartQuiz">Начать сначала</button>
        </div>
      `;
      document.getElementById('restartQuiz').onclick = () => {
        currentQuestion = 0;
        userAnswers = [];
        renderQuiz();
      };
    });
}

renderQuiz();