import app from './app.js';

// 4) Connection
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});