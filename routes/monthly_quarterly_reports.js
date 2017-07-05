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

    router.route("/ht_male_18")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id " + 
                      "WHERE patient_program.patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND person.gender = 'M' AND (year(patient_program.date_created) - year(person.birthdate)) > 0 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 18 AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/ht_male_64")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id " + 
                      "WHERE patient_program.patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND person.gender = 'M' AND (year(patient_program.date_created) - year(person.birthdate)) > 18 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 64 AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/ht_male_65")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id " + 
                      "WHERE patient_program.patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND person.gender = 'M' AND (year(patient_program.date_created) - year(person.birthdate)) > 64 " + 
                      "AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/ht_female_18")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id " + 
                      "WHERE patient_program.patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND person.gender = 'F' AND (year(patient_program.date_created) - year(person.birthdate)) > 0 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 18 AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/ht_female_64")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id " + 
                      "WHERE patient_program.patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND person.gender = 'F' AND (year(patient_program.date_created) - year(person.birthdate)) > 18 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 64 AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/ht_female_65")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id " + 
                      "WHERE patient_program.patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND person.gender = 'F' AND (year(patient_program.date_created) - year(person.birthdate)) > 64 " + 
                      "AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/ht_total")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id " + 
                      "WHERE patient_program.patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hn_male_18")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id " + 
                      "WHERE patient_program.patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND person.gender = 'M' AND (year(patient_program.date_created) - year(person.birthdate)) > 0 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 18 AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hn_male_64")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id " + 
                      "WHERE patient_program.patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND person.gender = 'M' AND (year(patient_program.date_created) - year(person.birthdate)) > 18 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 64 AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hn_male_65")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id " + 
                      "WHERE patient_program.patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND person.gender = 'M' AND (year(patient_program.date_created) - year(person.birthdate)) > 64 " + 
                      "AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hn_female_18")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id " + 
                      "WHERE patient_program.patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND person.gender = 'F' AND (year(patient_program.date_created) - year(person.birthdate)) > 0 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 18 AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hn_female_64")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id " + 
                      "WHERE patient_program.patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND person.gender = 'F' AND (year(patient_program.date_created) - year(person.birthdate)) > 18 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 64 AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hn_female_65")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id " + 
                      "WHERE patient_program.patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND person.gender = 'F' AND (year(patient_program.date_created) - year(person.birthdate)) > 64 " + 
                      "AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hn_total")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id " + 
                      "WHERE patient_program.patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hti_male_18")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id WHERE person.gender = 'M' " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 0 AND (year(patient_program.date_created) - year(person.birthdate)) <= 18 " + 
                      "AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id = 3289 AND obs.value_text = 'Transfer in' AND patient_program.voided = 0 AND obs.voided = 0 AND person.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hti_male_64")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id WHERE person.gender = 'M' " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 18 AND (year(patient_program.date_created) - year(person.birthdate)) <= 64 " + 
                      "AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id = 3289 AND obs.value_text = 'Transfer in' AND patient_program.voided = 0 AND obs.voided = 0 AND person.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hti_male_65")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id WHERE person.gender = 'M' " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 64 " + 
                      "AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id = 3289 AND obs.value_text = 'Transfer in' AND patient_program.voided = 0 AND obs.voided = 0 AND person.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hti_female_18")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id WHERE person.gender = 'F' " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 0 AND (year(patient_program.date_created) - year(person.birthdate)) <= 18 " + 
                      "AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id = 3289 AND obs.value_text = 'Transfer in' AND patient_program.voided = 0 AND obs.voided = 0 AND person.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hti_female_64")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id WHERE person.gender = 'F' " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 18 AND (year(patient_program.date_created) - year(person.birthdate)) <= 64 " + 
                      "AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id = 3289 AND obs.value_text = 'Transfer in' AND patient_program.voided = 0 AND obs.voided = 0 AND person.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hti_female_65")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id WHERE person.gender = 'F' " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 64 " + 
                      "AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id = 3289 AND obs.value_text = 'Transfer in' AND patient_program.voided = 0 AND obs.voided = 0 AND person.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hti_total")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id = 3289 AND obs.value_text = 'Transfer in' AND obs.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hto_male_18")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id WHERE person.gender = 'M' " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 0 AND (year(patient_program.date_created) - year(person.birthdate)) <= 18 " + 
                      "AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id = 3289 AND obs.value_text = 'Transfer out' AND patient_program.voided = 0 AND obs.voided = 0 AND person.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hto_male_64")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id WHERE person.gender = 'M' " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 18 AND (year(patient_program.date_created) - year(person.birthdate)) <= 64 " + 
                      "AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id = 3289 AND obs.value_text = 'Transfer out' AND patient_program.voided = 0 AND obs.voided = 0 AND person.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hto_male_65")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id WHERE person.gender = 'M' " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 64 " + 
                      "AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id = 3289 AND obs.value_text = 'Transfer out' AND patient_program.voided = 0 AND obs.voided = 0 AND person.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hto_female_18")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id WHERE person.gender = 'F' " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 0 AND (year(patient_program.date_created) - year(person.birthdate)) <= 18 " + 
                      "AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id = 3289 AND obs.value_text = 'Transfer out' AND patient_program.voided = 0 AND obs.voided = 0 AND person.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hto_female_64")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id WHERE person.gender = 'F' " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 18 AND (year(patient_program.date_created) - year(person.birthdate)) <= 64 " + 
                      "AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id = 3289 AND obs.value_text = 'Transfer out' AND patient_program.voided = 0 AND obs.voided = 0 AND person.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hto_female_65")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id WHERE person.gender = 'F' " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 64 " + 
                      "AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id = 3289 AND obs.value_text = 'Transfer out' AND patient_program.voided = 0 AND obs.voided = 0 AND person.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hto_total")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id = 3289 AND obs.value_text = 'Transfer out' AND obs.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

        router.route("/hd_male_18")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id " + 
                      "WHERE person.gender = 'M' AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 0 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 18 AND obs.concept_id = 6538 AND obs.value_text = 'Dead' " + 
                      "AND concept_name.name = 'Outcome' AND obs.voided = 0 AND person.voided = 0 AND concept_name.voided = 0 AND patient_program.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hd_male_64")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id " + 
                      "WHERE person.gender = 'M' AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 18 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 64 AND obs.concept_id = 6538 AND obs.value_text = 'Dead' " + 
                      "AND concept_name.name = 'Outcome' AND obs.voided = 0 AND person.voided = 0 AND concept_name.voided = 0 AND patient_program.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hd_male_65")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id " + 
                      "WHERE person.gender = 'M' AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 64 " + 
                      "AND obs.concept_id = 6538 AND obs.value_text = 'Dead' AND concept_name.name = 'Outcome' " + 
                      "AND obs.voided = 0 AND person.voided = 0 AND concept_name.voided = 0 AND patient_program.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hd_female_18")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id WHERE person.gender = 'F' " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 0 AND (year(patient_program.date_created) - year(person.birthdate)) <= 18 " + 
                      "AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id = 3289 AND obs.value_text = 'Transfer out' AND patient_program.voided = 0 AND obs.voided = 0 AND person.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hd_female_64")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id " + 
                      "WHERE person.gender = 'F' AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 18 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 64 AND obs.concept_id = 6538 AND obs.value_text = 'Dead' " + 
                      "AND concept_name.name = 'Outcome' AND obs.voided = 0 AND person.voided = 0 AND concept_name.voided = 0 AND patient_program.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hd_female_65")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id " + 
                      "WHERE person.gender = 'F' AND obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) > 64 " + 
                      "AND obs.concept_id = 6538 AND obs.value_text = 'Dead' AND concept_name.name = 'Outcome' " + 
                      "AND obs.voided = 0 AND person.voided = 0 AND concept_name.voided = 0 AND patient_program.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/hd_total")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN person ON person.person_id = obs.person_id LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id = 6538 AND obs.value_text = 'Dead' AND concept_name.name = 'Outcome' AND obs.voided = 0 " + 
                      "AND person.voided = 0 AND concept_name.voided = 0 AND patient_program.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"
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