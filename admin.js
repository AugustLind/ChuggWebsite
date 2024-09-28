// Define your repository and file details
const repoOwner = 'your-username';  // Replace with your GitHub username
const repoName = 'your-repo';       // Replace with your repository name
const filePath = 'data.json';       // The path to your JSON file
const branchName = 'main';          // Replace with your branch name

// Your personal access token (Keep this secure)
const token = 'YOUR_PERSONAL_ACCESS_TOKEN';  // Replace with your GitHub token

// Function to get data from GitHub repository
async function fetchData() {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=${branchName}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3.raw' // Ensure we get raw JSON content
    }
  });
  return response.json();
}

// Function to save data to GitHub repository
async function saveDataToGitHub(newContent) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
  try {
    // Get the current file SHA to update it
    const fileData = await fetchData();

    // Prepare the new content for the request
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: 'Update data.json with new changes',
        content: btoa(unescape(encodeURIComponent(JSON.stringify(newContent, null, 2)))), // Convert content to base64
        sha: fileData.sha, // Include the current SHA of the file
        branch: branchName
      })
    });

    if (response.ok) {
      alert('Data saved successfully to GitHub!');
    } else {
      alert('Failed to save data to GitHub.');
    }
  } catch (error) {
    console.error(error);
    alert('Error saving data to GitHub.');
  }
}

// Function to extract table data for saving
function extractTableData(table) {
  const data = [];
  for (let i = 1; i < table.rows.length; i++) { // Skip header row
    data.push({
      placement: table.rows[i].cells[0].innerText,
      name: table.rows[i].cells[1].innerText,
      value: table.rows[i].cells[2].innerText
    });
  }
  return data;
}

// Function to save all data when changes are made
function saveData() {
  const chuggersTable = document.getElementById('resultsTable');
  const swimsTable = document.getElementById('resultsTable2');
  const buranTable = document.getElementById('resultsTable3');
  const ufyseligTable = document.getElementById('resultsTable4');
  const vektTable = document.getElementById('resultsTable5');

  const chuggersData = extractTableData(chuggersTable);
  const swimsData = extractTableData(swimsTable);
  const buranData = extractTableData(buranTable);
  const ufyseligData = extractTableData(ufyseligTable);
  const vektData = extractTableData(vektTable);

  const updatedData = {
    chuggers: chuggersData,
    swims: swimsData,
    buran: buranData,
    ufyselig: ufyseligData,
    vekt: vektData
  };

  saveDataToGitHub(updatedData);
}

// Function to reset data in the admin panel
function resetData() {
  if (confirm('Are you sure you want to reset the data? This action cannot be undone.')) {
    // Reset the local tables (optional)
    document.getElementById('resultsTable').innerHTML = '';
    document.getElementById('resultsTable2').innerHTML = '';
    document.getElementById('resultsTable3').innerHTML = '';
    document.getElementById('resultsTable4').innerHTML = '';
    document.getElementById('resultsTable5').innerHTML = '';

    // Reset `data.json` file in GitHub to its initial state
    const initialData = {
      chuggers: [],
      swims: [],
      buran: [],
      ufyselig: [],
      vekt: []
    };
    saveDataToGitHub(initialData);
  }
}

// Fetch and populate data when the admin page loads
window.onload = () => {
  fetchData().then((data) => {
    console.log('Fetched data:', data);

    // Assign placements for all data sets
    assignPlacement(data.chuggers, 'time');
    assignPlacement(data.swims, 'swims');
    assignPlacement(data.buran, 'trips');
    assignPlacement(data.ufyselig, 'rating');
    assignPlacement(data.vekt, 'weight');

    // Populate all tables with respective data
    populateTable('resultsTable', data.chuggers, ['placement', 'name', 'time']);
    populateTable('resultsTable2', data.swims, ['placement', 'name', 'swims']);
    populateTable('resultsTable3', data.buran, ['placement', 'name', 'trips']);
    populateTable('resultsTable4', data.ufyselig, ['placement', 'name', 'rating']);
    populateTable('resultsTable5', data.vekt, ['placement', 'name', 'weight']);
  }).catch((error) => {
    console.error('Failed to fetch data from GitHub:', error);
    alert('Error fetching data from GitHub.');
  });
};
