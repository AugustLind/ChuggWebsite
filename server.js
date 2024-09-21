// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Set up EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Hardcoded data for the table
const chuggers = [
  { placement: 1, name: 'August Lind', time: '5:32' },
  { placement: 2, name: 'John Doe', time: '5:55' },
  { placement: 3, name: 'Jane Smith', time: '6:10' },
  { placement: 4, name: 'Emily Johnson', time: '6:33' },
  { placement: 5, name: 'Chris Lee', time: '6:45' },
];

// Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'Chugg Race Results', chuggers });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
