let elQuestion = document.getElementById('question');
let elList = document.getElementsByTagName('ul')[0];
let elScore = document.getElementById('score');
let elButton = document.getElementById('button');
    
let current = 0;
let score = 0;
let selectedAnswer = 0;
let checked = false;

let test;

const request = new XMLHttpRequest();

request.onload = () => { 
    if(request.status == 200){
        test = JSON.parse(request.responseText); 
        loadQuestion();
    }
}

request.open('GET','data/quiz.json',true);
request.send(null);
    
function loadQuestion(){
    
    const items = test.test[current];
    elScore.textContent = 'Score : ' + score;
    elQuestion.textContent = items.question;

    while(elList.firstChild){
        elList.removeChild(elList.firstChild);
    }

    for(let i=0; i<items.options.length; i++){
        let newElement = document.createElement('li');
        let newText = document.createTextNode(items.options[i]);
        newElement.appendChild(newText);
        newElement.className = 'basic';
        elList.appendChild(newElement);
        newElement.addEventListener('click',function(e){
            select(e,i);
        },false)
    }
}   
    
function select(e, number){
    const target = e.target;
    let elOptions = document.getElementsByTagName('li');
    for(let i=0; i< elOptions.length; i++){
        elOptions[i].className = 'basic';
    }
    target.className = 'checked';
    selectedAnswer = number;
}
    
function check(){
    const items = test.test[current];
    let elOptions = document.getElementsByTagName('li');
    if(selectedAnswer == items.answer){
        score++;
        elScore.textContent = 'Score : ' + score;
    }
    else{
        if(selectedAnswer){
            elOptions[selectedAnswer].className = 'false';
        }
    }
    elOptions[items.answer].className = 'true';
    checked = true;
    elButton.value = 'Next';
    
}
    
function next(){
    current++;
    selectedAnswer = 0;
    if(current > test.test.length-1){
        current = 0;
        score = 0;
        alert('Game Over');
    }
    loadQuestion();
}

function action(){
    
    if(checked == true){
        next();
        elButton.value = 'Check';
        checked = false;
    }
    else{
        check();
    }
}

elButton.addEventListener('click',action,false);

