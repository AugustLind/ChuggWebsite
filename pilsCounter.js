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

// Fetch data from Firebase database and include keys
const fetchDataFromFirebase = async (path) => {
    const snapshot = await database.ref(path).once('value');
    const data = snapshot.val();

    // Convert data to array and include keys
    return data ? Object.keys(data).map(key => ({ ...data[key], key })) : [];
};

// Function to sort and assign placements with tie handling
const assignPlacement = (data, valueKey, ascending = true) => {
    data.sort((a, b) => {
        if (a[valueKey] === 'DNF') return 1;
        if (b[valueKey] === 'DNF') return -1;
        return ascending ? a[valueKey] - b[valueKey] : b[valueKey] - a[valueKey];
    });

    let placement = 1;
    for (let i = 0; i < data.length; i++) {
        if (i > 0 && data[i][valueKey] === data[i - 1][valueKey]) {
            data[i].placement = data[i - 1].placement;
        } else {
            data[i].placement = placement;
        }
        placement++;
    }
};

// Function to load data and populate tables
const loadDataAndPopulateTables = async () => {
    try {
        // Fetch data from 'pils' node and include keys
        const pils = await fetchDataFromFirebase('pils') || [];
        console.log("Pils data:", pils);

        // Assign placements for each dataset
        assignPlacement(pils, 'number', false); // Sort chuggers by number descending

        // Populate table with data
        populateTable('resultsTable', pils, ['placement', 'name', 'number']);
    } catch (error) {
        console.error("Error loading data:", error);
    }
};

// Function to populate the table based on the data and columns
const populateTable = (tableId, data, columns) => {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = ''; // Clear the table body before populating

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        columns.forEach((column) => {
            const cell = document.createElement('td');
            if (column === 'name' && item.placement <= 3) {
                if (item.placement === 1) {
                    cell.innerHTML = `<span class="medal-gold">🥇</span> ${item.name}`;
                } else if (item.placement === 2) {
                    cell.innerHTML = `<span class="medal-silver">🥈</span> ${item.name}`;
                } else if (item.placement === 3) {
                    cell.innerHTML = `<span class="medal-bronze">🥉</span> ${item.name}`;
                }
            } else {
                cell.textContent = item[column];
            }
            row.appendChild(cell);
        });

        // Add new cell for the button
        const buttonCell = document.createElement('td');
        const incrementButton = document.createElement('button');
        incrementButton.textContent = '+';
        incrementButton.onclick = () => incrementNumber(index, item.key); // Pass key to increment function
        buttonCell.appendChild(incrementButton);
        row.appendChild(buttonCell);

        tableBody.appendChild(row);
    });
};

// Function to increment the number and update Firebase
const incrementNumber = (index, key) => {
    // Get the current data from the table
    const tableData = document.querySelectorAll('#resultsTable tbody tr');
    const numberCell = tableData[index].querySelectorAll('td')[2]; // Get the 'Number' cell
    const currentValue = parseInt(numberCell.textContent);

    // Increment the value and update the cell
    const newValue = currentValue + 1;
    numberCell.textContent = newValue;

    // Update the value in Firebase using the key
    updateFirebaseValue('pils', key, newValue);
};

// Function to update the value in Firebase using the item's unique key
const updateFirebaseValue = (path, key, newValue) => {
    const ref = database.ref(`${path}/${key}`);
    ref.update({ number: newValue }, (error) => {
        if (error) {
            console.error("Error updating Firebase:", error);
        } else {
            console.log(`Successfully updated number to ${newValue} for key: ${key}`);
        }
    });
};

// Populate tables on window load
window.onload = loadDataAndPopulateTables;
