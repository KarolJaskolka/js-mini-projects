const btnStart = document.getElementById('btnStart');
const btnRestart = document.getElementById('btnRestart');
const board = document.getElementsByClassName('board')[0];
const inputs = document.getElementsByTagName('input');
const names = document.getElementsByClassName('name');
const warnings = document.getElementsByClassName('warning');
const turnLabel = document.getElementsByClassName('turn')[0];

let gameOver = false;
let array = [[0,0,0],[0,0,0],[0,0,0]];
let ready = [false, false];
let turn = 1;

let playerOne = '';
let playerTwo = '';

for(let i=0;i<inputs.length;i++){
    inputs[i].addEventListener('blur', (e)=>{check(e)}, false);
}

btnStart.addEventListener('click', startGame, false);
btnRestart.addEventListener('click', restart, false);

// input validation
function check(e){
    const elem = e.target;
    if(elem.value.trim() === ''){
        elem.nextElementSibling.style.display = 'block';
        elem.className = 'prompt';
    }
    else{
        elem.nextElementSibling.style.display = 'none';
        elem.className = 'prompt green';
    }  
}

// all inputs validation
function checkAll(){
    for(let i=0;i<inputs.length;i++){
        if(inputs[i].value === ''){
            warnings[i].style.display = 'block';
            inputs[i].className = 'prompt';
            ready[i] = false;
        }
        else{
            warnings[i].style.display = 'none';
            inputs[i].className = 'prompt green';
            ready[i] = true;
        }
    }
}


function startGame(){
    
    checkAll();

    if(ready[0] === true && ready[1] === true){
        setLabels();
        createBoard();
    }

}

function setLabels(){
    playerOne = inputs[0].value;
    playerTwo = inputs[1].value;

    names[0].textContent = playerOne + ' (X)';
    names[1].textContent = playerTwo + ' (O)';

    names[0].style.display = 'block';
    names[1].style.display = 'block';

    board.style.display = 'grid';
    btnStart.style.display = 'none';

    inputs[0].style.display = 'none';
    inputs[1].style.display = 'none';

    turnLabel.textContent = 'Move : ' + playerOne;
}

function restart(){
    gameOver = false;
    array = [[0,0,0],[0,0,0],[0,0,0]];
    turn = 1;

    turnLabel.textContent = 'Move : ' + playerOne;
    btnRestart.style.display = 'none';

    removeBoard();
    createBoard();
}

function createBoard(){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            let newTile = document.createElement('div');
            newTile.className = 'tile tileHover';
            newTile.addEventListener('click', (e) => {move(e);},false);
            newTile.x = i;
            newTile.y = j;
            board.appendChild(newTile);
        }
    }
}

function removeBoard(){
    while(board.firstChild){
        board.removeChild(board.firstChild);
    }
}

function move(e){
    if(!gameOver){
        let tile = e.target;
        if(array[tile.x][tile.y] == 0){
            if(turn%2 == 0){
                array[tile.x][tile.y] = 1;
                tile.className='tile O';
                turnLabel.textContent = 'Move : ' + playerOne;
            }
            else{
                array[tile.x][tile.y] = 2;
                tile.className='tile X';
                turnLabel.textContent = 'Move : ' + playerTwo;
            }
            turn++;
        }
    
        if(turn > 4){
            if(isOver() === true){
                
                if (turn % 2 == 0) turnLabel.textContent = 'Winner : ' + playerOne;
                else turnLabel.textContent = 'Winner : ' + playerTwo;   

                // disable hover effect
                const tiles = document.getElementsByClassName('tile tileHover');
                const length = tiles.length;
                for(let i=0;i<length;i++) tiles[0].className = 'tile';

                gameOver = true;
                btnRestart.style.display = 'block';
                return;
            }
        }
    
        if(turn > 9){
            turnLabel.textContent = 'Draw';
            btnRestart.style.display = 'block';
        }
    }
}

function isOver(){

    let end = 0;

    // rows

    for(let i=0;i<3;i++){
        for(let j=0;j<2;j++){
            if(array[i][j] != 0 && array[i][j] == array[i][j+1]) end++;
        }
        if(end == 2) return true;
        end = 0;
    }

    // columns

    for(let i=0;i<3;i++){
        for(let j=0;j<2;j++){
            if(array[j][i] != 0 && array[j][i] == array[j+1][i]) end++;
        }
        if(end == 2) return true;
        end = 0;
    }

    // diagonally

    if(array[1][1] != 0){
        if(array[0][0] == array[1][1] && array[1][1] == array[2][2]) return true;
        if(array[2][0] == array[1][1] && array[1][1] == array[0][2]) return true;
    }

    return false;
}

