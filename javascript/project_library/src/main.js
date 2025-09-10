const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype method to toggle read status
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Add book to array
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks();
}

// Remove book by ID
function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

// Toggle read status by ID
function toggleBookStatus(id) {
  const book = myLibrary.find(book => book.id === id);
  if (book) {
    book.toggleRead();
    displayBooks();
  }
}

// Display books on the page
function displayBooks() {
  const library = document.getElementById("library");
  library.innerHTML = ""; // clear previous content

  if (myLibrary.length === 0) {
    library.innerHTML = `<p class="text-gray-500 text-center col-span-full">No books yet. Add one!</p>`;
    return;
  }

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.className = "bg-white shadow-md p-4 rounded-lg";

    card.innerHTML = `
      <h3 class="text-lg font-bold">${book.title}</h3>
      <p class="text-gray-700">by ${book.author}</p>
      <p class="text-gray-600">${book.pages} pages</p>
      <span class="inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full 
        ${book.read ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}">
        ${book.read ? "Read" : "Not Read"}
      </span>
      <div class="flex justify-between mt-4">
        <button class="toggleBtn px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500" data-id="${book.id}">
          Toggle Read
        </button>
        <button class="removeBtn px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" data-id="${book.id}">
          Remove
        </button>
      </div>
    `;

    library.appendChild(card);
  });

  // Attach event listeners after rendering
  document.querySelectorAll(".removeBtn").forEach(btn =>
    btn.addEventListener("click", e => removeBook(e.target.dataset.id))
  );

  document.querySelectorAll(".toggleBtn").forEach(btn =>
    btn.addEventListener("click", e => toggleBookStatus(e.target.dataset.id))
  );
}

// Handle form submit
document.getElementById("bookForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  this.reset();
  this.classList.add("hidden");
});

// Toggle form visibility
document.getElementById("newBookBtn").addEventListener("click", () => {
  const form = document.getElementById("bookForm");
  form.classList.toggle("hidden");
});

// Add some sample books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);
