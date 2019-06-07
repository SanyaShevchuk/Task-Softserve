let email = document.querySelector('#task2 input[name="e-mail"]');
let password = document.querySelector('#task2 input[name="password"]');
let confirmPassword = document.querySelector('#task2 input[name="confirm-password"]');
let emailErrors = document.querySelector('#emailErrors');
let passwordErrors = document.querySelector('#passwordErrors');
let logInBtn = document.querySelector('#submitBtn');

document.getElementById('task2').addEventListener('submit', function(e){
    e.preventDefault();
});

function isContaintDot(value){
    return value.indexOf('.') < 0;
}

function isContainAt(value){
    return value.indexOf('@') < 0;
}

function isCorrectEmailFormat(value){
    return !emailFormat.test(value);
}

function isEmpty(value){
    return value.length===0;
}

const emailFuncValidation = [isEmpty, isContainAt, isContaintDot, isCorrectEmailFormat];

const emailErrorsMessage = {
    'isEmpty': 'Email is empty!',
    'isContainAt': '@ is absent!', 
    'isContaintDot': '. is absent!', 
    'isCorrectEmailFormat': 'Wrong email format! example@gmail.com'
}

const emailErrorsRules = new Map([
    [isEmpty, 'Email is empty!'],
    [isContainAt, '@ is absent!'],
    [isContaintDot, '. is absent!'], 
    [isCorrectEmailFormat, 'Wrong email format! example@gmail.com']
])

const emailFormat = /.*[a-zA-Z0-9][@].*[a-zA-Z0-9][.].*[a-zA-Z0-9]/;

logInBtn.addEventListener('click', function(){
    
    if(email.value.indexOf('.') < 0 ){
        alert(". is abcent");
    } else if(email.value.indexOf('@') < 0 ){
        alert("@ is abcent");
    } else if(!/.*[a-zA-Z0-9][@].*[a-zA-Z0-9][.].*[a-zA-Z0-9]/.test(email.value)){
        alert("Wrong email format! example@gmail.com");
    } else if(password.value.length<8){
        alert("Password length less than 8 symbols!");
    } else if(!/[A-Z]/.test(password.value)){
        alert("Password should contain atleast one capital letter!")
    } else if(!(/\d/.test(password.value))){
        alert("Password should contain atleast one digit!");
    } else if(password.value !== confirmPassword.value){
        alert("Confirm password and password are different!");
        confirmPassword.value = "";
    } else{
        alert("Congratulations! You successfully loged in)");
        email.value ="";
        password.value ="";
        confirmPassword.value ="";
    }
})

function getEmailError(email){
    
    for(let [errorFunc, errorMsg] of emailErrorsRules){
        if(errorFunc(email)){
            return errorMsg;
        }
    }

    //if there is no errors return empty string of errors
    return "";
}

email.onblur = function(){
    let message = "";
    message = getEmailError(email.value);
    emailErrors.innerHTML = message;
}

password.onblur = function(){
    if(password.value.length<8){
        passwordErrors.innerHTML = "Password has to contain more than 8 symbols!";
    } else if(!/[A-Z]/.test(password.value)){
        passwordErrors.innerHTML = "Password has to contain atleast one capital letter!";
    } else if(!(/\d/.test(password.value))){
        passwordErrors.innerHTML = "Password has to contain atleast one digit!";
    } else {
        passwordErrors.innerHTML = "";
    }
}

confirmPassword.oninput = function(){
    logInBtn.disabled = false;
}
