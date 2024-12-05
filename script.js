document.getElementById('searchForm').addEventListener('submit', fetchBooks);

async function fetchBooks(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    const apiKey = 'AIzaSyCuae9YTp0Y3YScXuA4LhNLelFPD80T9Ls';  // Remplacez par votre clé API
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Livre non trouvé');
        const data = await response.json();
        displayBooks(data.items);
    } catch (error) {
        alert(error.message);
    }
}

function displayBooks(books) {
    const bookDisplay = document.getElementById('bookDisplay');
    bookDisplay.innerHTML = '';
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <img src="${book.volumeInfo.imageLinks?.thumbnail}" alt="Couverture du livre">
            <p class="title">${book.volumeInfo.title}</p>
            <p class="author">${book.volumeInfo.authors?.join(', ')}</p>
            <p class="description">${book.volumeInfo.description || 'Description non disponible.'}</p>
        `;
        bookDisplay.appendChild(bookDiv);
    });
}
