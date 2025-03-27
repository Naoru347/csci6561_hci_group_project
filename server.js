const express = require('express');
const app = express();

app.use(express.static('Public'));
app.use(express.text());

app.post('/update', (req, res) => {
  const receivedText = req.body;
  console.log('Received tex: ', receivedText);
  res.send('Text received successfully')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
