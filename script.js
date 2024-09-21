// Static data for the race results
const chuggers = [
    { placement: 1, name: 'August Lind', time: '5:32' },
    { placement: 2, name: 'John Doe', time: '5:55' },
    { placement: 3, name: 'Jane Smith', time: '6:10' },
    { placement: 4, name: 'Emily Johnson', time: '6:33' },
    { placement: 5, name: 'Chris Lee', time: '6:45' }
  ];
  
  // Function to populate the table with data
  const populateTable = () => {
    const tableBody = document.querySelector("#resultsTable tbody");
  
    chuggers.forEach(chugger => {
      const row = document.createElement('tr');
  
      const placementCell = document.createElement('td');
      placementCell.textContent = chugger.placement;
      row.appendChild(placementCell);
  
      const nameCell = document.createElement('td');
      nameCell.textContent = chugger.name;
      row.appendChild(nameCell);
  
      const timeCell = document.createElement('td');
      timeCell.textContent = chugger.time;
      row.appendChild(timeCell);
  
      tableBody.appendChild(row);
    });
  };
  
  // Call function to populate the table on page load
  window.onload = populateTable;
  