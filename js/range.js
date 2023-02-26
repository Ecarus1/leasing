const percentSpan = document.querySelector('#percent-span');
const sumContractSpan = document.querySelector('#sum-contract-span');
const monthlySpan = document.querySelector('#monthly');

const range = {
  rangePrice: document.querySelector('#range1'),
  rangePayment: document.querySelector('#range2'),
  rangeTerm: document.querySelector('#range3')
}

const input = {
  inputPrice: document.querySelector('#rangenumber1'),
  inputPayment: document.querySelector('#rangenumber2'),
  inputTerm: document.querySelector('#rangenumber3')
}

const defaultPercent = 13;
percentSpan.textContent = `${defaultPercent}%`;

const priceInput = {
  min: 1000000,
  max: 6000000
}

const paymentInput = {
  min: 330000,
  max: 1980000
};


/**
 * Форматирование разрядов числа
 * @param value
 * @param options
 * @returns {string}
 */
const numberFormat = (value, options = {}) => {
  return new Intl.NumberFormat('ru-RU', options).format(value);
}

const findRange = (id) => {
  return Object.keys(range).find(item => range[item].id.at(-1) === id)
}

const correctNumberPrice = () => {
  const price = Number(input.inputPrice.value.split(/\s+/).join(''));
  const priceMin = Number(input.inputPrice.min);
  const priceMax = Number(input.inputPrice.max);
  console.log(price, priceInput.min);

  if(price < priceInput.min) {
    input.inputPrice.value = priceInput.min;
  } else if(price > priceInput.max) {
    input.inputPrice.value = priceInput.max;
  }
  layoutChangePrice();
  changeLineRange(input.inputPrice);
}

const correctNumberPayment = () => {
  const payment = Number(input.inputPayment.value.split(/\s+/).join(''));
  const paymentMin = Number(input.inputPayment.min);
  const paymentMax = Number(input.inputPayment.max);

  if(payment < paymentInput.min) {
    input.inputPayment.value = paymentInput.min;
  } else if(payment > paymentInput.max) {
    input.inputPayment.value = paymentInput.max;
  }

  layoutChangePayment()
  changeLineRange(input.inputPayment);
}

const correctNumberTerm = () => {
  const term = Math.round(Number(input.inputTerm.value));
  const termMin = Number(input.inputTerm.min);
  const termMax = Number(input.inputTerm.max);

  input.inputTerm.value = term;

  if(term < termMin) {
    input.inputTerm.value = termMin;
  } else if(term > termMax) {
    input.inputTerm.value = termMax;
  }
  
  range.rangeTerm.value = term;

  layoutChangeTerm()
  changeLineRange(range.rangeTerm);
}

const changeLineRange = (elem) => {

  const min = elem.min;
  const max = elem.max;
  const val = elem.value;

  console.log(min, 'min', max, 'max', val, 'val')

  elem.style.backgroundSize = `${(val - min) * 100 / (max - min)}% 100%`;
}

const layoutChangePrice = () => {
  const price = Math.round(Number(input.inputPrice.value.split(/\s+/).join('')));
  const payment = Math.round(Number(input.inputPayment.value.split(/\s+/).join('')));
  const term = Math.round(Number(input.inputTerm.value));
  const paymentRangeMin = Number(range.rangePayment.min);
  const paymentRangeMax = Number(range.rangePayment.max);
  const paymentRangeValue = Number(range.rangePayment.value);

  console.log(price * paymentRangeMin / 100, "Изм цены")
  paymentInput.min = price * paymentRangeMin / 100;
  paymentInput.max = price * paymentRangeMax / 100;
  input.inputPayment.value = numberFormat(Math.round(price * paymentRangeValue / 100));

  sumContractSpan.textContent = `${numberFormat(Math.round(payment + term * ((price - payment) / term)))} ₽`;
  monthlySpan.textContent = `${numberFormat(Math.round(price - payment * ((defaultPercent / 10) / (1 + (defaultPercent / 10)) - term - 1)))} ₽`;
}


const layoutChangePayment = () => {
  const price = Math.round(Number(input.inputPrice.value.split(/\s+/).join('')));
  const payment = Math.round(Number(input.inputPayment.value.split(/\s+/).join('')));
  const term = Math.round(Number(input.inputTerm.value));

  sumContractSpan.textContent = `${numberFormat(Math.round(payment + term * (price / term)))} ₽`;
  monthlySpan.textContent = `${numberFormat(Math.round(price - payment * (defaultPercent / (1 + defaultPercent) - term - 1)))} ₽`;
}


const layoutChangeTerm = () => {
  const price = Math.round(Number(input.inputPrice.value.split(/\s+/).join('')));
  const payment = Math.round(Number(input.inputPayment.value.split(/\s+/).join('')));
  const term = Math.round(Number(input.inputTerm.value));

  sumContractSpan.textContent = `${numberFormat(Math.round(payment + term * (price / term)))} ₽`;
  monthlySpan.textContent = `${numberFormat(Math.round(price - payment * (defaultPercent / (1 + defaultPercent) - term - 1)))} ₽`;
}



const handleRangeChangePrice = (elem) => {
  input.inputPrice.value = numberFormat(Number(input.inputPrice.value.split(/\s+/).join('')));

  layoutChangePrice();
  changeLineRange(elem);
}

const handleRangeChangePayment = (elem) => {
  input.inputPayment.value = numberFormat(Math.round(Number(input.inputPrice.value.split(/\s+/).join('')) * Number(range.rangePayment.value) / 100));

  console.log(input.inputPayment.value)

  layoutChangePayment();
  changeLineRange(elem);
}

const handleRangeChangeTerm = (elem) => {

  layoutChangeTerm();
  changeLineRange(elem);
}



const handleInputChangePrice = (elem) => {
  const element = range[findRange(elem.id.at(-1))];
  console.log(elem.value);
  // console.log(input.inputPrice.value)

  input.inputPrice.value = numberFormat(Number(input.inputPrice.value.replace(/[^\d]/g,'').split(/\s+/).join('')));
  range.rangePrice.value = Number(input.inputPrice.value.split(/\s+/).join(''));

  layoutChangePrice();
  changeLineRange(element);
}

const handleInputChangePayment = (elem) => {
  const element = range[findRange(elem.id.at(-1))];

  input.inputPayment.value = numberFormat(Number(input.inputPayment.value.replace(/[^\d]/g,'').split(/\s+/).join('')));
  range.rangePayment.value = Math.round(Number(input.inputPayment.value.split(/\s+/).join(''))) / Math.round(Number(input.inputPrice.value.split(/\s+/).join(''))) * 100;
  console.log(Number(input.inputPayment.value.split(/\s+/).join('')) / 100)
  
  layoutChangePayment();
  changeLineRange(element, paymentInput);
}

const handleInputChangeTerm = (elem) => {
  const element = range[findRange(elem.id.at(-1))];

  input.inputTerm.value = input.inputTerm.value.replace(/[^\d]/g,'');

  layoutChangeTerm();
  changeLineRange(element);
}



const addEvent = (el, typeEvent, callback) => {
  el.addEventListener(typeEvent, (e) => callback(e.target))
}

const addEventsObj = (obj, typeEvent, callback) => {
  for (const key in obj) {
    addEvent(obj[key], typeEvent, callback)
  }
}

addEvent(range.rangePrice, 'input', handleRangeChangePrice);
addEvent(range.rangePayment, 'input', handleRangeChangePayment);
addEvent(range.rangeTerm, 'input', handleRangeChangeTerm);

addEvent(input.inputPrice, 'input', handleInputChangePrice);
addEvent(input.inputPayment, 'input', handleInputChangePayment);
addEvent(input.inputTerm, 'input', handleInputChangeTerm);

addEvent (input.inputPrice, 'blur', correctNumberPrice);
addEvent (input.inputPayment, 'blur', correctNumberPayment);
addEvent (input.inputTerm, 'blur', correctNumberTerm);

for (const key in range) {
  changeLineRange(range[key])
}

layoutChangePrice();
layoutChangePayment();
layoutChangeTerm();
