// Firebase configuration and initialization
const firebaseConfig = {
    apiKey: "AIzaSyA_rWHPIhF6G4R3or0LIBPmuMxu0WPMfeI",
    authDomain: "chuggwebsite.firebaseapp.com",
    databaseURL: "https://chuggwebsite-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chuggwebsite",
    storageBucket: "chuggwebsite.appspot.com",
    messagingSenderId: "439420564270",
    appId: "1:439420564270:web:9718338edec76f723c40bf",
    measurementId: "G-S903DX3Z35"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Reference to the correct path in the database (e.g., "chuggers" instead of "contactForm")
const chuggersDB = database.ref("chuggers");

// Add event listener for form submission
document.getElementById("contactForm").addEventListener("submit", submitForm);

// Function to handle form submission
function submitForm(e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = getElementVal("name");
    const time = parseFloat(getElementVal("time")); // Convert time to a number

    if (!name || isNaN(time)) {
        alert("Please enter valid values for both fields.");
        return;
    }

    // Save message to Firebase under the correct node (e.g., "chuggers")
    saveMessages(name, time);

    // Show success alert
    document.querySelector(".alert").style.display = "block";

    // Hide alert after 3 seconds
    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 3000);

    // Reset the form
    document.getElementById("contactForm").reset();
}

// Function to save messages to the specified Firebase path (e.g., "chuggers")
const saveMessages = (name, time) => {
    const newChuggerEntry = chuggersDB.push();

    newChuggerEntry.set({
        name: name,
        time: time,
    });
};

// Function to get values of form fields
const getElementVal = (id) => {
    return document.getElementById(id).value;
};
