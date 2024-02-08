// надписи и цвета на секторах
const prizes = [
  {
    text: "1 тенге",
    color: "hsl(197 30% 43%)",
  },
  { 
    text: "+респект",
    color: "hsl(173 58% 39%)",
  },
  { 
    text: "Лох",
    color: "hsl(43 74% 66%)",
  },
  {
    text: "+район",
    color: "hsl(27 87% 67%)",
  },
  {
    text: "-2 рубля",
    color: "hsl(12 76% 61%)",
  },
  {
    text: "ручка",
    color: "hsl(350 60% 52%)",
  },
  {
    text: "1 рубль",
    color: "hsl(91 43% 54%)",
  },
  {
    text: "Чушпан",
    color: "hsl(140 36% 74%)",
  }
];

// создаём переменные для быстрого доступа ко всем объектам на странице — блоку в целом, колесу, кнопке и язычку
const wheel = document.querySelector(".deal-wheel");
const spinner = wheel.querySelector(".spinner");
const trigger = wheel.querySelector(".btn-spin");
const ticker = wheel.querySelector(".ticker");

// на сколько секторов нарезаем круг
const prizeSlice = 360 / prizes.length;
// на какое расстояние смещаем сектора друг относительно друга
const prizeOffset = Math.floor(180 / prizes.length);
// прописываем CSS-классы, которые будем добавлять и убирать из стилей
const spinClass = "is-spinning";
const selectedClass = "selected";
// получаем все значения параметров стилей у секторов
const spinnerStyles = window.getComputedStyle(spinner);

// переменная для анимации
let tickerAnim;
// угол вращения
let rotation = 0;
// текущий сектор
let currentSlice = 0;
// переменная для текстовых подписей
let prizeNodes;

// расставляем текст по секторам
const createPrizeNodes = () => {
  // обрабатываем каждую подпись
  prizes.forEach(({ text, color, reaction }, i) => {
    // каждой из них назначаем свой угол поворота
    const rotation = ((prizeSlice * i) * -1) - prizeOffset;
    // добавляем код с размещением текста на страницу в конец блока spinner
    spinner.insertAdjacentHTML(
      "beforeend",
      // текст при этом уже оформлен нужными стилями
      `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
        <span class="text">${text}</span>
      </li>`
    );
  });
};

// рисуем разноцветные секторы
const createConicGradient = () => {
  // устанавливаем нужное значение стиля у элемента spinner
  spinner.setAttribute(
    "style",
    `background: conic-gradient(
      from -90deg,
      ${prizes
        // получаем цвет текущего сектора
        .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
        .reverse()
      }
    );`
  );
};

// создаём функцию, которая нарисует колесо в сборе
const setupWheel = () => {
  // сначала секторы
  createConicGradient();
  // потом текст
  createPrizeNodes();
  // а потом мы получим список всех призов на странице, чтобы работать с ними как с объектами
  prizeNodes = wheel.querySelectorAll(".prize");
};

// определяем количество оборотов, которое сделает наше колесо
const spinertia = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// функция запуска вращения с плавной остановкой
const runTickerAnimation = () => {
  // взяли код анимации отсюда: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
  const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
  const a = values[0];
  const b = values[1];  
  let rad = Math.atan2(b, a);
  
  if (rad < 0) rad += (2 * Math.PI);
  
  const angle = Math.round(rad * (180 / Math.PI));
  const slice = Math.floor(angle / prizeSlice);

  // анимация язычка, когда его задевает колесо при вращении
  // если появился новый сектор
  if (currentSlice !== slice) {
    // убираем анимацию язычка
    ticker.style.animation = "none";
    // и через 10 миллисекунд отменяем это, чтобы он вернулся в первоначальное положение
    setTimeout(() => ticker.style.animation = null, 10);
    // после того, как язычок прошёл сектор - делаем его текущим 
    currentSlice = slice;
  }
  // запускаем анимацию
  tickerAnim = requestAnimationFrame(runTickerAnimation);
};

// функция выбора призового сектора
const selectPrize = () => {
  const selected = Math.floor(rotation / prizeSlice);
  prizeNodes[selected].classList.add(selectedClass);
};

// отслеживаем нажатие на кнопку
trigger.addEventListener("click", () => {
  // делаем её недоступной для нажатия
  trigger.disabled = true;
  // задаём начальное вращение колеса
  rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
  // убираем прошлый приз
  prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
  // добавляем колесу класс is-spinning, с помощью которого реализуем нужную отрисовку
  wheel.classList.add(spinClass);
  // через CSS говорим секторам, как им повернуться
  spinner.style.setProperty("--rotate", rotation);
  // возвращаем язычок в горизонтальную позицию
  ticker.style.animation = "none";
  // запускаем анимацию вращение
  runTickerAnimation();
});

// отслеживаем, когда закончилась анимация вращения колеса
spinner.addEventListener("transitionend", () => {
  // останавливаем отрисовку вращения
  cancelAnimationFrame(tickerAnim);
  // получаем текущее значение поворота колеса
  rotation %= 360;
  // выбираем приз
  selectPrize();
  // убираем класс, который отвечает за вращение
  wheel.classList.remove(spinClass);
  // отправляем в CSS новое положение поворота колеса
  spinner.style.setProperty("--rotate", rotation);
  // делаем кнопку снова активной
  trigger.disabled = false;
});

// подготавливаем всё к первому запуску
setupWheel();



// Переменная для отслеживания состояния колеса (курутилось или нет)
let wheelSpun = false;

// Функция для проверки пароля и разблокировки кнопки
const checkPasswordAndUnlockButton = (password) => {
  // Здесь можно добавить проверку пароля
  // Если пароль верный, разблокируем кнопку для кручения колеса
  if (password === "potato") {
    trigger.disabled = false;
    // Обновляем переменную состояния колеса
    wheelSpun = false;
  } else {
    // Если пароль неверный, можно вывести сообщение об ошибке или выполнить другие действия
    console.log("Неверный пароль");
    // Закрываем окно с вводом пароля, чтобы снова его вызвать
    trigger.disabled = true;
  }
};

// Отслеживаем нажатие на кнопку
trigger.addEventListener("click", () => {
  // Проверяем, было ли колесо уже кручено
  if (!wheelSpun) {
    // Если нет, разрешаем крутить колесо
    wheelSpun = true;
    // После кручения колеса блокируем кнопку
    trigger.disabled = true;
    // Функция для запроса пароля
    const askPassword = () => {
      // Запрашиваем пароль
      const password = prompt("Введите пароль:");
      // Проверяем пароль
      checkPasswordAndUnlockButton(password);
      // Если колесо не было кручено и кнопка все еще заблокирована, повторно вызываем окно для ввода пароля
      if (wheelSpun && trigger.disabled) {
        askPassword();
      }
    };
    // Вызываем окно для ввода пароля
    askPassword();
  }
});