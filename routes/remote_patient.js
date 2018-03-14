module.exports = function (router) {

    var path = require("path");
    var async = require('async');
    var url = require('url');
    var connection = require("../config/database.json");
    var fs = require("fs");
    var database = connection.database;

    var RestClient = require('node-rest-client').Client;

    if (Object.getOwnPropertyNames(Date.prototype).indexOf("format") < 0) {

        Object.defineProperty(Date.prototype, "format", {
            value: function (format) {
                var date = this;

                var result = "";

                if (!format) {

                    format = ""

                }

                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
                    "October", "November", "December"];

                if (format.match(/YYYY\-mm\-dd/)) {

                    result = date.getFullYear() + "-" + padZeros((parseInt(date.getMonth()) + 1), 2) + "-" + padZeros(date.getDate(), 2);

                } else if (format.match(/mmm\/d\/YYYY/)) {

                    result = months[parseInt(date.getMonth())] + "/" + date.getDate() + "/" + date.getFullYear();

                } else if (format.match(/d\smmmm,\sYYYY/)) {

                    result = date.getDate() + " " + monthNames[parseInt(date.getMonth())] + ", " + date.getFullYear();

                } else {

                    result = date.getDate() + "/" + months[parseInt(date.getMonth())] + "/" + date.getFullYear();

                }

                return result;
            }
        });

    }

    function padZeros(number, positions) {
        var zeros = parseInt(positions) - String(number).length;
        var padded = "";

        for (var i = 0; i < zeros; i++) {
            padded += "0";
        }

        padded += String(number);

        return padded;
    }

    function queryRaw(sql, callback) {

        var config = require(__dirname + "/../config/database.json");

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

        // added for printing purposes, can be removed if later realised not to be neccessary. Mar 24th, 17
        knex.destroy(sql);    

    }
    function getAge(birthdate, estimated) {

        var age;

        if (birthdate == null || (new Date(birthdate)) == "Invalid Date") {

            return "???";

        }

        if ((((new Date()) - (new Date(birthdate))) / (365 * 24 * 60 * 60 * 1000)) > 1) {

            age = Math.round((((new Date()) - (new Date(birthdate))) / (365 * 24 * 60 * 60 * 1000)), 0);

        } else if ((((new Date()) - (new Date(birthdate))) / (30 * 24 * 60 * 60 * 1000)) > 1) {

            age = Math.round((((new Date()) - (new Date(birthdate))) / (30 * 24 * 60 * 60 * 1000)), 0) + " months";

        } else if ((((new Date()) - (new Date(birthdate))) / (7 * 24 * 60 * 60 * 1000)) > 1) {

            age = Math.round((((new Date()) - (new Date(birthdate))) / (7 * 24 * 60 * 60 * 1000)), 0) + " weeks";

        } else if ((((new Date()) - (new Date(birthdate))) / (24 * 60 * 60 * 1000)) > 1) {

            age = Math.round((((new Date()) - (new Date(birthdate))) / (24 * 60 * 60 * 1000)), 0) + " days";

        } else if ((((new Date()) - (new Date(birthdate))) / (60 * 60 * 1000)) > 1) {

            age = Math.round((((new Date()) - (new Date(birthdate))) / (60 * 60 * 1000)), 0) + " hours";

        } else {

            age = "< 1hr";

        }

        age = (estimated != undefined && parseInt(estimated) == 1 ? "~" + age : age);

        return age;

    }
    router.route('/create').get(function(req,res){
        console.log(req.body.data);

        res.send(2);
    });

    router.route('/create').post(function(req,res){
        var settings = require(path.resolve("public", "config", "patient.settings.json"));
        var remote_settings = settings.remote_settings

        var options_auth = {user: remote_settings.username, password: remote_settings.password};

        var remote_url = remote_settings.protocol + "://" + remote_settings.host +(remote_settings.port  ? ":"+remote_settings.port  : "");
        remote_url = remote_url  + remote_settings.createPath


        var remote_data = {
            data: req.body.remote_data,
            headers: { "Content-Type": "application/json" }
        }

        try{

             (new RestClient(options_auth).post(remote_url, remote_data, function(data, response){
                    var person = JSON.parse(data.toString('utf8'))
                    if (person.person) {
                        person["status"] = "OK"
                        person["saved"] = true
                        res.send(person);
                    }else{
                        res.status(200).json({saved:false, message: "Unable to save!"});;
                    }

                }));

        }catch(e){

            res.status(200).json({saved:false, message: "Unable to save!"});

        }
        
    });

    router.route('/given_names').get(function(req,res){
        var url = require("url");

        var query = url.parse(req.url, true).query;

        var settings = require(path.resolve("public", "config", "patient.settings.json"));
        var remote_settings = settings.remote_settings

        var remote_url = remote_settings.protocol + "://" + remote_settings.host +(remote_settings.port  ? ":"+remote_settings.port  : "");
        remote_url = remote_url + "/person_names/given_names?search_string="+(query.search_string ? query.search_string  : "")

        var options_auth = {user: remote_settings.username, password: remote_settings.password};

        var client = new RestClient(options_auth);

        client.get(remote_url,function(data,response){
            res.send(data.toString('utf8'));
        });
    });

    router.route('/family_names').get(function(req,res){
        var url = require("url");

        var query = url.parse(req.url, true).query;

        var settings = require(path.resolve("public", "config", "patient.settings.json"));
        var remote_settings = settings.remote_settings

        var remote_url = remote_settings.protocol + "://" + remote_settings.host +(remote_settings.port  ? ":"+remote_settings.port  : "");
        remote_url = remote_url + "/person_names/family_names?search_string="+(query.search_string ? query.search_string  : "")

        var options_auth = {user: remote_settings.username, password: remote_settings.password};

        var client = new RestClient(options_auth);

        client.get(remote_url,function(data,response){
            res.send(data.toString('utf8'));
        });
    });

    router.route('/search_for_patient').get(function(req,res){
        var url = require("url");

        var query = url.parse(req.url, true).query;

        var settings = require(path.resolve("public", "config", "patient.settings.json"));
        var remote_settings = settings.remote_settings

        var remote_url = remote_settings.protocol + "://" + remote_settings.host +(remote_settings.port  ? ":"+remote_settings.port  : "");
        remote_url = remote_url+ remote_settings.searchPath + "?"
        remote_url = remote_url + "person[names][given_name]="+ query.first_name;
        remote_url = remote_url + "&person[names][family_name]="+ query.last_name;
        remote_url = remote_url + "&person[gender]="+ query.gender;

        var options_auth = {user: remote_settings.username, password: remote_settings.password};

        var client = new RestClient(options_auth);

        try{
            client.get(remote_url,function(data,response){

                res.send(data.toString('utf8'));
            });
        }catch(e){

        }

       
    });

    router.route('/ccc_demographics').get(function(req,res){
        var url = require("url");
        var query = url.parse(req.url, true).query;
        var npid = query.npid
        var patient_id = null
        var data = {npid: npid, pos: query.pos}
        async.series([
            function(icallback){
                var sql = "SELECT patient_id FROM patient_identifier WHERE identifier = \"" + npid + "\" AND voided = 0";

                queryRaw(sql, function (res) {

                    if (res[0].length > 0){
                        data["patient_id"]= res[0][0].patient_id;
                        patient_id = res[0][0].patient_id;                        
                    }

                    icallback();

                });

            },
            function(icallback){
                var sql = "SELECT birthdate, birthdate_estimated  FROM person WHERE person_id="+patient_id;

                queryRaw(sql, function (res) {

                    if (res[0].length > 0){
                        data["birthdate"]= res[0][0].birthdate;
                        data["birthdate_estimated"]= res[0][0].birthdate_estimated;
                        data["age"] = getAge(res[0][0].birthdate, res[0][0].birthdate_estimated)                        
                    }

                    icallback();

                });
            },
            function(icallback){
                var sql = "SELECT * FROM person_address WHERE person_id="+patient_id;

                queryRaw(sql, function (res) {

                    if (res[0].length > 0){
                        var keys = Object.keys(res[0][0]);
                        for(var i = 0 ; i < keys.length ; i++ ){
                            data[keys[i]] = res[0][0][keys[i]];
                        }                   
                    }

                    icallback();

                });
            }
            ],function (err, results){
                 res.send(data);
            })
       
    });


    return router;

}