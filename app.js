var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var exec = require('child_process').exec;

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.post('/payload', function (req, res) {
	//verify that the payload is a push from the correct repo
	//verify repository.name == 'wackcoon-device' or repository.full_name = 'DanielEgan/wackcoon-device'
	//let isNotEmpty = req.body.pusher.name =null ||req.body.repository.name =null
	//if(isNotEmpty){
//	console.log(req.body.pusher.name + ' just pushed to ' + req.body.repository.name);
	console.log(req.body)
	console.log('pulling code from GitHub...');

	// reset any changes that have been made locally
		exec('git -C \Users\Phuong\Desktop\wackcoon-hook-master\wackcoon-hook-master reset --hard', execCallback +'resst');

		// and ditch any files that have been added locally too
	//	exec('git -C \Users\Phuong\Desktop\wackcoon-hook-master\wackcoon-hook-master clean -df', execCallback);

		// now pull down the latest
		exec('git -C \Users\Phuong\Desktop\wackcoon-hook-master\wackcoon-hook-master pull -f', execCallback+'pull');

		// and npm install with --production
		exec('npm -C \Users\Phuong\Desktop\wackcoon-hook-master\wackcoon-hook-master start', execCallback+'str');

	// and run tsc
//	exec('tsc', execCallback);


res.sendStatus(200);
res.end();
	//}else{
	//	console.log('not github pull')
//	}
});
app.listen(8080, function () {
	console.log('listening on port 8080')
});

function execCallback(err, stdout, stderr) {
	if(stdout) console.log(stdout);
	if(stderr) console.log(stderr);
}