import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, set, push, get, remove, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAq1nKP3DObMbxxNHi3f1y6yEmAxZV-nfA",
    authDomain: "pilketos24.firebaseapp.com",
    databaseURL: "https://pilketos24-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pilketos24",
    storageBucket: "pilketos24.firebasestorage.app",
    messagingSenderId: "439227857159",
    appId: "1:439227857159:web:1bdc12a9fb6886c9e7eda2",
    measurementId: "G-JHMWN0YWDP"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let editingBookId = null;

const openModal = () => {
    document.getElementById('modal-title').innerText = 'Tambah Buku';
    document.getElementById('book-form').reset();
    document.getElementById('edit-modal').style.display = 'flex';
    editingBookId = null;
};

const closeModal = () => {
    document.getElementById('edit-modal').style.display = 'none';
};

document.getElementById('book-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const pdfUrl = document.getElementById('pdfUrl').value;

    if (editingBookId) {
        update(ref(database, 'books2/' + editingBookId), { title, author, imageUrl, pdfUrl })
            .then(() => { closeModal(); loadBooks(); });
    } else {
        const newBookRef = push(ref(database, 'books2'));
        set(newBookRef, { title, author, imageUrl, pdfUrl })
            .then(() => { closeModal(); loadBooks(); });
    }
});

window.editBook = (bookId, title, author, imageUrl, pdfUrl) => {
    editingBookId = bookId;
    document.getElementById('modal-title').innerText = 'Edit Buku';
    document.getElementById('title').value = title;
    document.getElementById('author').value = author;
    document.getElementById('imageUrl').value = imageUrl;
    document.getElementById('pdfUrl').value = pdfUrl;
    document.getElementById('edit-modal').style.display = 'flex';
};

window.deleteBook = (bookId) => {
    remove(ref(database, 'books2/' + bookId)).then(() => loadBooks());
};

window.onload = loadBooks;
