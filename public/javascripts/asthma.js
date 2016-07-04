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

function patientOverview(encounter_data){

	var concept_names = Object.keys(encounter_data);

	for(var i = 0 ; i < concept_names.length ; i++){

		

		if(concept_names[i].includes("Date") || concept_names[i].includes("date")){

			var element_id_prefix = concept_names[i].trim().toLowerCase();

			element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
			element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

			element_id_prefix = element_id_prefix.replace("/","").replace("__","_").replace("?","");

						
			__$(element_id_prefix).innerHTML = new Date(encounter_data[concept_names[i]].response.value).format();


			continue;

		}
		

		switch (concept_names[i]) {

				case "Diagnosis":

					var response = encounter_data[concept_names[i]].response.value;


					if(response =="COPD"){
						__$("copd").style.background ="red";
					}

					if(response =="Asthma"){
						__$("asthma").style.background ="red";
					}

					break;
				case "HIV status":

					var response = encounter_data[concept_names[i]].response.value.toLowerCase();

					if (__$(response)){

						__$(response).style.border = "2px solid red";

					}

					break;

				case "ART start Date":
					if(__$(art_start_date)){

						__$(art_start_date).innerHTML = (new Date(encounter_data[concept_names[i]].response.value)).format()


					}
					break;

				case "Family History of Asthma?":
						var element_id_prefix = concept_names[i].trim().toLowerCase()
						element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
						element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

						element_id_prefix = element_id_prefix.replace("/","").replace("__","_").replace("?","");


						__$(element_id_prefix).innerHTML = encounter_data[concept_names[i]].response.value;						

					break;

				case "Family History of COPD?":
						var element_id_prefix = concept_names[i].trim().toLowerCase()
						element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
						element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

						element_id_prefix = element_id_prefix.replace("/","").replace("__","_").replace("?","");

						
						__$(element_id_prefix).innerHTML = encounter_data[concept_names[i]].response.value;						

					break;

				case "Patient History and Exposures":

					 var response =  encounter_data[concept_names[i]].response.value.split(",");

					 for(var j = 0 ; j < response.length ; j++){

					 	var element_id_prefix =response[j].trim().toLowerCase()
						element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
						element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

						element_id_prefix = element_id_prefix.replace("/","").replace("__","_").replace("?","");
						
						__$(element_id_prefix).style.background = "red";

					 }

					break;
				case "Chronic dry cough duration":

				console.log(concept_names[i]);

						var element_id_prefix = concept_names[i].trim().toLowerCase()
						element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
						element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

						element_id_prefix = element_id_prefix.replace("/","").replace("__","_").replace("?","");

						
						__$(element_id_prefix).innerHTML = encounter_data[concept_names[i]].response.value;

					break;

				case "Chronic dry cough Age onset":
						console.log(concept_names[i]);

						var element_id_prefix = concept_names[i].trim().toLowerCase()
						element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
						element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

						element_id_prefix = element_id_prefix.replace("/","").replace("__","_").replace("?","");

						
						__$(element_id_prefix).innerHTML = encounter_data[concept_names[i]].response.value;
						
					break;

		}


	}

}

function drawResponse(encounter,encounter_data,visit){

	if(encounter=="EPILEPSY VISIT"){
		
		epilepsyVisits(encounter_data,visit);

		return;

	}

	for(var i = 0 ; i < encounter_data.length ; i++){
			
			var concepts = Object.keys(encounter_data[i]);

			console.log(encounter);
			switch (encounter) {

				case "ASTHMA PATIENT OVERVIEW":

					patientOverview(encounter_data[i]);

					break;
				
			}
		
	}

}

function loadCardDashboard(){
	var data = window.parent.dashboard.data.data;

	//Setting Demographics
	var name_keys = Object.keys(data["names"][0]);
	
	var patient_name = data["names"][0][name_keys[0]] + "\t" + data["names"][0][name_keys[2]] +"\t" +data["names"][0][name_keys[1]];

	__$("patient_name").innerHTML = patient_name;


	__$("dob").innerHTML = new Date(data.birthdate).format();

	var gender = data.gender;

	if(gender == "M"){
        	if(__$("male")){
        		__$("male").style.border ="2px solid red";
        	}
     }
     else if(gender == "F"){
        	if(__$("female")){
        		__$("female").style.border ="2px solid red";
        	}
    }

    //Address
    var address = data.addresses[0]["Current District"] +"\tDistrict, TA\t"
    			+data.addresses[0]["Current T/A"]+",\t"+data.addresses[0]["Current Village"]+"\tvillage";

    __$("address").innerHTML = address;	

    var patient_programs = window.parent.dashboard.data.data.programs["ASTHMA PROGRAM"].patient_programs;

	var patient_program_keys = Object.keys(patient_programs);

	var visits;

	for(var i = 0 ; i < patient_program_keys.length; i++){

		visits = Object.keys(patient_programs[patient_program_keys[i]]["visits"]).sort(function (a, b) {
                        return (new Date(b)) - (new Date(a))
                    });

		
		for (var j = visits.length - 1; j >= 0; j--) {

			var encounters = Object.keys(patient_programs[patient_program_keys[i]]["visits"][visits[j]]);

			for (var k = encounters.length - 1; k >= 0; k--) {
			
				drawResponse(encounters[k],patient_programs[patient_program_keys[i]]["visits"][visits[j]][encounters[k]],visits[j]);


			}

		}
		

	}

}