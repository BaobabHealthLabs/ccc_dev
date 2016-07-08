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

function existingPatient() {

    var existing = false;

    if(window.parent.dashboard && window.parent.dashboard.data && window.parent.dashboard.data.data) {

        if(window.parent.dashboard.queryAnyExistingEncounters("EPILEPSY PROGRAM", "EPILEPSY INITIAL QUESTIONS")) {

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


function seizureType(response){

	if(response == "Generalized Epilepsy"){
		return ;
	}
	else{

		var type = ["Tonic clonic","Absence","Myclonic","Clonic","Tonic","Atonic","Simple","Complex","Unclassified"];

		for(var i = 0 ; i < type.length ; i++){

			var element_id  ="" ;

			element_id = type[i].trim().toLowerCase().replace("/","_").replace(/\s+/g,"_")+"_no";

			if(response.trim()==type[i].trim()){

				__$(element_id).style.border ="2px solid #ffffff";
				element_id = type[i].trim().toLowerCase().replace("/","_").replace(/\s+/g,"_")+"_yes";

			}
			
		
			if(__$(element_id)){

				__$(element_id).style.border ="2px solid red";

			}

		}
	}

}

function familyHistory(concept_data){

	var concept_names = Object.keys(concept_data);

	for(var i = 0; i < concept_names.length ; i++){

			var element_id_prefix = concept_names[i].replace("Family History of"," ").replace("?","").trim().toLowerCase().replace("/","_").replace(/\s+/g,"_");

			if (concept_data[concept_names[i]].response.value =="Yes"){
				__$(element_id_prefix+"_unk").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_no").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_yes").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_yes").style.border ="2px solid red";
			}
			if (concept_data[concept_names[i]].response.value =="No"){

				__$(element_id_prefix+"_unk").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_no").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_yes").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_no").style.border ="2px solid red";
			}
			if (concept_data[concept_names[i]].response.value =="Unknown"){

				__$(element_id_prefix+"_unk").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_no").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_yes").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_unk").style.border ="2px solid red";
			}
	}

}
function hivStatus(encounter_data){

	var concept_names = Object.keys(encounter_data);

	for(var i = 0 ; i < concept_names.length ; i++){

		var status = encounter_data[concept_names[i]].response.value.toLowerCase();

		if(status=="r"){

			__$("r").style.border ="2px solid #ffffff";

			__$("nr").style.border ="2px solid #ffffff";

			__$(status).style.border ="2px solid red";

		}
		if(status=="nr"){

			__$("r").style.border ="2px solid #ffffff";

			__$("nr").style.border ="2px solid #ffffff";

			__$(status).style.border ="2px solid red";
			
		}

	}

}

function vdrlStatus(encounter_data){

	var concept_names = Object.keys(encounter_data);

	for(var i = 0 ; i < concept_names.length ; i++){

		var status = encounter_data[concept_names[i]].response.value.toLowerCase();

		__$("vdrlr").style.border ="2px solid #ffffff";

		__$("vdrlnr").style.border ="2px solid #ffffff";

		__$("vdrlu").style.border ="2px solid #ffffff";

		__$("vdrl"+status).style.border ="2px solid red";
	

	}
}

function medicalSurgicalHistory(encounter_data){

	var concept_names = Object.keys(encounter_data);

	for(var i = 0; i < concept_names.length ; i++){

			var element_id_prefix = concept_names[i].replace("History of"," ");

			element_id_prefix = element_id_prefix.replace("?","").trim().toLowerCase();

			element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");

			element_id_prefix = element_id_prefix.replace("/","").replace("__","_");
			
			if (encounter_data[concept_names[i]].response.value=="Yes"){

				__$(element_id_prefix+"_unk").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_no").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_yes").style.border ="2px solid red";
			}
			if (encounter_data[concept_names[i]].response.value =="No"){
				__$(element_id_prefix+"_unk").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_no").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_yes").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_no").style.border ="2px solid red";
			}
			if (encounter_data[concept_names[i]].response.value =="Unknown"){

				__$(element_id_prefix+"_unk").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_no").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_yes").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_unk").style.border ="2px solid red";
			}
			
		}

}

function preIctalWarning(encounter_data){

	var concept_names = Object.keys(encounter_data);

	for(var i = 0; i < concept_names.length ; i++){

		var element_id_prefix = concept_names[i].replace("-","_");

		element_id_prefix = element_id_prefix.replace("?","").trim().toLowerCase();

		element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");

		element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

			if (encounter_data[concept_names[i]].response.value=="Yes"){


				__$(element_id_prefix+"_unk").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_no").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_yes").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_yes").style.border ="2px solid red";
			}
			if (encounter_data[concept_names[i]].response.value =="No"){

				__$(element_id_prefix+"_unk").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_no").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_yes").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_no").style.border ="2px solid red";
			}
			if (encounter_data[concept_names[i]].response.value =="Unknown"){

				__$(element_id_prefix+"_unk").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_no").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_yes").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_unk").style.border ="2px solid red";
			}	
			

	}
}

function postIctaFeatures(encounter_data){

	var concept_names = Object.keys(encounter_data);

	for(var i = 0; i < concept_names.length ; i++){

			var element_id_prefix = concept_names[i].replace("a post-ictal feature?"," ");

			element_id_prefix = element_id_prefix.replace("?","").trim().toLowerCase();

			element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
			element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

			element_id_prefix = element_id_prefix.replace("/","").replace("__","_");
			
			if (encounter_data[concept_names[i]].response.value=="Yes"){


				__$(element_id_prefix+"_no").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_yes").style.border ="2px solid red";
			}
			if (encounter_data[concept_names[i]].response.value =="No"){

				__$(element_id_prefix+"_yes").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_no").style.border ="2px solid red";
			}
			
	}

}

function triggers(encounter_data){

	var concept_names = Object.keys(encounter_data);

	for(var i = 0; i < concept_names.length ; i++){

			var element_id_prefix = concept_names[i].replace("a trigger?"," ");

			element_id_prefix = element_id_prefix.replace("?","").trim().toLowerCase();

			element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
			element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

			element_id_prefix = element_id_prefix.replace("/","").replace("__","_");
			
			if (encounter_data[concept_names[i]].response.value=="Yes"){


				__$(element_id_prefix+"_no").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_yes").style.border ="2px solid red";
			}
			if (encounter_data[concept_names[i]].response.value =="No"){

				__$(element_id_prefix+"_yes").style.border ="2px solid #ffffff";

				__$(element_id_prefix+"_no").style.border ="2px solid red";
			}
			
	}

}

function epilepsyPatientOverview(encounter_data){

	var concept_names = Object.keys(encounter_data);

	for(var i = 0; i < concept_names.length; i++){

		var element_id_prefix = concept_names[i].trim().toLowerCase();

		element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
		element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

		element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

		if(concept_names[i] =="Exposures"){

			var exposures = encounter_data[concept_names[i]].response.value.split(",");

			for(var j = 0; j < exposures.length ; j++){

				
				var element_id_prefix = exposures[j].trim().toLowerCase()
				element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
				element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

				element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

				element_id_prefix = element_id_prefix+"_exposures";
				
				__$(element_id_prefix).style.background ="red"				

			}

			continue;

		}
		if(concept_names[i] =="Complications"){

			var complications = encounter_data[concept_names[i]].response.value.split(",");

			for(var j = 0; j < complications.length ; j++){

				var element_id_prefix = complications[j].trim().toLowerCase()
				element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
				element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

				element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

				element_id_prefix = element_id_prefix+"_complications";


				
				__$(element_id_prefix).style.background ="red"				

			}

			continue;

		}
		if(concept_names[i] =="Other Exposures Specify" || concept_names[i] =="Other Complications Specify"){

			continue;

		}
	
		__$(element_id_prefix).innerHTML= encounter_data[concept_names[i]].response.value;

	}

}

function getAge(birthDate,dateOnset) {
  var now = dateOnset;

  function isLeap(year) {

    return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);

  }
   
  var days = Math.floor((now.getTime() - birthDate.getTime())/1000/60/60/24);

  var age = 0;

  for (var y = birthDate.getFullYear(); y <= now.getFullYear(); y++){

    var daysInYear = isLeap(y) ? 366 : 365;

    if (days >= daysInYear){

      days -= daysInYear;

      age++;
      
    }

  }

  return age;

}


function setAgeOnSet(date){

	var data = window.parent.dashboard.data.data;

	var birthDate = new Date(data.birthdate);
	
	var dateOnset = new Date(date);

	__$("age_at_onset").innerHTML = getAge(birthDate,dateOnset);

}

function patientIsANC(){

	var patient_is_female = false;

	if(window.parent.dashboard && window.parent.dashboard.data && window.parent.dashboard.data.data) {

        if(window.parent.dashboard.data.data.gender == "F") {
        	
        	var now = new Date();

        	var birthdate = new Date(window.parent.dashboard.data.data.birthdate);

        	var age = getAge(birthdate,now);

        	if(age >=13 && age <= 50){

        		patient_is_female = true;

        	}

        }

    }

    return patient_is_female;

}


function patientHistoryAtEnrollment(encounter_data){

	var concept_names = Object.keys(encounter_data);

	for(var i = 0 ; i < concept_names.length; i++){
		
		var element_id_prefix = concept_names[i].trim().toLowerCase();

		element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
		element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

		element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

		__$(element_id_prefix).innerHTML = encounter_data[concept_names[i]].response.value;

		if(element_id_prefix =="date_of_onset"){

			setAgeOnSet(encounter_data[concept_names[i]].response.value)
		}

	}

}

function epilepsyOutCome(encounter_data){

	var concept_names = Object.keys(encounter_data);

	for(var i = 0 ; i < concept_names.length; i++){
		
		var element_id_prefix = concept_names[i].trim().toLowerCase();

		element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
		element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

		element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

		if(element_id_prefix =="outcome_date" || element_id_prefix =="notes"){

			__$(element_id_prefix).innerHTML = encounter_data[concept_names[i]].response.value;

		}
		else{

			element_id_prefix =  encounter_data[concept_names[i]].response.value.trim().toLowerCase();

			element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
			element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

			element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

			__$(element_id_prefix).style.border = "1px dotted red";

			__$(element_id_prefix).style.background = "#96d384";

		}

	}



}
function epilepsyVisits(encounter_data,visitDate){

	

	var visitRow = {
		"Visit Date": (new Date(visitDate)).format(),
        "Weight (kg)": "",
        "BMI":"",
        "Seizure since last visit?": "",
        "NUMBER OF SEIZURES": "",
        "Any Triggers":"",
        "Alcohol a trigger?":"",
        "Sleep deprivation / Overtiredness a trigger?":"",
        "Missed medication a trigger?":"",
        "Sound /Light /Touch a trigger?":"",
        "Fever a trigger?":"",
        "Stress a trigger?":"",
        "Menstruation a trigger?":"",
        "Toungue bitting a silent marker?":"",
        "Incontinence bitting a silent marker?":"",
        "Hospitalized since a last visit?":"",
        "Is patient pregnant?":"",
        "On family planing?":"",
        "Carbamazepine" :"",
        "Phenobarbitone" :"",
        "Phenytoin" : "",
        "Sodium valproate" : "",
        "Other":"",
        "Next Appointment Date" :"",
        "Comments" :""

	}	
	var weight,height;

	for(var i = 0 ; i < encounter_data.length ; i++){

		var concept = Object.keys(encounter_data[i]);
		

		if(concept[0]=="Weight (kg)"){

			weight = encounter_data[i][concept[0]].response.value;

		}
		if(concept[0]=="Height (cm)"){



			height = encounter_data[i][concept[0]].response.value;

			continue;

		}

		visitRow[concept[0]] = encounter_data[i][concept[0]].response.value;

	}

	

	if(weight && height) {

                var bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);

                visitRow["BMI"] = bmi;

     }

	visitRows.push(visitRow);
}

function drawResponse(encounter,encounter_data,visit){

	if(encounter=="EPILEPSY VISIT"){
		
		epilepsyVisits(encounter_data,visit);

		return;

	}

	if(encounter == "EPILEPSY INITIAL QUESTIONS"){

		  var date = new Date(visit).format();

		__$("transfer_in_date").innerHTML = date;

		return;

	}

	for(var i = 0 ; i < encounter_data.length ; i++){
			
			var concepts = Object.keys(encounter_data[i]);


			switch (encounter) {



				case "SEIZURE TYPE":
					for( var j = 0; j < concepts.length ; j++ ){

						seizureType(encounter_data[i][concepts[j]].response.value);

					}

					break;

				case "PATIENT HISTORY AT ENROLMENT":

					patientHistoryAtEnrollment(encounter_data[i]);

					break;
				case "FAMILY HISTORY":

					familyHistory(encounter_data[i]);

					break;

				case "HIV/ART STATUS":

					hivStatus(encounter_data[i]);

					break;
				case "VDRL STATUS":

					vdrlStatus(encounter_data[i]);

					break;

				case "PATIENT HISTORY AT ENROLMENT":

					break;

				case "MEDICAL AND SURGICAL HISTORY":

					medicalSurgicalHistory(encounter_data[i]);

					break;

				case "PRE-ICTAL WARNING":

					preIctalWarning(encounter_data[i]);

					break;

				case "POST-ICTAL FEATURES":

					postIctaFeatures(encounter_data[i]);

					break;

				case "TRIGGERS":

					triggers(encounter_data[i]);

					break;

				case "EPILEPSY PATIENT OVERVIEW":

					epilepsyPatientOverview(encounter_data[i]);

					break;

				case "EPILEPSY VISIT":

					//epilepsyVisits(encounter_data[i],visit);

					break;

				case "UPDATE OUTCOME":

					epilepsyOutCome(encounter_data[i],visit);

					break;
				
			}
		
	}

}

function loadCardDashboard(){
	var data = window.parent.dashboard.data.data;

	var id_keys = Object.keys(data.identifiers)

	__$("ncd_reg_no").innerHTML = data.identifiers[id_keys[0]].identifier;

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


    //Gardian Data

    var guardain = data.relationships;
    
    if(guardain.length > 0){

   		__$("guardian_name").innerHTML = guardain[0].relative_name;	

   		__$("relation_to_patient").innerHTML =  guardain[0].relative_type;
   	}


   //Program data

	var patient_programs = window.parent.dashboard.data.data.programs["EPILEPSY PROGRAM"].patient_programs;

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

	//Visits Table
	for(var i = 0 ; i < visitRows.length; i++){

		var concept_keys = Object.keys(visitRows[i]);

		var tr = document.createElement("tr");

		var height, weight;


		for(var j = 0 ; j < concept_keys.length ; j++){

			var td = document.createElement("td");

			td.innerHTML = visitRows[i][concept_keys[j]];
			
			tr.appendChild(td);

		}



		__$("visit_body").appendChild(tr);


	}

}

