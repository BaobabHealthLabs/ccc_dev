var url = require('url');

function queryRawQualityControl(sql, callback) {

    var config = require(__dirname +"/../config/database.data");

    var knex = require('knex')({
        client: 'mysql',
        connection: {
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.qualityControlDatabase
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

function queryRawStock(sql, callback) {

    var config = require(__dirname + "/../config/database.data");

    var knex = require('knex')({
        client: 'mysql',
        connection: {
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.stockDatabase
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

module.exports = function (router) {

    var client = require("node-rest-client").Client;
    var async = require("async");

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

                if (format.match(/YYYY\-mm\-dd\sHH\:\MM\:SS/)) {

                    result = date.getFullYear() + "-" + padZeros((parseInt(date.getMonth()) + 1), 2) + "-" +
                        padZeros(date.getDate(), 2) + " " + padZeros(date.getHours(), 2) + ":" +
                        padZeros(date.getMinutes(), 2) + ":" + padZeros(date.getSeconds(), 2);

                } else if (format.match(/YYYY\-mm\-dd/)) {

                    result = date.getFullYear() + "-" + padZeros((parseInt(date.getMonth()) + 1), 2) + "-" +
                        padZeros(date.getDate(), 2);

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

    function leapYear(year) {

        var yr = parseInt(year);

        var result = ((yr % 4 == 0 && yr % 100 != 0) || yr % 400 == 0);

        return result;

    }

    function numberWithCommas(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

var dom = ({

        host: "http://localhost:3000",
        window: null,
        htcReport: {},
        greaterThanZero: false,
        htcStockReport: {
            test_1: {
                opening: 0,
                receipts: 0,
                clients: 0,
                other: 0,
                losses: 0,
                balance: 0,
                closing: 0,
                difference: 0
            },
            test_2: {
                opening: 0,
                receipts: 0,
                clients: 0,
                other: 0,
                losses: 0,
                balance: 0,
                closing: 0,
                difference: 0
            }
        },

        __$: function (id) {

            return dom.window.document.getElementById(id);

        },

        ajaxRequest: function (url, callback) {

            url = (!dom.host.match(/^http/i) ? "http://" : "") + dom.host + url;

            (new client()).get(url, function (data) {

                callback(data);

            })

        },

    loadFields: function (host, win, startDate, endDate, callback){

            dom.host = host;

            dom.window = win;

            dom.greaterThanZero = false;


            async.series([

        function (iCallback) {

            dom.ajaxRequest("/biannual_reports/site", function (data) {

                if (dom.__$("facility")) {

                    dom.__$("facility").innerHTML = data;

                }

                iCallback();

            });

        },
        function (iCallback) {
            dom.ajaxRequest("/biann_reports/new_ht_total_ti?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ht_total_ti")) {

                    dom.__$("new_ht_total_ti").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ht_total_ti?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ht_total_ti")) {

                    dom.__$("cumulative_ht_total_ti").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ht_total_to?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ht_total_to")) {

                    dom.__$("new_ht_total_to").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ht_total_to?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ht_total_to")) {

                    dom.__$("cumulative_ht_total_to").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ht_total_alive?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ht_total_alive")) {

                    dom.__$("new_ht_total_alive").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ht_total_alive?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ht_total_alive")) {

                    dom.__$("cumulative_ht_total_alive").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ht_bp_controlled?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ht_bp_controlled")) {

                    dom.__$("new_ht_bp_controlled").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ht_bp_controlled?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ht_bp_controlled")) {

                    dom.__$("cumulative_ht_bp_controlled").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_bp_last?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_bp_last")) {

                    dom.__$("new_bp_last").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_bp_last?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_bp_last")) {

                    dom.__$("cumulative_bp_last").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_defaulted?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_defaulted")) {

                    dom.__$("new_defaulted").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_defaulted?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_defaulted")) {

                    dom.__$("cumulative_defaulted").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_alcohol?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_alcohol")) {

                    dom.__$("new_alcohol").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_alcohol?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_alcohol")) {

                    dom.__$("cumulative_alcohol").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_overweight?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_overweight")) {

                    dom.__$("new_overweight").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_overweight?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_overweight")) {

                    dom.__$("cumulative_overweight").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ht_obese?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ht_obese")) {

                    dom.__$("new_ht_obese").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ht_obese?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ht_obese")) {

                    dom.__$("cumulative_ht_obese").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ht_died?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ht_died")) {

                    dom.__$("new_ht_died").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ht_died?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ht_died")) {

                    dom.__$("cumulative_ht_died").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_smokes?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_smokes")) {

                    dom.__$("new_smokes").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_smokes?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_smokes")) {

                    dom.__$("cumulative_smokes").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_high_risk?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_high_risk")) {

                    dom.__$("new_high_risk").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_high_risk?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_high_risk")) {

                    dom.__$("cumulative_high_risk").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_urine_creatinine?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_urine_creatinine")) {

                    dom.__$("new_urine_creatinine").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_urine_creatinine?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_urine_creatinine")) {

                    dom.__$("cumulative_urine_creatinine").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_stroke?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_stroke")) {

                    dom.__$("new_stroke").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_stroke?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_stroke")) {

                    dom.__$("cumulative_stroke").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_cardiovascular?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_cardiovascular")) {

                    dom.__$("new_cardiovascular").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_cardiovascular?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_cardiovascular")) {

                    dom.__$("cumulative_cardiovascular").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ht_tb?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ht_tb")) {

                    dom.__$("new_ht_tb").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ht_tb?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ht_tb")) {

                    dom.__$("cumulative_ht_tb").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ht_hiv?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ht_hiv")) {

                    dom.__$("new_ht_hiv").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ht_hiv?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ht_hiv")) {

                    dom.__$("cumulative_ht_hiv").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_retinopathy?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_retinopathy")) {

                    dom.__$("new_retinopathy").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_retinopathy?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_retinopathy")) {

                    dom.__$("cumulative_retinopathy").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_type_2_diabetes?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_type_2_diabetes")) {

                    dom.__$("new_type_2_diabetes").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_type_2_diabetes?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_type_2_diabetes")) {

                    dom.__$("cumulative_type_2_diabetes").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_alive_in_care?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_alive_in_care")) {

                    dom.__$("new_alive_in_care").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_alive_in_care?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_alive_in_care")) {

                    dom.__$("cumulative_alive_in_care").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_dm_died?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_dm_died")) {

                    dom.__$("new_dm_died").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_dm_died?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_dm_died")) {

                    dom.__$("cumulative_dm_died").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_sugar_controlled?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_sugar_controlled")) {

                    dom.__$("new_sugar_controlled").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_sugar_controlled?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_sugar_controlled")) {

                    dom.__$("cumulative_sugar_controlled").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_dm_high_risk?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_dm_high_risk")) {

                    dom.__$("new_dm_high_risk").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_dm_high_risk?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_dm_high_risk")) {

                    dom.__$("cumulative_dm_high_risk").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_dm_stroke?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_dm_stroke")) {

                    dom.__$("new_dm_stroke").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_dm_stroke?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_dm_stroke")) {

                    dom.__$("cumulative_dm_stroke").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_dm_foot_ulcers?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_dm_foot_ulcers")) {

                    dom.__$("new_dm_foot_ulcers").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },


        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_dm_foot_ulcers?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_dm_foot_ulcers")) {

                    dom.__$("cumulative_dm_foot_ulcers").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_dm_amputations?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_dm_amputations")) {

                    dom.__$("new_dm_amputations").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_dm_amputations?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_dm_amputations")) {

                    dom.__$("cumulative_dm_amputations").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_dm_hiv?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_dm_hiv")) {

                    dom.__$("new_dm_hiv").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_dm_hiv?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_dm_hiv")) {

                    dom.__$("cumulative_dm_hiv").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_hd_diagnosis?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_hd_diagnosis")) {

                    dom.__$("new_hd_diagnosis").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_hd_diagnosis?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_hd_diagnosis")) {

                    dom.__$("cumulative_hd_diagnosis").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_hd_bp_controlled?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_hd_bp_controlled")) {

                    dom.__$("new_hd_bp_controlled").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_hd_bp_controlled?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_hd_bp_controlled")) {

                    dom.__$("cumulative_hd_bp_controlled").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_hd_sugar_controlled?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_hd_sugar_controlled")) {

                    dom.__$("new_hd_sugar_controlled").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_hd_sugar_controlled?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_hd_sugar_controlled")) {

                    dom.__$("cumulative_hd_sugar_controlled").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_hd_high_risk?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_hd_high_risk")) {

                    dom.__$("new_hd_high_risk").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_hd_high_risk?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_hd_high_risk")) {

                    dom.__$("cumulative_hd_high_risk").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_hd_retinopathy?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_hd_retinopathy")) {

                    dom.__$("new_hd_retinopathy").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_hd_retinopathy?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_hd_retinopathy")) {

                    dom.__$("cumulative_hd_retinopathy").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ast_transferred?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ast_transferred")) {

                    dom.__$("new_ast_transferred").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ast_transferred?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ast_transferred")) {

                    dom.__$("cumulative_ast_transferred").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ast_defaulted?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ast_defaulted")) {

                    dom.__$("new_ast_defaulted").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ast_defaulted?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ast_defaulted")) {

                    dom.__$("cumulative_ast_defaulted").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ast_alive?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ast_alive")) {

                    dom.__$("new_ast_alive").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ast_alive?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ast_alive")) {

                    dom.__$("cumulative_ast_alive").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_lung_alive?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_lung_alive")) {

                    dom.__$("new_lung_alive").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_lung_alive?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_lung_alive")) {

                    dom.__$("cumulative_lung_alive").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        // function (iCallback) {

        //     dom.ajaxRequest("/biann_reports/new_lung_uncontrolled?start_date=" + startDate + "&end_date=" + endDate, function (data) {

        //         if (dom.__$("new_lung_uncontrolled")) {

        //             dom.__$("new_lung_uncontrolled").innerHTML = data? data.total : "0";

        //         }

        //         iCallback();

        //     });

        // },

        // function (iCallback) {

        //     dom.ajaxRequest("/biann_reports/cumulative_lung_uncontrolled?start_date=" + startDate + "&end_date=" + endDate, function (data) {

        //         if (dom.__$("cumulative_lung_uncontrolled")) {

        //             dom.__$("cumulative_lung_uncontrolled").innerHTML = data? data.total : "0";

        //         }

        //         iCallback();

        //     });

        // },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_epilepsy_defaulted?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_epilepsy_defaulted")) {

                    dom.__$("new_epilepsy_defaulted").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_epilepsy_defaulted?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_epilepsy_defaulted")) {

                    dom.__$("cumulative_epilepsy_defaulted").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_epilepsy_alive?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_epilepsy_alive")) {

                    dom.__$("new_epilepsy_alive").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_epilepsy_alive?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_epilepsy_alive")) {

                    dom.__$("cumulative_epilepsy_alive").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ht_hydro?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ht_hydro")) {

                    dom.__$("new_ht_hydro").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ht_hydro?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ht_hydro")) {

                    dom.__$("cumulative_ht_hydro").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/dmd_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmd_male_18")) {

                    dom.__$("dmd_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ht_amlodipine?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ht_amlodipine")) {

                    dom.__$("new_ht_amlodipine").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ht_amlodipine?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ht_amlodipine")) {

                    dom.__$("cumulative_ht_amlodipine").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ht_nife?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ht_nife")) {

                    dom.__$("new_ht_nife").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ht_nife?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ht_nife")) {

                    dom.__$("cumulative_ht_nife").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ht_capto?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ht_capto")) {

                    dom.__$("new_ht_capto").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ht_capto?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ht_capto")) {

                    dom.__$("cumulative_ht_capto").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ht_propa?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ht_propa")) {

                    dom.__$("new_ht_propa").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ht_propa?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ht_propa")) {

                    dom.__$("cumulative_ht_propa").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ht_ant?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ht_ant")) {

                    dom.__$("new_ht_ant").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ht_ant?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ht_ant")) {

                    dom.__$("cumulative_ht_ant").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_dm_met?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_dm_met")) {

                    dom.__$("new_dm_met").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_dm_met?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_dm_met")) {

                    dom.__$("cumulative_dm_met").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_dm_insulin?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_dm_insulin")) {

                    dom.__$("new_dm_insulin").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_dm_insulin?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_dm_insulin")) {

                    dom.__$("cumulative_dm_insulin").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_dm_lente?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_dm_lente")) {

                    dom.__$("new_dm_lente").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_dm_lente?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_dm_lente")) {

                    dom.__$("cumulative_dm_lente").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },


        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_dm_glib?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_dm_glib")) {

                    dom.__$("new_dm_glib").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_dm_glib?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_dm_glib")) {

                    dom.__$("cumulative_dm_glib").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ast_amino?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ast_amino")) {

                    dom.__$("new_ast_amino").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ast_amino?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ast_amino")) {

                    dom.__$("cumulative_ast_amino").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ast_ivamino?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ast_ivamino")) {

                    dom.__$("new_ast_ivamino").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ast_ivamino?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ast_ivamino")) {

                    dom.__$("cumulative_ast_ivamino").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ast_salb?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ast_salb")) {

                    dom.__$("new_ast_salb").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ast_salb?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ast_salb")) {

                    dom.__$("cumulative_ast_salb").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ep_carb?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ep_carb")) {

                    dom.__$("new_ep_carb").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ep_carb?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ep_carb")) {

                    dom.__$("cumulative_ep_carb").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ep_diaz?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ep_diaz")) {

                    dom.__$("new_ep_diaz").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ep_diaz?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ep_diaz")) {

                    dom.__$("cumulative_ep_diaz").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ep_etho?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ep_etho")) {

                    dom.__$("new_ep_etho").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ep_etho?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ep_etho")) {

                    dom.__$("cumulative_ep_etho").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ep_mag?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ep_mag")) {

                    dom.__$("new_ep_mag").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ep_mag?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ep_mag")) {

                    dom.__$("cumulative_ep_mag").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ep_para?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ep_para")) {

                    dom.__$("new_ep_para").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ep_para?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ep_para")) {

                    dom.__$("cumulative_ep_para").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ep_pheno?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ep_pheno")) {

                    dom.__$("new_ep_pheno").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ep_pheno?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ep_pheno")) {

                    dom.__$("cumulative_ep_pheno").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_epi_phey?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_epi_phey")) {

                    dom.__$("new_epi_phey").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_epi_phey?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_epi_phey")) {

                    dom.__$("cumulative_epi_phey").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/new_ep_sv?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_ep_sv")) {

                    dom.__$("new_ep_sv").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/biann_reports/cumulative_ep_sv?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_ep_sv")) {

                    dom.__$("cumulative_ep_sv").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

               
                    function (err) {

                            if (err)
                                console.log(err.message);

                            if (callback)
                                callback();

                    }

            ])
    }

});

    router.route("/biann_site_report")
        .get(function (req, res) {

            var url = require("url");

            var query = url.parse(req.url, true).query;

            var path = require("path");

            var fs = require("fs");

            var jsdom = require("jsdom");

            var template = fs.readFileSync(path.resolve("./public/views/biannual_report_template.html"), "utf-8")

            jsdom.env(template, [], function (err, window) {

                var host = req.headers.host;

                dom.loadFields(host, window, query.start_date, query.end_date, function () {

                    res.send(window.document.defaultView.document.documentElement.outerHTML);

                })

            });

        });

    return router;

}
