let data = localStorage.solverBookData || [{name: 'fuck', link:'http://google.com'}, {name: 'fucking', link:'google.com'}, {name: 'sex', link:'google.com'}];

let searchElement = document.querySelector('input.searchBookmark');
let bookmarksListElement = document.querySelector('.taskList');
console.log(bookmarksListElement);
function createTask(name, link) {
    let element = document.createElement("a")
    element.href = link;
    element.target = "_blank";
    element.innerHTML = name;
    return element;
}

function renderBookList() {
    clearBookList();
    text = this.value || '';
    console.log(text);
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

renderBookList();
searchElement.addEventListener('change', renderBookList);

