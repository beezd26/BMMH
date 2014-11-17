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
});    
    
};