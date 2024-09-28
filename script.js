// Function to assign placement based on sorted data
const assignPlacement = (data, valueKey) => {
    data.sort((a, b) => {
        if (a[valueKey] === 'DNF') return 1;
        if (b[valueKey] === 'DNF') return -1;
        return a[valueKey] - b[valueKey];
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

// Function to populate the table based on the data and columns
const populateTable = (tableId, data, columns) => {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');

        columns.forEach(column => {
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

        tableBody.appendChild(row);
    });
};

// Function to read data from Firebase Realtime Database
const readDataFromFirebase = () => {
    const chuggersRef = database.ref('chuggers');
    const swimsRef = database.ref('swims');
    const buranRef = database.ref('buran');
    const ufyseligRef = database.ref('ufyselig');
    const vektRef = database.ref('vekt');

    chuggersRef.on('value', (snapshot) => {
        const chuggers = snapshot.val() || [];
        assignPlacement(chuggers, 'time');
        populateTable('resultsTable', chuggers, ['placement', 'name', 'time']);
    });

    swimsRef.on('value', (snapshot) => {
        const swims = snapshot.val() || [];
        assignPlacement(swims, 'swims');
        populateTable('resultsTable2', swims, ['placement', 'name', 'swims']);
    });

    buranRef.on('value', (snapshot) => {
        const buran = snapshot.val() || [];
        assignPlacement(buran, 'trips');
        populateTable('resultsTable3', buran, ['placement', 'name', 'trips']);
    });

    ufyseligRef.on('value', (snapshot) => {
        const ufyselig = snapshot.val() || [];
        assignPlacement(ufyselig, 'rating');
        populateTable('resultsTable4', ufyselig, ['placement', 'name', 'rating']);
    });

    vektRef.on('value', (snapshot) => {
        const vekt = snapshot.val() || [];
        assignPlacement(vekt, 'weight');
        populateTable('resultsTable5', vekt, ['placement', 'name', 'weight']);
    });
};

