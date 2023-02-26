const button = document.querySelector("#hamburger-btn");
const nav = document.querySelector("#navpanel");
const buttonClose = document.querySelector("#header-close");
const background = document.querySelector("#background");
const bodyEl = document.querySelector('body');

//Массив названий открывшихся панелей
const arrPanels = [];

button.addEventListener('click', () => {
  arrPanels.push('header__links-box_show');
  bodyEl.style.overflow = 'hidden';

  nav.classList.toggle('header__links-box_show');
  if(arrPanels.length === 1) {
    background.classList.toggle('background_show');
  }
});

buttonClose.addEventListener('click', () => {
  arrPanels.pop();

  nav.classList.toggle('header__links-box_show');
  if(arrPanels.length < 1) {
    bodyEl.style.overflow = 'auto';
    background.classList.toggle('background_show');
  }
});