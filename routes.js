var crypto = require('crypto'),
    express = require('express'),
    ffmpeg = require('fluent-ffmpeg'),
    fs = require('fs'),
    util = require('util'),
    child_process = require('child_process');

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
		ffmpeg(newVideo).mergeAdd(maytagAudioFile).mergeAdd(newVideo).addOption(['-vf', 'movie='+maytagOverlayFile+ ' [watermark]; [in] [watermark] overlay=shortest=1:x='+xCoord+':y='+yCoord+' [out]']).outputOptions('-metadata', 'title=Bring Maytag Home').save('./public/customKitchen.mp4').on('end', function(){console.log('Finished Processing')}).run();
	});

});    
    
};