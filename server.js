const express = require('express')
const axios = require('axios');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  var myArray = [https://climbing-forest-virgo.glitch.me/];
  var arrayLength = myArray.length;
  for (var i = 0; i < arrayLength; i++) {
    console.log(myArray[i]);
    axios
    .get(value)
    .then(res => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);
    })
    .catch(error => {
      console.error(error);
    });
  }
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
