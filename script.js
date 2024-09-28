// Function to get data from GitHub repository
async function fetchData() {
    const url = `https://api.github.com/repos/your-username/your-repo/contents/data.json?ref=main`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `token YOUR_PERSONAL_ACCESS_TOKEN`,
        'Accept': 'application/vnd.github.v3.raw'
      }
    });
    return response.json();
  }
  
  // Load and display data when index.html loads
  window.onload = () => {
    fetchData().then((data) => {
      console.log('Fetched data:', data);
  
      // Populate all tables with respective data
      assignPlacement(data.chuggers, 'time');
      assignPlacement(data.swims, 'swims');
      assignPlacement(data.buran, 'trips');
      assignPlacement(data.ufyselig, 'rating');
      assignPlacement(data.vekt, 'weight');
  
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
  