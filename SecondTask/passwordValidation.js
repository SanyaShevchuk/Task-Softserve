const sizeOfPassword = 8;

const passwordErrorsRules = new Map([
    [isCorrectSize, `Password has to contain more than ${sizeOfPassword} symbols!`],
    [isContainCapitalLetter, 'Password has to contain atleast one capital letter!'],
    [isContainDigit, 'Password has to contain atleast one digit!']
])

function isCorrectSize(value){
    return value.length>sizeOfPassword;
}

function isContainCapitalLetter(value){
    return /[A-Z]/.test(value);
}

function isContainDigit(value){
    return /\d/.test(value);
}

function getPasswordError(password){
    for(let [rule, errorMsg] of passwordErrorsRules){
        if(!rule(password)){
            return errorMsg;
        }
    }
    //if there is no errors return empty string of errors
    return "";
}

export default getPasswordError;