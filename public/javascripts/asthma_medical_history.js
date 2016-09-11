/**
 * Created by chimwemwe on 6/24/16.
 */

(function () {

    var icoAdd = "data:image/png;base64,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";

    function __$__(id) {

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

    function queryEncounter(encounter, id, callback) {

        var result = [];

        if (window.parent.dashboard) {

            result = window.parent.dashboard.getAnyExistingEncounters("ASTHMA PROGRAM", encounter);

        }

        callback(result, id);

    }

    function loadDetails(parent, sourceData) {

        if (!sourceData || !parent)
            return;

        var table = document.createElement("table");
        table.style.width = "100%";
        table.style.marginBottom = "20px";
        table.cellPadding = 2;
        table.style.borderCollapse = "collapse";

        parent.appendChild(table);

        for (var i = 0; i < sourceData.length; i++) {

            var keys = Object.keys(sourceData[i]);

            var tr = document.createElement("tr");

            table.appendChild(tr);

            for (var j = 0; j < 4; j++) {

                var td = document.createElement("td");

                td.style.verticalAlign = "middle";

                if (j == 0) {

                    td.style.fontWeight = "bold";

                    td.style.fontSize = "14px";

                    td.style.textAlign = "right";

                    td.innerHTML = keys[0];

                } else if (j == 1) {

                    td.innerHTML = ":";

                    td.style.width = "10px";

                    td.style.textAlign = "center";

                } else if (j == 3) {

                    var img = document.createElement("img");
                    img.setAttribute("src", window.parent.dashboard.icoClose);
                    img.height = "40";
                    img.style.float = "right";

                    td.appendChild(img);

                    td.setAttribute("uuid", sourceData[i][keys[0]]["UUID"]);

                    tr.id = sourceData[i][keys[0]]["UUID"];

                    td.style.cursor = "pointer";

                    td.className = "closeButton";

                    td.style.padding = "5px";

                    td.style.paddingRight = "10px";

                    td.onclick = function () {

                        dashboard.showConfirmMsg("Do you really want to delete this entry?", "Confirm",
                                "javascript:window.parent.dashboard.voidConcept('" + this.getAttribute("uuid") + "')");

                    }

                } else {

                    td.style.minWidth = "50%";

                    if (keys[0] == "Drug Orders") {

                        var drugs = "<ol>";

                        for (var k = 0; k < sourceData[i][keys[0]].length; k++) {

                            drugs += "<li style='margin-bottom: 5px; margin-top: 5px;'>" + sourceData[i][keys[0]][k]["instructions"] + "</li>";

                        }

                        drugs += "</ol>";

                        td.innerHTML = drugs;

                    } else {

                        td.innerHTML = (sourceData[i][keys[0]]["response"]["category"] == "DATE AND TIME" ?
                            (new Date(sourceData[i][keys[0]]["response"]["value"])).format() : sourceData[i][keys[0]]["response"]["value"]);

                    }

                }

                tr.appendChild(td);

            }

        }

    }

    function loadPage() {

        if(dashboard.autoContinue){

                var tasks = {

                        "Initial Questions"    : "/spec/asthma/initial_questions.spec",
                        "Past Medical History" : "/spec/asthma/medical_history.spec",
                        "Social History"       : "/spec/asthma/social_history.spec",
                        "Family History"       : "/spec/asthma/family_history.spec"

                }

                if (!window.parent.dashboard.queryAnyExistingEncounters("ASTHMA PROGRAM", "ASTHMA INITIAL QUESTIONS")) {

                    if(window.parent.dashboard.data.data.identifiers["AST Number"] && window.parent.dashboard.data.data.identifiers["AST Number"].identifier){

                        
                         window.parent.dashboard.navPanel(tasks["Initial Questions"])


                    }else{

                        var message = 'Enroll patient in ' + window.parent.dashboard.getCookie("currentProgram") + ' ' + 'Program?';

                        window.parent.dashboard.showConfirmMsg(message, "Confirm",
                                "javascript:window.parent.dashboard.navPanel('/spec/asthma/initial_questions.spec')");


                    }

                       

                }else if (!window.parent.dashboard.queryAnyExistingEncounters("ASTHMA PROGRAM", "ASTHMA MEDICAL HISTORY")) {

                        window.parent.dashboard.navPanel(tasks["Past Medical History"])

                }else if (!window.parent.dashboard.queryAnyExistingEncounters("ASTHMA PROGRAM", "ASTHMA SOCIAL HISTORY")) {

                         
                         window.parent.dashboard.navPanel(tasks["Social History"])

                }else if (!window.parent.dashboard.queryAnyExistingEncounters("ASTHMA PROGRAM", "ASTHMA FAMILY HISTORY")) {

                        window.parent.dashboard.navPanel(tasks["Family History"])

                }
                else{

                        window.parent.dashboard.workflow.splice(0, 1);

                        window.parent.dashboard.$(window.parent.dashboard.workflow[0]).click();


                }

        }

        if (__$__("details")) {

            __$__("details").innerHTML = "";

            
           var colors = [
                ["#6a8ac9", "rgba(106,138,201,0.05)", "#ffffff"],
                ["#c99414", "rgba(201,148,20,0.05)", "#ffffff"],
                ["#3870f1", "rgba(56,112,241,0.05)", "#ffffff"],
                ["#004586", "rgba(0,69,134,0.05)", "#ffffff"],
                ["#ff950e", "rgba(255,149,14,0.05)", "#ffffff"],
                ["#579d1c", "rgba(87,157,28,0.05)", "#ffffff"],
                ["#993366", "rgba(153,51,102,0.05)", "#ffffff"],
                ["#9fc397", "rgba(159,195,151,0.05)", "#ffffff"],
                ["#000000", "rgba(0,0,0,0.05)", "#ffffff"],
                ["#c2c34f", "rgba(194,195,79,0.05)", "#ffffff"],
                ["#9a612a", "rgba(154,97,42,0.05)", "#ffffff"],
                ["#7f8fb0", "rgba(127,143,176,0.05)", "#ffffff"],
                ["#bf8d5c", "rgba(191,141,92,0.05)", "#ffffff"],
                ["#5ca2bf", "rgba(92,162,191,0.05)", "#ffffff"],
                ["#f1389c", "rgba(241,56,156,0.05)", "#ffffff"],
                ["#ab065f", "rgba(171,6,95,0.05)", "#ffffff"],
                ["#068aab", "rgba(6,138,171,0.05)", "#ffffff"]
            ];


            var table = document.createElement("table");
            table.width = "100%";
            table.style.borderCollapse = "collapse";

            __$__("details").appendChild(table);

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td")
            td.style.backgroundColor = colors[0][0];
            td.style.color = "#fff";
            td.style.fontWeight = "bold";
            td.style.verticalAlign = "middle";
            td.style.padding = "8px";
            td.style.fontSize = "18px";
            td.innerHTML = "Initial Questions";

            table.appendChild(td);

            var message = 'Enroll patient in ' + dashboard.getCookie("currentProgram") + ' ' + 'Program?';
0
            var img = document.createElement("img");
            img.setAttribute("src", icoAdd);
            img.height = "32";
            img.style.cssFloat = "right";
            img.style.margin = "-5px";
            img.style.cursor = "pointer";

            img.onclick = function () {

                dashboard.showConfirmMsg(message, "Confirm",
                                "javascript:window.parent.dashboard.navPanel('/spec/asthma/initial_questions.spec')");


            }

            if (!window.parent.dashboard.queryAnyExistingEncounters("ASTHMA PROGRAM", "ASTHMA INITIAL QUESTIONS")) {

                td.appendChild(img);

            }

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td");

            table.appendChild(td);

            var div = document.createElement("div");
            div.id = "divIntialQuestions";
             div.style.border = "1px solid " + colors[0][0];
            div.style.minHeight = "30px";
            div.style.backgroundColor = colors[0][1];
            div.innerHTML = "&nbsp;";

            td.appendChild(div);

            queryEncounter("ASTHMA INITIAL QUESTIONS", "divIntialQuestions", function (data, id) {

                if (__$__(id)) {

                    loadDetails(__$__(id), data);

                }

            })

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td")
            td.style.backgroundColor = colors[2][0];
            td.style.color = "#fff";
            td.style.fontWeight = "bold";
            td.style.verticalAlign = "middle";
            td.style.padding = "8px";
            td.style.fontSize = "18px";
            td.innerHTML = "Past Medical History";

            table.appendChild(td);

            var img = document.createElement("img");
            img.setAttribute("src", icoAdd);
            img.height = "32";
            img.style.cssFloat = "right";
            img.style.margin = "-5px";
            img.style.cursor = "pointer";

            img.onclick = function () {

                window.parent.dashboard.navPanel('/spec/asthma/medical_history.spec')

            }

            if (!window.parent.dashboard.queryAnyExistingEncounters("ASTHMA PROGRAM", "ASTHMA MEDICAL HISTORY")) {

                td.appendChild(img);

            }

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td");

            table.appendChild(td);

            var div = document.createElement("div");
            div.id = "divPastMedicalHistory";
            div.style.border = "1px solid " + colors[2][0];
            div.style.minHeight = "30px";
            div.style.backgroundColor = colors[0][1];
            div.innerHTML = "&nbsp;";

            td.appendChild(div);

            queryEncounter("ASTHMA MEDICAL HISTORY", "divPastMedicalHistory", function (data, id) {

                if (__$__(id)) {

                    loadDetails(__$__(id), data);

                }

            })

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td")
            td.style.backgroundColor = colors[3][0];
            td.style.color = "#fff";
            td.style.fontWeight = "bold";
            td.style.verticalAlign = "middle";
            td.style.padding = "8px";
            td.style.fontSize = "18px";
            td.innerHTML = "Social History";

            table.appendChild(td);

            var img = document.createElement("img");
            img.setAttribute("src", icoAdd);
            img.height = "32";
            img.style.cssFloat = "right";
            img.style.margin = "-5px";
            img.style.cursor = "pointer";

            img.onclick = function () {

                window.parent.dashboard.navPanel('/spec/asthma/social_history.spec')

            }

            if (!window.parent.dashboard.queryAnyExistingEncounters("ASTHMA PROGRAM", "ASTHMA SOCIAL HISTORY")) {

                td.appendChild(img);

            }

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td");

            table.appendChild(td);

            var div = document.createElement("div");
            div.id = "divSocialHistory";
            div.style.border = "1px solid " + colors[0][0];
            div.style.minHeight = "30px";
            div.style.backgroundColor = colors[0][1];
            div.innerHTML = "&nbsp;";

            td.appendChild(div);

            queryEncounter("ASTHMA SOCIAL HISTORY", "divSocialHistory", function (data, id) {

                if (__$__(id)) {

                    loadDetails(__$__(id), data);

                }

            })

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td")
            td.style.backgroundColor =  colors[5][0];
            td.style.color = "#fff";
            td.style.fontWeight = "bold";
            td.style.verticalAlign = "middle";
            td.style.padding = "8px";
            td.style.fontSize = "18px";
            td.innerHTML = "Family History";

            table.appendChild(td);

            var img = document.createElement("img");
            img.setAttribute("src", icoAdd);
            img.height = "32";
            img.style.cssFloat = "right";
            img.style.margin = "-5px";
            img.style.cursor = "pointer";

            img.onclick = function () {

                window.parent.dashboard.navPanel('/spec/asthma/family_history.spec')

            }

            if (!window.parent.dashboard.queryAnyExistingEncounters("ASTHMA PROGRAM", "ASTHMA FAMILY HISTORY")) {

                td.appendChild(img);

            }

            var tr = document.createElement("tr");

            table.appendChild(tr);

            var td = document.createElement("td");

            table.appendChild(td);

            var div = document.createElement("div");
            div.id = "divFamilyHistory";
            div.style.border = "1px solid " + colors[2][0];
            div.style.minHeight = "30px";
            div.style.backgroundColor = colors[0][1];
            div.innerHTML = "&nbsp;";

            td.appendChild(div);

            queryEncounter("ASTHMA FAMILY HISTORY", "divFamilyHistory", function (data, id) {

                if (__$__(id)) {

                    loadDetails(__$__(id), data);

                }

            })

        }

    }

    loadPage();

    dashboard.subscription.addEventlistener("done", function(){

        if(dashboard.activeTask == "Medical History") {

            loadPage();

        }

    })

})();