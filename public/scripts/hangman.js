const xhr = new XMLHttpRequest;
const puzzleBox = document.getElementById('puzzleBox');
const lettersBox = document.getElementById('lettersBox');
const lives = document.getElementById('lives');
const btnRestart = document.getElementById('btnRestart');

btnRestart.addEventListener('click', restartGame, false);

const maxErrors = 5;

let words = {}
let puzzle = ''; // puzzle to guess
let found = 0; // guessed letters counter
let bad = 0; // bad attmepts counter
let gameOver = false;

xhr.onload = () => {
    if(xhr.status == 200){
        const body = JSON.parse(xhr.response);
        words = body.words;
        startGame();
    }
}

xhr.open('GET','data/hangman.json');
xhr.send(null);

function getRandNum(){
    if(words.length) return (Math.random()*1000).toFixed(0) % words.length;
    return 0;
}

function startGame(){
    setPuzzle();
    setLetters();
    setLives();
}

function restartGame(){
    btnRestart.style.display = 'none';
    found = 0;
    bad = 0;
    gameOver = false;

    clearPuzzle();
    setPuzzle();
    clearLetters();
    setLetters();
    setLives();
}

function setPuzzle(){
    const number = getRandNum();
    puzzle = words[number].name;
    setInfo('Category : ' + words[number].category);
    const length = puzzle.length;
    for(let i=0;i<length;i++){
        let newElem = document.createElement('div');
        if(puzzle[i] != ' '){
            newElem.className = 'square puzzle';
            let newText = document.createTextNode('?');
            newElem.appendChild(newText);
            puzzleBox.appendChild(newElem);
        } else{
            puzzleBox.appendChild(document.createElement('br'));
        }
        
    }
    puzzle = puzzle.replace(/\s/g,'');
}

function clearPuzzle(){
    while(puzzleBox.firstChild){
        puzzleBox.removeChild(puzzleBox.firstChild);
    }
}

function clearLetters(){
    while(lettersBox.firstChild){
        lettersBox.removeChild(lettersBox.firstChild);
    }
}

function setLetters(){
    for(let i=65; i<=90;i++){
        let newElem = document.createElement('div');
        let newText = document.createTextNode(String.fromCharCode(i));
        newElem.addEventListener('click', (e)=>{pick(e);}, false);
        newElem.appendChild(newText);
        newElem.className = 'square letter';
        lettersBox.appendChild(newElem);
    }
}

function setLives(){
    while(lives.firstChild){
        lives.removeChild(lives.firstChild);
    }

    for(let i=0;i<maxErrors-bad;i++){
        let newElem = document.createElement('div');
        newElem.className = 'heart heartGood';
        lives.appendChild(newElem);
    }

    for(let i=0;i<bad;i++){
        let newElem = document.createElement('div');
        newElem.className = 'heart heartBad';
        lives.appendChild(newElem);
    }
}

function pick(e){
    if(!gameOver){
        const elem = e.target;  
        const letter = elem.textContent;
        if(elem.className !== 'square well' || elem.className !== 'square bad' ){
            if(checkLetter(letter)){
                elem.className = 'square well';
            }else{
                elem.className = 'square bad';
            }
        }
    }
}

function checkLetter(letter){

    let result = false;

    const puzzleLetters = document.querySelectorAll('div.puzzle');
    
    for(let i=0;i<puzzle.length;i++){
        if(puzzle[i].toUpperCase() == letter.toUpperCase()){
            puzzleLetters[i].textContent = puzzle[i].toUpperCase();
            found++;
            result = true;
        }
    }

    // if wrong attempt -> bad anwsers ++
    if(!result) bad++;

    // all letters guessed
    if(found == puzzle.length){
        setInfo('Win !');
        highlightPuzzle(puzzleLetters);
        btnRestart.style.display = 'initial';
    }

    // too many wrong attempts
    if(bad == maxErrors){
        setInfo('Lose !');
        gameOver = true;
        btnRestart.style.display = 'initial';
    }

    setLives();

    return result;
}

function setInfo(text){
    document.getElementById('info').textContent = text;
}

function highlightPuzzle(puzzleLetters){
    for(let i=0;i<puzzleLetters.length;i++){
        puzzleLetters[i].className = 'square win';
    }
}