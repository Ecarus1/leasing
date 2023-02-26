
// const allBtn = document.querySelectorAll('.slider__btn-target');  //Получаем все кнопки (NodeList)
const prevBtnSlide = document.querySelector('#prevSlide');
const nextBtnSlide = document.querySelector('#nextSlide');
const svgCirclePath = document.querySelector('#circle');  //Полчаем элемент круга
const svgCircle = new ProgressBar.Path(svgCirclePath, {
  duration: 10000,
  easing: 'easeIn',
});

/**
 * Рекурсиваня функция для воспроизведения анимации ProgressBar
 * После окончания анимации (svgCircle.animate) вызывается callback
 * на переключение слайда и заного вызываем функцию
 */
const loopAnimationCirlce = () => {
  svgCircle.set(0);

  svgCircle.animate(2, () => {
    swiper.slideNext();
    loopAnimationCirlce();
  });
}

/**
 * Функция обработки клика по кнопке слайдера (#prevSlide и #nextSlide)
 * @param {Function} callback - передаются встроенные методы библиотеки Swiper
 */
const handleButtonClick = (callback, needChangeSlide = true) => {
  svgCircle.stop();

  if(needChangeSlide) {
    callback();
  }

  loopAnimationCirlce();
}

/**
 * Получаем эекземпляр класса Swiper и настраиваем работу библиотеки
 * spaceBetween - отступы между слайдами
 * loop - бесконечная прокрутка
 * 
 * pagination - настрока пагинации
 *  el - класс элемента
 *  clickable - какой слайд сечас показан
 */
const swiper = new Swiper(".swiper", {
  spaceBetween: 80,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
    slideChange: () => handleButtonClick(() => swiper.slidePrev(), false)
  }
});

/**
 * Проверка перед стартом рекурсии.
 * Если ни одна кнопка не имеет атрибут disabled = true, то запускаем рекурсию для воспроизведения анимации
 */
if(!prevBtnSlide.disabled && !nextBtnSlide.disabled) {
  loopAnimationCirlce();
}

prevBtnSlide.addEventListener('click', () => handleButtonClick(() => swiper.slidePrev()));
nextBtnSlide.addEventListener('click', () => handleButtonClick(() => swiper.slideNext()));
