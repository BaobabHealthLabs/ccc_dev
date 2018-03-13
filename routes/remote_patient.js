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

        console.log(remote_data);

        (new RestClient(options_auth).post(remote_url, remote_data, function(data, response){
            var person = JSON.parse(data.toString('utf8'))
            if (person.person) {
                res.send(person);
            }else{
                res.status(200).json({message: "Unable to save!"});;
            }

        }));
        

        
    });

    return router;

}