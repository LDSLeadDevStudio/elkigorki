const scrollTopBtn = document.getElementById('scrollTopBtn');

// Показываем/скрываем кнопку при прокрутке
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY || window.pageYOffset;

  if (scrollPosition > 300) {
    scrollTopBtn.classList.add('visible');
    updateButtonTheme(); // обновляем тему при скролле
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

// Меняем тему кнопки в зависимости от фона под ней
function updateButtonTheme() {
  // Получаем позицию кнопки
  const rect = scrollTopBtn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Находим элемент под центром кнопки
  const elementUnder = document.elementFromPoint(centerX, centerY);
  if (!elementUnder) return;

  // Получаем computed background-color элемента под кнопкой
  const style = window.getComputedStyle(elementUnder);
  const bgColor = style.backgroundColor;

  // Конвертируем RGB(r, g, b) в значения яркости (luminance)
  const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  let luminance = 0;

  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);

    // Формула относительной яркости (стандартная)
    luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  } else {
    // Если цвет не в формате rgb(...) — считаем условно тёмным
    luminance = 0;
  }

  // Если фон светлый (яркость > 0.6) — ставим тёмную кнопку, иначе светлую
  if (luminance > 0.6) {
    scrollTopBtn.classList.remove('theme-light');
    scrollTopBtn.classList.add('theme-dark');
  } else {
    scrollTopBtn.classList.remove('theme-dark');
    scrollTopBtn.classList.add('theme-light');
  }
}

// Инициализация при загрузке и изменении размера окна
window.addEventListener('load', updateButtonTheme);
window.addEventListener('resize', updateButtonTheme);

// Плавная прокрутка наверх
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});