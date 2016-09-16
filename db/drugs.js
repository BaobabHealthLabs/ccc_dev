/**
 * Created by chimwemwe on 9/15/16.
 */

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

console.log("Generating drugs list...");

var sql = "SELECT drug.concept_id AS conceptId, concept_name.name AS conceptName, dose_strength, units, drug.name AS " +
    "drugName FROM drug LEFT OUTER JOIN concept_name ON concept_name.concept_id = drug.concept_id";

queryRaw(sql, function (data) {

    if (data && data[0].length > 0) {

        var generic_drugs = [];

        var drug_dosages = {};

        var drugs = {};

        var json = data[0];

        for (var i = 0; i < json.length; i++) {

            var row = json[i];

            if (generic_drugs.indexOf([row.conceptName, row.conceptId]) < 0)
                generic_drugs.push([row.conceptName, row.conceptId]);

            if (!drug_dosages[row.conceptId])
                drug_dosages[row.conceptId] = {};

            var leaf = (row.dose_strength ? row.dose_strength : "") + (row.units ? row.units : "");

            drug_dosages[row.conceptId][leaf] = [row.dose_strength, (row.units ? String(row.units).toUpperCase() :
                row.units), row.dose_strength];

            if (!drugs[row.conceptId])
                drugs[row.conceptId] = {};

            drugs[row.conceptId][row.drugName] = [row.dose_strength, row.units];

        }

        var writeString = "var generic_drugs = " + JSON.stringify(generic_drugs) + ";\n\nvar drug_dosages = " +
            JSON.stringify(drug_dosages) + ";\n\nvar drugs = " + JSON.stringify(drugs) + "\n\n";

        fs.writeFileSync(__dirname + "/../public/javascripts/generics.js", writeString);

    }

    process.exit();

})
