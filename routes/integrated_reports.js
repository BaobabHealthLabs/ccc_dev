/**
 * Created by chimwemwe on 9/16/16.
 */

module.exports = function (router) {

    var async = require('async');
    var url = require('url');

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

    }

    router.route("/new_registered_male")
        .get(function (req, res) {

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, person.gender AS gender FROM ccc1_7.patient_program LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program ON program.program_id = patient_program.program_id WHERE person.gender = 'M' AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') AND patient_program.date_enrolled >= now()-interval 3 month";

            queryRaw(sql, function(data){

                console.log(data[0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_registered_male")
        .get(function (req, res) {

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, person.gender AS gender FROM ccc1_7.patient_program LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program ON program.program_id = patient_program.program_id WHERE person.gender = 'M' AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM')";

            queryRaw(sql, function(data){

                console.log(data[0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/new_registered_female")
        .get(function (req, res) {

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, person.gender AS gender FROM ccc1_7.patient_program LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program ON program.program_id = patient_program.program_id WHERE person.gender = 'F' AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') AND patient_program.date_enrolled >= now()-interval 3 month";

            queryRaw(sql, function(data){

                console.log(data[0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/cumulative_registered_female")
        .get(function (req, res) {

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, person.gender AS gender FROM ccc1_7.patient_program LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program ON program.program_id = patient_program.program_id WHERE person.gender = 'F' AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM')";

            queryRaw(sql, function(data){

                console.log(data[0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_registered_under_14")
        .get(function (req, res) {

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, patient_program.voided FROM ccc1_7.patient_program LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program ON program.program_id = patient_program.program_id WHERE (year(patient_program.date_created) - year(person.birthdate)) > 0 AND (year(patient_program.date_created) - year(person.birthdate)) <= 14 AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') AND patient_program.voided = 0 AND patient_program.date_enrolled >= now()-interval 3 month";

            queryRaw(sql, function(data){

                console.log(data[0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_registered_under_14")
        .get(function (req, res) {

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, patient_program.voided FROM ccc1_7.patient_program LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program ON program.program_id = patient_program.program_id WHERE (year(patient_program.date_created) - year(person.birthdate)) > 0 AND (year(patient_program.date_created) - year(person.birthdate)) <= 14 AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') AND patient_program.voided = 0";

            queryRaw(sql, function(data){

                console.log(data[0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_registered_between_14_to_44")
        .get(function (req, res) {

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, person.gender AS gender, patient_program.voided FROM ccc1_7.patient_program LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program ON program.program_id = patient_program.program_id WHERE (year(patient_program.date_created) - year(person.birthdate)) > 15 AND (year(patient_program.date_created) - year(person.birthdate)) <= 44 AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') AND patient_program.voided = 0 GROUP BY person.gender AND patient_program.voided = 0 AND patient_program.date_enrolled >= now()-interval 3 month";

            queryRaw(sql, function(data){

                console.log(data[0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_registered_between_14_to_44")
        .get(function (req, res) {

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, person.gender AS gender, patient_program.voided FROM ccc1_7.patient_program LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program ON program.program_id = patient_program.program_id WHERE (year(patient_program.date_created) - year(person.birthdate)) > 15 AND (year(patient_program.date_created) - year(person.birthdate)) <= 44 AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') AND patient_program.voided = 0 GROUP BY person.gender AND patient_program.voided = 0";

            queryRaw(sql, function(data){

                console.log(data[0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_registered_between_45_to_64")
        .get(function (req, res) {

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, person.gender AS gender, patient_program.voided FROM ccc1_7.patient_program LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program ON program.program_id = patient_program.program_id WHERE (year(patient_program.date_created) - year(person.birthdate)) > 45 AND (year(patient_program.date_created) - year(person.birthdate)) <= 64 AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') AND patient_program.voided = 0 GROUP BY person.gender AND patient_program.voided = 0 AND patient_program.date_enrolled >= now()-interval 3 month";

            queryRaw(sql, function(data){

                console.log(data[0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_registered_between_45_to_64")
        .get(function (req, res) {

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, person.gender AS gender, patient_program.voided FROM ccc1_7.patient_program LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program ON program.program_id = patient_program.program_id WHERE (year(patient_program.date_created) - year(person.birthdate)) > 45 AND (year(patient_program.date_created) - year(person.birthdate)) <= 64 AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') AND patient_program.voided = 0 AND patient_program.voided = 0";

            queryRaw(sql, function(data){

                console.log(data[0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_registered_above_64")
        .get(function (req, res) {

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, person.gender AS gender, patient_program.voided FROM ccc1_7.patient_program LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program ON program.program_id = patient_program.program_id WHERE (year(patient_program.date_created) - year(person.birthdate)) > 65 AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') AND patient_program.voided = 0 AND patient_program.date_enrolled >= now()-interval 3 month";

            queryRaw(sql, function(data){

                console.log(data[0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/cumulative_registered_above_64")
        .get(function (req, res) {

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, person.gender AS gender, patient_program.voided FROM ccc1_7.patient_program LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program ON program.program_id = patient_program.program_id WHERE (year(patient_program.date_created) - year(person.birthdate)) > 65 AND program.name IN('HYPERTENSION PROGRAM', 'ASTHMA PROGRAM', 'DIABETES PROGRAM', 'EPILEPSY PROGRAM') AND patient_program.voided = 0";

            queryRaw(sql, function(data){

                console.log(data[0]["total"]);

                res.send(data[0][0]);


            });

        });

    router.route("/new_diabetes_alone")
        .get(function (req, res) {

            var result = 0;

            var sql = "SELECT COUNT(DISTINCT(patient_program.patient_id)) AS total, person.gender AS gender FROM ccc1_7.patient_program LEFT OUTER JOIN person ON person.person_id = patient_program.patient_id LEFT OUTER JOIN program ON program.program_id = patient_program.program_id WHERE program.name = 'DIABETES PROGRAM' AND patient_program.date_enrolled >= now()-interval 3 month";

            queryRaw(sql, function(data){

                console.log(data[0]["total"]);

                res.send(data[0][0]);


            });

        });
    return router;

}