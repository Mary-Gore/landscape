const validation = () => {
// Валидация
  const checkName = name => {
    const namePattern = /^[а-яё]+$/i;
    name.value = name.value.replace(/\s*/gim, '');
    if (namePattern.test(name.value)) {
      name.classList.remove('invalid');
      name.classList.add('valid');
      document.getElementById('error-name').style.display = 'none';
      document.getElementById('error-name').textContent = '';
      const lowerName = name.value.toLowerCase();
      name.value = lowerName.replace(/(^[а-яё])/, match => match.toUpperCase());
      return true;
    } else {
      name.classList.remove('valid');
      name.classList.add('invalid');
      document.getElementById('error-name').style.display = 'block';
      if (name.value !== '') {
        document.getElementById('error-name').textContent = 'Допускается только кириллица';
      } else {
        document.getElementById('error-name').textContent = 'Заполните обязательное поле';
      }
      return false;
    }
  };

  const checkPhone = phoneVal => {
    const phonePattern = /^((8|\+7)[\s-]?)?(\(?\d{3}\)?[\s-]?)(\d{3}[\s-]?)(\d{2}[\s-]?)\d{2}$/;
    phoneVal.value = phoneVal.value.replace(/\s*/gim, '');
    if (phonePattern.test(phoneVal.value)) {
      phoneVal.classList.remove('invalid');
      phoneVal.classList.add('valid');
      document.getElementById('error-phone').textContent = '';
      document.getElementById('error-phone').style.display = 'none';
      return true;
    } else {
      phoneVal.classList.remove('valid');
      phoneVal.classList.add('invalid');
      document.getElementById('error-phone').style.display = 'block';
      if (phoneVal.value !== '') {
        document.getElementById('error-phone').textContent = 'Недопустимый формат';
      } else {
        document.getElementById('error-phone').textContent = 'Заполните обязательное поле';
      }
      return false;
    }
  };

  const checkChecked = elem => {
    if (elem.checked) {
      document.getElementById('error-checked').style.display = 'none';
      document.getElementById('error-checked').textContent = '';
      return true;
    } else {
      document.getElementById('error-checked').textContent = 'Согласитесь с условиями';
      document.getElementById('error-checked').style.display = 'block';
      return false;
    }
  };

  // Отправка формы с валидацией
  const checkForm = formId => {
    const form = document.getElementById(formId),
      elementsArr = [],
      statusMessage = document.createElement('div'),
      errorMessage = 'Что-то пошло не так...',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    for (const elem of form.elements) {
      if (elem.tagName.toLowerCase() !== 'button' &&
    elem.type !== 'button') {
        elementsArr.push(elem);
      }
    }

    elementsArr.forEach(elem => {
      elem.addEventListener('blur', event => {
        if (event.target.name === 'user-name') {
          checkName(event.target);
        }
        if (event.target.name === 'phone') {
          checkPhone(event.target);
        }
      });

      elem.addEventListener('change', event => {
        if (event.target.type === 'checkbox') {
          checkChecked(event.target);
        }
      });
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      let nameValid, phoneValid, checkboxValid;
      for (const elem of elementsArr) {
        if (elem.name === 'user-name') {
          nameValid = checkName(elem);
          console.log('nameValid: ', nameValid);
        }

        if (elem.name === 'phone') {
          phoneValid = checkPhone(elem);
          console.log('phoneValid: ', phoneValid);
        }

        if (elem.type === 'checkbox') {
          checkboxValid = checkChecked(elem);
        }
      }
      if (nameValid && phoneValid && checkboxValid)  {
        form.parentNode.append(statusMessage);
        statusMessage.style.cssText = `
           color: #fff;
           font-size: 16px;
           margin: 20px auto 0 auto;
         `;

        statusMessage.textContent = loadMessage;

        const formData = new FormData(form),
          body = {};

        formData.forEach((key, val) => {
          body[key] = val;
        });

        const postData = body => fetch('server.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        postData(body)
          .then(response => {
            if (response.status !== 200) {
              throw new Error('status network is not 200');
            }
            statusMessage.textContent = successMessage;
          })
          .catch(error => {
            statusMessage.textContent = errorMessage;
            console.error(error);
          });
      } else {
        statusMessage.textContent = '';
      }
    });
  };
  checkForm('feedback-form');
};


export default validation;
