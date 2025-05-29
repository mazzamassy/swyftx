// CALLBACKS GLOBALI per reCAPTCHA - devono essere fuori!
window.onRecaptchaSuccess = function () {
  updateSubmitButtonState();
};

window.onRecaptchaExpired = function () {
  updateSubmitButtonState();
};

document.addEventListener('DOMContentLoaded', function () {
  const emailInput = document.getElementById('email');
  const submitButton = document.querySelector('.signin-button');
  const form = document.getElementById('loginForm');

  const showEmailError = (msg) => {
    let error = document.getElementById('email-error');
    if (!error) {
      error = document.createElement('div');
      error.id = 'email-error';
      error.style.color = 'red';
      error.style.fontSize = '13px';
      error.style.marginTop = '5px';
      emailInput.parentNode.appendChild(error);
    }
    error.innerText = msg;
  };

  const clearEmailError = () => {
    const error = document.getElementById('email-error');
    if (error) error.remove();
  };

  const isEmailValid = (email) => email.includes('@');

  const isRecaptchaCompleted = () => {
    return typeof grecaptcha !== 'undefined' && grecaptcha.getResponse().length > 0;
  };

  function updateSubmitButtonState() {
    const email = emailInput.value.trim();
    const emailValid = isEmailValid(email);
    const recaptchaValid = isRecaptchaCompleted();

    if (!emailValid) {
      showEmailError('La mail non è corretta');
    } else {
      clearEmailError();
    }

    const enable = emailValid && recaptchaValid;
    submitButton.disabled = !enable;
    submitButton.style.cursor = enable ? 'pointer' : 'not-allowed';
  }

  emailInput.addEventListener('input', updateSubmitButtonState);

  form.addEventListener('submit', function (e) {
    updateSubmitButtonState();
    if (submitButton.disabled) {
      e.preventDefault();
    }
  });
});
