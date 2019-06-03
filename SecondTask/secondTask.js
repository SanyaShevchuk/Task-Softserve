let email = document.querySelector('form#task2 input[name="e-mail"]');
let password = document.querySelector('form#task2 input[name="password"]');
let confirmPassword = document.querySelector('form#task2 input[name="confirm-password"]');
let emailErrors = document.querySelector('form#task2 #emailErrors');
let passwordErrors = document.querySelector('form#task2 #passwordErrors');
let logInBtn = document.querySelector('form#task2 #submit');

$('form#task2').submit(function(e){
    e.preventDefault();
})

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

email.onblur = function(){
    if(email.value.length===0){
        emailErrors.innerHTML = "Email is empty!"
    } else if(email.value.indexOf('@') < 0 ){
        emailErrors.innerHTML = "@ is absent!";
    } else if(email.value.indexOf('.') < 0 ){
        emailErrors.innerHTML = ". is absent!"
    } else if(!/.*[a-zA-Z0-9][@].*[a-zA-Z0-9][.].*[a-zA-Z0-9]/.test(email.value)){
        emailErrors.innerHTML = "Wrong email format! example@gmail.com";
    }  else {
        emailErrors.innerHTML = "";
    }
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
