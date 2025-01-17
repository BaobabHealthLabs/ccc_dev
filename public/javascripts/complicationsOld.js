/**
 * Created by chimwemwe on 7/2/16.
 */

"use strict"

var icoClose = "data:image/png;base64,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";

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

                result = date.getFullYear() + "-" + window.parent.dashboard.padZeros((parseInt(date.getMonth()) + 1), 2) + "-" +
                    window.parent.dashboard.padZeros(date.getDate(), 2) + " " + window.parent.dashboard.padZeros(date.getHours(), 2) + ":" +
                    window.parent.dashboard.padZeros(date.getMinutes(), 2) + ":" + window.parent.dashboard.padZeros(date.getSeconds(), 2);

            } else if (format.match(/YYYY\-mm\-dd/)) {

                result = date.getFullYear() + "-" + window.parent.dashboard.padZeros((parseInt(date.getMonth()) + 1), 2) + "-" +
                    window.parent.dashboard.padZeros(date.getDate(), 2);

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


function __$(id) {

    return document.getElementById(id);

}

function ajaxRequest(url, callback) {

    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {

        if (httpRequest.readyState == 4 && (httpRequest.status == 200 ||
            httpRequest.status == 304)) {

            if (httpRequest.responseText.trim().length > 0) {
                var result = JSON.parse(httpRequest.responseText);

                callback(result);

            } else {

                callback(undefined);

            }

        }

    };
    try {
        httpRequest.open("GET", url, true);
        httpRequest.send(null);
    } catch (e) {
    }

}

function executeTasks(){

    if(window.parent.dashboard.autoContinue){

        var visit_today = new Date().format("YYYY-mm-dd");

        var tasks = {

                        "Creatinine"        : "/spec/dm/creatinine.spec",
                        "Urine Protein"     : "/spec/dm/urine_protein.spec",
                        "Visual Acuity"     : "/spec/dm/visual_acuity.spec",
                        "Fundoscopy"        : "/spec/dm/fundoscopy.spec",
                        "Foot Check"        : "/spec/dm/foot_check.spec",
                        "Urea"              : "/spec/dm/urea.spec",
                        "Macrovascular"     : "/spec/dm/macrovascular.spec"

        }


        if(window.parent.dashboard.queryActiveObs("DIABETES PROGRAM",visit_today,"DIABETES TEST","Creatinine Result")===undefined){

            window.parent.dashboard.exitNavPanel(tasks["Creatinine"])

        }else if(window.parent.dashboard.queryActiveObs("DIABETES PROGRAM",visit_today,"DIABETES TEST","Urine Protein Result")===undefined){

            window.parent.dashboard.exitNavPanel(tasks["Urine Protein"])

        }else if(window.parent.dashboard.queryActiveObs("DIABETES PROGRAM",visit_today,"DIABETES TEST","Visual Acuity Result Test Date")===undefined){

            window.parent.dashboard.exitNavPanel(tasks["Visual Acuity"])

        }else if(window.parent.dashboard.queryActiveObs("DIABETES PROGRAM",visit_today,"DIABETES TEST","Fundoscopy Result Test Date")===undefined){

            window.parent.dashboard.exitNavPanel(tasks["Fundoscopy"])

        }else if(window.parent.dashboard.queryActiveObs("DIABETES PROGRAM",visit_today,"DIABETES TEST","Foot Check Result Test Date")===undefined){

            window.parent.dashboard.exitNavPanel(tasks["Foot Check"])

        }else if(window.parent.dashboard.queryActiveObs("DIABETES PROGRAM",visit_today,"DIABETES TEST","Urea Result Test Date")===undefined){

            window.parent.dashboard.exitNavPanel(tasks["Urea"])

        }else if(window.parent.dashboard.queryActiveObs("DIABETES PROGRAM",visit_today,"DIABETES TEST","Macrovascular Result Test Date")===undefined){

            window.parent.dashboard.exitNavPanel(tasks["Macrovascular"])

        }
        else{

            window.parent.dashboard.autoContinue = true;

            window.parent.dashboard.workflow.splice(0, 1);

            window.parent.dashboard.exitNavPanel();

        }

     }

}

function loadPage() {

    executeTasks();

    if (__$("creatinine")) {

        __$("creatinine").innerHTML = "";

        var nodes = window.parent.dashboard.queryExistingObsComplexArray("Diabetes test type", undefined, "Creatinine");

        var visits = Object.keys(nodes);

        var table = document.createElement("table");
        table.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.borderColor = "#eee";
        table.cellPadding = 10;

        __$("creatinine").appendChild(table);

        var data = {};

        for (var i = 0; i < visits.length; i++) {

            var visit = visits[i];

            for (var j = 0; j < nodes[visit].length; j++) {

                var node = nodes[visit][j]["Creatinine"].data;

                var entry = {
                    units: "",
                    value: "",
                    date: "",
                    uuid: nodes[visit][j]["Creatinine"].UUID
                }

                for (var k = 0; k < node.length; k++) {

                    var leaf = node[k];

                    var label = Object.keys(leaf)[0];

                    switch (label) {

                        case "Unit for Creatinine Value":

                            entry.units = leaf[label].response.value;

                            break;

                        case "Creatinine Result":

                            entry.value = leaf[label].response.value;

                            break;

                        case "Creatinine Test Date":

                            entry.date = (new Date(leaf[label].response.value)).format();

                            break;

                    }

                }

                data[(new Date(entry.date)).getTime()] = entry;

            }

        }

        var keys = Object.keys(data).sort().reverse();

        for (var i = 0; i < keys.length; i++) {

            var row = data[keys[i]];

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td");
            td.innerHTML = row.value + " " + row.units;
            td.style.borderRight = "1px solid #ccc";
            td.style.width = "25%";
            td.align = "right";
            td.style.verticalAlign = "top";

            if (i > 0)
                td.className = "collapsible-creatinine";

            if (i > 0)
                td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.style.verticalAlign = "top";
            td.innerHTML = (row.date == (new Date()).format() ? "Today" : row.date);

            if (i > 0)
                td.className = "collapsible-creatinine";

            if (i > 0)
                td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.style.verticalAlign = "top";
            td.align = "right";
            td.setAttribute("uuid", row.uuid);
            td.style.width = "40px";

            if (i > 0)
                td.className = "collapsible-creatinine";

            td.onclick = function () {

                window.parent.dashboard.showConfirmMsg("Do you really want to delete this entry?", "Confirm",
                        "javascript:window.parent.dashboard.voidConcept('" + this.getAttribute("uuid") + "')");

            }

            if (i > 0)
                td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var img = document.createElement("img");
            img.src = icoClose;
            img.height = 25;
            img.style.cursor = "pointer";

            td.appendChild(img);

        }

        [].slice.call(document.querySelectorAll(".collapsible-creatinine")).forEach(function (el, i) {

            el.style.display = "none";

        });

        if (keys.length > 1) {

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td");
            td.style.borderRight = "1px solid #ccc";
            td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.colSpan = 2;
            td.id = "toggle-creatinine";
            td.innerHTML = "Show More";
            td.className = "link";
            td.align = "right";
            td.style.fontSize = "18px";
            td.style.borderTop = "1px solid #ccc";

            td.onclick = function () {

                if (this.innerHTML == "Show More") {

                    [].slice.call(document.querySelectorAll(".collapsible-creatinine")).forEach(function (el, i) {

                        el.style.display = "table-cell";

                    });

                    this.innerHTML = "Show Less";

                } else {

                    [].slice.call(document.querySelectorAll(".collapsible-creatinine")).forEach(function (el, i) {

                        el.style.display = "none";

                    });

                    this.innerHTML = "Show More";

                }

            }

            tr.appendChild(td);

        }

    }

    if (__$("urine_protein")) {

        __$("urine_protein").innerHTML = "";

        var nodes = window.parent.dashboard.queryExistingObsComplexArray("Diabetes test type", undefined, "Urine Protein");

        var visits = Object.keys(nodes);

        var table = document.createElement("table");
        table.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.borderColor = "#eee";
        table.cellPadding = 10;

        __$("urine_protein").appendChild(table);

        var data = {};

        for (var i = 0; i < visits.length; i++) {

            var visit = visits[i];

            for (var j = 0; j < nodes[visit].length; j++) {

                var node = nodes[visit][j]["Urine Protein"].data;

                var entry = {
                    value: "",
                    date: "",
                    uuid: nodes[visit][j]["Urine Protein"].UUID
                }

                for (var k = 0; k < node.length; k++) {

                    var leaf = node[k];

                    var label = Object.keys(leaf)[0];

                    switch (label) {

                        case "Urine Protein Result":

                            entry.value = leaf[label].response.value;

                            break;

                        case "Urine Protein Result Test Date":

                            entry.date = (new Date(leaf[label].response.value)).format();

                            break;

                    }

                }

                data[(new Date(entry.date)).getTime()] = entry;

            }

        }

        var keys = Object.keys(data).sort().reverse();

        for (var i = 0; i < keys.length; i++) {

            var row = data[keys[i]];

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td");
            td.style.verticalAlign = "top";
            td.innerHTML = row.value;
            td.align = "right";
            td.style.borderRight = "1px solid #ccc";
            td.style.width = "25%";

            if (i > 0)
                td.className = "collapsible-urine_protein";

            if (i > 0)
                td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.style.verticalAlign = "top";
            td.innerHTML = (row.date == (new Date()).format() ? "Today" : row.date);

            if (i > 0)
                td.className = "collapsible-urine_protein";

            if (i > 0)
                td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.style.verticalAlign = "top";
            td.align = "right";
            td.setAttribute("uuid", row.uuid);
            td.style.width = "40px";

            if (i > 0)
                td.className = "collapsible-urine_protein";

            td.onclick = function () {

                window.parent.dashboard.showConfirmMsg("Do you really want to delete this entry?", "Confirm",
                        "javascript:window.parent.dashboard.voidConcept('" + this.getAttribute("uuid") + "')");

            }

            if (i > 0)
                td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var img = document.createElement("img");
            img.src = icoClose;
            img.height = 25;
            img.style.cursor = "pointer";

            td.appendChild(img);

        }

        [].slice.call(document.querySelectorAll(".collapsible-urine_protein")).forEach(function (el, i) {

            el.style.display = "none";

        });

        if (keys.length > 1) {

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td");
            td.style.borderRight = "1px solid #ccc";
            td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.colSpan = 2;
            td.id = "toggle-urine_protein";
            td.innerHTML = "Show More";
            td.className = "link";
            td.align = "right";
            td.style.fontSize = "18px";
            td.style.borderTop = "1px solid #ccc";

            td.onclick = function () {

                if (this.innerHTML == "Show More") {

                    [].slice.call(document.querySelectorAll(".collapsible-urine_protein")).forEach(function (el, i) {

                        el.style.display = "table-cell";

                    });

                    this.innerHTML = "Show Less";

                } else {

                    [].slice.call(document.querySelectorAll(".collapsible-urine_protein")).forEach(function (el, i) {

                        el.style.display = "none";

                    });

                    this.innerHTML = "Show More";

                }

            }

            tr.appendChild(td);

        }

    }

    if (__$("visual_acuity")) {

        __$("visual_acuity").innerHTML = "";

        var nodes = window.parent.dashboard.queryExistingObsComplexArray("Diabetes test type", undefined, "Visual Acuity");

        var visits = Object.keys(nodes);

        var table = document.createElement("table");
        table.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.borderColor = "#eee";
        table.cellPadding = 10;

        __$("visual_acuity").appendChild(table);

        var data = {};

        for (var i = 0; i < visits.length; i++) {

            var visit = visits[i];

            for (var j = 0; j < nodes[visit].length; j++) {

                var node = nodes[visit][j]["Visual Acuity"].data;

                var entry = {
                    category: [],
                    value: [],
                    date: "",
                    uuid: nodes[visit][j]["Visual Acuity"].UUID
                }

                for (var k = 0; k < node.length; k++) {

                    var leaf = node[k];

                    var label = Object.keys(leaf)[0];

                    switch (label) {

                        case "Right eye visual acuity":

                        case "Left eye visual acuity":

                            entry.category.push(label);

                            entry.value.push(leaf[label].response.value.split(",").join("<br/>"));

                            break;

                        case "Visual Acuity Result Test Date":

                            entry.date = (new Date(leaf[label].response.value)).format();

                            break;

                    }

                }

                if(!data[(new Date(entry.date)).getTime()])
                    data[(new Date(entry.date)).getTime()] = {};

                for(var e = 0; e < entry.category.length; e++) {

                    data[(new Date(entry.date)).getTime()][entry.category[e]] = {
                        category: entry.category[e],
                        value: entry.value[e],
                        date: entry.date,
                        uuid: entry.uuid
                    };

                }

            }

        }

        var keys = Object.keys(data).sort().reverse();

        for (var i = 0; i < keys.length; i++) {

            var categories = Object.keys(data[keys[i]]);

            for (var j = 0; j < categories.length; j++) {

                var category = categories[j];

                var row = data[keys[i]][category];

                var tr = document.createElement("tr");

                table.appendChild(tr);

                var td = document.createElement("td");
                td.style.verticalAlign = "top";
                td.innerHTML = row.category;
                td.align = "right";
                td.style.borderRight = "1px solid #ccc";
                td.style.width = "25%";

                if (i > 0)
                    td.className = "collapsible-visual_acuity";

                if (i > 0 || j > 0)
                    td.style.borderTop = "1px solid #ccc";

                tr.appendChild(td);

                var td = document.createElement("td");
                td.style.verticalAlign = "top";
                td.innerHTML = row.value;
                td.style.borderRight = "1px solid #ccc";

                if (i > 0)
                    td.className = "collapsible-visual_acuity";

                if (j > 0 || i > 0)
                    td.style.borderTop = "1px solid #ccc";

                tr.appendChild(td);

                var td = document.createElement("td");
                td.style.verticalAlign = "top";
                td.innerHTML = (row.date == (new Date()).format() ? "Today" : row.date);
                td.style.width = "25%";

                if (i > 0)
                    td.className = "collapsible-visual_acuity";

                if (i > 0 || j > 0)
                    td.style.borderTop = "1px solid #ccc";

                tr.appendChild(td);

                var td = document.createElement("td");
                td.style.verticalAlign = "top";
                td.align = "right";
                td.setAttribute("uuid", row.uuid);
                td.style.width = "40px";

                if (i > 0)
                    td.className = "collapsible-visual_acuity";

                td.onclick = function () {

                    window.parent.dashboard.showConfirmMsg("Do you really want to delete this entry?", "Confirm",
                            "javascript:window.parent.dashboard.voidConcept('" + this.getAttribute("uuid") + "')");

                }

                if (i > 0 || j > 0)
                    td.style.borderTop = "1px solid #ccc";

                tr.appendChild(td);

                var img = document.createElement("img");
                img.src = icoClose;
                img.height = 25;
                img.style.cursor = "pointer";

                td.appendChild(img);

            }

        }

        [].slice.call(document.querySelectorAll(".collapsible-visual_acuity")).forEach(function (el, i) {

            el.style.display = "none";

        });

        if (keys.length > 1) {

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td");
            td.style.borderRight = "1px solid #ccc";
            td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.style.borderRight = "1px solid #ccc";
            td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.colSpan = 2;
            td.id = "toggle-visual_acuity";
            td.innerHTML = "Show More";
            td.className = "link";
            td.align = "right";
            td.style.fontSize = "18px";
            td.style.borderTop = "1px solid #ccc";

            td.onclick = function () {

                if (this.innerHTML == "Show More") {

                    [].slice.call(document.querySelectorAll(".collapsible-visual_acuity")).forEach(function (el, i) {

                        el.style.display = "table-cell";

                    });

                    this.innerHTML = "Show Less";

                } else {

                    [].slice.call(document.querySelectorAll(".collapsible-visual_acuity")).forEach(function (el, i) {

                        el.style.display = "none";

                    });

                    this.innerHTML = "Show More";

                }

            }

            tr.appendChild(td);

        }

    }

    if (__$("fundoscopy")) {

        __$("fundoscopy").innerHTML = "";

        var nodes = window.parent.dashboard.queryExistingObsComplexArray("Diabetes test type", undefined, "Fundoscopy");

        var visits = Object.keys(nodes);

        var table = document.createElement("table");
        table.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.borderColor = "#eee";
        table.cellPadding = 10;

        __$("fundoscopy").appendChild(table);

        var data = {};

        for (var i = 0; i < visits.length; i++) {

            var visit = visits[i];

            for (var j = 0; j < nodes[visit].length; j++) {

                var node = nodes[visit][j]["Fundoscopy"].data;

                var entry = {
                    category: [],
                    value: [],
                    date: "",
                    uuid: nodes[visit][j]["Fundoscopy"].UUID
                }

                for (var k = 0; k < node.length; k++) {

                    var leaf = node[k];

                    var label = Object.keys(leaf)[0];

                    switch (label) {

                        case "Right eye fundoscopy":

                        case "Left eye fundoscopy":

                            entry.category.push(label);

                            entry.value.push(leaf[label].response.value.split(",").join("<br/>"));

                            break;

                        case "Fundoscopy Result Test Date":

                            entry.date = (new Date(leaf[label].response.value)).format();

                            break;

                    }

                }

                if(!data[(new Date(entry.date)).getTime()])
                    data[(new Date(entry.date)).getTime()] = {};

                for(var e = 0; e < entry.category.length; e++) {

                    data[(new Date(entry.date)).getTime()][entry.category[e]] = {
                        category: entry.category[e],
                        value: entry.value[e],
                        date: entry.date,
                        uuid: entry.uuid
                    };

                }

            }

        }

        var keys = Object.keys(data).sort().reverse();

        for (var i = 0; i < keys.length; i++) {

            var categories = Object.keys(data[keys[i]]);

            for (var j = 0; j < categories.length; j++) {

                var category = categories[j];

                var row = data[keys[i]][category];

                var tr = document.createElement("tr");

                table.appendChild(tr);

                var td = document.createElement("td");
                td.style.verticalAlign = "top";
                td.innerHTML = row.category;
                td.align = "right";
                td.style.borderRight = "1px solid #ccc";
                td.style.width = "25%";

                if (i > 0)
                    td.className = "collapsible-fundoscopy";

                if (i > 0 || j > 0)
                    td.style.borderTop = "1px solid #ccc";

                tr.appendChild(td);

                var td = document.createElement("td");
                td.style.verticalAlign = "top";
                td.innerHTML = row.value;
                td.style.borderRight = "1px solid #ccc";

                if (i > 0)
                    td.className = "collapsible-fundoscopy";

                if (i > 0 || j > 0)
                    td.style.borderTop = "1px solid #ccc";

                tr.appendChild(td);

                var td = document.createElement("td");
                td.style.verticalAlign = "top";
                td.innerHTML = (row.date == (new Date()).format() ? "Today" : row.date);
                td.style.width = "25%";

                if (i > 0)
                    td.className = "collapsible-fundoscopy";

                if (i > 0 || j > 0)
                    td.style.borderTop = "1px solid #ccc";

                tr.appendChild(td);

                var td = document.createElement("td");
                td.style.verticalAlign = "top";
                td.align = "right";
                td.setAttribute("uuid", row.uuid);
                td.style.width = "40px";

                if (i > 0)
                    td.className = "collapsible-fundoscopy";

                td.onclick = function () {

                    window.parent.dashboard.showConfirmMsg("Do you really want to delete this entry?", "Confirm",
                            "javascript:window.parent.dashboard.voidConcept('" + this.getAttribute("uuid") + "')");

                }

                if (i > 0)
                    td.style.borderTop = "1px solid #ccc";

                tr.appendChild(td);

                var img = document.createElement("img");
                img.src = icoClose;
                img.height = 25;
                img.style.cursor = "pointer";

                td.appendChild(img);

            }

        }

        [].slice.call(document.querySelectorAll(".collapsible-fundoscopy")).forEach(function (el, i) {

            el.style.display = "none";

        });

        if (keys.length > 1) {

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td");
            td.style.borderRight = "1px solid #ccc";
            td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.style.borderRight = "1px solid #ccc";
            td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.colSpan = 2;
            td.id = "toggle-fundoscopy";
            td.innerHTML = "Show More";
            td.className = "link";
            td.align = "right";
            td.style.fontSize = "18px";
            td.style.borderTop = "1px solid #ccc";

            td.onclick = function () {

                if (this.innerHTML == "Show More") {

                    [].slice.call(document.querySelectorAll(".collapsible-fundoscopy")).forEach(function (el, i) {

                        el.style.display = "table-cell";

                    });

                    this.innerHTML = "Show Less";

                } else {

                    [].slice.call(document.querySelectorAll(".collapsible-fundoscopy")).forEach(function (el, i) {

                        el.style.display = "none";

                    });

                    this.innerHTML = "Show More";

                }

            }

            tr.appendChild(td);

        }

    }

    if (__$("foot_check")) {

        __$("foot_check").innerHTML = "";

        var nodes = window.parent.dashboard.queryExistingObsComplexArray("Diabetes test type", undefined, "Foot Check");

        var visits = Object.keys(nodes);

        var table = document.createElement("table");
        table.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.borderColor = "#eee";
        table.cellPadding = 10;

        __$("foot_check").appendChild(table);

        var data = {};

        for (var i = 0; i < visits.length; i++) {

            var visit = visits[i];

            for (var j = 0; j < nodes[visit].length; j++) {

                var node = nodes[visit][j]["Foot Check"].data;

                var entry = {
                    category: [],
                    value: [],
                    date: "",
                    uuid: nodes[visit][j]["Foot Check"].UUID
                }

                for (var k = 0; k < node.length; k++) {

                    var leaf = node[k];

                    var label = Object.keys(leaf)[0];

                    switch (label) {

                        case "Right Foot/Leg Foot Check":

                        case "Left Foot/Leg Foot Check":

                            entry.category.push(label);

                            entry.value.push(leaf[label].response.value.split(",").join("<br/>"));

                            break;

                        case "Foot Check Result Test Date":

                            entry.date = (new Date(leaf[label].response.value)).format();

                            break;

                    }

                }

                if(!data[(new Date(entry.date)).getTime()])
                    data[(new Date(entry.date)).getTime()] = {};

                for(var e = 0; e < entry.category.length; e++) {

                    data[(new Date(entry.date)).getTime()][entry.category[e]] = {
                        category: entry.category[e],
                        value: entry.value[e],
                        date: entry.date,
                        uuid: entry.uuid
                    };

                }

            }

        }

        var keys = Object.keys(data).sort().reverse();

        for (var i = 0; i < keys.length; i++) {

            var categories = Object.keys(data[keys[i]]);

            for (var j = 0; j < categories.length; j++) {

                var category = categories[j];

                var row = data[keys[i]][category];

                var tr = document.createElement("tr");

                table.appendChild(tr);

                var td = document.createElement("td");
                td.style.verticalAlign = "top";
                td.innerHTML = row.category;
                td.align = "right";
                td.style.borderRight = "1px solid #ccc";
                td.style.width = "25%";

                if (i > 0)
                    td.className = "collapsible-foot_check";

                if (i > 0 || j > 0)
                    td.style.borderTop = "1px solid #ccc";

                tr.appendChild(td);

                var td = document.createElement("td");
                td.style.verticalAlign = "top";
                td.innerHTML = row.value;
                td.style.borderRight = "1px solid #ccc";

                if (i > 0)
                    td.className = "collapsible-foot_check";

                if (i > 0 || j > 0)
                    td.style.borderTop = "1px solid #ccc";

                tr.appendChild(td);

                var td = document.createElement("td");
                td.style.verticalAlign = "top";
                td.innerHTML = (row.date == (new Date()).format() ? "Today" : row.date);
                td.style.width = "25%";

                if (i > 0)
                    td.className = "collapsible-foot_check";

                if (i > 0 || j > 0)
                    td.style.borderTop = "1px solid #ccc";

                tr.appendChild(td);

                var td = document.createElement("td");
                td.style.verticalAlign = "top";
                td.align = "right";
                td.setAttribute("uuid", row.uuid);
                td.style.width = "40px";

                if (i > 0)
                    td.className = "collapsible-foot_check";

                td.onclick = function () {

                    window.parent.dashboard.showConfirmMsg("Do you really want to delete this entry?", "Confirm",
                            "javascript:window.parent.dashboard.voidConcept('" + this.getAttribute("uuid") + "')");

                }

                if (i > 0)
                    td.style.borderTop = "1px solid #ccc";

                tr.appendChild(td);

                var img = document.createElement("img");
                img.src = icoClose;
                img.height = 25;
                img.style.cursor = "pointer";

                td.appendChild(img);

            }

        }

        [].slice.call(document.querySelectorAll(".collapsible-foot_check")).forEach(function (el, i) {

            el.style.display = "none";

        });

        if (keys.length > 1) {

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td");
            td.style.borderRight = "1px solid #ccc";
            td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.style.borderRight = "1px solid #ccc";
            td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.colSpan = 2;
            td.id = "toggle-foot_check";
            td.innerHTML = "Show More";
            td.className = "link";
            td.align = "right";
            td.style.fontSize = "18px";
            td.style.borderTop = "1px solid #ccc";

            td.onclick = function () {

                if (this.innerHTML == "Show More") {

                    [].slice.call(document.querySelectorAll(".collapsible-foot_check")).forEach(function (el, i) {

                        el.style.display = "table-cell";

                    });

                    this.innerHTML = "Show Less";

                } else {

                    [].slice.call(document.querySelectorAll(".collapsible-foot_check")).forEach(function (el, i) {

                        el.style.display = "none";

                    });

                    this.innerHTML = "Show More";

                }

            }

            tr.appendChild(td);

        }

    }

    if (__$("urea")) {

        __$("urea").innerHTML = "";

        var nodes = window.parent.dashboard.queryExistingObsComplexArray("Diabetes test type", undefined, "Urea");

        var visits = Object.keys(nodes);

        var table = document.createElement("table");
        table.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.borderColor = "#eee";
        table.cellPadding = 10;

        __$("urea").appendChild(table);

        var data = {};

        for (var i = 0; i < visits.length; i++) {

            var visit = visits[i];

            for (var j = 0; j < nodes[visit].length; j++) {

                var node = nodes[visit][j]["Urea"].data;

                var entry = {
                    value: "",
                    date: "",
                    uuid: nodes[visit][j]["Urea"].UUID
                }

                for (var k = 0; k < node.length; k++) {

                    var leaf = node[k];

                    var label = Object.keys(leaf)[0];

                    switch (label) {

                        case "Urea Result":

                            entry.value = leaf[label].response.value;

                            break;

                        case "Urea Result Test Date":

                            entry.date = (new Date(leaf[label].response.value)).format();

                            break;

                    }

                }

                data[(new Date(entry.date)).getTime()] = entry;

            }

        }

        var keys = Object.keys(data).sort().reverse();

        for (var i = 0; i < keys.length; i++) {

            var row = data[keys[i]];

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td");
            td.innerHTML = row.value;
            td.style.borderRight = "1px solid #ccc";
            td.style.width = "25%";
            td.align = "right";
            td.style.verticalAlign = "top";

            if (i > 0)
                td.className = "collapsible-urea";

            if (i > 0)
                td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.style.verticalAlign = "top";
            td.innerHTML = (row.date == (new Date()).format() ? "Today" : row.date);

            if (i > 0)
                td.className = "collapsible-urea";

            if (i > 0)
                td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.style.verticalAlign = "top";
            td.align = "right";
            td.setAttribute("uuid", row.uuid);
            td.style.width = "40px";

            if (i > 0)
                td.className = "collapsible-urea";

            td.onclick = function () {

                window.parent.dashboard.showConfirmMsg("Do you really want to delete this entry?", "Confirm",
                        "javascript:window.parent.dashboard.voidConcept('" + this.getAttribute("uuid") + "')");

            }

            if (i > 0)
                td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var img = document.createElement("img");
            img.src = icoClose;
            img.height = 25;
            img.style.cursor = "pointer";

            td.appendChild(img);

        }

        [].slice.call(document.querySelectorAll(".collapsible-urea")).forEach(function (el, i) {

            el.style.display = "none";

        });

        if (keys.length > 1) {

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td");
            td.style.borderRight = "1px solid #ccc";
            td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.colSpan = 2;
            td.id = "toggle-urea";
            td.innerHTML = "Show More";
            td.className = "link";
            td.align = "right";
            td.style.fontSize = "18px";
            td.style.borderTop = "1px solid #ccc";

            td.onclick = function () {

                if (this.innerHTML == "Show More") {

                    [].slice.call(document.querySelectorAll(".collapsible-urea")).forEach(function (el, i) {

                        el.style.display = "table-cell";

                    });

                    this.innerHTML = "Show Less";

                } else {

                    [].slice.call(document.querySelectorAll(".collapsible-urea")).forEach(function (el, i) {

                        el.style.display = "none";

                    });

                    this.innerHTML = "Show More";

                }

            }

            tr.appendChild(td);

        }

    }

    if (__$("macrovascular")) {

        __$("macrovascular").innerHTML = "";

        var nodes = window.parent.dashboard.queryExistingObsComplexArray("Diabetes test type", undefined, "Macrovascular");

        var visits = Object.keys(nodes);

        var table = document.createElement("table");
        table.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.borderColor = "#eee";
        table.cellPadding = 10;

        __$("macrovascular").appendChild(table);

        var data = {};

        for (var i = 0; i < visits.length; i++) {

            var visit = visits[i];

            for (var j = 0; j < nodes[visit].length; j++) {

                var node = nodes[visit][j]["Macrovascular"].data;

                var entry = {
                    value: "",
                    date: "",
                    uuid: nodes[visit][j]["Macrovascular"].UUID
                }

                for (var k = 0; k < node.length; k++) {

                    var leaf = node[k];

                    var label = Object.keys(leaf)[0];

                    switch (label) {

                        case "Macrovascular Result":

                            entry.value = leaf[label].response.value;

                            break;

                        case "Macrovascular Result Test Date":

                            entry.date = (new Date(leaf[label].response.value)).format();

                            break;

                    }

                }

                data[(new Date(entry.date)).getTime()] = entry;

            }

        }

        var keys = Object.keys(data).sort().reverse();

        for (var i = 0; i < keys.length; i++) {

            var row = data[keys[i]];

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td");
            td.innerHTML = row.value;
            td.style.borderRight = "1px solid #ccc";
            td.align = "right";
            td.style.verticalAlign = "top";

            if (i > 0)
                td.className = "collapsible-macrovascular";

            if (i > 0)
                td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.style.verticalAlign = "top";
            td.style.width = "25%";
            td.innerHTML = (row.date == (new Date()).format() ? "Today" : row.date);

            if (i > 0)
                td.className = "collapsible-macrovascular";

            if (i > 0)
                td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.style.verticalAlign = "top";
            td.align = "right";
            td.setAttribute("uuid", row.uuid);
            td.style.width = "40px";

            if (i > 0)
                td.className = "collapsible-macrovascular";

            td.onclick = function () {

                window.parent.dashboard.showConfirmMsg("Do you really want to delete this entry?", "Confirm",
                        "javascript:window.parent.dashboard.voidConcept('" + this.getAttribute("uuid") + "')");

            }

            if (i > 0)
                td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var img = document.createElement("img");
            img.src = icoClose;
            img.height = 25;
            img.style.cursor = "pointer";

            td.appendChild(img);

        }

        [].slice.call(document.querySelectorAll(".collapsible-macrovascular")).forEach(function (el, i) {

            el.style.display = "none";

        });

        if (keys.length > 1) {

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td");
            td.style.borderRight = "1px solid #ccc";
            td.style.borderTop = "1px solid #ccc";

            tr.appendChild(td);

            var td = document.createElement("td");
            td.colSpan = 2;
            td.id = "toggle-macrovascular";
            td.innerHTML = "Show More";
            td.className = "link";
            td.align = "right";
            td.style.fontSize = "18px";
            td.style.borderTop = "1px solid #ccc";

            td.onclick = function () {

                if (this.innerHTML == "Show More") {

                    [].slice.call(document.querySelectorAll(".collapsible-macrovascular")).forEach(function (el, i) {

                        el.style.display = "table-cell";

                    });

                    this.innerHTML = "Show Less";

                } else {

                    [].slice.call(document.querySelectorAll(".collapsible-macrovascular")).forEach(function (el, i) {

                        el.style.display = "none";

                    });

                    this.innerHTML = "Show More";

                }

            }

            tr.appendChild(td);

        }

    }

}

loadPage();
