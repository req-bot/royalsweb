const express = require('express')
const axios = require('axios');

const app = express()
const port = 3000

app.get('/', (req, res) => {
    axios
    .get('https://brassy-pacific-lunaria.glitch.me/')
    .then(res => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);
    })
    .catch(error => {
      console.error(error);
    });
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
