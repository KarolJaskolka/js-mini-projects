const button = document.getElementById('btnConfirm');
const login = document.getElementById('login');
const password = document.getElementById('password');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

login.addEventListener('blur', (e)=>{checkName(e);}, false);
password.addEventListener('blur', checkPassword, false);
firstName.addEventListener('blur', (e)=>{checkName(e);}, false);
lastName.addEventListener('blur', (e)=>{checkName(e);}, false);
email.addEventListener('blur', checkEmail, false);
phone.addEventListener('blur', checkPhone, false);
button.addEventListener('click', (e)=>{sendRequest(e);}, false);

const red = '#e71414';
const green = '#27a323';

function isEmpty(elem){
    if(elem.value.trim() === ''){
        setWarning(elem, 'Field cannot be empty');
        return true;
    } else{
        removeWarning(elem);
        return false;
    }
}

function isWrongSize(elem, minLength, maxLength){
    if(elem.value.length < minLength || elem.value.length > maxLength){
        setWarning(elem, `Password must be ${minLength}-${maxLength} characters`);
        return true;
    } else{
        removeWarning(elem);
        return false;
    }
}

function isNotValidNumber(elem){
    const regex = /^[0-9]+$/;
    if(!regex.test(elem.value)){
        setWarning(elem, 'Phone number must contain only numbers');
        return true;
    } else{
        removeWarning(elem);
        return false;
    }
}

function isNotValidEmail(elem){
    const regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-z,A-Z]{2,6}$/;
    if(!regex.test(elem.value)){
        setWarning(elem, 'Email address is not valid');
        return true;
    } else{
        removeWarning(elem);
        return false;
    }
}

function isNotValidPassword(elem){
    const regex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/;
    if(!regex.test(elem.value)){
        setWarning(elem, 'Password must contain numbers, small and large letters');
        return true;
    } else{
        removeWarning(elem);
        return false;
    }
}

function setWarning(elem, text){
    elem.nextElementSibling.textContent = text;
    elem.nextElementSibling.style.display = 'block';
    elem.style.borderColor = red;
}

function removeWarning(elem){
    elem.style.borderColor = green;
    elem.nextElementSibling.style.display = 'none';
}

function checkElement(elem){
    if(isEmpty(elem)) return false;
    return true;
}

function checkName(e) {
    return checkElement(e.target);
}

function checkPassword() {
    if(isEmpty(password)) return false;
    if(isWrongSize(password,8,40)) return false;
    if(isNotValidPassword(password)) return false;
    return true;
}

function checkEmail() {
    if(isEmpty(email)) return false;
    if(isNotValidEmail(email)) return false;
    return true;
}

function checkPhone() {
    if(isEmpty(phone)) return false;
    if(isNotValidNumber(phone)) return false;
    return true;
}

function checkAll(){

    let result = true;

    if(!checkElement(login)) result = false;
    if(!checkPassword()) result = false;
    if(!checkElement(firstName)) result = false;
    if(!checkElement(lastName)) result = false;
    if(!checkEmail()) result = false;
    if(!checkPhone()) result = false;

    return result;
}

function sendRequest(event){
    if(checkAll()){
        alert('Sending invisible request...');  
    }
    else{
        event.preventDefault();
        return false;
    }
}
