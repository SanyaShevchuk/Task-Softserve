const emailErrorsRules = new Map([
    [isContainAt, 'Email has to contain "@"!'],
    [isContainDot, 'Email has to contain "."!'], 
    [isCorrectEmailFormat, 'Wrong email format! example@gmail.com']
]);

const emailFormat = /.*[a-zA-Z0-9][@].*[a-zA-Z0-9][.].*[a-zA-Z0-9]/;

function isContainDot(value){
    return value.indexOf('.') > 0;
}

function isContainAt(value){
    return value.indexOf('@') > 0;
}

function isCorrectEmailFormat(value){
    return emailFormat.test(value);
}

function getEmailError(email){
    for(let [rule, errorMsg] of emailErrorsRules){
        if(!rule(email)){
            return errorMsg;
        }
    }

    //if there is no errors return empty string of errors
    return "";
}

export default getEmailError;