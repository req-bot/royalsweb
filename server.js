const express = require('express')
var XMLHttpRequest = require('xhr2');

const app = express()
const port = 3000

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

app.get('/', (req, res) => {
  console.log(httpGet(process.env.MYURL))
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
