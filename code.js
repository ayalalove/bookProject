
import data from "./data.json" with {type: 'json'};




let books = JSON.parse(localStorage.getItem('books')) || data.books;
console.log(books);

function sortBooks() {
    books.sort((a, b) => {
        if (b.Price - a.Price !== 0) {
            return b.Price - a.Price; 
        }
        return a.Title.localeCompare(b.Title); 
    });
}

const container = document.getElementById('container');
const table = document.createElement('table');
table.border = '1';

const detailsContainer = document.createElement('div');
detailsContainer.id = 'details';
container.appendChild(detailsContainer);



const headerRow = document.createElement('tr');
const headers = ['Title', 'Price', 'Catalog ID', 'Action'];
headers.forEach(headerText => {
    const header = document.createElement('th');
    header.textContent = headerText;
    headerRow.appendChild(header);
});
table.appendChild(headerRow);

function displayBooks() {
    table.innerHTML = ''; 
    table.appendChild(headerRow); 

    sortBooks(); 

    books.forEach((book, index) => {
        const row = document.createElement('tr');

   
        row.addEventListener('click', () => displayBookDetails(book));

        const titleCell = document.createElement('td');
        titleCell.textContent = book.Title;
        row.appendChild(titleCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = `${book.Price} ₪`;
        row.appendChild(priceCell);

        const catalogIdCell = document.createElement('td');
        catalogIdCell.textContent = book.catalogId;
        row.appendChild(catalogIdCell);

        const actionCell = document.createElement('td');
        actionCell.id="actionCell"

        
        const selectBtn = document.createElement('button');
        selectBtn.textContent = book.Action; 
        selectBtn.addEventListener('click', function(event) {
            event.stopPropagation(); 
            
            book.Action = book.Action === 'Read' ? "Didn't Read" : 'Read';
            localStorage.setItem('books', JSON.stringify(books));
            displayBooks(); 
        });
        actionCell.appendChild(selectBtn);

      
        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Update';
        updateBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            updateBook(books.indexOf(book));
        });
        actionCell.appendChild(updateBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<img src="./img/2.jpg" alt="Delete" width="20" height="20">'; 
        deleteBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            deleteBook(books.indexOf(book));
        });
        actionCell.appendChild(deleteBtn);

        row.appendChild(actionCell);
        table.appendChild(row);
    });
}


function displayBookDetails(book) {
    detailsContainer.innerHTML = `
        <h1>${book.Title}</h1>
        <img src="${book.Image}" alt="${book.Title}" style="width: 100%; border-radius: 10px;">
        <p><strong>Price:</strong> ${book.Price} ₪</p>
    `;
}


function updateBook(index) {
    const book = books[index];

    const updateForm = document.createElement('div');
    updateForm.classList.add('update');
    updateForm.innerHTML = `
        <h1>Update Book</h1>
        <label for="id">Id:<input type="text" id="id" value="${book.catalogId}"></label><br><br>
        <label for="title">Title:<input type="text" id="title" value="${book.Title}"></label><br><br>
        <label for="price">Price:<input type="text" id="price" value="${book.Price}"></label><br><br>
        <label for="img">Cover Image URL:<input type="text" id="img" value="${book.Image}"></label><br><br>
        <button type="button" id="saveUpdate">Save</button><br>
    `;
    container.appendChild(updateForm);

    document.getElementById('saveUpdate').addEventListener('click', function() {
        books[index] = {
            catalogId: document.getElementById('id').value,
            Title: document.getElementById('title').value,
            Price: parseFloat(document.getElementById('price').value),
            Image: document.getElementById('img').value,
            Action: book.Action 
        };

        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
        container.removeChild(updateForm);
    });
}


function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}


container.appendChild(table);
displayBooks();


const newBtn = document.createElement('button');
newBtn.textContent = 'New Book';
newBtn.id = 'newBookBtn';
newBtn.addEventListener('click', addNewBook);
container.appendChild(newBtn);


function addNewBook() {
    const addForm = document.createElement('div');
    addForm.classList.add('add');
    addForm.innerHTML = `
        <h1>New Book</h1>
        <label for="id">Id:<input type="text" id="id" required></label><br><br>
        <label for="title">Title:<input type="text" id="title" required></label><br><br>
        <label for="price">Price:<input type="number" id="price" required step="0.01"></label><br><br>
        <label for="img">Cover Image URL:<input type="text" id="img" required></label><br><br>
        <button type="button" id="save">Add</button><br><br>
    `;
    container.appendChild(addForm);

    document.getElementById('save').addEventListener('click', function() {
        const newBook = {
            catalogId: document.getElementById('id').value,
            Title: document.getElementById('title').value,
            Price: parseFloat(document.getElementById('price').value),
            Image: document.getElementById('img').value,
            Action: 'Read'
        };

        books.push(newBook);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
        container.removeChild(addForm);
    });
}


detailsContainer.style.display = 'inline-block'; 
container.appendChild(detailsContainer);


















