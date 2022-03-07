var data = JSON.parse(window.top.localStorage.getItem('solverBookData')) || [{name: 'Example bookmark', link:'https://solver-cms.skyeng.ru/cms/question/autoreload'}];

let thisBody = document.querySelector('body');
let nameEnterInput = document.querySelector('input.bookmarkName');
let addButton = document.querySelector('.addButton');
let nameEnterWrapper = document.querySelector('.nameEnterWrapper');
let searchElement = document.querySelector('input.searchBookmark');
let bookmarksListElement = document.querySelector('.taskList');
let deleteModeToggleBtn = document.querySelector('img.deleteModeToggle');

var URLtemp;



var portFromCS;

function connected(p) {
  portFromCS = p;
  portFromCS.onMessage.addListener(function(m) {
    if(m.location !== undefined){
      URLtemp = m.location;
    }
  });
}

browser.runtime.onConnect.addListener(connected);



function createTask(name, link) {
    let element = document.createElement("a");
    let deleteBtn = document.createElement('img');
    deleteBtn.src = 'icons/delete.svg';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.title = 'Delete the bookmark';
    element.href = link;
    element.title = "Open the bookmark";
    element.target = "_blank";
    element.innerHTML = `${name}`;
    element.appendChild(deleteBtn);
    return element;
}

function renderBookList() {
    clearBookList();
    text = this.value || '';
    text = text.toLowerCase();
    for (let bookmark of data) {
        if (bookmark.name.includes(text)) {
            bookmarksListElement.prepend(createTask(bookmark.name, bookmark.link));
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

function getPage() {
    nameNeeded = nameEnterInput.value;
    browser.tabs.query({currentWindow: true, active: true})
      .then((tabs) => {
        data.push({
            name: nameNeeded,
            link: tabs[0].url
        })
        localStorageUpdate();
      });
}
  

function addingBookmark() {
    getPage();
    searchElement.value = '';
    closeAddingMenu();
    renderBookList();
    nameEnterInput.value = '';
}

function keyCheck(e) {
    if (e.key === "Tab") {
        e.preventDefault();
        closeAddingMenu();
    }
    if (e.key === "Enter" && nameEnterInput.value!='') {
        addingBookmark();
    }
}

function localStorageUpdate() {
    window.top.localStorage.setItem('solverBookData', JSON.stringify(data)); 
}

function deleteBookToggle() {
    let deleteButtons = document.querySelectorAll('img.deleteBtn');
    deleteButtons.forEach(item => {
        item.addEventListener('click', deleteBookmark);
    });     
    if (deleteButtons[0].classList.contains('active')) {
        deleteButtons.forEach((item) => {
            item.classList.remove('active');
        });
    } else {
        deleteButtons.forEach((item) => {
            item.classList.add('active');
        });
    }
}

function deleteBookmark(event) {
    event.preventDefault();
    bookName = this.parentElement.textContent;
    data = data.filter((item) => {
        return item['name']!=bookName;
    });
    localStorageUpdate();
    renderBookList();
    deleteBookToggle();
}


renderBookList();
searchElement.addEventListener('keyup', renderBookList);
addButton.addEventListener('click', openAddingMenu);
deleteModeToggleBtn.addEventListener('click', deleteBookToggle);

searchElement.focus();



