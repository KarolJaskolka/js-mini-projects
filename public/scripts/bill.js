const xhr = new XMLHttpRequest;
const calculator = document.getElementById('calculator');

let amount = 0.00;

let food = {};

xhr.onload = ()=>{
    if(xhr.status == 200){
        food = JSON.parse(xhr.response);
        console.log(food);
        loadBill();
    }
};

xhr.open('GET','data/food.json');
xhr.send(null);

function loadBill(){
    createSpan('Pizza')
    createSelect(food.pizza);
    createSpan('Size')
    createRadioBox(food.size);
    createSpan('Extras')
    createCheckBox(food.extra);
    createSpan('Drinks')
    createSelect(food.drink);
    createSpan(`Amount : ${amount.toFixed(2)}$`);
}

function createSelect(data){
    const newElem = document.createElement('select');
    newElem.addEventListener('change', calcBill, false);
    calculator.appendChild(newElem);
    for(let i=0;i<data.length;i++){
        let newOption = document.createElement('option');
        let newText = document.createTextNode(data[i].name + ' ' + data[i].price + '$');
        newOption.appendChild(newText);
        newElem.append(newOption);
    }
}

function createRadioBox(data){
    for(let i=0;i<data.length;i++){
        let newRadio = document.createElement('input');
        if(i==0) newRadio.checked = true;
        newRadio.addEventListener('change', calcBill, false);
        newRadio.type = 'radio';
        newRadio.name = 'size';
        calculator.appendChild(newRadio);
        let newLabel = document.createElement('label');
        let newText= document.createTextNode(data[i].name);
        newLabel.appendChild(newText);
        calculator.appendChild(newLabel);
    }
    createBreak();
}

function createCheckBox(data){
    for(let i=0;i<data.length;i++){
        let newLabel = document.createElement('label');
        let newText = document.createTextNode(data[i].name + ` ${data[i].price}$`);
        let newCheck = document.createElement('input');
        newCheck.addEventListener('change', calcBill, false);
        newCheck.type = 'checkBox';
        newCheck.name = 'extra';
        newLabel.appendChild(newCheck);
        newLabel.appendChild(newText);
        calculator.appendChild(newLabel);
        createBreak();
    }
}

function createBreak(){
    calculator.appendChild(document.createElement('br'));
}

function createSpan(text){
    const newElem = document.createElement('span');
    const newText = document.createTextNode(text);
    newElem.appendChild(newText);
    calculator.appendChild(newElem);
}

function calcBill(){

    amount = 0.00;

    const pizzaSelect = document.getElementsByTagName('select')[0];
    const drinkSelect = document.getElementsByTagName('select')[1];
    const radioButtons = document.querySelectorAll('input[type=radio]');
    const checkBoxButtons = document.querySelectorAll('input[type=checkbox]');

    amount += food.pizza[pizzaSelect.selectedIndex].price;
    amount += food.drink[drinkSelect.selectedIndex].price;

    // size matters only if user selected pizza first
    if(pizzaSelect.selectedIndex != 0){
        for(let i=0;i<radioButtons.length;i++){
            if(radioButtons[i].checked){
                amount += food.size[i].price;
            }
        }
    }

    // is it possible to buy only cheese I guess
    for(let i=0;i<checkBoxButtons.length;i++){
        if(checkBoxButtons[i].checked){
            amount += food.extra[i].price;
        }
    }

    const amountSpan = document.getElementsByTagName('span')[4];
    amountSpan.textContent = 'Amount : ' + amount.toFixed(2) + '$';
}