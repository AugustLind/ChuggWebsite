// Static data for the race results
const chuggers = [
    { placement: 1, name: 'August', time: 2.45 },
    { placement: 2, name: 'August', time: 3.03 },
    { placement: 3, name: 'Aleksander', time: 3.11 },
    { placement: 4, name: 'August', time: 3.12 },
    { placement: 5, name: 'Edi', time: 3.13 },
    { placement: 6, name: 'Ole', time: 3.21 },
    { placement: 7, name: 'Aleksander', time: 3.23 },
    { placement: 8, name: 'Andreas', time: 3.40 },
    { placement: 9, name: 'Torodd', time: 3.40 },
    { placement: 10, name: 'Andreas', time: 3.44 },
    { placement: 11, name: 'Fredrik', time: 3.48 },
    { placement: 12, name: 'Mats', time: 3.77 },
    { placement: 13, name: 'Emil', time: 3.81 },
    { placement: 14, name: 'Elliot', time: 4.00 },
    { placement: 15, name: 'Lars', time: 4.11 },
    { placement: 16, name: 'Lars', time: 4.35 },
    { placement: 17, name: 'Benjamin', time: 4.44 },
    { placement: 18, name: 'Erik Bohne', time: 5.02 },
    { placement: 19, name: 'Even', time: 5.03 },
    { placement: 20, name: 'Erik Gruppe 1', time: 5.28 },
    { placement: 21, name: 'Tora', time: 5.28 },
    { placement: 22, name: 'Arthur', time: 5.70 },
    { placement: 23, name: 'Iver', time: 6.60 },
    { placement: 24, name: 'Emma', time: 7.30 },
    { placement: 25, name: 'Sara', time: 7.58 },
    { placement: 26, name: 'Aslak', time: 1000 }
  ];
  
  // Function to populate the table with data
  const populateTable = () => {
    const tableBody = document.querySelector("#resultsTable tbody");
  
    chuggers.forEach(chugger => {
      const row = document.createElement('tr');
  
      // Placement cell
      const placementCell = document.createElement('td');
      placementCell.textContent = chugger.placement;
      row.appendChild(placementCell);
  
      // Name cell with medals for top 3
      const nameCell = document.createElement('td');
      nameCell.classList.add('name-cell');
  
      if (chugger.placement === 1) {
        nameCell.innerHTML = `<span class="medal-gold">🥇</span> ${chugger.name}`;
      } else if (chugger.placement === 2) {
        nameCell.innerHTML = `<span class="medal-silver">🥈</span> ${chugger.name}`;
      } else if (chugger.placement === 3) {
        nameCell.innerHTML = `<span class="medal-bronze">🥉</span> ${chugger.name}`;
      } else {
        nameCell.textContent = chugger.name;
      }
      row.appendChild(nameCell);
  
      // Time cell
      const timeCell = document.createElement('td');
      timeCell.textContent = chugger.time;
      row.appendChild(timeCell);
  
      tableBody.appendChild(row);
    });
  };
  
  // Call function to populate the table on page load
  window.onload = populateTable;