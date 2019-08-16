const test = [
    {
        question:"How old is Crisitano Ronaldo?",
        option1:"32",
        option2:"33",
        option3:"34",
        option4:"35",
        answer:"3"
    },
    {
        question:"Which club won the Uefa Champions League most times?",
        option1:"FC Barcelona",
        option2:"Real Madryt",
        option3:"Liverpool FC",
        option4:"AC Milan",
        answer:"2"
    },
    {
        question:"Who won Ballon'Dor in 2018?",
        option1:"Cristiano Ronaldo",
        option2:"Leo Messi",
        option3:"Kylian Mbappe",
        option4:"Luka Modric",
        answer:"4"
    }
];
    
var elQuestion = document.getElementById('question');
var elOptions = document.getElementsByTagName('li');
var elScore = document.getElementById('score');
var elButton = document.getElementById('button');
    
var current = 0;
var score = 0;
var selectedAnswer = 0;
var checked = false;
    
function loadQuestion(){
    var items = test[current];
    elScore.textContent = 'Score : ' + score;
    elQuestion.textContent = items.question;
    
    elOptions[0].textContent = items.option1; 
    elOptions[1].textContent = items.option2;
    elOptions[2].textContent = items.option3;
    elOptions[3].textContent = items.option4;

    for(var i=0; i<4; i++){
        elOptions[i].className = 'basic';
    }

}   
    
function select(e, number){
    var target = e.target;
    for(var i=0; i<4; i++){
        elOptions[i].className = 'basic';
    }
    target.className = 'checked';
    selectedAnswer = number;
}
    
function check(){
    var items = test[current];
    if(selectedAnswer == items.answer){
        score++;
        elScore.textContent = 'Score : ' + score;
    }
    else{
        if(selectedAnswer){
            elOptions[selectedAnswer-1].className = 'false';
        }
    }
    elOptions[items.answer-1].className = 'true';
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
    
elOptions[0].addEventListener('click',function(e){
    select(e,1);
},false)
elOptions[1].addEventListener('click',function(e){
    select(e,2);
},false)
elOptions[2].addEventListener('click',function(e){
    select(e,3);
},false)
elOptions[3].addEventListener('click',function(e){
    select(e,4);
},false)

elButton.addEventListener('click',action,false);

loadQuestion();