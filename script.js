// Load data from localStorage or fall back to default values
const chuggers = JSON.parse(localStorage.getItem('chuggers')) || [
    { placement: 1, name: 'August', time: 2.45 },
    { placement: 2, name: 'August', time: 2.75 },
    { placement: 3, name: 'August', time: 3.03 },
    { placement: 4, name: 'Aleksander', time: 3.11 },
    { placement: 5, name: 'August', time: 3.12 },
    { placement: 6, name: 'Edi', time: 3.13 },
    { placement: 7, name: 'Ole', time: 3.21 },
    { placement: 8, name: 'Aleksander', time: 3.23 },
    { placement: 9, name: 'Andreas', time: 3.40 },
    { placement: 9, name: 'Torodd', time: 3.40 },
    { placement: 10, name: 'Andreas', time: 3.44 },
    { placement: 11, name: 'Fredrik', time: 3.48 },
    { placement: 12, name: 'Mats', time: 3.77 },
    { placement: 13, name: 'Emil', time: 3.81 },
    { placement: 14, name: 'Elliot', time: 4.00 },
    { placement: 15, name: 'Lars', time: 4.11 },
    { placement: 16, name: 'Lars', time: 4.35 },
    { placement: 17, name: 'Benjamin', time: 4.44 },
    { placement: 18, name: 'Tobias', time: 4.53 },
    { placement: 19, name: 'Henrik', time: 4.58 },
    { placement: 20, name: 'Erik Bohne', time: 5.02 },
    { placement: 21, name: 'Even', time: 5.03 },
    { placement: 22, name: 'Erik Gruppe 1', time: 5.28 },
    { placement: 23, name: 'Tora', time: 5.28 },
    { placement: 24, name: 'Arthur', time: 5.70 },
    { placement: 25, name: 'Iver', time: 6.60 },
    { placement: 26, name: 'Emma', time: 7.30 },
    { placement: 27, name: 'Sara', time: 7.58 },
    { placement: 28, name: 'Aslak', time: 'DNF'},
    { placement: 28, name: 'August', time: 2.56},
    { placement: 28, name: 'August', time: 2.73},
    { placement: 28, name: 'Aleksander', time: 2.87},
    { placement: 28, name: 'Edi', time: 4.80},
];

const swims = JSON.parse(localStorage.getItem('swims')) || [
    { placement: 1, name: 'Torodd', swims: 2 },
    { placement: 2, name: 'Elias', swims: 1 },
    { placement: 2, name: 'Ole', swims: 1 },
];

const buran = JSON.parse(localStorage.getItem('buran')) || [
    { placement: 1, name: 'Torodd', trips: 1 },
];

const ufyselig = JSON.parse(localStorage.getItem('ufyselig')) || [
    { placement: 1, name: 'Espen', rating: 100 },
    { placement: 2, name: 'Elias', rating: 99 },
];

const vekt = JSON.parse(localStorage.getItem('vekt')) || [
    { placement: 1, name: 'Jonas', weight: 99.9 },
    { placement: 2, name: 'Jonas', weight: 81.9 },
    { placement: 3, name: 'Alexey', weight: 81.70 },
    { placement: 3, name: 'Elias', weight: 81.70 },
    { placement: 5, name: 'Erik', weight: 77.8 },
    { placement: 6, name: 'Aleks', weight: 75.4 },
    { placement: 7, name: 'Elilan', weight: 69.9 },
];

// Function to sort and assign placements with tie handling
const assignPlacement = (data, valueKey) => {
    // Sort the data by the specified valueKey (time, weight, rating, etc.)
    data.sort((a, b) => {
        // Handle 'DNF' (Did Not Finish) separately by putting it at the end
        if (a[valueKey] === 'DNF') return 1;
        if (b[valueKey] === 'DNF') return -1;
        return a[valueKey] - b[valueKey];
    });

    let placement = 1;
    for (let i = 0; i < data.length; i++) {
        // Check if this value is the same as the previous one, and if so, assign the same placement
        if (i > 0 && data[i][valueKey] === data[i - 1][valueKey]) {
            data[i].placement = data[i - 1].placement;
        } else {
            // Assign the new placement and increment it for the next item
            data[i].placement = placement;
        }
        placement++;
    }
};

// Function to populate the table based on the data and columns
const populateTable = (tableId, data, columns) => {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = ''; // Clear the table body before populating

    data.forEach(item => {
        const row = document.createElement('tr');

        columns.forEach((column) => {
            const cell = document.createElement('td');

            // Check if we're rendering the name column and the placement is in the top 3
            if (column === 'name' && item.placement <= 3) {
                // Add medals for the top 3 placements
                if (item.placement === 1) {
                    cell.innerHTML = `<span class="medal-gold">🥇</span> ${item.name}`;
                } else if (item.placement === 2) {
                    cell.innerHTML = `<span class="medal-silver">🥈</span> ${item.name}`;
                } else if (item.placement === 3) {
                    cell.innerHTML = `<span class="medal-bronze">🥉</span> ${item.name}`;
                }
            } else {
                // Otherwise, just set the text content
                cell.textContent = item[column];
            }

            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
};

// Populate all tables with respective data
window.onload = () => {
    // Assign placements and populate tables on load
    assignPlacement(chuggers, 'time');
    assignPlacement(swims, 'swims');
    assignPlacement(buran, 'trips');
    assignPlacement(ufyselig, 'rating');
    assignPlacement(vekt, 'weight');

    // Populate all tables with respective data
    populateTable('resultsTable', chuggers, ['placement', 'name', 'time']);
    populateTable('resultsTable2', swims, ['placement', 'name', 'swims']);
    populateTable('resultsTable3', buran, ['placement', 'name', 'trips']);
    populateTable('resultsTable4', ufyselig, ['placement', 'name', 'rating']);
    populateTable('resultsTable5', vekt, ['placement', 'name', 'weight']);
};

