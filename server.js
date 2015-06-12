var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config.js');// THATS HOW WE CAN USE OUR EXT FILE
var mongoose = require('mongoose');
var path = require('path');

var app=express();
//var api = require('./app/routs/api.js')(app, express);
/*
mongoose.connect(config.database, function(err){
    if(err){
        console.log(err);
    }else {
        console.log('DB connected');
    }
});
*/
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/api',api);
 
/*
app.get('*', function(req,res){
    res.sendFile(__dirname + '/public/index.html');
});*/


app.listen(app.get('port'), function(err){
    if(err){
        console.log(err);
    }else {
        console.log('Express server listening on port ' + app.get('port'));
    }

});
/*
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/
