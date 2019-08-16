function addItem(){  
    // get user input
    let input = document.getElementById('itemInput').value;
    // if input is not empty
    if(input){
        // create new element
        const newElement = document.createElement('li');
        // create text for new element
        const text = document.createTextNode(input);
        // add text(user input) to element
        newElement.appendChild(text);
        // set element class
        newElement.className = 'red';
        // add eventListener to new element
        newElement.addEventListener('click', (e) => { check(e); }, false)
        // get ul
        const list = document.getElementsByTagName('ul')[0];
        // add new element
        list.appendChild(newElement);
        // clear user input
        document.getElementById('itemInput').value = '';
    }
}

function check(e){
    // get clicked element
    let element = e.target;
    // change element color to green
    if(element.className === 'red'){
        // set element className
        element.className = 'green';
    }
    // remove element
    else{
        // get parent
        let parent = element.parentNode;
        // remove parent's child
        parent.removeChild(element);
    }
}

const button = document.getElementById('buttonAdd');
button.addEventListener('click', addItem, false);