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

function clearErrorField(...fields){
    for(let field of fields){
        field.value = "";
    }
}

function showError(message, field){
    field.innerHTML = message;
}

function validation(getValidatenMsg, field, errorField){
    const message = getValidatenMsg(field);
    showError(message, errorField);
}

logInBtn.onclick = function(){
    const message = getEmailError(email.value) || getPasswordError(password.value) ||
        getConfirmPasswordError(password.value, confirmPassword.value);
    if(message){
        alert(message);
        clearErrorField(confirmPassword);
    } else {
        alert("Congratulations! You successfully loged in)");
        clearErrorField(email, password, confirmPassword);
        email.oninput = null;
        password.oninput = null;
    }
};

email.onblur = function (){
    let errorfield = document.querySelector('#emailErrors');
    validation(getEmailError, this.value, errorfield);
    this.oninput = function(){
        validation(getEmailError, this.value, errorfield);
    }
};

password.onblur = function(){
    let errorfield = document.querySelector('#passwordErrors');
    validation(getPasswordError, this.value, errorfield);
    this.oninput = function(){
        validation(getPasswordError, this.value, errorfield);
    }
};

confirmPassword.oninput = function(){
    logInBtn.disabled = false;
}
