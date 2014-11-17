var express = require('express'),
    expressSession = require('express-session'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    mongoStore = require('connect-mongo')({session:expressSession}),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan');

require('./models/Submission.js');

var conn = mongoose.connect('mongodb://admin:M!mistry96@linus.mongohq.com:10068/node_testing');

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('port', process.env.PORT || 3000)
app.use(logger('combined'));

// must use cookieParser before expressSession
app.use(cookieParser());

app.use(expressSession({
    secret:'bmmh',
    cookie:{maxAge:60*60*1000},
    store:new mongoStore({
      db: mongoose.connection.db,
      collections: 'submissions'
    }),
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({
    extended: true
}));   

//ALL ROUTING FUNCTIONS ARE IN HERE
require('./routes')(app);

//LISTEN TO REQUEST
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port "+app.get('port'));
});
