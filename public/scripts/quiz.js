let elQuestion = document.getElementById('question');
let elOptions = document.getElementsByTagName('li');
let elScore = document.getElementById('score');
let elButton = document.getElementById('button');
    
let current = 0;
let score = 0;
let selectedAnswer = 0;
let checked = false;

let test;

const request = new XMLHttpRequest();

request.onload = () => { 
    test = JSON.parse(request.responseText); 
    loadQuestion();
}

request.open('GET','data/quiz.json',true);
request.send(null);
    
function loadQuestion(){
    
    const items = test.test[current];
    elScore.textContent = 'Score : ' + score;
    elQuestion.textContent = items.question;

    for(let i=0; i<4; i++){
        elOptions[i].textContent = items.options[i];
    }

    for(let i=0; i<4; i++){
        elOptions[i].className = 'basic';
    }
    
}   
    
function select(e, number){
    const target = e.target;
    for(let i=0; i<4; i++){
        elOptions[i].className = 'basic';
    }
    target.className = 'checked';
    selectedAnswer = number;
}
    
function check(){
    const items = test.test[current];
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
    if(current > 2){
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

for(let i=0; i<4; i++){
    elOptions[i].addEventListener('click',function(e){
        select(e,i);
    },false)
}

elButton.addEventListener('click',action,false);

