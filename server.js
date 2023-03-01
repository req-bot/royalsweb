var express = require('express');
var app = express();
var PORT = 3000;

// Without middleware
app.get('/', function(req, res){
	res.send('Validating You.... wait for 5 seconds')
	setTimeout(function() {
		window.location ='https://req-bot.github.io/Validator/';
	}, 5000)
});

app.listen(PORT, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
