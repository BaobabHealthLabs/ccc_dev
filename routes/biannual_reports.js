module.exports = function (router) {

    var async = require('async');
    var url = require('url');
    var connection = require("../config/database.json");
    var fs = require("fs");
    var database = connection.database;

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

    router.route("/new_ht_total_ti")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT patient_id FROM patient_program where program_id = 17) AND obs.concept_id = 3289 " + 
                      "AND obs.value_text = 'Transfer in' AND obs.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ht_total_ti")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT patient_id FROM patient_program where program_id = 17) AND obs.concept_id = 3289 " + 
                      "AND obs.value_text = 'Transfer in' AND obs.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ht_total_to")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT patient_id FROM patient_program where program_id = 17) AND obs.concept_id = 6538 " + 
                      "AND obs.value_text = 'Transfer out' AND obs.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ht_total_to")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT patient_id FROM patient_program where program_id = 17) AND obs.concept_id = 6538 " + 
                      "AND obs.value_text = 'Transfer out' AND obs.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ht_total_alive")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT patient_id FROM patient_program where program_id = 17) AND obs.concept_id = 6538 " + 
                      "AND obs.value_text = 'Alive' AND obs.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ht_total_alive")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT patient_id FROM patient_program where program_id = 17) AND obs.concept_id = 6538 " + 
                      "AND obs.value_text = 'Alive' AND obs.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });


    router.route("/site")
      .get(function(req,res){
          var site = require(__dirname + "/../config/site.json");
          res.send([site.facility])
    });

    return router;

}