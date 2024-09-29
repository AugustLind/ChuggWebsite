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

// Fetch data from Firebase database
const fetchDataFromFirebase = async (path) => {
  const snapshot = await database.ref(path).once('value');
  const data = snapshot.val();
  // Check if data is an object and convert it to an array
  return data ? (Array.isArray(data) ? data : Object.values(data)) : [];
};

// Function to sort and assign placements with tie handling
const assignPlacement = (data, valueKey, ascending = true) => {
  // Modify sort logic based on ascending parameter
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
      // Prøv å hente direkte fra roten for hver kategori
      const chuggers = await fetchDataFromFirebase('chuggers') || [];
      console.log("Chuggers data:", chuggers);

      const swims = await fetchDataFromFirebase('swims') || [];
      console.log("Swims data:", swims);

      const buran = await fetchDataFromFirebase('buran') || [];
      console.log("Buran data:", buran);

      const ufyselig = await fetchDataFromFirebase('ufyselig') || [];
      console.log("Ufyselig data:", ufyselig);

      const vekt = await fetchDataFromFirebase('vekt') || [];
      console.log("Vekt data:", vekt);

      // Assign placements for each dataset
      assignPlacement(chuggers, 'time', true); // Sort chuggers by time ascending
      assignPlacement(swims, 'swims', false);  // Sort swims by swims descending
      assignPlacement(buran, 'trips', false);  // Sort buran by trips descending
      assignPlacement(ufyselig, 'rating', false); // Sort ufyselig by rating descending
      assignPlacement(vekt, 'weight', false); // Sort vekt by weight descending

      // Populate all tables with respective data
      populateTable('resultsTable', chuggers, ['placement', 'name', 'time']);
      populateTable('resultsTable2', swims, ['placement', 'name', 'swims']);
      populateTable('resultsTable3', buran, ['placement', 'name', 'trips']);
      populateTable('resultsTable4', ufyselig, ['placement', 'name', 'rating']);
      populateTable('resultsTable5', vekt, ['placement', 'name', 'weight']);
  } catch (error) {
      console.error("Error loading data:", error);
  }
};

// Populate tables on window load
window.onload = loadDataAndPopulateTables;

// Function to populate the table based on the data and columns
const populateTable = (tableId, data, columns) => {
  const tableBody = document.querySelector(`#${tableId} tbody`);
  tableBody.innerHTML = ''; // Clear the table body before populating

  data.forEach(item => {
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
      tableBody.appendChild(row);
  });
};
