import app from './app.js';

// Server Connection
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});