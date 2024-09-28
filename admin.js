// admin.js

// Function to add or update a row in a specific table
function addRow(tableId) {
    const nameField = document.getElementById(`${tableId}Name`).value;
    const valueField = tableId === 'chuggers' ? document.getElementById('chuggersTime').value : document.getElementById('swimsCount').value;

    // Create a new row or update existing one
    const table = document.getElementById(`${tableId}Table`) || createTable(tableId);
    let rowExists = false;
    for (const row of table.rows) {
        if (row.cells[0].innerText === nameField) {
            row.cells[1].innerText = valueField;
            rowExists = true;
            break;
        }
    }
    if (!rowExists) {
        const newRow = table.insertRow(-1);
        newRow.insertCell(0).innerText = nameField;
        newRow.insertCell(1).innerText = valueField;
    }
    document.getElementById(`${tableId}Form`).reset();  // Reset the form
}

// Function to create a new table if it doesn't exist
function createTable(tableId) {
    const table = document.createElement('table');
    table.id = `${tableId}Table`;
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>${tableId === 'chuggers' ? 'Time' : 'Swims'}</th>
        </tr>`;
    document.body.appendChild(table);
    return table;
}

// Function to save data (extend this to use localStorage or GitHub API)
function saveData() {
    const chuggersTable = document.getElementById('chuggersTable');
    const swimsTable = document.getElementById('swimsTable');
    if (chuggersTable && swimsTable) {
        const chuggersData = extractTableData(chuggersTable);
        const swimsData = extractTableData(swimsTable);

        // Example: Save to local storage
        localStorage.setItem('chuggersData', JSON.stringify(chuggersData));
        localStorage.setItem('swimsData', JSON.stringify(swimsData));
        alert('Data saved successfully!');
    } else {
        alert('No data to save!');
    }
}

// Function to extract data from table
function extractTableData(table) {
    const data = [];
    for (let i = 1; i < table.rows.length; i++) {  // Skip header row
        data.push({
            name: table.rows[i].cells[0].innerText,
            value: table.rows[i].cells[1].innerText
        });
    }
    return data;
}

// Function to reset data
function resetData() {
    localStorage.removeItem('chuggersData');
    localStorage.removeItem('swimsData');
    alert('Data reset successfully!');
}
