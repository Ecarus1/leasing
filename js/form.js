const btnHeader = document.querySelector("#header-btn");
const formDiv = document.querySelector("#form");
const btnFormClose = document.querySelector("#form-close")
const submitBtn = document.querySelector("#submit");
const formElement = document.querySelector("#form-data");
const phoneElement = document.querySelector("#phone");
const phoneLable = document.querySelector("#phone-lable");
const formFieldsDone = document.querySelector("#form-fields__done");
const usernameInput = document.querySelector("#username");
const usernameSpan = document.querySelector("#username-span");
const calcForm = document.querySelector("#calc-form");

const nameReg = /^[a-zA-ZА-Яа-я\-]+$/;

let leasingParam = {};

const phoneMask = new IMask(phoneElement, {
  mask: "+{7} (QWE) ASD-ZX-CV",
  blocks: {
    Q: {
      mask: IMask.MaskedRange,
      placeholderChar: '9',
      from: 0, to: 9, maxLength: 1
    },
    W: {
      mask: IMask.MaskedRange,
      placeholderChar: '2',
      from: 0, to: 9, maxLength: 1
    },
    E: {
      mask: IMask.MaskedRange,
      placeholderChar: '1',
      from: 0, to: 9, maxLength: 1
    },
    A: {
      mask: IMask.MaskedRange,
      placeholderChar: '1',
      from: 0, to: 9, maxLength: 1
    },
    S: {
      mask: IMask.MaskedRange,
      placeholderChar: '2',
      from: 0, to: 9, maxLength: 1
    },
    D: {
      mask: IMask.MaskedRange,
      placeholderChar: '3',
      from: 0, to: 9, maxLength: 1
    },
    Z: {
      mask: IMask.MaskedRange,
      placeholderChar: '4',
      from: 0, to: 9, maxLength: 1
    },
    X: {
      mask: IMask.MaskedRange,
      placeholderChar: '5',
      from: 0, to: 9, maxLength: 1
    },
    C: {
      mask: IMask.MaskedRange,
      placeholderChar: '6',
      from: 0, to: 9, maxLength: 1
    },
    V: {
      mask: IMask.MaskedRange,
      placeholderChar: '7',
      from: 0, to: 9, maxLength: 1
    },
  }
});

const validateName = (name) => {
  if(name.match(nameReg)) {
    return true;
  } else {
    return false;
  }
}

const phoneInputHandler = () => {
  if (phoneMask.masked.isComplete) {
    formFieldsDone.classList.add('form-fields__done_active');
    phoneLable.textContent = "done";
  } else {
    formFieldsDone.classList.remove('form-fields__done_active');
    phoneLable.textContent = "телефон";
  }
}

const onOpenForm = (getData = false) => {
  arrPanels.push('form_show');
  bodyEl.style.overflow = 'hidden';

  if(getData) {
    const formData = new FormData(calcForm);
    leasingParam = {
      money: formData.get('money'),
      peyment: formData.get('peyment'),
      term: formData.get('term')
    }
  }

  formDiv.classList.toggle('form_show');
  if(arrPanels.length === 1) {
    background.classList.toggle('background_show');
  }
}

const fetching = async (data) => {
  try {
    await fetch("url", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    
      body: JSON.stringify(data)
    })
    .then((response) => { 
      if(!response.ok) {
        throw new Error(`Could not fetch, status: ${response.status}`);
      }
    });
  } catch (error) {
    console.log(error)
  }
}

phoneElement.addEventListener("input", phoneInputHandler);

btnHeader.addEventListener('click', () => onOpenForm());

btnFormClose.addEventListener('click', () => {
  arrPanels.pop();
  
  formDiv.classList.toggle('form_show');
  if(arrPanels.length < 1) {
    bodyEl.style.overflow = 'auto';
    background.classList.toggle('background_show');
  }
});

window.addEventListener('click', (e) => {
  if(e.target.classList.contains('background') && arrPanels.length >= 1) {
    arrPanels.splice(0, arrPanels.length)

    bodyEl.style.overflow = 'auto';
    nav.classList.remove('header__links-box_show');
    background.classList.remove('background_show');
    formDiv.classList.remove('form_show');
  }
})

formElement.addEventListener('submit', async (e) => {
  e.preventDefault();
  usernameInput.classList.remove('form-fields__input_error');
  usernameSpan.classList.remove('form-fields__error-text_active');

  const formData = new FormData(formElement);
  let data = {};

  if(validateName(formData.get('username'))) {
    data = {
      name: formData.get('username'),
      phone: formData.get('phone')
    }

    if(Object.keys(leasingParam).length > 0 ) {
      const newData = {...data, ...leasingParam};
      await fetching(newData);
    } else {
      await fetching(data);
    }
  } else {
    usernameInput.classList.add('form-fields__input_error');
    usernameSpan.classList.add('form-fields__error-text_active');
    usernameSpan.textContent = "Текст ошибки";
  }
});

calcForm.addEventListener('submit', (e) => {
  e.preventDefault();
  onOpenForm(true);
})

