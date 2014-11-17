var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var SubmissionSchema = new Schema({
    username : {type: String, unique: true},
    email: String,
    password: String,
    userID : String,
    submissionID : {type: String},
    roomType : String,
    roomImagePath : {type: String, unique: true},
    applianceType:String,
    applianceWidth:Number,
    applianceHeight:Number,
    appliancePositionX:Number,
    appliancePositionY:Number,
    applianceOrder:{type: Number, unique: true}
});

mongoose.model('Submission', SubmissionSchema);