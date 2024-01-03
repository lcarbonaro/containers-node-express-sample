const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    JUST TESTING
  `);
});

app.get('/test', (req, res) => {
  res.json(
    {id:1, msg:"just a test", isMember:true}
  );
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
