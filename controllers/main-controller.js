var crypto = require('crypto'),
    mongoose = require('mongoose'),
    ffmpeg = require('fluent-ffmpeg'),
    util = require('util'),
    child_process = require('child_process'),
    Submission = mongoose.model('Submission');

exports.signup = function(req,res){
    var submission = new Submission({username:req.body.username});
    submission.set('email',req.body.email);
    submission.set('password',req.body.password);
    submission.set('userID',req.body.userID);
    submission.set('submissionID', req.body.submissionID)
    submission.set('roomType',req.body.roomType);
    submission.set('roomImagePath',req.body.roomImagePath);
    submission.set('applianceType',req.body.applianceType);
    submission.set('applianceWidth',req.body.applianceWidth);
    submission.set('applianceHeight',req.body.applianceHeight);
    submission.set('appliancePositionX',req.body.appliancePositionX);
    submission.set('appliancePositionY',req.body.appliancePositionY);
    submission.set('applianceOrder',req.body.applianceOrder);

  submission.save(function(err){
     if (err){
         res.session.error = err;
         res.redirect('/signup');
     } 
     else{
         req.session.user = submission.id;
         req.session.username = submission.username;
         req.session.imagePath = submission.roomImagePath;
         req.session.applianceType = submission.applianceType;
         req.session.applianceWidth = submission.applianceWidth;
         req.session.applianceHeight = submission.applianceHeight;
         req.session.appliancePositionX = submission.appliancePositionX;
         req.session.appliancePositionY = submission.appliancePositionY;
         req.session.msg = "Authenticated as "+submission.username;
         
         res.redirect('/');
     }
  });
};