var crypto = require('crypto'),
    express = require('express'),
    ffmpeg = require('fluent-ffmpeg'),
    fs = require('fs'),
    util = require('util'),
    child_process = require('child_process'),
    AWS = require('aws-sdk');

var s3 = new AWS.S3();

//AWS.config.update({region: 'us-east-1a'});

module.exports = function(app){
    var userImageFile = "https://mean-project-palefeb.c9.io/img/userskitchen.jpg";
    var outputVideo = "https://mean-project-palefeb.c9.io/videos/output.mp4";
    var exec = child_process.exec;
    app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.render('index', {});
    console.log("rendering file")
	var userImageFile = "./kitchen_8.jpg";
	var maytagAudioFile = "./audio.aif";
	var maytagOverlayFile = "./frankerberry_countchockula.mp4";
	var exec = child_process.exec;
	var xCoord = 500;
	var yCoord = 200;
	var vWidth = 270;
	var vHeight = 470;
	var inputFiles = ['./kitchen_8.jpg'];

	exec('ffmpeg -loop 1 -i '+userImageFile+' -c:v libx264 -c:a aac -strict experimental -t 30 -pix_fmt yuv420p loopedImage.mp4;',function(){
		var newVideo = 'loopedImage.mp4';
		console.log("inside");
		ffmpeg(newVideo).mergeAdd(maytagAudioFile).mergeAdd(newVideo).addOption(['-vf', 'movie='+maytagOverlayFile+ ' [watermark]; [in] [watermark] overlay=shortest=1:x='+xCoord+':y='+yCoord+' [out]']).outputOptions('-metadata', 'title=Bring Maytag Home').save('./public/customKitchen.mp4').on('end', function(){console.log('Finished Processing !'); uploadFile("customKitchen.mp4", "./public/customKitchen.mp4")});
	});

});    
    
};

function uploadFile(remoteFilename, fileName) {
  var fileBuffer = fs.readFileSync(fileName);
  var metaData = getContentTypeByFile(fileName);
  
  s3.putObject({
    ACL: 'public-read',
    Bucket: "bmmh-testing",
    Key: remoteFilename,
    Body: fileBuffer,
    ContentType: metaData
  }, function(error, response) {
    console.log('uploaded file[' + fileName + '] to [' + remoteFilename + '] as [' + metaData + ']');
    console.log(arguments);
    console.log(response);
  });
}

function getContentTypeByFile(fileName) {
  var rc = 'application/octet-stream';
  var fn = fileName.toLowerCase();

  if (fn.indexOf('.html') >= 0) rc = 'text/html';
  else if (fn.indexOf('.css') >= 0) rc = 'text/css';
  else if (fn.indexOf('.json') >= 0) rc = 'application/json';
  else if (fn.indexOf('.js') >= 0) rc = 'application/x-javascript';
  else if (fn.indexOf('.png') >= 0) rc = 'image/png';
  else if (fn.indexOf('.jpg') >= 0) rc = 'image/jpg';
  else if (fn.indexOf('.mp4') >= 0) rc = 'video/mp4';

  return rc;
}
