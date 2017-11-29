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

    router.route("/encounter_data_for_day")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var result = 0;

            var sql = "SELECT drug.name FROM " + database + ".orders LEFT OUTER JOIN drug_order ON drug_order.order_id = orders.order_id " + 
                      "LEFT OUTER JOIN drug ON drug.drug_id = drug_order.drug_inventory_id LEFT OUTER JOIN encounter ON encounter.encounter_id = orders.encounter_id " + 
                      "LEFT OUTER JOIN obs ON obs.order_id = orders.order_id WHERE  obs.concept_id = (SELECT concept_id FROM concept_name WHERE name = 'PRESCRIBED' LIMIT 1) " + 
                      "AND orders.encounter_id = 115 AND encounter.voided = 0 AND orders.voided = 0 AND obs.voided = 0 AND obs.obs_datetime = '2017-06-21' AND obs.person_id =40"

            console.log(sql)

            queryRaw(sql, function(data){

                console.log(data[0][0]["total"]);

                res.send(data[0][0]);
            });

        });

    router.route("/treatment_for_day")
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;


            var result = 0;

            var sql = "SELECT drug.name as name FROM " + database + ".orders LEFT OUTER JOIN drug_order ON drug_order.order_id = orders.order_id " + 
                      "LEFT OUTER JOIN drug ON drug.drug_id = drug_order.drug_inventory_id LEFT OUTER JOIN encounter ON encounter.encounter_id = orders.encounter_id " + 
                      "LEFT OUTER JOIN obs ON obs.order_id = orders.order_id WHERE  obs.concept_id = (SELECT concept_id FROM concept_name WHERE name = 'PRESCRIBED' LIMIT 1) " + 
                      " AND orders.encounter_id = (SELECT encounter_id FROM encounter_type INNER JOIN encounter ON  encounter.encounter_type = encounter_type.encounter_type_id "+
                      " WHERE name = 'TREATMENTS' AND encounter_datetime = '"+query.date +"' AND patient_id = "+query.person_id +") AND encounter.voided = 0 AND orders.voided = 0 AND obs.voided = 0 "+
                     " AND obs.obs_datetime = '"+ query.date +"' AND obs.person_id = "+ query.person_id +""

            console.log(sql)

            queryRaw(sql, function(data){
                if(data[0][0])
                {
                    res.send({data: data[0], date:query.date , concept : query.concept});
                }else{
                    res.send({data:[], date:query.date , concept : query.concept});
                }
            });

        });
    router.route('/outcomedead').get(function(req,res){
        var url_parts = url.parse(req.url, true);

        var query = url_parts.query;

        var sql = " SELECT value_text FROM obs WHERE encounter_id = (SELECT encounter_id FROM "+database+".encounter "+
                  " WHERE encounter_type = (SELECT encounter_type_id FROM "+database+".encounter_type "+
                  " WHERE name = 'UPDATE OUTCOME' LIMIT 1) AND patient_id = "+
                  " (SELECT patient_id FROM "+database+".patient_identifier WHERE identifier = '"+query.patient_id
                  +"')) AND concept_id IN(SELECT concept_id FROM "+database+".concept_name WHERE name = 'Outcome');"
           queryRaw(sql, function(data){
               res.send({dead: (data[0][0].value_text =='Dead'? true : false)})
            });



    });

    return router;

}