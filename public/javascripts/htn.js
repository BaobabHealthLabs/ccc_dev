"use strict"
var visitRows = [];

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

function loadCheckConditions(){

	var opts = __$("touchscreenInput" + tstCurrentPage).value.split(";");

	var all_page_options = ["Asthma","COPD","Chronic dry cough",
							"Indoor cooking","Occupational Exposure",
							"TB Contact","Smoking","Secondhand smoking"];
							

	for(var i = 0; i < all_page_options.length; i++){

		var element_id = all_page_options[i].trim().toLowerCase().replace(/\s+/g,"_");


		if(opts.indexOf(all_page_options[i]) >= 0){	


			if (__$(element_id +"_date") !=null && __$(element_id +"_date") !== 'undefined'){

				__$(element_id +"_date").setAttribute("condition", true)
			}
			else{

				for(var j = 0 ; j < 5 ; j++){

					if (__$(element_id +j) !=null && __$(element_id +j) !== 'undefined'){

						__$(element_id +j).setAttribute("condition", true)

					}

				}
			}
		}
		else{
			
			if (__$(element_id +"_date") !=null && __$(element_id +"_date") !== 'undefined'){

				__$(element_id +"_date").setAttribute("condition", false)

			}
			else{

				for(var j = 0 ; j < 5 ; j++){

					if (__$(element_id +j) !=null && __$(element_id +j) !== 'undefined'){

						__$(element_id +j).setAttribute("condition", false)

					}

				}

			}
		}
	}
}

function existingPatient() {

    var existing = false;

    if(window.parent.dashboard && window.parent.dashboard.data && window.parent.dashboard.data.data) {

        if(window.parent.dashboard.queryAnyExistingEncounters("HYPERTENSION PROGRAM", "HYPERTENSION INITIAL QUESTIONS")) {

            existing = true;

        } else {

            existing = false;

            if(!__$("data.create_clinic_number")) {

                var input = document.createElement("input");
                input.type = "hidden";
                input.name = "data.create_clinic_number";
                input.id = "data.create_clinic_number";
                input.value = window.parent.dashboard.modules[getCookie("currentProgram")].clinicPrefix;

                if (__$("data")) {

                    __$("data").appendChild(input);

                }

            }

        }

    }

    return existing;

}