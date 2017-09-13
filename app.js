var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var exec = require('child_process').exec;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.htm');
	console.log('get /');
});

app.get('/payload', function (req, res) {
    res.sendStatus(200);
	console.log('get /payload');
});

app.post('/payload', function (req, res) {
	//verify that the payload is a push from the correct repo
	//verify repository.name == 'wackcoon-device' or repository.full_name = 'DanielEgan/wackcoon-device'
	console.log(req.body.pusher.name + ' just pushed to ' + req.body.repository.name);

	console.log('pulling code from GitHub...');

	// reset any changes that have been made locally
	exec('git -C ~/Desktop/wackcoon-hook-master/wackcoon-hook-master reset --hard', execCallback);

	// and ditch any files that have been added locally too
	exec('git -C ~/Desktop/wackcoon-hook-master/wackcoon-hook-master clean -df', execCallback);

	// now pull down the latest
	exec('git -C ~/Desktop/wackcoon-hook-master/wackcoon-hook-master pull -f', execCallback);

	// and npm install with --production
	exec('npm -C ~/Desktop/wackcoon-hook-master/wackcoon-hook-master install --production', execCallback);

	// and run tsc
	exec('tsc', execCallback);


res.sendStatus(200);
res.end();
});
app.listen(5000, function () {
	console.log('listening on port 5000')
});

function execCallback(err, stdout, stderr) {
	if(stdout) console.log(stdout);
	if(stderr) console.log(stderr);
}