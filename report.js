// var app = require('express')();
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var portfinder = require('portfinder');
var async = require('async');
var uuid = require("node-uuid");
var bodyParser = require('body-parser');
var Mutex = require('Mutex');
var md5 = require('md5');
var randomstring = require("randomstring");

var mutex = new Mutex('htc_lock');

var url = require('url');

var site = require(__dirname + "/config/site.json");

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// for forms
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());

var numClients = 0;

var nsp = {};

var people = {};

var isDirty = {};

function queryRaw(sql, callback) {

    var config = require(__dirname + "/config/database.json");

    var knex = require('knex')({
        client: 'mysql',
        connection: {
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database
        },
        pool: {
            min: 0,
            max: 500
        }
    });

    knex.raw(sql)
        .then(function (result) {

            callback(result);

        })
        .catch(function (err) {

            console.log(err.message);

            callback(err);

        });

}
app.get("/patient/:id/card",function(req,res){
    var pid = 24;
    var sql = "SELECT encounter.encounter_id,encounter.patient_id,encounter.encounter_datetime,"+
    "encounter.patient_program_id,obs.obs_id,obs.encounter_id,"+
    "obs.obs_datetime,obs.value_text,obs.concept_id,concept.concept_id,concept.name"+
    "FROM  encounter INNER JOIN obs ON encounter.encounter_id = obs.encounter_id"+
    "AND encounter.patient_id = obs.person_id"+
    "INNER JOIN (SELECT concept_name.name as name , concept.concept_id as concept_id FROM concept"+
    "INNER JOIN concept_name ON concept.concept_id = concept_name.concept_id ) concept ON obs.concept_id = concept.concept_id"+
    "WHERE encounter.patient_id ="+pid+" ORDER BY obs.obs_id";
    queryRaw(sql, function (data) {

        var result = "";

        if (data[0].length > 0) {

            result = data[0][0].value_text;

        }

        res.status(200).json({name: result});

    });
    //res.send(req.params['id']);
});
portfinder.basePort = 3016;

portfinder.getPort(function (err, port) {

    server.listen(port, function () {
        console.log("✔ Server running on port %d in %s mode", port, app.get('env'));
    });

});