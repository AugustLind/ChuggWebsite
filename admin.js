// Import Firebase SDK modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';

// Firebase configuration object
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("adminForm");
    const responseMessage = document.getElementById("responseMessage");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Get form values
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const category = document.getElementById("category").value;

        // Create a new entry object
        const newEntry = {
            title: title,
            description: description,
            category: category,
            timestamp: new Date() // Add timestamp
        };

        try {
            // Add a new document to the 'entries' collection in Firestore
            const docRef = await addDoc(collection(db, "entries"), newEntry);
            responseMessage.textContent = `Entry added successfully! Document ID: ${docRef.id}`;
            responseMessage.style.color = "green";
            form.reset();
        } catch (error) {
            responseMessage.textContent = "Error adding entry: " + error.message;
            responseMessage.style.color = "red";
        }
    });
});
