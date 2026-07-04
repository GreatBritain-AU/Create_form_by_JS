'use strict';

class Person{
    constructor(data){
       Object.assign(this, data);
    }
}

function createPerson() {
    const form = document.querySelector("form");
    const data = Object.fromEntries(new FormData(form));
    delete data.passw;
    delete data.passw_con;

    return new Person(data);
}

function createInput(type, name, placeholder){
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    return input;
}

function createInputLabel(type, id, name){
    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = name;
    return input;
}

const errorMessage = 'You entered an incorrect email address or password';
let emailValidError = null;

function checkEmailValidation(event){
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailInputField = event.target.value;

    if(!emailReg.test(emailInputField)){

        if(!emailValidError){
            emailValidError = document.createElement('p');
            emailValidError.textContent = errorMessage;
            emailValidError.style.backgroundColor = 'red';
            emailValidError.style.color = 'white';

            const inputsGroup = document.querySelector('.input-part');
            inputsGroup.after(emailValidError);
        }
    } else{
        if(emailValidError){
            emailValidError.remove();
            emailValidError = null;
        }
    }
}

let passwordValidError = null;
function checkPasswValidation(event){
    const passwConfInp = document.querySelector('input[name="passw_con"]');
    const passInp = document.querySelector('input[name="passw"]');
        if(passwConfInp.value !== passInp.value){
            if(!passwordValidError){
                passwordValidError = document.createElement('p');
                passwordValidError.textContent = errorMessage;
                passwordValidError.style.backgroundColor = 'red';
                passwordValidError.style.color = 'white';

                const inputsGroup = document.querySelector('.input-part');
                inputsGroup.after(passwordValidError);
            }
        } else{
            if(passwordValidError){
                passwordValidError.remove();
                passwordValidError = null;
            }
        }    
}


//Top part
const mainForm = document.createElement('form');
document.body.append(mainForm);
const upForm = document.createElement('div');
mainForm.append(upForm);
upForm.classList.add('form-up');
const h1 = document.createElement('h1');
h1.textContent = 'CREATE AN ACCOUNT';
upForm.append(h1);
const p1 = document.createElement('p');
p1.textContent = 'We always keep your name and email address privet';
upForm.append(p1);

//Input part
const midForm = document.createElement('div');
midForm.classList.add('input-part');
mainForm.append(midForm);
const leftInputDivGroup = document.createElement('div');
leftInputDivGroup.classList.add('left-col');
midForm.append(leftInputDivGroup);
const fnInput = createInput('text', 'first_name', 'First name');
leftInputDivGroup.append(fnInput);
const dnInput = createInput('text', 'dis_name', 'Display name');
leftInputDivGroup.append(dnInput);
const pwInput = createInput('password', 'passw', 'Password');
leftInputDivGroup.append(pwInput);

const rightInputDivGroup = document.createElement('div');
rightInputDivGroup.classList.add('right-col');
midForm.append(rightInputDivGroup);
const lnInput = createInput('text', 'last_name', 'Last name');
rightInputDivGroup.append(lnInput);
const emailInput = createInput('email', 'email', 'Email Address');
rightInputDivGroup.append(emailInput);
const pwcInput = createInput('password', 'passw_con', 'Password Confirmation');
rightInputDivGroup.append(pwcInput);

//Bottom part
const buyerLabel = document.createElement('label');
buyerLabel.setAttribute('for', 'buyer');
buyerLabel.classList.add('radio-btn-part');
mainForm.append(buyerLabel);
const buyerRadioInput = createInputLabel('radio', 'buyer', 'join');
buyerLabel.append(buyerRadioInput);
const buyerSpan = document.createElement('span');
buyerSpan.classList.add('content');
buyerLabel.append(buyerSpan);
const buyerFirstSubSpan = document.createElement('span');
buyerFirstSubSpan.textContent = 'Join As a Buyer';
buyerSpan.append(buyerFirstSubSpan);
const buyerSecSubSpan = document.createElement('span');
buyerSecSubSpan.textContent = 'I am looking for a Name, Logo or Tagline for my business, brand or product.';
buyerSpan.append(buyerSecSubSpan);

const sellerLabel = document.createElement('label');
sellerLabel.setAttribute('for', 'seller');
sellerLabel.classList.add('radio-btn-part2');
mainForm.append(sellerLabel);
const sellerRadioInput = createInputLabel('radio', 'seller', 'join');
sellerLabel.append(sellerRadioInput);
const sellerSpan = document.createElement('span');
sellerSpan.classList.add('content-s');
sellerLabel.append(sellerSpan);
const sellerFirstSubSpan = document.createElement('span');
sellerFirstSubSpan.textContent = 'Join As a Creative or Marcetplace Seller';
sellerSpan.append(sellerFirstSubSpan);
const sellerSecSubSpan = document.createElement('span');
sellerSecSubSpan.textContent = 'I am plan to submit name ideas, Logo designs or sell mames in Domain Marketplace.';
sellerSpan.append(sellerSecSubSpan);

const checkDiv = document.createElement('div');
checkDiv.classList.add('check');
mainForm.append(checkDiv);
const checkInput = document.createElement('input');
checkInput.setAttribute('type', 'checkbox');
checkInput.setAttribute('name', 'allow_squad');
checkInput.setAttribute('id', 'allow_s');
checkDiv.append(checkInput);
const checkLabel = document.createElement('label');
checkLabel.setAttribute('for', 'allow_s');
checkLabel.textContent = 'Allow Squadhelp to send marketing/promotional offers from time to time';
checkDiv.append(checkLabel);

const button = document.createElement('button');
button.setAttribute('type', 'submit');
button.textContent = 'Create account';
mainForm.append(button);

//Event Handlers

emailInput.addEventListener('blur', checkEmailValidation);
pwcInput.addEventListener('blur', checkPasswValidation);
pwInput.addEventListener('blur', checkPasswValidation);
button.addEventListener('click', function (event) {
    event.preventDefault();
    const lastNameValue = lnInput.value;

    const person = createPerson();
    localStorage.setItem(lastNameValue, JSON.stringify(person));
});