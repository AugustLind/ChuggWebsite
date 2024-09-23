const chuggers = [
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
    { placement: 28, name: 'Aslak', time: 'DNF'}
];

const swims = [
    { placement: 1, name: 'Torodd', swims: 2 },
    { placement: 2, name: 'Elias', swims: 1 },
    { placement: 2, name: 'Ole', swims: 1 },
];

const buran = [
    { placement: 1, name: 'Torodd', trips: 1 },
];

const ufyselig = [
    { placement: 1, name: 'Espen', rating: 100 },
    { placement: 2, name: 'Elias', rating: 99 },
];


const vekt = [
    { placement: 1, name: 'Jonas', rating: 99.9 },
    { placement: 2, name: 'Jonas', rating: 81.9}, 
    { placement: 3, name: 'Alexey', rating: 81.70},
    { placement: 3, name: 'Elias', rating: 81.70},
    { placement: 5, name: 'Erik', rating: 77.8},
    { placement: 6, name: 'Aleks', rating: 75.4},
    { placement: 7, name: 'Elilan', rating: 69.9},
];



// Function to populate the table based on the data and columns
const populateTable = (tableId, data, columns) => {
    const tableBody = document.querySelector(`#${tableId} tbody`);
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
    populateTable('resultsTable', chuggers, ['placement', 'name', 'time']);
    populateTable('resultsTable2', swims, ['placement', 'name', 'swims']);
    populateTable('resultsTable3', buran, ['placement', 'name', 'trips']);
    populateTable('resultsTable4', ufyselig, ['placement', 'name', 'rating']);
    populateTable('resultsTable5', vekt, ['placement', 'name', 'weight']);
};
