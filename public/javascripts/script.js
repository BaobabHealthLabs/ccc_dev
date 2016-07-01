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

function verticalText(text, parent) {

    if (!parent)
        return;

    var div = document.createElement("div");
    div.style.height = "120px";
    div.style.fontSize = "12px";
    div.style.width = "30px";

    parent.appendChild(div);

    var child = document.createElement("div");
    child.style.transform = "rotate(-90deg)";
    child.style.transformOrigin = "right bottom 0";
    child.style.marginLeft = "-65px";

    child.innerHTML = text;

    div.appendChild(child);

}

var patient_programs = window.parent.dashboard.data.data.programs["DIABETES PROGRAM"].patient_programs;

var patient_program_keys = Object.keys(patient_programs);

var visitRows = [];

for(var i = 0; i < patient_program_keys.length; i++) {

    var program_id = patient_program_keys[i];

    var visits = Object.keys(patient_programs[program_id].visits);

    for(var j = 0; j < visits.length; j++) {

        var visitDate = visits[j];

        var visitRow = {
            "Visit Date": (new Date(visitDate)).format(),
            "Ht (cm)": "",
            "Wt (kg)": "",
            "BMI": "",
            "BP": "",
            "PR": ""
        };

        var encounterKeys = Object.keys(patient_programs[program_id].visits[visitDate])

        for(var k = 0; k < encounterKeys.length; k++) {

            var encounter = encounterKeys[k];

            var systolic, diastolic, weight, height;

            for(var l = 0; l < patient_programs[program_id].visits[visitDate][encounter].length; l++) {

                var concept = Object.keys(patient_programs[program_id].visits[visitDate][encounter][l])[0];

                switch (encounter) {

                    case "VITALS":

                        switch(concept) {

                            case "Height (cm)":

                                visitRow["Ht (cm)"] =
                                    patient_programs[program_id].visits[visitDate][encounter][l][concept].response.value;

                                height = parseInt(patient_programs[program_id].visits[visitDate][encounter][l][concept].response.value);

                                break;

                            case "Weight (kg)":

                                visitRow["Wt (kg)"] =
                                    patient_programs[program_id].visits[visitDate][encounter][l][concept].response.value;

                                weight = parseFloat(patient_programs[program_id].visits[visitDate][encounter][l][concept].response.value);

                                break;

                            case "Systolic blood pressure":

                                systolic =
                                    patient_programs[program_id].visits[visitDate][encounter][l][concept].response.value;

                                break;

                            case "Diastolic blood pressure":

                                diastolic =
                                    patient_programs[program_id].visits[visitDate][encounter][l][concept].response.value;

                                break;

                        }

                        break;

                }

            }

            if(weight && height) {

                var bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);

                visitRow["BMI"] = bmi;

            }

            visitRow["BP"] = (systolic ? systolic : "?") + "/" + (diastolic ? diastolic : "?");

        }

        visitRows.push(visitRow);

    }

}

var id = "tbody";

var tbody = (document.getElementById(id) ? document.getElementById(id) : document.createElement("table"));

if(!document.getElementById(id)) {

    tbody.cellPadding = 10;

    tbody.border = 1;

    document.body.innerHTML = "";

    document.body.appendChild(tbody);

}

for(var i = 0; i < visitRows.length; i++) {

    var tr = document.createElement("tr");

    tbody.appendChild(tr);

    var labels = Object.keys(visitRows[i]);

    for(var j = 0; j < labels.length; j++) {

        var label = labels[j];

        if(label == "BMI") {

            if(visitRows[i][label] < 19) {

                var td = document.createElement("td");
                td.innerHTML = "U";
                td.style.border = "2px solid red";
                td.style.borderRadius = "10px";
                td.style.width = "20px";
                td.style.height = "20px";

                tr.appendChild(td);

            } else {

                var td = document.createElement("td");
                td.innerHTML = "U";

                tr.appendChild(td);

            }

            if(visitRows[i][label] >= 19 && visitRows[i][label] <= 24.9) {

                var td = document.createElement("td");
                td.innerHTML = "N";
                td.style.border = "2px solid red";
                td.style.borderRadius = "10px";
                td.style.width = "20px";
                td.style.height = "20px";

                tr.appendChild(td);

            } else {

                var td = document.createElement("td");
                td.innerHTML = "N";

                tr.appendChild(td);

            }

            if(visitRows[i][label] > 24.9) {

                var td = document.createElement("td");
                td.innerHTML = "O";
                td.style.border = "2px solid red";
                td.style.borderRadius = "10px";
                td.style.width = "20px";
                td.style.height = "20px";

                tr.appendChild(td);

            } else {

                var td = document.createElement("td");
                td.innerHTML = "O";

                tr.appendChild(td);

            }

        } else {

            var td = document.createElement("td");
            td.innerHTML = visitRows[i][label];

            tr.appendChild(td);

        }


    }

}

// console.log(visitRows);
