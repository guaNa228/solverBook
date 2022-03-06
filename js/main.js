let data = JSON.parse(localStorage.getItem('solverBookData')) || [{name: 'fuck', link:'http://google.com'}, {name: 'fucking', link:'google.com'}, {name: 'sex', link:'google.com'}];

let thisBody = document.querySelector('body');
let nameEnterInput = document.querySelector('input.bookmarkName');
let addButton = document.querySelector('.addButton');
let nameEnterWrapper = document.querySelector('.nameEnterWrapper');
let searchElement = document.querySelector('input.searchBookmark');
let bookmarksListElement = document.querySelector('.taskList');
console.log(bookmarksListElement);
function createTask(name, link) {
    let element = document.createElement("a")
    element.href = link;
    element.title = "Open the bookmark";
    element.target = "_blank";
    element.innerHTML = name;
    return element;
}

function renderBookList() {
    clearBookList();
    text = this.value || '';
    text = text.toLowerCase();
    for (let bookmark of data) {
        if (bookmark.name.includes(text)) {
            bookmarksListElement.prepend(createTask(bookmark.name, bookmark.link));
            console.log(1);
        }       
    }
}

function clearBookList() {
    bookmarksListElement.innerHTML = '';
}

function openAddingMenu() {
    nameEnterWrapper.classList.add('active');
    nameEnterInput.focus();
    nameEnterWrapper.addEventListener('keydown', keyCheck);
}

function closeAddingMenu() {
    nameEnterWrapper.removeEventListener('keydown', keyCheck);
    nameEnterWrapper.classList.remove('active');
    searchElement.focus();
}

function addingBookmark() {
    data.push({
        name: nameEnterInput.value,
        link: window.location.href
    });
    
    
    searchElement.value = '';
    closeAddingMenu();
    renderBookList();
    nameEnterInput.value = '';
    localStorageAdding();
}

function keyCheck(e) {
    if (e.key === "Escape") {
        closeAddingMenu();
    }
    if (e.key === "Enter" && nameEnterInput.value!='') {
        addingBookmark();
    }
}

function localStorageAdding() {
    localStorage.setItem('solverBookData', JSON.stringify(data)); 
}


renderBookList();
searchElement.addEventListener('keyup', renderBookList);
addButton.addEventListener('click', openAddingMenu);
searchElement.focus();



