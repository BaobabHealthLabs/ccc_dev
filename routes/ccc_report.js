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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function getID(identifier) {

        var sql = " SELECT patient_id FROM patient_identifier WHERE identifier='" + identifier + "'";

        var patient_id;

        queryRaw(sql, function (data) {

            patient_id = adata[0];

        });
    }

    router.route("/patient/:id/card")
        .get(function (req, res) {

        var pid = 24;
        var sql = " SELECT encounter.encounter_id,encounter.patient_id,encounter.encounter_datetime," +
            " encounter.patient_program_id,obs.obs_id,obs.encounter_id," +
            " obs.obs_datetime,obs.value_text,obs.concept_id,concept.concept_id,concept.name " +
            " FROM  encounter INNER JOIN obs ON encounter.encounter_id = obs.encounter_id " +
            " AND encounter.patient_id = obs.person_id " +
            " INNER JOIN (SELECT concept_name.name as name , concept.concept_id as concept_id FROM concept " +
            " INNER JOIN concept_name ON concept.concept_id = concept_name.concept_id ) concept ON obs.concept_id = concept.concept_id " +
            " WHERE encounter.patient_id =" + pid + " ORDER BY obs.obs_id";

        queryRaw(sql, function (data) {

            var result = "";

            if (data[0].length > 0) {

                result = data[0][0].value_text;

            }

            res.send(data[0]);

        });

    });

    router.route("/card_p_demographics/:id")
        .get(function (req, res) {

        var pid = req.params['id'];

        var sql = " SELECT person.person_id, CONCAT(given_name,\" \",middle_name,\" \", family_name)as name, " +
            " STR_TO_DATE(person.birthdate,'%d %b ,%Y') as dob,gender,state_province as current_district, township_division as current_ta, " +
            " city_village as current_village,address1 as closest_land_mark, address2 as home_district " +
            ",county_district as home_ta,neighborhood_cell as home_village FROM person_name INNER JOIN " +
            " person INNER JOIN person_address ON person_name.person_id = person.person_id =person_address.person_id " +
            " WHERE person.person_id =" + pid;

        queryRaw(sql, function (data) {

            res.send(data[0][0]);

        });


    });

    router.route("/card_seizure_type/:id")
        .get(function (req, res) {

        var pid = req.params['id'];

        var sql = " SELECT concept.name , obs.person_id, obs.value_text FROM obs INNER JOIN " +
            " (SELECT name , concept.concept_id FROM concept_name INNER JOIN concept ON concept_name.concept_id = concept.concept_id)" +
            " as concept ON concept.concept_id = obs.concept_id INNER JOIN (SELECT encounter_id FROM encounter_type INNER JOIN encounter " +
            " ON encounter_type.encounter_type_id = encounter.encounter_type WHERE name = 'SEIZURE TYPE') encounter " +
            " ON encounter.encounter_id = obs.encounter_id WHERE concept.name !='Epilepsy Category' AND person_id =" + pid;

        queryRaw(sql, function (data) {

            res.send(data[0]);

        });
    });

    router.route("/card_epilepsy_family_history/:id")
        .get(function (req, res) {

        var pid = req.params['id'];

        var sql = " SELECT concept.name , obs.person_id, obs.value_text FROM obs " +
            " INNER JOIN  (SELECT name , concept.concept_id FROM concept_name INNER JOIN concept " +
            " ON concept_name.concept_id = concept.concept_id) as concept ON concept.concept_id = obs.concept_id " +
            " INNER JOIN (SELECT encounter_id FROM encounter_type INNER JOIN encounter  " +
            " ON encounter_type.encounter_type_id = encounter.encounter_type " +
            " WHERE name = 'FAMILY HISTORY') encounter  ON encounter.encounter_id = obs.encounter_id " +
            " WHERE  person_id =" + pid;

        queryRaw(sql, function (data) {

            res.send(data[0]);

        });
    });

    router.route("/card_epilepsy_hiv_status/:id")
        .get(function (req, res) {

        var pid = req.params["id"];

        var sql = " SELECT concept.name , obs.person_id, obs.value_text FROM obs INNER JOIN  " +
            " (SELECT name , concept.concept_id FROM concept_name INNER JOIN concept " +
            " ON concept_name.concept_id = concept.concept_id) as concept " +
            " ON concept.concept_id = obs.concept_id INNER JOIN " +
            " (SELECT encounter_id FROM encounter_type INNER JOIN encounter  " +
            " ON encounter_type.encounter_type_id = encounter.encounter_type " +
            " WHERE name = 'HIV/ART STATUS') encounter  ON encounter.encounter_id = obs.encounter_id " +
            " WHERE  person_id =" + pid + " ORDER BY encounter.encounter_id DESC";

        queryRaw(sql, function (data) {

            res.send(data[0][0]);

        });

    });

    router.route("/card_epilepsy_patient_history/:id")
        .get(function (req, res) {

        var pid = req.params["id"];

        var sql = " SELECT concept.name , obs.person_id, obs.value_text FROM obs INNER JOIN  " +
            " (SELECT name , concept.concept_id FROM concept_name INNER JOIN concept " +
            " ON concept_name.concept_id = concept.concept_id) as concept " +
            " ON concept.concept_id = obs.concept_id INNER JOIN " +
            " (SELECT encounter_id FROM encounter_type INNER JOIN encounter  " +
            " ON encounter_type.encounter_type_id = encounter.encounter_type " +
            " WHERE name = 'PATIENT HISTORY AT ENROLMENT') encounter  ON encounter.encounter_id = obs.encounter_id " +
            " WHERE  person_id =" + pid + " ORDER BY encounter.encounter_id DESC";

        queryRaw(sql, function (data) {

            res.send(data[0]);

        });

    });

    router.route("/card_epilepsy_medical_surgical_history/:id")
        .get(function (req, res) {

        var pid = req.params["id"];

        var sql = " SELECT concept.name , obs.person_id, obs.value_text FROM obs INNER JOIN  " +
            " (SELECT name , concept.concept_id FROM concept_name INNER JOIN concept " +
            " ON concept_name.concept_id = concept.concept_id) as concept " +
            " ON concept.concept_id = obs.concept_id INNER JOIN " +
            " (SELECT encounter_id FROM encounter_type INNER JOIN encounter  " +
            " ON encounter_type.encounter_type_id = encounter.encounter_type " +
            " WHERE name = 'MEDICAL AND SURGICAL HISTORY') encounter  ON encounter.encounter_id = obs.encounter_id " +
            " WHERE  person_id =" + pid + " ORDER BY encounter.encounter_id DESC";

        queryRaw(sql, function (data) {

            res.send(data[0]);

        });

    });

    router.route("/card_epilepsy_triggers/:id")
        .get(function (req, res) {

        var pid = req.params["id"];

        var sql = " SELECT concept.name , obs.person_id, obs.value_text FROM obs INNER JOIN  " +
            " (SELECT name , concept.concept_id FROM concept_name INNER JOIN concept " +
            " ON concept_name.concept_id = concept.concept_id) as concept " +
            " ON concept.concept_id = obs.concept_id INNER JOIN " +
            " (SELECT encounter_id FROM encounter_type INNER JOIN encounter  " +
            " ON encounter_type.encounter_type_id = encounter.encounter_type " +
            " WHERE name = 'TRIGGERS') encounter  ON encounter.encounter_id = obs.encounter_id " +
            " WHERE  person_id =" + pid + " ORDER BY encounter.encounter_id DESC";

        queryRaw(sql, function (data) {

            res.send(data[0]);

        });

    });

    router.route("/card_epilepsy_post_ictal_features/:id")
        .get(function (req, res) {

        var pid = req.params["id"];

        var sql = " SELECT concept.name , obs.person_id, obs.value_text FROM obs INNER JOIN  " +
            " (SELECT name , concept.concept_id FROM concept_name INNER JOIN concept " +
            " ON concept_name.concept_id = concept.concept_id) as concept " +
            " ON concept.concept_id = obs.concept_id INNER JOIN " +
            " (SELECT encounter_id FROM encounter_type INNER JOIN encounter  " +
            " ON encounter_type.encounter_type_id = encounter.encounter_type " +
            " WHERE name = 'POST-ICTAL FEATURES') encounter  ON encounter.encounter_id = obs.encounter_id " +
            " WHERE  person_id =" + pid + " ORDER BY encounter.encounter_id DESC";

        queryRaw(sql, function (data) {

            res.send(data[0]);

        });

    });

    router.route("/card_epilepsy_patient_overvew/:id/:concept")
        .get(function (req, res) {

        var pid = req.params["id"];

        console.log("hello")

        var concept = req.params["concept"];

        var sql = " SELECT distinct concept.name , obs.person_id, obs.value_text,obs.encounter_id FROM obs " +
            " INNER JOIN  (SELECT name , concept.concept_id FROM concept_name " +
            " INNER JOIN concept ON concept_name.concept_id = concept.concept_id WHERE " +
            " name ='" + concept + "') as concept " +
            " ON concept.concept_id = obs.concept_id INNER JOIN " +
            " (SELECT encounter_id,encounter_datetime FROM encounter_type " +
            " INNER JOIN encounter  ON encounter_type.encounter_type_id = encounter.encounter_type " +
            " WHERE name = 'EPILEPSY PATIENT OVERVIEW') encounter ON encounter.encounter_id = obs.encounter_id " +
            " WHERE  person_id =24 AND obs.encounter_id =(SELECT MAX(encounter_id) FROM encounter) " +
            " ORDER BY encounter.encounter_id DESC";

        queryRaw(sql, function (data) {

            res.send(data[0][0]);

        });

    });

    router.route("/card_epilepsy_patient_overvew/:id")
        .get(function (req, res) {

        var pid = req.params["id"];

        var concept = req.params["concept"];

        var sql = " SELECT distinct concept.name , obs.person_id, obs.value_text,obs.encounter_id FROM obs " +
            " INNER JOIN  (SELECT name , concept.concept_id FROM concept_name " +
            " INNER JOIN concept ON concept_name.concept_id = concept.concept_id WHERE " +
            " name !='Complications' AND name != 'Exposures') as concept " +
            " ON concept.concept_id = obs.concept_id INNER JOIN " +
            " (SELECT encounter_id,encounter_datetime FROM encounter_type " +
            " INNER JOIN encounter  ON encounter_type.encounter_type_id = encounter.encounter_type " +
            " WHERE name = 'EPILEPSY PATIENT OVERVIEW') encounter ON encounter.encounter_id = obs.encounter_id " +
            " WHERE  person_id =24 AND obs.encounter_id =(SELECT MAX(encounter_id) FROM encounter) " +
            " ORDER BY encounter.encounter_id DESC";

        queryRaw(sql, function (data) {

            res.send(data[0]);

        });

    });

    router.route("/card_epilepsy_visits/:id")
        .get(function (req, res) {

        var pid = req.params["id"];

        var sql = " SELECT concept.name , obs.person_id, obs.value_text FROM obs INNER JOIN  " +
            " (SELECT name , concept.concept_id FROM concept_name INNER JOIN concept " +
            " ON concept_name.concept_id = concept.concept_id) as concept " +
            " ON concept.concept_id = obs.concept_id INNER JOIN " +
            " (SELECT encounter_id FROM encounter_type INNER JOIN encounter  " +
            " ON encounter_type.encounter_type_id = encounter.encounter_type " +
            " WHERE name = 'EPILEPSY VISIT') encounter  ON encounter.encounter_id = obs.encounter_id " +
            " WHERE  person_id =" + pid + " ORDER BY encounter.encounter_id DESC";

        queryRaw(sql, function (data) {

            res.send(data[0]);

        });

    });

    router.route("/card/:id/:program")
        .get(function (req, res) {

        res.sendFile(__dirname + "/public/views/" + req.params["program"] + "/card.html");

    });

    router.route("/overview")
        .get(function (req, res) {

        var url_parts = url.parse(req.url, true);

        var query = url_parts.query;

        var today = (query.date ? (new Date(query.date)) : (new Date())).format("YYYY-mm-dd");

        console.log(today);

        var results = {
            today: {},
            month: {},
            year: {}
        };

        async.series([

            function (callback) {

                var sql = "SELECT encounter.patient_id, count(distinct date(encounter_datetime)) AS total, " +
                    "date(encounter_datetime) AS encounter_datetime, program.program_id, gender FROM " +
                    "encounter LEFT OUTER JOIN patient_program ON patient_program.patient_program_id = " +
                    "encounter.patient_program_id LEFT OUTER JOIN program ON program.program_id = " +
                    "patient_program.program_id LEFT OUTER JOIN person ON person.person_id = " +
                    "encounter.patient_id GROUP BY program.program_id, date(encounter_datetime), " +
                    "encounter.patient_id HAVING encounter_datetime = DATE('" + today + "')";

                console.log(sql);

                queryRaw(sql, function (data) {

                    console.log(data);

                    if (data && data[0].length > 0) {

                        for (var i = 0; i < data[0].length; i++) {

                            var row = data[0][i];

                            if (!results.today[row.gender])
                                results.today[row.gender] = [];

                            results.today[row.gender].push(row.patient_id);

                        }

                    }

                    callback();

                })

            },

            function (callback) {

                var sql = "SELECT encounter.patient_id, count(distinct date(encounter_datetime)) AS total, " +
                    "date(encounter_datetime) AS encounter_datetime, program.program_id, gender FROM " +
                    "encounter LEFT OUTER JOIN patient_program ON patient_program.patient_program_id = " +
                    "encounter.patient_program_id LEFT OUTER JOIN program ON program.program_id = " +
                    "patient_program.program_id LEFT OUTER JOIN person ON person.person_id = " +
                    "encounter.patient_id GROUP BY program.program_id, date(encounter_datetime), " +
                    "encounter.patient_id HAVING month(encounter_datetime) = month('" + today +
                    "') AND year(encounter_datetime) = year('" + today + "')";

                console.log(sql);

                queryRaw(sql, function (data) {

                    console.log(data);

                    if (data && data[0].length > 0) {

                        for (var i = 0; i < data[0].length; i++) {

                            var row = data[0][i];

                            if (!results.month[row.gender])
                                results.month[row.gender] = [];

                            results.month[row.gender].push(row.patient_id);

                        }

                    }

                    callback();

                })

            },

            function (callback) {

                var sql = "SELECT encounter.patient_id, count(distinct date(encounter_datetime)) AS total, " +
                    "date(encounter_datetime) AS encounter_datetime, program.program_id, gender FROM " +
                    "encounter LEFT OUTER JOIN patient_program ON patient_program.patient_program_id = " +
                    "encounter.patient_program_id LEFT OUTER JOIN program ON program.program_id = " +
                    "patient_program.program_id LEFT OUTER JOIN person ON person.person_id = " +
                    "encounter.patient_id GROUP BY program.program_id, date(encounter_datetime), " +
                    "encounter.patient_id HAVING year(encounter_datetime) = year('" + today + "')";

                console.log(sql);

                queryRaw(sql, function (data) {

                    console.log(data);

                    if (data && data[0].length > 0) {

                        for (var i = 0; i < data[0].length; i++) {

                            var row = data[0][i];

                            if (!results.year[row.gender])
                                results.year[row.gender] = [];

                            results.year[row.gender].push(row.patient_id);

                        }

                    }

                    callback();

                })

            }

        ], function (err) {

            if (err)
                console.log(err);

            res.status(200).json(results);

        })

    });

    return router;

}