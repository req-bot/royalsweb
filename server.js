const express = require('express')
var XMLHttpRequest = require('xhr2');

const app = express()
const port = 3000

function httpGet(theUrl) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function() {
        initialArray = JSON.parse(xhr.response);
    }, false);
    xhr.open('GET', theUrl);
    return xhr;
}

app.get('/', (req, res) => {
  console.log(httpGet(process.env.MYURL))
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
