// Configurazione Firebase con le tue chiavi reali
const firebaseConfig = {
    apiKey: "AIzaSyBf-zl9PXhPoVA3Rdi7whkVuemTeu69Mdg",
    authDomain: "classe3f-9c131.firebaseapp.com",
    databaseURL: "https://classe3f-9c131-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "classe3f-9c131",
    storageBucket: "classe3f-9c131.firebasestorage.app",
    messagingSenderId: "145029304266",
    appId: "1:145029304266:web:8951e319356b32f6604933",
    measurementId: "G-97G7PQM12N"
};

// Inizializza Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Controllo Password
function checkPassword() {
    const pwd = document.getElementById('class-password').value;
    
    if (pwd === 'scuola3f') {
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('app').classList.remove('hidden');
        listenForPosts(); // Avvia il caricamento dei messaggi online
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

document.getElementById('class-password').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// Navigazione tra le sezioni
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => {
        sec.classList.remove('active');
        sec.classList.add('hidden');
    });

    const activeSection = document.getElementById(sectionId);
    activeSection.classList.remove('hidden');
    activeSection.classList.add('active');
}

// Lettura messaggi in tempo reale
function listenForPosts() {
    database.ref('messaggi').on('value', (snapshot) => {
        const data = snapshot.val();
        const container = document.getElementById('posts-container');
        container.innerHTML = '';

        if (data) {
            Object.keys(data).reverse().forEach(key => {
                const post = data[key];
                const div = document.createElement('div');
                div.className = 'post';
                div.innerHTML = `<strong>${post.autore}</strong> <span style="color: #7f8c8d; font-size: 0.8em;">(${post.ora})</span><br><br>${post.testo}`;
                container.appendChild(div);
            });
        }
    });
}

// Invia messaggi al database condiviso
function addPost() {
    const input = document.getElementById('new-post');
    const text = input.value.trim();

    if (text !== '') {
        const oggi = new Date();
        const ore = oggi.getHours().toString().padStart(2, '0');
        const minuti = oggi.getMinutes().toString().padStart(2, '0');
        const orario = `${ore}:${minuti}`;

        database.ref('messaggi').push({
            autore: 'Un compagno',
            ora: orario,
            testo: text
        });

        input.value = '';
    }
}

document.getElementById('new-post').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addPost();
    }
});