// Sample data structure for each table
let chuggers = JSON.parse(localStorage.getItem('chuggers')) || [
    { placement: 1, name: 'August', time: 2.45 },
    { placement: 2, name: 'Aleksander', time: 3.11 },
];

let swims = JSON.parse(localStorage.getItem('swims')) || [
    { placement: 1, name: 'Torodd', swims: 2 },
];

let buran = JSON.parse(localStorage.getItem('buran')) || [
    { placement: 1, name: 'Torodd', trips: 1 },
];

let ufyselig = JSON.parse(localStorage.getItem('ufyselig')) || [
    { placement: 1, name: 'Espen', rating: 100 },
];

let vekt = JSON.parse(localStorage.getItem('vekt')) || [
    { placement: 1, name: 'Jonas', weight: 99.9 },
];

// Function to add or update a row in a specified table
function addRow(table) {
    let name, value;

    // Get values based on the table being updated
    if (table === 'chuggers') {
        name = document.getElementById('chuggersName').value;
        value = parseFloat(document.getElementById('chuggersTime').value);
        addOrUpdateEntry(chuggers, { name, time: value }, 'time');
    } else if (table === 'swims') {
        name = document.getElementById('swimsName').value;
        value = parseInt(document.getElementById('swimsCount').value);
        addOrUpdateEntry(swims, { name, swims: value }, 'swims');
    }

    saveData();  // Save data to localStorage after update
}

// Function to add or update an entry in the table array
function addOrUpdateEntry(array, newItem, key) {
    const index = array.findIndex(item => item.name === newItem.name);

    if (index !== -1) {
        array[index][key] = newItem[key]; // Update existing entry
    } else {
        array.push(newItem); // Add new entry
    }

    // Automatically re-assign placements
    assignPlacement(array, key);
}

// Function to save data to localStorage
function saveData() {
    localStorage.setItem('chuggers', JSON.stringify(chuggers));
    localStorage.setItem('swims', JSON.stringify(swims));
    localStorage.setItem('buran', JSON.stringify(buran));
    localStorage.setItem('ufyselig', JSON.stringify(ufyselig));
    localStorage.setItem('vekt', JSON.stringify(vekt));

    alert('Data saved successfully!');
}

// Function to reset all data to default
function resetData() {
    localStorage.removeItem('chuggers');
    localStorage.removeItem('swims');
    localStorage.removeItem('buran');
    localStorage.removeItem('ufyselig');
    localStorage.removeItem('vekt');
    alert('Data has been reset. Please reload the page.');
}

// Function to sort and assign placements with tie handling (same as in script.js)
const assignPlacement = (data, valueKey) => {
    data.sort((a, b) => (a[valueKey] === 'DNF') ? 1 : (b[valueKey] === 'DNF') ? -1 : a[valueKey] - b[valueKey]);

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
