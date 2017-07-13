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

            dom.ajaxRequest("/monthly_quarterly_reports/site", function (data) {

                if (dom.__$("facility")) {

                    dom.__$("facility").innerHTML = data;

                }

                iCallback();

            });

        },
        function (iCallback) {
            dom.ajaxRequest("/mq_reports/ht_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("ht_male_18")) {

                    dom.__$("ht_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/ht_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("ht_male_64")) {

                    dom.__$("ht_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/ht_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("ht_male_65")) {

                    dom.__$("ht_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/ht_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("ht_female_18")) {

                    dom.__$("ht_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/ht_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("ht_female_64")) {

                    dom.__$("ht_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/ht_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("ht_female_65")) {

                    dom.__$("ht_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/ht_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("ht_total")) {

                    dom.__$("ht_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hn_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hn_male_18")) {

                    dom.__$("hn_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hn_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hn_male_64")) {

                    dom.__$("hn_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hn_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hn_male_65")) {

                    dom.__$("hn_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hn_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hn_female_18")) {

                    dom.__$("hn_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hn_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hn_female_64")) {

                    dom.__$("hn_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hn_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hn_female_65")) {

                    dom.__$("hn_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hn_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hn_total")) {

                    dom.__$("hn_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hti_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hti_male_18")) {

                    dom.__$("hti_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hti_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hti_male_64")) {

                    dom.__$("hti_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hti_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hti_male_65")) {

                    dom.__$("hti_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hti_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hti_female_18")) {

                    dom.__$("hti_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hti_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hti_female_64")) {

                    dom.__$("hti_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hti_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hti_female_65")) {

                    dom.__$("hti_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hti_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hti_total")) {

                    dom.__$("hti_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hto_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hto_male_18")) {

                    dom.__$("hto_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hto_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hto_male_64")) {

                    dom.__$("hto_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hto_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hto_male_65")) {

                    dom.__$("hto_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hto_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hto_female_18")) {

                    dom.__$("hto_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hto_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hto_female_64")) {

                    dom.__$("hto_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hto_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hto_female_65")) {

                    dom.__$("hto_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hto_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hto_total")) {

                    dom.__$("hto_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd_male_18")) {

                    dom.__$("hd_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd_male_64")) {

                    dom.__$("hd_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd_male_65")) {

                    dom.__$("hd_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd_female_18")) {

                    dom.__$("hd_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd_female_64")) {

                    dom.__$("hd_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd_female_65")) {

                    dom.__$("hd_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd_total")) {

                    dom.__$("hd_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmt_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmt_male_18")) {

                    dom.__$("dmt_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmt_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmt_male_64")) {

                    dom.__$("dmt_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmt_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmt_male_65")) {

                    dom.__$("dmt_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmt_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmt_female_18")) {

                    dom.__$("dmt_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmt_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmt_female_64")) {

                    dom.__$("dmt_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmt_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmt_male_65")) {

                    dom.__$("dmt_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmt_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmt_female_18")) {

                    dom.__$("dmt_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmt_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmt_female_64")) {

                    dom.__$("dmt_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmt_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmt_female_65")) {

                    dom.__$("dmt_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmt_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmt_total")) {

                    dom.__$("dmt_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dm1_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dm1_male_18")) {

                    dom.__$("dm1_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dm1_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dm1_male_64")) {

                    dom.__$("dm1_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dm1_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dm1_male_65")) {

                    dom.__$("dm1_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dm1_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dm1_female_18")) {

                    dom.__$("dm1_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },


        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dm1_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dm1_female_64")) {

                    dom.__$("dm1_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dm1_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dm1_female_65")) {

                    dom.__$("dm1_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dm1_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dm1_total")) {

                    dom.__$("dm1_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dm2_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dm2_male_18")) {

                    dom.__$("dm2_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dm2_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dm2_male_64")) {

                    dom.__$("dm2_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dm2_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dm2_male_65")) {

                    dom.__$("dm2_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dm2_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dm2_female_18")) {

                    dom.__$("dm2_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dm2_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dm2_female_64")) {

                    dom.__$("dm2_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dm2_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dm2_female_65")) {

                    dom.__$("dm2_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dm2_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dm2_total")) {

                    dom.__$("dm2_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmn_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmn_male_18")) {

                    dom.__$("dmn_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmn_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmn_male_64")) {

                    dom.__$("dmn_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmn_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmn_male_65")) {

                    dom.__$("dmn_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmn_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmn_female_18")) {

                    dom.__$("dmn_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmn_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmn_female_64")) {

                    dom.__$("dmn_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmn_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmn_female_65")) {

                    dom.__$("dmn_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmn_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmn_total")) {

                    dom.__$("dmn_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmti_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmti_male_18")) {

                    dom.__$("dmti_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmti_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmti_male_64")) {

                    dom.__$("dmti_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmti_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmti_male_65")) {

                    dom.__$("dmti_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmti_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmti_female_18")) {

                    dom.__$("dmti_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmti_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmti_female_64")) {

                    dom.__$("dmti_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmti_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmti_female_65")) {

                    dom.__$("dmti_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmti_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmti_total")) {

                    dom.__$("dmti_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmto_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmto_male_18")) {

                    dom.__$("dmto_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmto_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmto_male_64")) {

                    dom.__$("dmto_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmto_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmto_male_65")) {

                    dom.__$("dmto_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmto_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmto_female_18")) {

                    dom.__$("dmto_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmto_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmto_female_64")) {

                    dom.__$("dmto_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmto_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmto_female_65")) {

                    dom.__$("dmto_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmto_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmto_total")) {

                    dom.__$("dmto_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmd_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmd_male_18")) {

                    dom.__$("dmd_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmd_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmd_male_64")) {

                    dom.__$("dmd_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmd_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmd_male_65")) {

                    dom.__$("dmd_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmd_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmd_female_18")) {

                    dom.__$("dmd_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmd_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmd_female_64")) {

                    dom.__$("dmd_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmd_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmd_female_65")) {

                    dom.__$("dmd_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/dmd_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("dmd_total")) {

                    dom.__$("dmd_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdt_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdt_male_18")) {

                    dom.__$("hdt_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdt_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdt_male_64")) {

                    dom.__$("hdt_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdt_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdt_male_65")) {

                    dom.__$("hdt_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdt_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdt_female_18")) {

                    dom.__$("hdt_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdt_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdt_female_64")) {

                    dom.__$("hdt_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdt_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdt_female_65")) {

                    dom.__$("hdt_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdt_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdt_total")) {

                    dom.__$("hdt_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd1_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd1_male_18")) {

                    dom.__$("hd1_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd1_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd1_male_64")) {

                    dom.__$("hd1_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd1_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd1_male_65")) {

                    dom.__$("hd1_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },


        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd1_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd1_female_18")) {

                    dom.__$("hd1_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd1_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd1_female_64")) {

                    dom.__$("hd1_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd1_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd1_female_65")) {

                    dom.__$("hd1_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd1_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd1_total")) {

                    dom.__$("hd1_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd2_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd2_male_18")) {

                    dom.__$("hd2_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd2_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd2_male_64")) {

                    dom.__$("hd2_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd2_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd2_male_65")) {

                    dom.__$("hd2_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd2_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd2_female_18")) {

                    dom.__$("hd2_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd2_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd2_female_64")) {

                    dom.__$("hd2_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd2_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd2_female_65")) {

                    dom.__$("hd2_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hd2_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hd2_total")) {

                    dom.__$("hd2_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdn_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdn_male_18")) {

                    dom.__$("hdn_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdn_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdn_male_65")) {

                    dom.__$("hdn_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdn_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdn_female_18")) {

                    dom.__$("hdn_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdn_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdn_female_64")) {

                    dom.__$("hdn_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdn_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdn_female_65")) {

                    dom.__$("hdn_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdn_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdn_total")) {

                    dom.__$("hdn_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdti_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdti_male_18")) {

                    dom.__$("hdti_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdti_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdti_male_64")) {

                    dom.__$("hdti_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdti_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdti_male_65")) {

                    dom.__$("hdti_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdti_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdti_female_18")) {

                    dom.__$("hdti_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdti_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdti_female_64")) {

                    dom.__$("hdti_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdti_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdti_female_65")) {

                    dom.__$("hdti_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdti_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdti_total")) {

                    dom.__$("hdti_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdto_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdto_male_18")) {

                    dom.__$("hdto_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdto_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdto_male_64")) {

                    dom.__$("hdto_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdto_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdto_male_65")) {

                    dom.__$("hdto_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdto_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdto_female_18")) {

                    dom.__$("hdto_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdto_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdto_female_64")) {

                    dom.__$("hdto_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdto_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdto_female_65")) {

                    dom.__$("hdto_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdto_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdto_total")) {

                    dom.__$("hdto_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdd_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdd_male_18")) {

                    dom.__$("hdd_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdd_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdd_male_64")) {

                    dom.__$("hdd_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdd_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdd_male_65")) {

                    dom.__$("hdd_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdd_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdd_female_18")) {

                    dom.__$("hdd_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdd_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdd_female_64")) {

                    dom.__$("hdd_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdd_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdd_female_65")) {

                    dom.__$("hdd_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/hdd_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("hdd_total")) {

                    dom.__$("hdd_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/ast_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("ast_male_18")) {

                    dom.__$("ast_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/ast_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("ast_male_64")) {

                    dom.__$("ast_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/ast_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("ast_male_65")) {

                    dom.__$("ast_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/ast_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("ast_female_18")) {

                    dom.__$("ast_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/ast_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("ast_female_64")) {

                    dom.__$("ast_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/ast_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("ast_female_65")) {

                    dom.__$("ast_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/ast_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("ast_total")) {

                    dom.__$("ast_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/astn_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("astn_male_18")) {

                    dom.__$("astn_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/astn_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("astn_male_64")) {

                    dom.__$("astn_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/astn_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("astn_male_65")) {

                    dom.__$("astn_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/astn_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("astn_female_18")) {

                    dom.__$("astn_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/astn_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("astn_female_64")) {

                    dom.__$("astn_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/astn_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("astn_female_65")) {

                    dom.__$("astn_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/astn_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("astn_total")) {

                    dom.__$("astn_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/asti_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("asti_male_18")) {

                    dom.__$("asti_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/asti_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("asti_male_64")) {

                    dom.__$("asti_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/asti_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("asti_male_65")) {

                    dom.__$("asti_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/asti_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("asti_female_18")) {

                    dom.__$("asti_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/asti_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("asti_female_64")) {

                    dom.__$("asti_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/asti_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("asti_female_65")) {

                    dom.__$("asti_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/asti_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("asti_total")) {

                    dom.__$("asti_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/asto_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("asto_male_18")) {

                    dom.__$("asto_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/asto_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("asto_male_64")) {

                    dom.__$("asto_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/asto_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("asto_male_65")) {

                    dom.__$("asto_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/asto_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("asto_female_18")) {

                    dom.__$("asto_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/asto_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("asto_female_64")) {

                    dom.__$("asto_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/asto_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("asto_female_65")) {

                    dom.__$("asto_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/asto_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("asto_total")) {

                    dom.__$("asto_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/astd_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("astd_male_18")) {

                    dom.__$("astd_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/astd_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("astd_male_64")) {

                    dom.__$("astd_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/astd_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("astd_male_65")) {

                    dom.__$("astd_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/astd_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("astd_female_18")) {

                    dom.__$("astd_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/astd_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("astd_female_64")) {

                    dom.__$("astd_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/astd_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("astd_female_65")) {

                    dom.__$("astd_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/astd_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("astd_total")) {

                    dom.__$("astd_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copd_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copd_male_18")) {

                    dom.__$("copd_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copd_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copd_male_64")) {

                    dom.__$("copd_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copd_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copd_male_65")) {

                    dom.__$("copd_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copd_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copd_female_18")) {

                    dom.__$("copd_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copd_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copd_female_64")) {

                    dom.__$("copd_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copd_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copd_female_65")) {

                    dom.__$("copd_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copd_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copd_total")) {

                    dom.__$("copd_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },
        
        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdn_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdn_male_18")) {

                    dom.__$("copdn_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdn_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdn_male_64")) {

                    dom.__$("copdn_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdn_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdn_male_65")) {

                    dom.__$("copdn_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdn_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdn_female_18")) {

                    dom.__$("copdn_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdn_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdn_female_64")) {

                    dom.__$("copdn_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdn_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdn_female_65")) {

                    dom.__$("copdn_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdn_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdn_total")) {

                    dom.__$("copdn_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdti_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdti_male_18")) {

                    dom.__$("copdti_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdti_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdti_male_64")) {

                    dom.__$("copdti_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdti_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdti_male_65")) {

                    dom.__$("copdti_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdti_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdti_female_18")) {

                    dom.__$("copdti_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdti_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdti_female_64")) {

                    dom.__$("copdti_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdti_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdti_female_65")) {

                    dom.__$("copdti_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdti_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdti_total")) {

                    dom.__$("copdti_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdto_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdto_male_18")) {

                    dom.__$("copdto_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdto_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdto_male_64")) {

                    dom.__$("copdto_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdto_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdto_male_65")) {

                    dom.__$("copdto_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdto_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdto_female_18")) {

                    dom.__$("copdto_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdto_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdto_female_64")) {

                    dom.__$("copdto_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdto_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdto_female_65")) {

                    dom.__$("copdto_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdto_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdto_total")) {

                    dom.__$("copdto_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdd_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdd_male_18")) {

                    dom.__$("copdd_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdd_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdd_male_64")) {

                    dom.__$("copdd_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdd_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdd_male_65")) {

                    dom.__$("copdd_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdd_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdd_female_18")) {

                    dom.__$("copdd_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdd_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdd_female_64")) {

                    dom.__$("copdd_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdd_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdd_female_65")) {

                    dom.__$("copdd_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/copdd_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("copdd_total")) {

                    dom.__$("copdd_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epit_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epit_male_18")) {

                    dom.__$("epit_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epit_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epit_male_64")) {

                    dom.__$("epit_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epit_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epit_male_65")) {

                    dom.__$("epit_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epit_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epit_female_18")) {

                    dom.__$("epit_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epit_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epit_female_64")) {

                    dom.__$("epit_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epit_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epit_female_65")) {

                    dom.__$("epit_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epit_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epit_total")) {

                    dom.__$("epit_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epin_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epin_male_18")) {

                    dom.__$("epin_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epin_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epin_male_64")) {

                    dom.__$("epin_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },
        
        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epin_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epin_male_65")) {

                    dom.__$("epin_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epin_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epin_female_18")) {

                    dom.__$("epin_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epin_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epin_female_64")) {

                    dom.__$("epin_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epin_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epin_female_65")) {

                    dom.__$("epin_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epin_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epin_total")) {

                    dom.__$("epin_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epiti_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epiti_male_18")) {

                    dom.__$("epiti_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epiti_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epiti_male_64")) {

                    dom.__$("epiti_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epiti_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epiti_male_65")) {

                    dom.__$("epiti_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epiti_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epiti_female_18")) {

                    dom.__$("epiti_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epiti_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epiti_female_64")) {

                    dom.__$("epiti_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epiti_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epiti_female_65")) {

                    dom.__$("epiti_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epiti_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epiti_total")) {

                    dom.__$("epiti_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epito_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epito_male_18")) {

                    dom.__$("epito_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epito_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epito_male_64")) {

                    dom.__$("epito_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },


        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epito_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epito_male_65")) {

                    dom.__$("epito_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epito_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epito_female_18")) {

                    dom.__$("epito_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epito_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epito_female_64")) {

                    dom.__$("epito_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epito_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epito_female_65")) {

                    dom.__$("epito_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epito_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epito_total")) {

                    dom.__$("epito_total").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },


        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epid_male_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epid_male_18")) {

                    dom.__$("epid_male_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epid_male_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epid_male_64")) {

                    dom.__$("epid_male_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        
        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epid_male_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epid_male_65")) {

                    dom.__$("epid_male_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epid_female_18?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epid_female_18")) {

                    dom.__$("epid_female_18").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epid_female_64?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epid_female_64")) {

                    dom.__$("epid_female_64").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epid_female_65?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epid_female_65")) {

                    dom.__$("epid_female_65").innerHTML = data? data.total : "0";

                }

                iCallback();

            });

        },

        function (iCallback) {

            dom.ajaxRequest("/mq_reports/epid_total?start_date=" + startDate + "&end_date=" + endDate, function (data) {

                if (dom.__$("epid_total")) {

                    dom.__$("epid_total").innerHTML = data? data.total : "0";

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

    router.route("/mq_site_report")
        .get(function (req, res) {

            var url = require("url");

            var query = url.parse(req.url, true).query;

            var path = require("path");

            var fs = require("fs");

            var jsdom = require("jsdom");

            var template = fs.readFileSync(path.resolve("./public/views/monthly_quarterly_report_template.html"), "utf-8")

            jsdom.env(template, [], function (err, window) {

                var host = req.headers.host;

                dom.loadFields(host, window, query.start_date, query.end_date, function () {

                    res.send(window.document.defaultView.document.documentElement.outerHTML);

                })

            });

        });

    return router;

}
