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

            dom.ajaxRequest("/integrated_reports/site", function (data) {

                if (dom.__$("facility")) {

                    dom.__$("facility").innerHTML = data;

                }

                iCallback();

            });

        },
        function (iCallback) {
            dom.ajaxRequest("/reports/new_registered_male?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_registered_male")) {

                    dom.__$("new_registered_male").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_registered_male?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_registered_male")) {

                    dom.__$("cumulative_registered_male").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_registered_female?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_registered_female")) {

                    dom.__$("new_registered_female").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_registered_female?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_registered_female")) {

                    dom.__$("cumulative_registered_female").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_registered_under_14?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_registered_under_14")) {

                    dom.__$("new_registered_under_14").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_registered_under_14?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_registered_under_14")) {

                    dom.__$("cumulative_registered_under_14").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_registered_between_14_to_44?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_registered_between_14_to_44")) {

                    dom.__$("new_registered_between_14_to_44").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_registered_between_14_to_44?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_registered_between_14_to_44")) {

                    dom.__$("cumulative_registered_between_14_to_44").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_registered_between_45_to_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_registered_between_45_to_64")) {

                    dom.__$("new_registered_between_45_to_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_registered_between_45_to_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_registered_between_45_to_64")) {

                    dom.__$("cumulative_registered_between_45_to_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_registered_above_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_registered_above_64")) {

                    dom.__$("new_registered_above_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_registered_above_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_registered_above_64")) {

                    dom.__$("cumulative_registered_above_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_diabetes_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_diabetes_alone")) {

                    dom.__$("new_diabetes_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_diabetes_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_diabetes_alone")) {

                    dom.__$("cumulative_diabetes_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_hypertension_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_hypertension_alone")) {

                    dom.__$("new_hypertension_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_hypertension_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_hypertension_alone")) {

                    dom.__$("cumulative_hypertension_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_diabetes_and_hypertension?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_diabetes_and_hypertension")) {

                    dom.__$("new_diabetes_and_hypertension").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_diabetes_and_hypertension?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_diabetes_and_hypertension")) {

                    dom.__$("cumulative_diabetes_and_hypertension").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_asthma?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_asthma")) {

                    dom.__$("new_asthma").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_asthma?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_asthma")) {

                    dom.__$("cumulative_asthma").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_epilepsy?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_epilepsy")) {

                    dom.__$("new_epilepsy").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_epilepsy?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_epilepsy")) {

                    dom.__$("cumulative_epilepsy").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_other?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_other")) {

                    dom.__$("new_other").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_other?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_other")) {

                    dom.__$("cumulative_other").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_attended_the_clinic?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_attended_the_clinic")) {

                    dom.__$("cumulative_attended_the_clinic").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_did_not_attend_in_quarter?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_did_not_attend_in_quarter")) {

                    dom.__$("cumulative_did_not_attend_in_quarter").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_treatment_stopped?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_treatment_stopped")) {

                    dom.__$("cumulative_treatment_stopped").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_transfer_out?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_transfer_out")) {

                    dom.__$("cumulative_transfer_out").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_died?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_died")) {

                    dom.__$("cumulative_died").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_lost_to_follow_up?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_lost_to_follow_up")) {

                    dom.__$("cumulative_lost_to_follow_up").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_obese?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_obese")) {

                    dom.__$("new_obese").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_obese?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_obese")) {

                    dom.__$("cumulative_obese").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_current_smoker?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_current_smoker")) {

                    dom.__$("new_current_smoker").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_current_smoker?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_current_smoker")) {

                    dom.__$("cumulative_current_smoker").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_drinks_alcohol?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_drinks_alcohol")) {

                    dom.__$("new_drinks_alcohol").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_drinks_alcohol?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_drinks_alcohol")) {

                    dom.__$("cumulative_drinks_alcohol").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_attended_clinic_ht_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_attended_clinic_ht_alone")) {

                    dom.__$("new_attended_clinic_ht_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_attended_clinic_ht_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_attended_clinic_ht_alone")) {

                    dom.__$("cumulative_attended_clinic_ht_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_medication_prescribed_ht_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_medication_prescribed_ht_alone")) {

                    dom.__$("new_medication_prescribed_ht_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_medication_prescribed_ht_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_medication_prescribed_ht_alone")) {

                    dom.__$("cumulative_medication_prescribed_ht_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_blood_pressure_measured_ht_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_blood_pressure_measured_ht_alone")) {

                    dom.__$("new_blood_pressure_measured_ht_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_blood_pressure_measured_ht_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_blood_pressure_measured_ht_alone")) {

                    dom.__$("cumulative_blood_pressure_measured_ht_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_blood_pressure_controlled_ht_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_blood_pressure_controlled_ht_alone")) {

                    dom.__$("new_blood_pressure_controlled_ht_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_blood_pressure_controlled_ht_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_blood_pressure_controlled_ht_alone")) {

                    dom.__$("cumulative_blood_pressure_controlled_ht_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_attended_clinic_ht_and_dt?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_attended_clinic_ht_and_dt")) {

                    dom.__$("new_attended_clinic_ht_and_dt").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_attended_clinic_ht_and_dt?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_attended_clinic_ht_and_dt")) {

                    dom.__$("cumulative_attended_clinic_ht_and_dt").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_medication_prescribed_ht_and_dt?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_medication_prescribed_ht_and_dt")) {

                    dom.__$("new_medication_prescribed_ht_and_dt").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_medication_prescribed_ht_and_dt?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_medication_prescribed_ht_and_dt")) {

                    dom.__$("cumulative_medication_prescribed_ht_and_dt").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_blood_pressure_measured_ht_and_dt?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_blood_pressure_measured_ht_and_dt")) {

                    dom.__$("new_blood_pressure_measured_ht_and_dt").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_blood_pressure_measured_ht_and_dt?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_blood_pressure_measured_ht_and_dt")) {

                    dom.__$("cumulative_blood_pressure_measured_ht_and_dt").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_bgm_ht_and_dt?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_bgm_ht_and_dt")) {

                    dom.__$("new_bgm_ht_and_dt").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_bgm_ht_and_dt?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_bgm_ht_and_dt")) {

                    dom.__$("cumulative_bgm_ht_and_dt").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_bgc_fbg_ht_and_dt?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_bgc_fbg_ht_and_dt")) {

                    dom.__$("new_bgc_fbg_ht_and_dt").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_bgc_fbg_ht_and_dt?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_bgc_fbg_ht_and_dt")) {

                    dom.__$("cumulative_bgc_fbg_ht_and_dt").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_bpc_ht_and_dt?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_bpc_ht_and_dt")) {

                    dom.__$("new_bpc_ht_and_dt").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_bpc_ht_and_dt?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_bpc_ht_and_dt")) {

                    dom.__$("cumulative_bpc_ht_and_dt").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_attended_clinic_diabetes_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_attended_clinic_diabetes_alone")) {

                    dom.__$("new_attended_clinic_diabetes_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_attended_clinic_diabetes_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_attended_clinic_diabetes_alone")) {

                    dom.__$("cumulative_attended_clinic_diabetes_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_medication_prescribed_diabetes_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_medication_prescribed_diabetes_alone")) {

                    dom.__$("new_medication_prescribed_diabetes_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_medication_prescribed_diabetes_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_medication_prescribed_diabetes_alone")) {

                    dom.__$("cumulative_medication_prescribed_diabetes_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_bgm_diabetes_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_bgm_diabetes_alone")) {

                    dom.__$("new_bgm_diabetes_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_bgm_diabetes_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_bgm_diabetes_alone")) {

                    dom.__$("cumulative_bgm_diabetes_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_bgc_fbg_diabetes_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_bgc_fbg_diabetes_alone")) {

                    dom.__$("new_bgc_fbg_diabetes_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_bgc_fbg_diabetes_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_bgc_fbg_diabetes_alone")) {

                    dom.__$("cumulative_bgc_fbg_diabetes_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_attended_clinic_asthma_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_attended_clinic_asthma_alone")) {

                    dom.__$("new_attended_clinic_asthma_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_attended_clinic_asthma_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_attended_clinic_asthma_alone")) {

                    dom.__$("cumulative_attended_clinic_asthma_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_medication_prescribed_asthma_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_medication_prescribed_asthma_alone")) {

                    dom.__$("new_medication_prescribed_asthma_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_medication_prescribed_asthma_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_medication_prescribed_asthma_alone")) {

                    dom.__$("cumulative_medication_prescribed_asthma_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_no_asthma_in_3months_asthma_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_no_asthma_in_3months_asthma_alone")) {

                    dom.__$("new_no_asthma_in_3months_asthma_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_no_asthma_in_3months_asthma_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_no_asthma_in_3months_asthma_alone")) {

                    dom.__$("cumulative_no_asthma_in_3months_asthma_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_attended_clinic_epilepsy_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_attended_clinic_epilepsy_alone")) {

                    dom.__$("new_attended_clinic_epilepsy_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_attended_clinic_epilepsy_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_attended_clinic_epilepsy_alone")) {

                    dom.__$("cumulative_attended_clinic_epilepsy_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_medication_prescribed_epilepsy_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_medication_prescribed_epilepsy_alone")) {

                    dom.__$("new_medication_prescribed_epilepsy_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_medication_prescribed_epilepsy_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_medication_prescribed_epilepsy_alone")) {

                    dom.__$("cumulative_medication_prescribed_epilepsy_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_no_seizure_epilepsy_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_no_seizure_epilepsy_alone")) {

                    dom.__$("new_no_seizure_epilepsy_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_no_seizure_epilepsy_alone?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_no_seizure_epilepsy_alone")) {

                    dom.__$("cumulative_no_seizure_epilepsy_alone").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_disease_complications_stroke?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_disease_complications_stroke")) {

                    dom.__$("new_disease_complications_stroke").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_disease_complications_stroke?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_disease_complications_stroke")) {

                    dom.__$("cumulative_disease_complications_stroke").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_disease_complications_mi?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_disease_complications_mi")) {

                    dom.__$("new_disease_complications_mi").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_disease_complications_mi?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_disease_complications_mi")) {

                    dom.__$("cumulative_disease_complications_mi").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_disease_complications_cd?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_disease_complications_cd")) {

                    dom.__$("new_disease_complications_cd").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_disease_complications_cd?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_disease_complications_cd")) {

                    dom.__$("cumulative_disease_complications_cd").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_disease_complications_blindness?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_disease_complications_blindness")) {

                    dom.__$("new_disease_complications_blindness").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_disease_complications_blindness?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_disease_complications_blindness")) {

                    dom.__$("cumulative_disease_complications_blindness").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_disease_complications_burns?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_disease_complications_burns")) {

                    dom.__$("new_disease_complications_burns").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_disease_complications_burns?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_disease_complications_burns")) {

                    dom.__$("cumulative_disease_complications_burns").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_anti_diabetic_drug_metformin?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_anti_diabetic_drug_metformin")) {

                    dom.__$("new_anti_diabetic_drug_metformin").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_anti_diabetic_drug_metformin?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_anti_diabetic_drug_metformin")) {

                    dom.__$("cumulative_anti_diabetic_drug_metformin").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_anti_diabetic_drug_glibenclamide?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_anti_diabetic_drug_glibenclamide")) {

                    dom.__$("new_anti_diabetic_drug_glibenclamide").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_anti_diabetic_drug_glibenclamide?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_anti_diabetic_drug_glibenclamide")) {

                    dom.__$("cumulative_anti_diabetic_drug_glibenclamide").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_anti_diabetic_drug_insuline?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_anti_diabetic_drug_insuline")) {

                    dom.__$("new_anti_diabetic_drug_insuline").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_anti_diabetic_drug_insuline?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_anti_diabetic_drug_insuline")) {

                    dom.__$("cumulative_anti_diabetic_drug_insuline").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_anti_hypertensive_drug_hydro?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_anti_hypertensive_drug_hydro")) {

                    dom.__$("new_anti_hypertensive_drug_hydro").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_anti_hypertensive_drug_hydro?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_anti_hypertensive_drug_hydro")) {

                    dom.__$("cumulative_anti_hypertensive_drug_hydro").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_anti_hypertensive_drug_amlodipine?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_anti_hypertensive_drug_amlodipine")) {

                    dom.__$("new_anti_hypertensive_drug_amlodipine").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_anti_hypertensive_drug_amlodipine?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_anti_hypertensive_drug_amlodipine")) {

                    dom.__$("cumulative_anti_hypertensive_drug_amlodipine").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_anti_hypertensive_drug_captopril?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_anti_hypertensive_drug_captopril")) {

                    dom.__$("new_anti_hypertensive_drug_captopril").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_anti_hypertensive_drug_captopril?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_anti_hypertensive_drug_captopril")) {

                    dom.__$("cumulative_anti_hypertensive_drug_captopril").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_anti_hypertensive_drug_other?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_anti_hypertensive_drug_other")) {

                    dom.__$("new_anti_hypertensive_drug_other").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_anti_hypertensive_drug_other?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_anti_hypertensive_drug_other")) {

                    dom.__$("cumulative_anti_hypertensive_drug_other").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_anti_asthma_drug_salb_inhaler?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_anti_asthma_drug_salb_inhaler")) {

                    dom.__$("new_anti_asthma_drug_salb_inhaler").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_anti_asthma_drug_salb_inhaler?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_anti_asthma_drug_salb_inhaler")) {

                    dom.__$("cumulative_anti_asthma_drug_salb_inhaler").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_anti_asthma_drug_steroid_inhaler?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_anti_asthma_drug_steroid_inhaler")) {

                    dom.__$("new_anti_asthma_drug_steroid_inhaler").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_anti_asthma_drug_steroid_inhaler?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_anti_asthma_drug_steroid_inhaler")) {

                    dom.__$("cumulative_anti_asthma_drug_steroid_inhaler").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_anti_asthma_drug_other?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_anti_asthma_drug_other")) {

                    dom.__$("new_anti_asthma_drug_other").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_anti_asthma_drug_other?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_anti_asthma_drug_other")) {

                    dom.__$("cumulative_anti_asthma_drug_other").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_anti_epilepsy_drug_pherno?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_anti_epilepsy_drug_pherno")) {

                    dom.__$("new_anti_epilepsy_drug_pherno").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_anti_epilepsy_drug_pherno?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_anti_epilepsy_drug_pherno")) {

                    dom.__$("cumulative_anti_epilepsy_drug_pherno").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_anti_epilepsy_drug_pheny?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_anti_epilepsy_drug_pheny")) {

                    dom.__$("new_anti_epilepsy_drug_pheny").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_anti_epilepsy_drug_pheny?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_anti_epilepsy_drug_pheny")) {

                    dom.__$("cumulative_anti_epilepsy_drug_pheny").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/new_anti_epilepsy_drug_carb?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("new_anti_epilepsy_drug_carb")) {

                    dom.__$("new_anti_epilepsy_drug_carb").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/reports/cumulative_anti_epilepsy_drug_carb?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("cumulative_anti_epilepsy_drug_carb")) {

                    dom.__$("cumulative_anti_epilepsy_drug_carb").innerHTML = data? data.total : "0";

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

    router.route("/site_report")
        .get(function (req, res) {

            var url = require("url");

            var query = url.parse(req.url, true).query;

            var path = require("path");

            var fs = require("fs");

            var jsdom = require("jsdom");

            var template = fs.readFileSync(path.resolve("./public/views/integrated_report_template.html"), "utf-8")

            jsdom.env(template, [], function (err, window) {

                var host = req.headers.host;

                dom.loadFields(host, window, query.start_date, query.end_date, function () {

                    res.send(window.document.defaultView.document.documentElement.outerHTML);

                })

            });

        });

    return router;

}
