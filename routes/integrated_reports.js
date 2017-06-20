/**
 * Created by chimwemwe on 9/16/16.
 */

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

    router.route("/new_registered_male")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, person.gender AS gender FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id WHERE person.gender = 'M' " + 
                      "AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') " + 
                      "AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

        console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_registered_male")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, person.gender AS gender FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id WHERE person.gender = 'M' AND " + 
                      "program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM')" + 
                      "AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_registered_female")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, person.gender AS gender FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id WHERE person.gender = 'F' " + 
                      "AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM')" + 
                      "AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_registered_female")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, person.gender AS gender FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id WHERE person.gender = 'F' " + 
                      "AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM')" + 
                      "AND patient_program.voided = 0 AND person.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_registered_under_14")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, patient_program.voided FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id " + 
                      "WHERE (year(patient_program.date_created) - year(person.birthdate)) > 0 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 14 " + 
                      "AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') " + 
                      "AND patient_program.voided = 0 AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_registered_under_14")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, patient_program.voided FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id " + 
                      "WHERE (year(patient_program.date_created) - year(person.birthdate)) > 0 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 14 " + 
                      "AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') " + 
                      "AND patient_program.voided = 0 AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_registered_between_14_to_44")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id " + 
                      "LEFT OUTER JOIN program ON program.program_id = patient_program.program_id " + 
                      "WHERE (year(patient_program.date_created) - year(person.birthdate)) > 14 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 44 " + 
                      "AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') " + 
                      "AND patient_program.voided = 0 AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(sql);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_registered_between_14_to_44")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id " + 
                      "LEFT OUTER JOIN program ON program.program_id = patient_program.program_id " + 
                      "WHERE (year(patient_program.date_created) - year(person.birthdate)) > 14 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 44 " + 
                      "AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') " + 
                      "AND patient_program.voided = 0 AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_registered_between_45_to_64")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, patient_program.voided FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id " + 
                      "WHERE (year(patient_program.date_created) - year(person.birthdate)) > 44 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 64 " + 
                      "AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') AND patient_program.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_registered_between_45_to_64")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, patient_program.voided FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id " + 
                      "WHERE (year(patient_program.date_created) - year(person.birthdate)) > 44 " + 
                      "AND (year(patient_program.date_created) - year(person.birthdate)) <= 64 " + 
                      "AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') AND patient_program.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_registered_above_64")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, patient_program.voided FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id " + 
                      "WHERE (year(patient_program.date_created) - year(person.birthdate)) > 64 " + 
                      "AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') AND patient_program.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_registered_above_64")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, patient_program.voided FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id " + 
                      "WHERE (year(patient_program.date_created) - year(person.birthdate)) > 64 " + 
                      "AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') AND patient_program.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_diabetes_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id WHERE program.name = 'DIABETES PROGRAM' AND patient_program.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_diabetes_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program LEFT OUTER JOIN person " + 
                      "ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id WHERE program.name = 'DIABETES PROGRAM' AND patient_program.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_hypertension_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program LEFT OUTER JOIN person " + 
                      "ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id WHERE program.name = 'HYPERTENSION PROGRAM' AND patient_program.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_hypertension_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program LEFT OUTER JOIN person " + 
                      "ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id WHERE program.name = 'HYPERTENSION PROGRAM' AND patient_program.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_diabetes_and_hypertension")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "WHERE patient_program.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 13 " + 
                      "AND pp.patient_id IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id = 17)) AND patient_program.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_diabetes_and_hypertension")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "WHERE patient_program.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 13 " + 
                      "AND pp.patient_id IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id = 17)) AND patient_program.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_asthma")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program LEFT OUTER JOIN person " + 
                      "ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id WHERE program.name = 'ASTHMA PROGRAM' AND patient_program.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_asthma")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program LEFT OUTER JOIN person " + 
                      "ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id WHERE program.name = 'ASTHMA PROGRAM' AND patient_program.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_epilepsy")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program LEFT OUTER JOIN person " + 
                      "ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id WHERE program.name = 'EPILEPSY PROGRAM' AND patient_program.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_epilepsy")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program LEFT OUTER JOIN person " + 
                      "ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program " + 
                      "ON program.program_id = patient_program.program_id WHERE program.name = 'EPILEPSY PROGRAM' AND patient_program.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_other")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "WHERE patient_program.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 19 " + 
                      "AND pp.patient_id IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id = 17)) " + 
                      "OR patient_program.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16 " + 
                      "AND pp.patient_id IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id = 17)) AND patient_program.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) >='"+query.start_date+"' AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_other")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total FROM " + database + ".patient_program " + 
                      "WHERE patient_program.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 19 " + 
                      "AND pp.patient_id IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id = 17)) " + 
                      "OR patient_program.patient_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 16 " + 
                      "AND pp.patient_id IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id = 17)) AND patient_program.voided = 0 " + 
                      "AND Date(patient_program.date_enrolled) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_attended_the_clinic")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM encounter LEFT OUTER JOIN person " + 
                      "ON person.person_id = encounter.patient_id LEFT OUTER JOIN encounter_type " + 
                      "ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN (SELECT patient_id FROM patient_program where program_id IN (13, 16, 17, 19)) " + 
                      "AND encounter_type.name IN('VITALS', 'APPOINTMENT', 'LAB RESULTS', 'LAB RESULTS', 'UPDATE OUTCOME', 'DIABETES HISTORY', 'PAST DIABETES MEDICAL HISTORY', 'GENERAL HEALTH', 'DIABETES INITIAL QUESTIONS', 'SEIZURE TYPE', 'FAMILY HISTORY', 'PATIENT HISTORY AT ENROLMENT', 'EPILEPSY PATIENT OVERVIEW', 'MEDICAL AND SURGICAL HISTORY', 'TRIGGERS', 'PRE-ICTAL WARNING', 'POST-ICTAL FEATURES', 'EPILEPSY VISIT', 'DIABETES FAMILY HISTORY', 'TREATMENTS', 'HIV/ART STATUS', 'VDRL STATUS', 'ASTHMA VISIT', 'EPILEPSY INITIAL QUESTIONS', 'ASTHMA INITIAL QUESTIONS', 'HYPERTENSION SOCIAL HISTORY', 'HYPERTENSION TEST')" + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) >='"+query.start_date+"' AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_did_not_attend_in_quarter")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM encounter LEFT OUTER JOIN person " + 
                      "ON person.person_id = encounter.patient_id LEFT OUTER JOIN encounter_type " + 
                      "ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN (SELECT patient_id FROM patient_program where program_id IN (13, 16, 17, 19))" + 
                      "AND encounter_type.name NOT IN('VITALS', 'APPOINTMENT', 'LAB RESULTS', 'LAB RESULTS', 'UPDATE OUTCOME', 'DIABETES HISTORY', 'PAST DIABETES MEDICAL HISTORY', 'GENERAL HEALTH', 'DIABETES INITIAL QUESTIONS', 'SEIZURE TYPE', 'FAMILY HISTORY', 'PATIENT HISTORY AT ENROLMENT', 'EPILEPSY PATIENT OVERVIEW', 'MEDICAL AND SURGICAL HISTORY', 'TRIGGERS', 'PRE-ICTAL WARNING', 'POST-ICTAL FEATURES', 'EPILEPSY VISIT', 'DIABETES FAMILY HISTORY', 'TREATMENTS', 'HIV/ART STATUS', 'VDRL STATUS', 'ASTHMA VISIT', 'EPILEPSY INITIAL QUESTIONS', 'ASTHMA INITIAL QUESTIONS', 'HYPERTENSION SOCIAL HISTORY', 'HYPERTENSION TEST')" + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) >='"+query.start_date+"' AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_treatment_stopped")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (19, 13, 16, 17)) " + 
                      "AND obs.concept_id = 6538 AND obs.value_text = 'Treatment stopped' and obs.voided = 0 " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_transfer_out")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (19, 13, 16, 17)) " + 
                      "AND obs.concept_id = 6538 AND obs.value_text = 'Transfer out' and obs.voided = 0 " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_died")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (19, 13, 16, 17)) " + 
                      "AND obs.concept_id = 6538 AND obs.value_text = 'Died' and obs.voided = 0 " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_lost_to_follow_up")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN (SELECT patient_id FROM patient_program where program_id IN (13, 16, 17, 19)) " + 
                      "AND encounter_type.name NOT IN('VITALS', 'APPOINTMENT', 'LAB RESULTS', 'LAB RESULTS', 'UPDATE OUTCOME', 'DIABETES HISTORY', 'PAST DIABETES MEDICAL HISTORY', 'GENERAL HEALTH', 'DIABETES INITIAL QUESTIONS', 'SEIZURE TYPE', 'FAMILY HISTORY', 'PATIENT HISTORY AT ENROLMENT', 'EPILEPSY PATIENT OVERVIEW', 'MEDICAL AND SURGICAL HISTORY', 'TRIGGERS', 'PRE-ICTAL WARNING', 'POST-ICTAL FEATURES', 'EPILEPSY VISIT', 'DIABETES FAMILY HISTORY', 'TREATMENTS', 'HIV/ART STATUS', 'VDRL STATUS', 'ASTHMA VISIT', 'EPILEPSY INITIAL QUESTIONS', 'ASTHMA INITIAL QUESTIONS', 'HYPERTENSION SOCIAL HISTORY', 'HYPERTENSION TEST') " + 
                      "AND (year(encounter.encounter_datetime) - year('"+query.end_date+"')) >= 12 AND encounter.voided = 0 AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_obese")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(t1.person_id)) AS total from " + database + ".obs t1 INNER JOIN " + 
                      "(select t2.person_id, t2.obs_datetime, t2.encounter_id, (ifnull(t2.value_numeric, t2.value_text) / 100) as height " + 
                      "FROM obs t2 WHERE t2.concept_id = 5090) as t3 ON t3.encounter_id = t1.encounter_id WHERE t1.concept_id = 5089 and t1.voided = 0 " + 
                      "AND round(((ifnull(t1.value_numeric, t1.value_text) / (height * height))), 2) >= 30 " + 
                      "AND Date(t1.obs_datetime) >='"+query.start_date+"' AND Date(t1.obs_datetime) <='"+query.end_date+"'"

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_obese")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(t1.person_id)) AS total from " + database + ".obs t1 INNER JOIN " + 
                      "(select t2.person_id, t2.obs_datetime, t2.encounter_id, (ifnull(t2.value_numeric, t2.value_text) / 100) as height " + 
                      "FROM obs t2 WHERE t2.concept_id = 5090) as t3 ON t3.encounter_id = t1.encounter_id WHERE t1.concept_id = 5089 and t1.voided = 0 " + 
                      "AND round(((ifnull(t1.value_numeric, t1.value_text) / (height * height))), 2) >= 30 " + 
                      "AND Date(t1.obs_datetime) <='"+query.end_date+"'"

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_current_smoker")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total, obs.voided AS voided FROM " + database + ".obs LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = obs.concept_id WHERE obs.person_id IN (SELECT patient_id FROM patient_program where program_id IN (13, 16, 17, 19)) " + 
                      "AND concept_name.name IN('Smoking?', 'Do you currently smoke?', 'Smoke?') " + 
                      "AND obs.value_text IN('Current smoker', 'Yes') AND obs.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_current_smoker")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total, obs.voided AS voided FROM " + database + ".obs LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = obs.concept_id WHERE obs.person_id IN (SELECT patient_id FROM patient_program where program_id IN (13, 16, 17, 19)) " + 
                      "AND concept_name.name IN('Smoking?', 'Do you currently smoke?', 'Smoke?') " + 
                      "AND obs.value_text IN('Current smoker', 'Yes') AND obs.voided = 0 " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_drinks_alcohol")
        .get(function (req, res) {
            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total, obs.voided AS voided FROM " + database + ".obs LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = obs.concept_id WHERE obs.person_id IN (SELECT patient_id FROM patient_program where program_id IN (13, 16, 17, 19)) " + 
                      "AND concept_name.name = 'Are you a heavy alcohol drinker?' " + 
                      "AND obs.value_text = 'Yes' AND obs.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_drinks_alcohol")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total, obs.voided AS voided FROM " + database + ".obs LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = obs.concept_id WHERE obs.person_id IN (SELECT patient_id FROM patient_program where program_id IN (13, 16, 17, 19)) " + 
                      "AND concept_name.name = 'Are you a heavy alcohol drinker?' " + 
                      "AND obs.value_text = 'Yes' AND obs.voided = 0 " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_attended_clinic_ht_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id  IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND encounter_type.name IN('HYPERTENSION INITIAL QUESTIONS', 'HYPERTENSION SOCIAL HISTORY', 'PAST HYPERTENSION MEDICAL HISTORY', 'HYPERTENSION FAMILY HISTORY', 'VITAL SIGNS', 'LAB RESULTS', 'HIV/ART STATUS', 'HYPERTENSION TEST', 'UPDATE OUTCOME', 'APPOINTMENT', 'TREATMENTS') " + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) >='"+query.start_date+"' AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_attended_clinic_ht_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id  IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND encounter_type.name IN('HYPERTENSION INITIAL QUESTIONS', 'HYPERTENSION SOCIAL HISTORY', 'PAST HYPERTENSION MEDICAL HISTORY', 'HYPERTENSION FAMILY HISTORY', 'VITAL SIGNS', 'LAB RESULTS', 'HIV/ART STATUS', 'HYPERTENSION TEST', 'UPDATE OUTCOME', 'APPOINTMENT', 'TREATMENTS') " + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_medication_prescribed_ht_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id  IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND encounter_type.name = 'TREATMENTS' AND encounter.voided = 0 " + 
                      "AND Date(encounter.encounter_datetime) >='"+query.start_date+"' AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_medication_prescribed_ht_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id  IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND encounter_type.name = 'TREATMENTS' AND encounter.voided = 0 " + 
                      "AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_blood_pressure_measured_ht_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN patient_program ON obs.person_id = patient_program.patient_id " + 
                      "LEFT OUTER JOIN concept_name ON obs.concept_id = concept_name.concept_id " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id IN (5085, 5086) AND obs.voided = 0 " + 
                      "AND Date(obs.date_created) >='"+query.start_date+"' AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_blood_pressure_measured_ht_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN patient_program ON obs.person_id = patient_program.patient_id " + 
                      "LEFT OUTER JOIN concept_name ON obs.concept_id = concept_name.concept_id " + 
                      "WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND obs.concept_id IN (5085, 5086) AND obs.voided = 0 " + 
                      "AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_blood_pressure_controlled_ht_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN encounter_type " + 
                      "ON encounter_type.encounter_type_id = obs.encounter_id LEFT OUTER JOIN patient_program ON obs.person_id = patient_program.patient_id " + 
                      "LEFT OUTER JOIN encounter ON encounter.encounter_type = obs.encounter_id LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = obs.concept_id WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND (concept_name.name = 'Systolic blood pressure' AND obs.value_numeric <= 140) OR (concept_name.name = 'Diastolic blood pressure' " + 
                      "AND obs.value_numeric <= 90) AND obs.voided =  0 AND Date(obs.date_created) >='"+query.start_date+"' AND Date(obs.date_created) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_blood_pressure_controlled_ht_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs LEFT OUTER JOIN encounter_type " + 
                      "ON encounter_type.encounter_type_id = obs.encounter_id LEFT OUTER JOIN patient_program ON obs.person_id = patient_program.patient_id " + 
                      "LEFT OUTER JOIN encounter ON encounter.encounter_type = obs.encounter_id LEFT OUTER JOIN concept_name " + 
                      "ON concept_name.concept_id = obs.concept_id WHERE obs.person_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id in (17) " + 
                      "AND pp.patient_id NOT IN (select p.patient_id FROM patient_program p WHERE p.program_id IN (13, 16, 19))) " + 
                      "AND (concept_name.name = 'Systolic blood pressure' AND obs.value_numeric <= 140) OR (concept_name.name = 'Diastolic blood pressure' " + 
                      "AND obs.value_numeric <= 90) AND obs.voided =  0 AND Date(obs.date_created) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_attended_clinic_ht_and_dt")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN(SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 13 " + 
                      "AND pp.patient_id IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id = 17)) " + 
                      "AND encounter_type.name IN('DIABETES INITIAL QUESTIONS', 'PAST DIABETES MEDICAL HISTORY', 'DIABETES HISTORY', 'GENERAL HEALTH', 'DIABETES FAMILY HISTORY', 'VITAL SIGNS', 'LAB RESULTS', 'HIV/ART STATUS', 'UPDATE OUTCOME', 'DIABETES TEST', 'APPOINTMENT', 'TREATMENTS', 'HYPERTENSION INITIAL QUESTIONS', 'HYPERTENSION SOCIAL HISTORY', 'PAST HYPERTENSION MEDICAL HISTORY', 'HYPERTENSION FAMILY HISTORY', 'HYPERTENSION TEST') " + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) >='"+query.start_date+"' AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_attended_clinic_ht_and_dt")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN(SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 13 " + 
                      "AND pp.patient_id IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id = 17)) " + 
                      "AND encounter_type.name IN('DIABETES INITIAL QUESTIONS', 'PAST DIABETES MEDICAL HISTORY', 'DIABETES HISTORY', 'GENERAL HEALTH', 'DIABETES FAMILY HISTORY', 'VITAL SIGNS', 'LAB RESULTS', 'HIV/ART STATUS', 'UPDATE OUTCOME', 'DIABETES TEST', 'APPOINTMENT', 'TREATMENTS', 'HYPERTENSION INITIAL QUESTIONS', 'HYPERTENSION SOCIAL HISTORY', 'PAST HYPERTENSION MEDICAL HISTORY', 'HYPERTENSION FAMILY HISTORY', 'HYPERTENSION TEST') " + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_medication_prescribed_ht_and_dt")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN(SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 13 " + 
                      "AND pp.patient_id IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id = 17)) " + 
                      "AND encounter_type.name = 'TREATMENTS' AND encounter.voided = 0 " + 
                      "AND Date(encounter.encounter_datetime) >='"+query.start_date+"' AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_medication_prescribed_ht_and_dt")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN(SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 13 " + 
                      "AND pp.patient_id IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id = 17)) " + 
                      "AND encounter_type.name = 'TREATMENTS' AND encounter.voided = 0 " + 
                      "AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_blood_pressure_measured_ht_and_dt")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN patient_program ON obs.person_id = patient_program.patient_id " + 
                      "LEFT OUTER JOIN concept_name ON obs.concept_id = concept_name.concept_id " + 
                      "WHERE obs.concept_id IN(5085, 5086) " + 
                      "AND obs.person_id in (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 13 " + 
                      "AND pp.patient_id IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id = 17)) " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_blood_pressure_measured_ht_and_dt")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN patient_program ON obs.person_id = patient_program.patient_id " + 
                      "LEFT OUTER JOIN concept_name ON obs.concept_id = concept_name.concept_id " + 
                      "WHERE obs.concept_id IN(5085, 5086) " + 
                      "AND obs.person_id in (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 13 " + 
                      "AND pp.patient_id IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id = 17)) " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_bgm_ht_and_dt")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT (obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 13 " + 
                      "AND pp.patient_id IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id = 17)) " + 
                      "AND obs.concept_id = 6381 AND obs.voided = 0 AND patient_program.voided = 0 AND encounter.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_bgm_ht_and_dt")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT (obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id " + 
                      "WHERE obs.person_id IN (SELECT pp.patient_id FROM patient_program pp WHERE pp.program_id = 13 " + 
                      "AND pp.patient_id IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id = 17)) " + 
                      "AND obs.concept_id = 6381 AND obs.voided = 0 AND patient_program.voided = 0 AND encounter.voided = 0 " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"
            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_bgc_fbg_ht_and_dt")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT (obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id " + 
                      "WHERE patient_program.patient_id IN (SELECT DISTINCT p1.patient_id from patient_program p1, patient_program p2 " + 
                      "WHERE p1.patient_id = p2.patient_id and p1.program_id = 13 and p2.program_id = 17) " + 
                      "AND obs.concept_id IN (6381 , 9417, 9418) AND obs.value_numeric < 7 AND obs.voided = 0 AND encounter.voided = 0 " + 
                      "AND patient_program.voided = 0 AND Date(obs.date_created) >='"+query.start_date+"' AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_bgc_fbg_ht_and_dt")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT (obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id " + 
                      "WHERE patient_program.patient_id IN (SELECT DISTINCT p1.patient_id from patient_program p1, patient_program p2 " + 
                      "WHERE p1.patient_id = p2.patient_id and p1.program_id = 13 and p2.program_id = 17) " + 
                      "AND obs.concept_id IN (6381 , 9417, 9418) AND obs.value_numeric < 7 AND obs.voided = 0 AND encounter.voided = 0 " + 
                      "AND patient_program.voided = 0 AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_bpc_ht_and_dt")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = obs.encounter_id " + 
                      "LEFT OUTER JOIN patient_program ON obs.person_id = patient_program.patient_id " + 
                      "LEFT OUTER JOIN encounter ON encounter.encounter_type = obs.encounter_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE patient_program.patient_id IN (SELECT DISTINCT p1.patient_id from patient_program p1, patient_program p2 " + 
                      "WHERE p1.patient_id = p2.patient_id and p1.program_id = 13 and p2.program_id = 17) " + 
                      "AND (concept_name.name = 'Systolic blood pressure' AND obs.value_numeric <= 140) OR (concept_name.name = 'Diastolic blood pressure' AND obs.value_numeric <= 90) " + 
                      "AND Date(obs.date_created) >='"+query.start_date+"' AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_bpc_ht_and_dt")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = obs.encounter_id " + 
                      "LEFT OUTER JOIN patient_program ON obs.person_id = patient_program.patient_id " + 
                      "LEFT OUTER JOIN encounter ON encounter.encounter_type = obs.encounter_id " + 
                      "LEFT OUTER JOIN concept_name ON concept_name.concept_id = obs.concept_id " + 
                      "WHERE patient_program.patient_id IN (SELECT DISTINCT p1.patient_id from patient_program p1, patient_program p2 " + 
                      "WHERE p1.patient_id = p2.patient_id and p1.program_id = 13 and p2.program_id = 17) " + 
                      "AND (concept_name.name = 'Systolic blood pressure' AND obs.value_numeric <= 140) OR (concept_name.name = 'Diastolic blood pressure' AND obs.value_numeric <= 90) " + 
                      "AND Date(obs.date_created) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_attended_clinic_diabetes_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id IN (13) " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (17, 16, 19))) " + 
                      "AND encounter_type.name IN('DIABETES INITIAL QUESTIONS', 'PAST DIABETES MEDICAL HISTORY', 'DIABETES HISTORY', 'GENERAL HEALTH', 'DIABETES FAMILY HISTORY', 'VITAL SIGNS', 'LAB RESULTS', 'HIV/ART STATUS', 'UPDATE OUTCOME', 'DIABETES TEST', 'APPOINTMENT', 'TREATMENTS') " + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) >='"+query.start_date+"' AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)          

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_attended_clinic_diabetes_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id IN (13) " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (17, 16, 19))) " + 
                      "AND encounter_type.name IN('DIABETES INITIAL QUESTIONS', 'PAST DIABETES MEDICAL HISTORY', 'DIABETES HISTORY', 'GENERAL HEALTH', 'DIABETES FAMILY HISTORY', 'VITAL SIGNS', 'LAB RESULTS', 'HIV/ART STATUS', 'UPDATE OUTCOME', 'DIABETES TEST', 'APPOINTMENT', 'TREATMENTS') " + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_medication_prescribed_diabetes_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id IN (13) " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (17, 16, 19))) " + 
                      "AND encounter_type.name = 'TREATMENTS' " + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) >='"+query.start_date+"' AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"



            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_medication_prescribed_diabetes_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id IN (13) " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (17, 16, 19))) " + 
                      "AND encounter_type.name = 'TREATMENTS' " + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"



            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_bgm_diabetes_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT (obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id " + 
                      "WHERE patient_program.program_id = 13 AND obs.concept_id = 6381 AND obs.voided = 0 " + 
                      "AND patient_program.voided = 0 AND encounter.voided = 0 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_bgm_diabetes_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT (obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id " + 
                      "WHERE patient_program.program_id = 13 AND obs.concept_id = 6381 AND obs.voided = 0 " + 
                      "AND patient_program.voided = 0 AND encounter.voided = 0 " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_bgc_fbg_diabetes_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT (obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id " + 
                      "WHERE patient_program.program_id = 13 AND obs.concept_id = 6381 AND obs.value_numeric < 7 " + 
                      "AND Date(obs.obs_datetime) >='"+query.start_date+"' AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_bgc_fbg_diabetes_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT (obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id " + 
                      "WHERE patient_program.program_id = 13 AND obs.concept_id = 6381 AND obs.value_numeric < 7 " + 
                      "AND obs.voided = 0 AND encounter.voided = 0 AND patient_program.voided = 0 " + 
                      "AND Date(obs.obs_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_attended_clinic_asthma_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id IN (19) " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (17, 16, 13))) " + 
                      "AND encounter_type.name IN('ASTHMA INITIAL QUESTIONS', 'ASTHMA MEDICAL HISTORY', 'ASTHMA SOCIAL HISTORY', 'ASTHMA VISIT', 'VITAL SIGNS', 'HIV/ART STATUS', 'UPDATE OUTCOME', 'APPOINTMENT', 'TREATMENTS') " + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) >='"+query.start_date+"' AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"
            
            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_attended_clinic_asthma_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id IN (19) " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (17, 16, 13))) " + 
                      "AND encounter_type.name IN('ASTHMA INITIAL QUESTIONS', 'ASTHMA MEDICAL HISTORY', 'ASTHMA SOCIAL HISTORY', 'ASTHMA VISIT', 'VITAL SIGNS', 'HIV/ART STATUS', 'UPDATE OUTCOME', 'APPOINTMENT', 'TREATMENTS') " + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)          

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_medication_prescribed_asthma_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id IN (19) " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (17, 16, 13))) " + 
                      "AND encounter_type.name = 'TREATMENTS' " + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) >='"+query.start_date+"' AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_medication_prescribed_asthma_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id IN (19) " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (17, 16, 13))) " + 
                      "AND encounter_type.name = 'TREATMENTS' " + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_no_asthma_in_3months_asthma_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT (obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id " + 
                      "WHERE patient_program.program_id = 19 AND obs.concept_id IN(9542, 9553) AND obs.value_text = 'No' " + 
                      "AND obs.voided = 0 AND patient_program.voided = 0 AND encounter.voided = 0 " + 
                      "AND Date(obs.date_created) >='"+query.start_date+"' AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_no_asthma_in_3months_asthma_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT (obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id " + 
                      "LEFT OUTER JOIN patient_program ON patient_program.patient_id = obs.person_id " + 
                      "WHERE patient_program.program_id = 19 AND obs.concept_id IN(9542, 9553) AND obs.value_text = 'No' " + 
                      "AND obs.voided = 0 AND patient_program.voided = 0 AND encounter.voided = 0 " + 
                      "AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_attended_clinic_epilepsy_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query


            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id IN (16) " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (17, 19, 13))) " + 
                      "AND encounter_type.name IN('EPILEPSY INITIAL QUESTIONS', 'PATIENT HISTORY AT ENROLMENT', 'MEDICAL AND SURGICAL HISTORY', 'EPILEPSY FAMILY HISTORY', 'VDRL STATUS', 'SEIZURE TYPE', 'TRIGGERS', 'PRE-ICTAL WARNING', 'POST-ICTAL FEATURES', 'EPILEPSY PATIENT OVERVIEW', 'EPILEPSY VISIT' 'VITAL SIGNS', 'HIV/ART STATUS', 'UPDATE OUTCOME', 'APPOINTMENT', 'TREATMENTS') " + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) >='"+query.start_date+"' AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"
            
            console.log(sql)          

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_attended_clinic_epilepsy_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id IN (16) " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (17, 19, 13))) " + 
                      "AND encounter_type.name IN('EPILEPSY INITIAL QUESTIONS', 'PATIENT HISTORY AT ENROLMENT', 'MEDICAL AND SURGICAL HISTORY', 'EPILEPSY FAMILY HISTORY', 'VDRL STATUS', 'SEIZURE TYPE', 'TRIGGERS', 'PRE-ICTAL WARNING', 'POST-ICTAL FEATURES', 'EPILEPSY PATIENT OVERVIEW', 'EPILEPSY VISIT' 'VITAL SIGNS', 'HIV/ART STATUS', 'UPDATE OUTCOME', 'APPOINTMENT', 'TREATMENTS') " + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)         

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_medication_prescribed_epilepsy_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id IN (16) " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (17, 19, 13))) " + 
                      "AND encounter_type.name = 'TREATMENTS' " + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) >='"+query.start_date+"' AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_medication_prescribed_epilepsy_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(encounter.patient_id)) AS total FROM " + database + ".encounter LEFT OUTER JOIN person ON person.person_id = encounter.patient_id " + 
                      "LEFT OUTER JOIN encounter_type ON encounter_type.encounter_type_id = encounter.encounter_type " + 
                      "WHERE patient_id IN(SELECT pp.patient_id from patient_program pp WHERE pp.program_id IN (16) " + 
                      "AND pp.patient_id NOT IN (SELECT p.patient_id FROM patient_program p WHERE p.program_id IN (17, 19, 13))) " + 
                      "AND encounter_type.name = 'TREATMENTS' " + 
                      "AND encounter.voided = 0 AND Date(encounter.encounter_datetime) <='"+query.end_date+"'"


            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_no_seizure_epilepsy_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs INNER JOIN encounter ON encounter.patient_id = obs.person_id " + 
                      "WHERE obs.concept_id = 9517 AND obs.value_text = 'No' AND encounter.voided = 0 " + 
                      "AND Date(obs.date_created) >='"+query.start_date+"' AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_no_seizure_epilepsy_alone")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs INNER JOIN encounter ON encounter.patient_id = obs.person_id " + 
                      "WHERE obs.concept_id = 9517 AND obs.value_text = 'No' AND encounter.voided = 0 " + 
                      "AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_disease_complications_stroke")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id WHERE obs.concept_id IN(6178, 9560, 9565, 9403) " + 
                      "AND obs.value_text IN ('Stroke', 'Strokes', 'Yes') AND obs.voided = 0 AND encounter.voided = 0 " + 
                      "AND Date(obs.date_created) >='"+query.start_date+"' AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_disease_complications_stroke")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id WHERE obs.concept_id IN(6178, 9560, 9565, 9403) " + 
                      "AND obs.value_text IN ('Stroke', 'Strokes', 'Yes') AND obs.voided = 0 AND encounter.voided = 0 " + 
                      "AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_disease_complications_mi")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id WHERE obs.concept_id = 9403 " + 
                      "AND obs.value_text = 'Myocardial Infarction' AND obs.voided = 0 AND encounter.voided = 0 " + 
                      "AND Date(obs.date_created) >='"+query.start_date+"' AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_disease_complications_mi")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id WHERE obs.concept_id = 9403 " + 
                      "AND obs.value_text = 'Myocardial Infarction' AND obs.voided = 0 AND encounter.voided = 0 " + 
                      "AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_disease_complications_cd")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id WHERE obs.concept_id IN(6178, 6773, 9428) " + 
                      "AND obs.value_text = 'Serious Cardiac Problems' AND obs.voided = 0 AND encounter.voided = 0 " + 
                      "AND Date(obs.date_created) >='"+query.start_date+"' AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_disease_complications_cd")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id WHERE obs.concept_id IN(6178, 6773, 9428) " + 
                      "AND obs.value_text = 'Serious Cardiac Problems' AND obs.voided = 0 AND encounter.voided = 0 " + 
                      "AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_disease_complications_blindness")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id WHERE obs.value_text LIKE '%Visual Blindness%' " + 
                      "AND obs.concept_id = 6406 AND obs.voided = 0 AND encounter.voided = 0 " + 
                      "AND Date(obs.date_created) >='"+query.start_date+"' AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_disease_complications_blindness")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id WHERE obs.value_text LIKE '%Visual Blindness%' " + 
                      "AND obs.concept_id = 6406 AND obs.voided = 0 AND encounter.voided = 0 " + 
                      "AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_disease_complications_burns")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id WHERE obs.concept_id = 6406 " + 
                      "AND obs.value_text = 'Burns' AND obs.voided = 0 AND encounter.voided = 0 " + 
                      "AND Date(obs.date_created) >='"+query.start_date+"' AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_disease_complications_burns")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(obs.person_id)) AS total FROM " + database + ".obs " + 
                      "LEFT OUTER JOIN encounter ON encounter.patient_id = obs.person_id WHERE obs.concept_id = 6406 " + 
                      "AND obs.value_text = 'Burns' AND obs.voided = 0 AND encounter.voided = 0 " + 
                      "AND Date(obs.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_anti_diabetic_drug_metformin")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 6871) " + 
                      "AND orders.concept_id = 4052 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_anti_diabetic_drug_metformin")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 6871) " + 
                      "AND orders.concept_id = 4052 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_anti_diabetic_drug_glibenclamide")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "WHERE concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 6871) " + 
                      "AND orders.concept_id = 4046 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_anti_diabetic_drug_glibenclamide")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "WHERE concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 6871) " + 
                      "AND orders.concept_id = 4046 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_anti_diabetic_drug_insuline")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 6871) " + 
                      "AND orders.concept_id IN(278, 279, 280, 281, 282) AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_anti_diabetic_drug_insuline")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 6871) " + 
                      "AND orders.concept_id IN(278, 279, 280, 281, 282) AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_anti_hypertensive_drug_hydro")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 6872) " + 
                      "AND orders.concept_id = 1243 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_anti_hypertensive_drug_hydro")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 6872) " + 
                      "AND orders.concept_id = 1243 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_anti_hypertensive_drug_amlodipine")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN patient_program " + 
                      "ON orders.patient_id = patient_program.patient_id WHERE orders.patient_id IN " + 
                      "(SELECT patient_id FROM " + database + ".patient_program WHERE program_id = 20 AND voided = 0) AND orders.concept_id = 3187 " + 
                      "AND orders.voided = 0 AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_anti_hypertensive_drug_amlodipine")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders LEFT OUTER JOIN patient_program " + 
                      "ON orders.patient_id = patient_program.patient_id WHERE orders.patient_id IN " + 
                      "(SELECT patient_id FROM " + database + ".patient_program WHERE program_id = 20 AND voided = 0) AND orders.concept_id = 3187 " + 
                      "AND orders.voided = 0 AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_anti_hypertensive_drug_captopril")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 6872) " + 
                      "AND orders.concept_id = 3182 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_anti_hypertensive_drug_captopril")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 6872) " + 
                      "AND orders.concept_id = 3182 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_anti_hypertensive_drug_other")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 6872) " + 
                      "AND orders.concept_id NOT IN(3182, 1243) AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_anti_hypertensive_drug_other")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 6872) " + 
                      "AND orders.concept_id NOT IN(3182, 1243) AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_anti_asthma_drug_salb_inhaler")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 9243) " + 
                      "AND orders.concept_id = 798 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_anti_asthma_drug_salb_inhaler")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 9243) " + 
                      "AND orders.concept_id = 798 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_anti_asthma_drug_steroid_inhaler")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 9243) " + 
                      "AND orders.concept_id = 1240 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_anti_asthma_drug_steroid_inhaler")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 9243) " + 
                      "AND orders.concept_id = 1240 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_anti_asthma_drug_other")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 9243) " + 
                      "AND orders.concept_id NOT IN(798, 1240) AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_anti_asthma_drug_other")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 9243) " + 
                      "AND orders.concept_id = 1240 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_anti_epilepsy_drug_pherno")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 9246) " + 
                      "AND orders.concept_id = 238 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_anti_epilepsy_drug_pherno")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 9246) " + 
                      "AND orders.concept_id = 238 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_anti_epilepsy_drug_pheny")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 9246) " + 
                      "AND orders.concept_id = 273 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_anti_epilepsy_drug_pheny")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 9246) " + 
                      "AND orders.concept_id = 273 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_anti_epilepsy_drug_carb")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 9246) " + 
                      "AND orders.concept_id = 920 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) >='"+query.start_date+"' AND Date(orders.date_created) <='"+query.end_date+"'"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_anti_epilepsy_drug_carb")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(orders.patient_id)) AS total FROM " + database + ".orders " + 
                      "where concept_id IN (SELECT concept_id FROM " + database + ".concept_set where concept_set = 9246) " + 
                      "AND orders.concept_id = 920 AND orders.voided = 0 " + 
                      "AND Date(orders.date_created) <='"+query.end_date+"'"

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