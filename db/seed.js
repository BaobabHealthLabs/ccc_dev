#!/usr/bin/env node

var seed = require("./seed.json");

var async = require('async');

var uuid = require("node-uuid");

var connection = require("../config/database.json");

var existingConcepts = require("./concepts.json");

var existingEncounterTypes = require("./encounter_types.json");

var existingPatientIdentifierTypes = require("./patient_identifier_types.json");

var existingPersonAttributeTypes = require("./person_attribute_types.json");

var fs = require("fs");

function queryRaw(sql, callback) {

    var config = require("../config/database.json");

    var knex = require("knex")({
        client: "mysql",
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

function runCmd(cmd, callBack) {
    var exec = require('child_process').exec;

    exec(cmd, function (error, stdout, stderr) {

        callBack(error, stdout, stderr);

    });
}

function loadSeedData(eCallback) {

    var knex = require('knex')({
        client: 'mysql',
        connection: {
            host: connection.host,
            user: connection.user,
            password: connection.password,
            database: connection.database
        }
    });

    var knexInv = require('knex')({
        client: 'mysql',
        connection: {
            host: connection.host,
            user: connection.user,
            password: connection.password,
            database: connection.stockDatabase
        }
    });

    if (Array.prototype.includes == null) Array.prototype.includes = function (term) {

        var found = false;

        for (var i = 0; i < this.length; i++) {

            if (this[i] == term) {

                found = true;

                break;

            }

        }

        return found;

    }

    if (Array.prototype.unique == null) Array.prototype.unique = function () {
        var u = {}, a = [];
        for (var i = 0, l = this.length; i < l; ++i) {
            if (u.hasOwnProperty(this[i])) {
                continue;
            }
            a.push(this[i]);
            u[this[i]] = 1;
        }
        return a;
    }

    async.series([

        function (iCallback) {

            if (seed.encounter_types.length > 0) {

                console.log("Loading encounter_types...");

                async.each(seed.encounter_types, function (encounter_type, callback) {

                    knex.raw("SELECT * FROM encounter_type  WHERE name = '" + encounter_type[0] + "' AND retired = 0 LIMIT 1")
                        .then(function (encounter_types) {

                            if (encounter_types[0].length <= 0) {

                                knex.raw("INSERT INTO encounter_type (name, description, creator, date_created, retired, uuid) VALUES ('" +
                                    encounter_type[0] + "', '" + encounter_type[1] + "', 1, NOW(), 0, '" + uuid.v1() + "')")
                                    .then(function (record) {

                                        callback();

                                    })
                                    .catch(function (err) {

                                        console.log("Encounter types had ERROR in catch!");

                                        callback(err);

                                    });

                            } else {

                                callback();

                            }

                        })
                        .catch(function (err) {

                            callback(err);

                        });

                }, function () {

                    console.log("Encounter types loaded!");

                    iCallback();

                })

            } else {

                iCallback();

            }

        },

        function (iCallback) {

            if (seed.patient_identifier_types.length > 0) {

                console.log("Loading patient_identifier_types...");

                async.each(seed.patient_identifier_types, function (patient_identifier_type, callback) {

                    knex.raw("SELECT * FROM patient_identifier_type  WHERE name = '" + patient_identifier_type[0] + "' AND retired = 0 LIMIT 1")
                        .then(function (patient_identifier_types) {

                            if (patient_identifier_types[0].length <= 0) {

                                knex.raw("INSERT INTO patient_identifier_type (name, description, creator, date_created, retired, uuid) VALUES ('" +
                                    patient_identifier_type[0] + "', '" + patient_identifier_type[1] + "', 1, NOW(), 0, '" + uuid.v1() + "')")
                                    .then(function (record) {

                                        callback();

                                    })
                                    .catch(function (err) {

                                        callback(err);

                                    });

                            } else {

                                callback();

                            }

                        })
                        .catch(function (err) {

                            callback(err);

                        });

                }, function () {

                    console.log("patient_identifier_types loaded!");

                    iCallback();

                })

            } else {

                iCallback();

            }

        },

        function (iCallback) {

            if (seed.person_attribute_types.length > 0) {

                console.log("Loading person_attribute_types...");

                async.each(seed.person_attribute_types, function (person_attribute_type, callback) {

                    knex.raw("SELECT * FROM person_attribute_type  WHERE name = '" + person_attribute_type[0] + "' AND retired = 0 LIMIT 1")
                        .then(function (person_attribute_types) {

                            if (person_attribute_types[0].length <= 0) {

                                knex.raw("INSERT INTO person_attribute_type (name, description, creator, date_created, retired, uuid) VALUES ('" +
                                    person_attribute_type[0] + "', '" + person_attribute_type[1] + "', 1, NOW(), 0, '" + uuid.v1() + "')")
                                    .then(function (record) {

                                        callback();

                                    })
                                    .catch(function (err) {

                                        callback(err);

                                    });

                            } else {

                                callback();

                            }

                        })
                        .catch(function (err) {

                            callback(err);

                        });

                }, function () {

                    console.log("person_attribute_types loaded!");

                    iCallback();

                })

            } else {

                iCallback();

            }

        },

        function (iCallback) {

            if (seed.programs.length > 0) {

                console.log("Loading programs...");

                async.each(seed.programs, function (program, callback) {

                    knex.raw("SELECT * FROM program WHERE name = '" + program + "' AND retired = 0")
                        .then(function (programs) {

                            if (programs[0].length <= 0) {

                                knex.raw("SELECT * FROM concept_name LEFT OUTER JOIN concept ON concept.concept_id = concept_name.concept_id WHERE name = '" + program + "' AND voided = 0 LIMIT 1")
                                    .then(function (concepts) {

                                        if (concepts[0].length > 0) {

                                            var concept_id = concepts[0][0].concept_id;

                                            knex.raw("INSERT INTO program (concept_id, creator, date_created, retired, name, uuid) VALUES (" +
                                                concept_id + ", 1, NOW(), 0, '" + program + "', '" + uuid.v1() + "')")
                                                .then(function (prog) {

                                                    callback();

                                                })
                                                .catch(function (err) {

                                                    callback(err);

                                                });

                                        } else {

                                            knex.raw("INSERT INTO concept (retired, datatype_id, class_id, creator, date_created, uuid) VALUES (0, 4, 11, 1, NOW(), '" + uuid.v1() + "')")
                                                .then(function (record) {

                                                    var concept_id = record[0].insertId;

                                                    knex.raw("INSERT INTO concept_name (concept_id, name, locale, creator, date_created, voided, uuid, concept_name_type) VALUES (" +
                                                        concept_id + ", '" + program + "', 'en', 1, NOW(), 0, '" + uuid.v1() + "', 'FULLY_SPECIFIED')")
                                                        .then(function (name) {

                                                            knex.raw("INSERT INTO program (concept_id, creator, date_created, retired, name, uuid) VALUES (" +
                                                                concept_id + ", 1, NOW(), 0, '" + program + "', '" + uuid.v1() + "')")
                                                                .then(function (prog) {

                                                                    callback();

                                                                })
                                                                .catch(function (err) {

                                                                    callback(err);

                                                                });

                                                        })
                                                        .catch(function (err) {

                                                            callback(err);

                                                        });

                                                })
                                                .catch(function (err) {

                                                    callback(err);

                                                });

                                        }

                                    })
                                    .catch(function (err) {

                                        callback(err);

                                    });

                            } else {

                                callback();

                            }

                        })
                        .catch(function (err) {

                            callback(err);

                        });

                }, function () {

                    console.log("program loaded!");

                    iCallback();

                })

            } else {

                iCallback();

            }

        },

        function (iCallback) {

            if (seed.concepts.length > 0) {

                console.log("Loading concepts...");

                async.each(seed.concepts, function (concept, callback) {

                    knex.raw("SELECT * FROM concept_name LEFT OUTER JOIN concept ON concept.concept_id = concept_name.concept_id WHERE name = '" + concept + "' AND voided = 0 LIMIT 1")
                        .then(function (concepts) {

                            if (concepts[0].length <= 0) {

                                knex.raw("INSERT INTO concept (retired, datatype_id, class_id, creator, date_created, uuid) VALUES (0, 4, 11, 1, NOW(), '" + uuid.v1() + "')")
                                    .then(function (record) {

                                        var concept_id = record[0].insertId;

                                        knex.raw("INSERT INTO concept_name (concept_id, name, locale, creator, date_created, voided, uuid, concept_name_type) VALUES (" +
                                            concept_id + ", '" + concept + "', 'en', 1, NOW(), 0, '" + uuid.v1() + "', 'FULLY_SPECIFIED')")
                                            .then(function (name) {

                                                callback();

                                            })
                                            .catch(function (err) {

                                                callback(err);

                                            });

                                    })
                                    .catch(function (err) {

                                        callback(err);

                                    });

                            } else {

                                callback();

                            }

                        })
                        .catch(function (err) {

                            callback(err);

                        });

                }, function () {

                    console.log("concepts loaded!");

                    iCallback();

                })

            } else {

                iCallback();

            }

        }

    ], function () {

        eCallback();

    })

}

var commands = [];

if (process.argv.indexOf("-c") < 0) {

    commands.push({
        message: "Dropping '" + connection.database + "' database...",
        cmd: "mysql -h " + connection.host + " -u " + connection.user + " -p" + connection.password +
            " -e 'DROP SCHEMA IF EXISTS " + connection.database + "'"
    });

    commands.push({
        message: "Creating '" + connection.database + "' database...",
        cmd: "mysql -h " + connection.host + " -u " + connection.user + " -p" + connection.password +
            " -e 'CREATE SCHEMA " + connection.database + "'"
    });

    commands.push({
        message: "Loading '" + connection.database + "' Metadata...",
        cmd: "mysql -h " + connection.host + " -u " + connection.user + " -p" + connection.password +
            " " + connection.database + " < openmrs_1_7_2_concept_server_full_db.sql"
    });

}

if (process.argv.indexOf("-o") < 0 && process.argv.indexOf("-c") < 0) {

    commands.push({
        message: "Dropping '" + connection.stockDatabase + "' database...",
        cmd: "mysql -h " + connection.host + " -u " + connection.user + " -p" + connection.password +
            " -e 'DROP SCHEMA IF EXISTS " + connection.stockDatabase + "'"
    });

    commands.push({
        message: "Creating '" + connection.stockDatabase + "' database...",
        cmd: "mysql -h " + connection.host + " -u " + connection.user + " -p" + connection.password +
            " -e 'CREATE SCHEMA " + connection.stockDatabase + "'"
    });

    commands.push({
        message: "Loading '" + connection.stockDatabase + "' Metadata...",
        cmd: "mysql -h " + connection.host + " -u " + connection.user + " -p" + connection.password +
            " " + connection.stockDatabase + " < inventory.sql"
    });

}

async.each(commands, function (cmd, callback) {

    console.log(cmd.message);

    runCmd(cmd.cmd, function (error, stdout, stderr) {

        if (error) {

            console.log(error);

        } else if (stderr) {

            console.log(stderr);

        } else if (stdout) {

            console.log(stdout);

        }

        callback();

    });

}, function () {

    async.series([

        function (callback) {

            if (process.argv.indexOf("-o") < 0 && process.argv.indexOf("-c") < 0) {

                console.log("Loading '" + connection.stockDatabase + "' Triggers...");

                var cmd = "mysql -h " + connection.host + " -u " + connection.user + " -p" + connection.password +
                    " " + connection.stockDatabase + " < triggers.sql";

                runCmd(cmd, function (error, stdout, stderr) {

                    if (error) {

                        console.log(error);

                    } else if (stderr) {

                        console.log(stderr);

                    } else if (stdout) {

                        console.log(stdout);

                    }

                    callback();

                })

            } else {

                callback();

            }

        },

        function (iCallback) {

            var commands = [];

            if (process.argv.indexOf("-c") < 0) {

                commands.push({
                    message: "Loading 'HTS Roles' seed data...",
                    cmd: "mysql -h " + connection.host + " -u " + connection.user + " -p" + connection.password +
                        " " + connection.database + " < htc.roles.sql"
                });

                commands.push({
                    message: "Loading '" + connection.database + "' Extra Metadata...",
                    cmd: "mysql -h " + connection.host + " -u " + connection.user + " -p" + connection.password +
                    " " + connection.database + " < ccc_data.sql"
                });

                commands.push({
                    message: "Creating 'HTS Reporting Table' ...",
                    cmd: "mysql -h " + connection.host + " -u " + connection.user + " -p" + connection.password +
                        " " + connection.database + " < htc_triggers.sql"
                });

                commands.push({
                    message: "Loading 'Locations' seed data...",
                    cmd: "mysql -h " + connection.host + " -u " + connection.user + " -p" + connection.password +
                    " " + connection.database + " < locations.sql"
                });

            }

            async.each(commands, function (cmd, callback) {

                console.log(cmd.message);

                runCmd(cmd.cmd, function (error, stdout, stderr) {

                    if (error) {

                        console.log(error);

                    } else if (stderr) {

                        console.log(stderr);

                    } else if (stdout) {

                        console.log(stdout);

                    }

                    callback();

                });

            }, function () {

                iCallback();

            });

        },

        function (callback) {

            console.log("Loading seed data...");

            loadSeedData(function () {

                callback();

            });

        },

        function (iCallback) {

            var commands = [];

            commands.push({
                message: "Initializing user admin...",
                cmd: "mysql -h " + connection.host + " -u " + connection.user + " -p" + connection.password +
                " " + connection.database + " -e 'DELETE FROM person_attribute WHERE person_id = 1; " +
                "INSERT INTO person_attribute (person_id, value, person_attribute_type_id, creator, date_created, uuid) " +
                "VALUES((SELECT person_id FROM person LIMIT 1), \"HTS-0001\", (SELECT person_attribute_type_id FROM " +
                "person_attribute_type WHERE name = \"HTS Provider ID\"), (SELECT user_id FROM users LIMIT 1), " +
                "NOW(), \"" + uuid.v1() + "\")'"
            });

            async.each(commands, function (cmd, callback) {

                console.log(cmd.message);

                runCmd(cmd.cmd, function (error, stdout, stderr) {

                    if (error) {

                        console.log(error);

                    } else if (stderr) {

                        console.log(stderr);

                    } else if (stdout) {

                        console.log(stdout);

                    }

                    callback();

                });

            }, function () {

                iCallback();

            });

        },

        function (iCallback) {

            console.log("Generating drugs list...");

            var sql = "SELECT drug.concept_id AS conceptId, concept_name.name AS conceptName, dose_strength, units, drug.name AS " +
                "drugName FROM drug LEFT OUTER JOIN concept_name ON concept_name.concept_id = drug.concept_id";

            queryRaw(sql, function (data) {

                if(data && data[0].length > 0) {

                    var generic_drugs = [];

                    var drug_dosages = {};

                    var drugs = {};

                    var json = data[0];

                    for(var i = 0; i < json.length; i++) {

                        var row = json[i];

                        if (generic_drugs.indexOf([row.conceptName, row.conceptId]) < 0)
                            generic_drugs.push([row.conceptName, row.conceptId]);

                        if(!drug_dosages[row.conceptId])
                            drug_dosages[row.conceptId] = {};

                        var leaf = (row.dose_strength ? row.dose_strength : "") + (row.units ? row.units : "");

                        drug_dosages[row.conceptId][leaf] = [row.dose_strength, (row.units ? String(row.units).toUpperCase() :
                            row.units), row.dose_strength];

                        if(!drugs[row.conceptId])
                            drugs[row.conceptId] = {};

                        drugs[row.conceptId][row.drugName] = [row.dose_strength, row.units];

                    }

                    var writeString = "var generic_drugs = " + JSON.stringify(generic_drugs) + ";\n\nvar drug_dosages = " +
                        JSON.stringify(drug_dosages) + ";\n\nvar drugs = " + JSON.stringify(drugs) + "\n\n";

                    fs.writeFileSync(__dirname + "/../public/javascripts/generics.js", writeString);

                }

                iCallback();

            })

        }

    ], function () {

        console.log("Done!");

        process.exit();

    })

})
