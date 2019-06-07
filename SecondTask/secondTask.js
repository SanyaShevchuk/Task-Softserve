import getEmailError from './emailValidation.js';
import getPasswordError from './passwordValidation.js';

const email = document.querySelector('#task2 input[name="e-mail"]');
const password = document.querySelector('#task2 input[name="password"]');
const confirmPassword = document.querySelector('#task2 input[name="confirm-password"]');
const logInBtn = document.querySelector('#submitBtn');

document.getElementById('task2').addEventListener('submit', function(e){
    e.preventDefault();
});

function getConfirmPasswordError(password, confirmPassword){
    return password === confirmPassword ? "" : "Confirm password and password are different!";
}

logInBtn.addEventListener('click', function(){
    const message = getEmailError(email.value) || getPasswordError(password.value) ||
        getConfirmPasswordError(password.value, confirmPassword.value);
    if(message){
        alert(message);
    } else {
        alert("Congratulations! You successfully loged in)");
        email.value ="";
        password.value ="";
        confirmPassword.value ="";
    }
})

function showError(message, field){
    field.innerHTML = message;
}

function checkEmail(){
    const message = getEmailError(email.value);
    const emailErrorsField = document.querySelector('#emailErrors');
    showError(message, emailErrorsField);
}

function checkPassword(){
    const message = getPasswordError(password.value);
    const passwordErrorsField = document.querySelector('#passwordErrors');
    showError(message, passwordErrorsField);
}

email.onblur = function(){
    checkEmail();
    this.oninput = checkEmail;
}

password.onblur = function(){
    checkPassword();
    this.oninput = checkPassword;
}

confirmPassword.oninput = function(){
    logInBtn.disabled = false;
}
