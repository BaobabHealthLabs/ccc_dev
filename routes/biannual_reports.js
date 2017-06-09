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
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND obs.concept_id = 3289 " + 
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
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND obs.concept_id = 3289 " + 
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
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND obs.concept_id = 6538 " + 
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
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND obs.concept_id = 6538 " + 
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
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND obs.concept_id = 6538 " + 
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
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND obs.concept_id = 6538 " + 
                      "AND obs.value_text = 'Alive' AND obs.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ht_bp_controlled")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = obs.encounter_id " + 
                      "LEFT OUTER JOIN patient_program ON obs.person_id = patient_program.patient_id " + 
                      "LEFT OUTER JOIN encounter ON encounter.encounter_type = obs.encounter_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND (concept_name.name = 'Systolic blood pressure' AND obs.value_numeric <= 140) OR (concept_name.name = 'Diastolic blood pressure' AND obs.value_numeric <= 90) " + 
                      "AND Date(obs.date_created) >='"+query.start_date+"' AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ht_bp_controlled")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = obs.encounter_id " + 
                      "LEFT OUTER JOIN patient_program ON obs.person_id = patient_program.patient_id " + 
                      "LEFT OUTER JOIN encounter ON encounter.encounter_type = obs.encounter_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND (concept_name.name = 'Systolic blood pressure' AND obs.value_numeric <= 140) OR (concept_name.name = 'Diastolic blood pressure' AND obs.value_numeric <= 90) " + 
                      "AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_bp_last")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = obs.encounter_id " + 
                      "LEFT OUTER JOIN patient_program ON obs.person_id = patient_program.patient_id " + 
                      "LEFT OUTER JOIN encounter ON encounter.encounter_type = obs.encounter_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND (concept_name.name = 'Systolic blood pressure' AND obs.value_numeric >= 180) OR (concept_name.name = 'Diastolic blood pressure' AND obs.value_numeric >= 110) " + 
                      "AND Date(obs.date_created) >='"+query.start_date+"' AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_bp_last")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = obs.encounter_id " + 
                      "LEFT OUTER JOIN patient_program ON obs.person_id = patient_program.patient_id " + 
                      "LEFT OUTER JOIN encounter ON encounter.encounter_type = obs.encounter_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND (concept_name.name = 'Systolic blood pressure' AND obs.value_numeric >= 180) OR (concept_name.name = 'Diastolic blood pressure' AND obs.value_numeric <= 110) " + 
                      "AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_defaulted")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND encounter_type.name NOT IN('HYPERTENSION INITIAL QUESTIONS', 'HYPERTENSION SOCIAL HISTORY', 'PAST HYPERTENSION MEDICAL HISTORY', 'HYPERTENSION FAMILY HISTORY', 'VITALS', 'LAB RESULTS', 'HIV/ART STATUS', 'HYPERTENSION TEST', 'UPDATE OUTCOME', 'TREATMENTS', 'APPOINTMENT') " + 
                      "AND encounter.voided = 0 AND person.voided = 0 AND Date(encounter.encounter_datetime) >='"+query.start_date+"' AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_defaulted")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND encounter_type.name NOT IN('HYPERTENSION INITIAL QUESTIONS', 'HYPERTENSION SOCIAL HISTORY', 'PAST HYPERTENSION MEDICAL HISTORY', 'HYPERTENSION FAMILY HISTORY', 'VITALS', 'LAB RESULTS', 'HIV/ART STATUS', 'HYPERTENSION TEST', 'UPDATE OUTCOME', 'TREATMENTS', 'APPOINTMENT') " + 
                      "AND encounter.voided = 0 AND person.voided = 0 AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_alcohol")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = obs.concept_id WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND concept_name.name = 'Are you a heavy alcohol drinker?' AND obs.value_text = 'Yes' AND obs.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_alcohol")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = obs.concept_id WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND concept_name.name = 'Are you a heavy alcohol drinker?' AND obs.value_text = 'Yes' AND obs.voided = 0 " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_overweight")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(t1.person_id)) AS total from " + database + ".obs t1 " + 
                      "INNER JOIN (select t2.person_id, t2.obs_datetime, t2.encounter_id, (ifnull(t2.value_numeric, t2.value_text) / 100) as height " + 
                      "FROM obs t2 WHERE t2.concept_id = 5090) as t3 ON t3.encounter_id = t1.encounter_id " + 
                      "WHERE t1.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND t1.concept_id = 5089 and t1.voided = 0 AND round(((ifnull(t1.value_numeric, t1.value_text) / (height * height))), 2) > 24.9 " + 
                      "AND round(((ifnull(t1.value_numeric, t1.value_text) / (height * height))), 2) < 30 AND Date(t1.obs_datetime) >='"+query.start_date+"' AND Date(t1.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_overweight")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(t1.person_id)) AS total from " + database + ".obs t1 " + 
                      "INNER JOIN (select t2.person_id, t2.obs_datetime, t2.encounter_id, (ifnull(t2.value_numeric, t2.value_text) / 100) as height " + 
                      "FROM obs t2 WHERE t2.concept_id = 5090) as t3 ON t3.encounter_id = t1.encounter_id " + 
                      "WHERE t1.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND t1.concept_id = 5089 and t1.voided = 0 AND round(((ifnull(t1.value_numeric, t1.value_text) / (height * height))), 2) > 24.9 " + 
                      "AND round(((ifnull(t1.value_numeric, t1.value_text) / (height * height))), 2) < 30 AND Date(t1.obs_datetime) >='"+query.start_date+"' AND Date(t1.obs_datetime) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ht_obese")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(t1.person_id)) AS total from " + database + ".obs t1 INNER JOIN " + 
                      "(select t2.person_id, t2.obs_datetime, t2.encounter_id, (ifnull(t2.value_numeric, t2.value_text) / 100) as height " + 
                      "FROM obs t2 WHERE t2.concept_id = 5090) as t3 ON t3.encounter_id = t1.encounter_id " + 
                      "WHERE t1.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND t1.concept_id = 5089 and t1.voided = 0 " + 
                      "AND round(((ifnull(t1.value_numeric, t1.value_text) / (height * height))), 2) >= 30 " + 
                      "AND Date(t1.obs_datetime) >='"+query.start_date+"' AND Date(t1.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ht_obese")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(t1.person_id)) AS total from " + database + ".obs t1 INNER JOIN " + 
                      "(select t2.person_id, t2.obs_datetime, t2.encounter_id, (ifnull(t2.value_numeric, t2.value_text) / 100) as height " + 
                      "FROM obs t2 WHERE t2.concept_id = 5090) as t3 ON t3.encounter_id = t1.encounter_id " + 
                      "WHERE t1.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND t1.concept_id = 5089 and t1.voided = 0 " + 
                      "AND round(((ifnull(t1.value_numeric, t1.value_text) / (height * height))), 2) >= 30 " + 
                      "AND Date(t1.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ht_died")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND (year(obs.obs_datetime) - year(person.birthdate)) < 65 AND obs.concept_id = 6538 AND obs.value_text = 'Dead' " + 
                      "AND concept_name.name = 'Outcome' AND obs.voided = 0 AND person.voided = 0 AND concept_name.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ht_died")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND (year(obs.obs_datetime) - year(person.birthdate)) < 65 AND obs.concept_id = 6538 AND obs.value_text = 'Dead' " + 
                      "AND concept_name.name = 'Outcome' AND obs.voided = 0 AND person.voided = 0 AND concept_name.voided = 0 " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_smokes")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = obs.concept_id WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND concept_name.name IN('Smoking?', 'Do you currently smoke?', 'Smoke?') AND obs.value_text IN('Current smoker', 'Yes') " + 
                      "AND obs.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_smokes")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = obs.concept_id WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND concept_name.name IN('Smoking?', 'Do you currently smoke?', 'Smoke?') AND obs.value_text IN('Current smoker', 'Yes') " + 
                      "AND obs.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_high_risk")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 17 " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND obs.concept_id = 8464 " + 
                      "AND obs.value_text like '%Stroke%' AND concept_name.name = 'Macrovascular Result' AND obs.voided = 0 AND concept_name.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_high_risk")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 17 " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND obs.concept_id = 8464 " + 
                      "AND obs.value_text like '%Stroke%' AND concept_name.name = 'Macrovascular Result' AND obs.voided = 0 AND concept_name.voided = 0 " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_urine_creatinine")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 17 " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND obs.concept_id = 8586 " + 
                      "AND obs.value_text = 'Creatinine' AND concept_name.name = 'Hypertension Test Type' AND obs.voided = 0 AND concept_name.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_urine_creatinine")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 17 " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND obs.concept_id = 8586 " + 
                      "AND obs.value_text = 'Creatinine' AND concept_name.name = 'Hypertension Test Type' AND obs.voided = 0 AND concept_name.voided = 0 " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_stroke")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = obs.concept_id WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND concept_name.concept_id IN (6178, 9437, 9403) AND concept_name.name IN('Macrovascular Result', 'Past medical history', 'Years of stroke(s)') " + 
                      "AND obs.voided = 0 AND concept_name.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_stroke")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = obs.concept_id WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND concept_name.concept_id IN (6178, 9437, 9403) AND concept_name.name IN('Macrovascular Result', 'Past medical history', 'Years of stroke(s)') " + 
                      "AND obs.voided = 0 AND concept_name.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_cardiovascular")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND obs.concept_id IN(6773, 8487) AND obs.value_text = 'Other' " + 
                      "AND concept_name.name IN('Type of cardiac problem', 'Other Type of Cardiac Problem') AND obs.voided = 0 AND concept_name.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_cardiovascular")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND obs.concept_id IN(6773, 8487) AND obs.value_text = 'Other' " + 
                      "AND concept_name.name IN('Type of cardiac problem', 'Other Type of Cardiac Problem') AND obs.voided = 0 AND concept_name.voided = 0 " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ht_tb")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (select pp.patient_id from patient_program pp WHERE pp.program_id in (17) and pp.patient_id NOT IN (select p.patient_id from patient_program p where p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id IN (7573, 8445) AND obs.value_text = 'Yes' AND concept_name.name IN ('Have you ever had TB?', 'Year(s) of TB Diagnosis') " + 
                      "AND obs.voided = 0 AND concept_name.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ht_tb")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (select pp.patient_id from patient_program pp WHERE pp.program_id in (17) and pp.patient_id NOT IN (select p.patient_id from patient_program p where p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id IN (7573, 8445) AND obs.value_text = 'Yes' AND concept_name.name IN ('Have you ever had TB?', 'Year(s) of TB Diagnosis') " + 
                      "AND obs.voided = 0 AND concept_name.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ht_hiv")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 17 AND pp.patient_id NOT IN " + 
                      "(SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND obs.concept_id = 3753 " + 
                      "AND obs.value_text = 'Reactive' AND concept_name.name = 'HIV status' AND obs.voided = 0 AND concept_name.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ht_hiv")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 17 AND pp.patient_id NOT IN " + 
                      "(SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) AND obs.concept_id = 3753 " + 
                      "AND obs.value_text = 'Reactive' AND concept_name.name = 'HIV status' AND obs.voided = 0 AND concept_name.voided = 0 " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_retinopathy")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 17 " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id IN (6712, 6713) AND obs.value_text LIKE '%Abnormal,Abnormal: Hypertensive Retinopathy,Abnormal: Hypertensive Retinopathy:%' " + 
                      "AND concept_name.name IN ('Left eye fundoscopy', 'Right eye fundoscopy') AND obs.voided = 0 AND concept_name.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_retinopathy")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 17 " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id IN (6712, 6713) AND obs.value_text LIKE '%Abnormal,Abnormal: Hypertensive Retinopathy,Abnormal: Hypertensive Retinopathy:%' " + 
                      "AND concept_name.name IN ('Left eye fundoscopy', 'Right eye fundoscopy') AND obs.voided = 0 AND concept_name.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_type_2_diabetes")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN orders ON orders.patient_id = obs.person_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id WHERE obs.person_id IN(SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id in (13) AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) " + 
                      "AND obs.concept_id IN(6411, 8454, 8453) AND obs.value_text = 'Type 2 Diabetes' AND orders.concept_id IN (278, 279, 280, 281, 282) " + 
                      "AND obs.voided = 0 AND orders.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_type_2_diabetes")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN orders ON orders.patient_id = obs.person_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id WHERE obs.person_id IN(SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id in (13) AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) " + 
                      "AND obs.concept_id IN(6411, 8454, 8453) AND obs.value_text = 'Type 2 Diabetes' AND orders.concept_id IN (278, 279, 280, 281, 282) " + 
                      "AND obs.voided = 0 AND orders.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_alive_in_care")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 13 " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) AND obs.concept_id = 6538 " + 
                      "AND obs.value_text = 'Alive' AND obs.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_alive_in_care")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (13) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) AND obs.concept_id = 6538 " + 
                      "AND obs.value_text = 'Alive' AND obs.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_dm_died")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (13) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) " + 
                      "AND (year(obs.obs_datetime) - year(person.birthdate)) < 65 AND obs.concept_id = 6538 AND obs.value_text = 'Dead' " + 
                      "AND concept_name.name = 'Outcome' AND obs.voided = 0 AND person.voided = 0 AND concept_name.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_dm_died")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (13) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) " + 
                      "AND (year(obs.obs_datetime) - year(person.birthdate)) < 65 AND obs.concept_id = 6538 AND obs.value_text = 'Dead' " + 
                      "AND concept_name.name = 'Outcome' AND obs.voided = 0 AND person.voided = 0 AND concept_name.voided = 0 " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_sugar_controlled")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT (obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (13) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) " + 
                      "AND (year(obs.obs_datetime) - year(person.birthdate)) < 65 AND obs.concept_id IN(6381, 8477, 8439) AND obs.value_numeric < 7 " + 
                      "AND obs.voided = 0 AND person.voided = 0 AND Date(obs.date_created) >='"+query.start_date+"' AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_sugar_controlled")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT (obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN person ON person.person_id = obs.person_id " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (13) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) " + 
                      "AND (year(obs.obs_datetime) - year(person.birthdate)) < 65 AND obs.concept_id IN(6381, 8477, 8439) AND obs.value_numeric < 7 " + 
                      "AND obs.voided = 0 AND person.voided = 0 AND Date(obs.date_created) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_dm_high_risk")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 13 " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) " + 
                      "AND obs.concept_id = 8464 AND obs.value_text like '%Stroke%' AND concept_name.name = 'Macrovascular Result' AND obs.voided = 0 " + 
                      "AND concept_name.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_dm_high_risk")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 13 " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) " + 
                      "AND obs.concept_id = 8464 AND obs.value_text like '%Stroke%' AND concept_name.name = 'Macrovascular Result' AND obs.voided = 0 " + 
                      "AND concept_name.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_dm_stroke")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = obs.concept_id WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (13) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) " + 
                      "AND concept_name.concept_id IN (6178, 9437, 9403) AND concept_name.name IN('Macrovascular Result', 'Past medical history', 'Years of stroke(s)') " + 
                      "AND obs.voided = 0 AND concept_name.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_dm_stroke")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = obs.concept_id WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (13) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) " + 
                      "AND concept_name.concept_id IN (6178, 9437, 9403) AND concept_name.name IN('Macrovascular Result', 'Past medical history', 'Years of stroke(s)') " + 
                      "AND obs.voided = 0 AND concept_name.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_dm_foot_ulcers")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 13 AND pp.patient_id NOT IN " + 
                      "(SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) AND obs.concept_id IN(6444, 8459, 8458) " + 
                      "AND obs.value_text LIKE '%Current foot ulceration%' AND concept_name.name IN ('Diabetes test type', 'Right Foot/Leg Foot Check', 'Left Foot/Leg Foot Check') " + 
                      "AND obs.voided = 0 AND concept_name.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_dm_foot_ulcers")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 13 AND pp.patient_id NOT IN " + 
                      "(SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) AND obs.concept_id IN(6444, 8459, 8458) " + 
                      "AND obs.value_text LIKE '%Current foot ulceration%' AND concept_name.name IN ('Diabetes test type', 'Right Foot/Leg Foot Check', 'Left Foot/Leg Foot Check') " + 
                      "AND obs.voided = 0 AND concept_name.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_dm_amputations")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 13 AND pp.patient_id NOT IN " + 
                      "(SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) AND obs.concept_id IN (6444, 8459, 8458) " + 
                      "AND obs.value_text LIKE '%Amputation,Amputation:%' AND concept_name.name IN ('Diabetes test type', 'Right Foot/Leg Foot Check', 'Left Foot/Leg Foot Check') " + 
                      "AND obs.voided = 0 AND concept_name.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_dm_amputations")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 13 AND pp.patient_id NOT IN " + 
                      "(SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) AND obs.concept_id IN (6444, 8459, 8458) " + 
                      "AND obs.value_text LIKE '%Amputation,Amputation:%' AND concept_name.name IN ('Diabetes test type', 'Right Foot/Leg Foot Check', 'Left Foot/Leg Foot Check') " + 
                      "AND obs.voided = 0 AND concept_name.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_dm_renal_failure")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM ccc_development.obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 13 " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) " + 
                      "AND obs.concept_id IN(6444, 6712, 6713) AND obs.value_text LIKE '%Diabetic Retinopathy%' " + 
                      "AND concept_name.name IN ('Diabetes test type', 'Left eye fundoscopy', 'Right eye fundoscopy') AND obs.voided = 0 " + 
                      "AND concept_name.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_dm_renal_failure")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM ccc_development.obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 13 " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) " + 
                      "AND obs.concept_id IN(6444, 6712, 6713) AND obs.value_text LIKE '%Diabetic Retinopathy%' " + 
                      "AND concept_name.name IN ('Diabetes test type', 'Left eye fundoscopy', 'Right eye fundoscopy') AND obs.voided = 0 " + 
                      "AND concept_name.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_dm_hiv")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM ccc_development.obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                     "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 13 " + 
                     "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) AND obs.concept_id = 3753 " + 
                     "AND obs.value_text = 'Reactive' AND concept_name.name = 'HIV status' AND obs.voided = 0 AND concept_name.voided = 0 " + 
                     "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_dm_hiv")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id = 13 " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) AND obs.concept_id = 3753 " + 
                      "AND obs.value_text = 'Reactive' AND concept_name.name = 'HIV status' AND obs.voided = 0 AND concept_name.voided = 0 " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

 router.route("/new_ast_transferred")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (19) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 17))) AND obs.concept_id = 3289 " + 
                      "AND obs.value_text = 'Transfer in' AND obs.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ast_transferred")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (19) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 17))) AND obs.concept_id = 3289 " + 
                      "AND obs.value_text = 'Transfer in' AND obs.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ast_defaulted")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (19) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 17))) " + 
                      "AND encounter_type.name NOT IN('ASTHMA INITIAL QUESTIONS', 'ASTHMA MEDICAL HISTORY', 'ASTHMA SOCIAL HISTORY', 'ASTHMA FAMILY HISTORY', 'VITALS', 'ASTHMA VISIT', 'HIV/ART STATUS', 'UPDATE OUTCOME', 'TREATMENTS', 'APPOINTMENT') " + 
                      "AND encounter.voided = 0 AND person.voided = 0 AND Date(encounter.encounter_datetime) >='"+query.start_date+"' AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ast_defaulted")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (19) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 17))) " + 
                      "AND encounter_type.name NOT IN('ASTHMA INITIAL QUESTIONS', 'ASTHMA MEDICAL HISTORY', 'ASTHMA SOCIAL HISTORY', 'ASTHMA FAMILY HISTORY', 'VITALS', 'ASTHMA VISIT', 'HIV/ART STATUS', 'UPDATE OUTCOME', 'TREATMENTS', 'APPOINTMENT') " + 
                      "AND encounter.voided = 0 AND person.voided = 0 AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ast_alive")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (19) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 17))) AND obs.concept_id = 6538 " + 
                      "AND obs.value_text = 'Alive' AND obs.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ast_alive")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (19) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 17))) AND obs.concept_id = 6538 " + 
                      "AND obs.value_text = 'Alive' AND obs.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_lung_alive")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (19) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 17))) AND obs.concept_id = 3065 " + 
                      "AND obs.value_text = 'COPD' AND obs.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_lung_alive")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (19) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 17))) AND obs.concept_id = 3065 " + 
                      "AND obs.value_text = 'COPD' AND obs.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_epilepsy_defaulted")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (19) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 17))) " + 
                      "AND encounter_type.name NOT IN('EPILEPSY INITIAL QUESTIONS', 'PATIENT HISTORY AT ENROLMENT', 'MEDICAL AND SURGICAL HISTORY', 'EPILEPSY FAMILY HISTORY', 'VITALS', 'HIV/ART STATUS', 'VDRL STATUS', 'SEIZURE TYPE', 'TRIGGERS', 'PRE-ICTAL WARNING', 'POST-ICTAL FEATURES', 'EPILEPSY PATIENT OVERVIEW', 'EPILEPSY VISIT', 'UPDATE OUTCOME', 'TREATMENTS', 'APPOINTMENT') " + 
                      "AND encounter.voided = 0 AND person.voided = 0 AND Date(encounter.encounter_datetime) >='"+query.start_date+"' AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_epilepsy_defaulted")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN (SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (19) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 17))) " + 
                      "AND encounter_type.name NOT IN('EPILEPSY INITIAL QUESTIONS', 'PATIENT HISTORY AT ENROLMENT', 'MEDICAL AND SURGICAL HISTORY', 'EPILEPSY FAMILY HISTORY', 'VITALS', 'HIV/ART STATUS', 'VDRL STATUS', 'SEIZURE TYPE', 'TRIGGERS', 'PRE-ICTAL WARNING', 'POST-ICTAL FEATURES', 'EPILEPSY PATIENT OVERVIEW', 'EPILEPSY VISIT', 'UPDATE OUTCOME', 'TREATMENTS', 'APPOINTMENT') " + 
                      "AND encounter.voided = 0 AND person.voided = 0 AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_epilepsy_alive")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (19) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 17))) AND obs.concept_id = 6538 " + 
                      "AND obs.value_text = 'Alive' AND obs.voided = 0 AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_epilepsy_alive")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (19) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 17))) AND obs.concept_id = 6538 " + 
                      "AND obs.value_text = 'Alive' AND obs.voided = 0 AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ht_hydro")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name ON concept_name.concept_id = orders.concept_id " + 
                      "WHERE orders.patient_id IN (SELECT patient_id FROM patient_program WHERE program_id = 17) AND orders.concept_id IN(1243) " + 
                      "AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ht_hydro")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name ON concept_name.concept_id = orders.concept_id " + 
                      "WHERE orders.patient_id IN (SELECT patient_id FROM patient_program WHERE program_id = 17) AND orders.concept_id IN(1243) " + 
                      "AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ht_amlodipine")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 17 AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND orders.concept_id IN(3187) AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ht_amlodipine")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 17 AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND orders.concept_id IN(3187) AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ht_nife")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 17 AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND orders.concept_id IN(250) AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ht_nife")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 17 AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND orders.concept_id IN(250) AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ht_capto")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 17 AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND orders.concept_id IN(3182) AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ht_capto")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 17 AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND orders.concept_id IN(3182) AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ht_propa")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 17 AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND orders.concept_id IN(254) AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ht_propa")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 17 AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND orders.concept_id IN(254) AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ht_ant")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 17 AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND orders.concept_id IN(3186) AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ht_ant")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 17 AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND orders.concept_id IN(3186) AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_dm_met")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 13) AND orders.concept_id IN(4052) AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_dm_met")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 13) AND orders.concept_id IN(4052) AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_dm_insulin")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 13 AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) " + 
                      "AND orders.concept_id IN(280, 282) AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_dm_insulin")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 13 AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) " + 
                      "AND orders.concept_id IN(280, 282) AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_dm_lente")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 13 AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) " + 
                      "AND orders.concept_id IN(278, 279) AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_dm_lente")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 13 AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (16, 17, 19))) " + 
                      "AND orders.concept_id IN(278, 279) AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_dm_glib")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 13) AND orders.concept_id IN(4046) AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_dm_glib")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp " + 
                      "WHERE pp.program_id = 13) AND orders.concept_id IN(4046) AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ast_amino")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 19) " + 
                      "AND orders.concept_id = 928 AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ast_amino")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 19) " + 
                      "AND orders.concept_id = 928 AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ast_ivamino")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 19) " + 
                      "AND orders.concept_id = 347 AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ast_ivamino")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 19) " + 
                      "AND orders.concept_id = 347 AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ast_salb")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 19) " + 
                      "AND orders.concept_id = 798 AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ast_salb")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 19) " + 
                      "AND orders.concept_id = 798 AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ep_carb")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16) " + 
                      "AND orders.concept_id = 920 AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ep_carb")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16) " + 
                      "AND orders.concept_id = 920 AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ep_diaz")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16) " + 
                      "AND orders.concept_id = 247 AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ep_diaz")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16) " + 
                      "AND orders.concept_id = 247 AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ep_etho")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16) " + 
                      "AND orders.concept_id = 8972 AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ep_etho")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16) " + 
                      "AND orders.concept_id = 8972 AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ep_mag")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16) " + 
                      "AND orders.concept_id = 6811 AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ep_mag")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16) " + 
                      "AND orders.concept_id = 6811 AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ep_para")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16) " + 
                      "AND orders.concept_id = 6815 AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ep_para")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16) " + 
                      "AND orders.concept_id = 6815 AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ep_pheno")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16) " + 
                      "AND orders.concept_id = 8249 AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ep_pheno")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16) " + 
                      "AND orders.concept_id = 8249 AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_epi_phey")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16) " + 
                      "AND orders.concept_id = 8193 AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_epi_phey")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16) " + 
                      "AND orders.concept_id = 8193 AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_ep_sv")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16) " + 
                      "AND orders.concept_id = 4060 AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_ep_sv")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = orders.concept_id WHERE orders.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16) " + 
                      "AND orders.concept_id = 4060 AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

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