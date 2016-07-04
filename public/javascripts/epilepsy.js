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

function loadCheckConditions(){

	var opts = __$("touchscreenInput" + tstCurrentPage).value.split(";");

	var all_page_options = ["Smoking","Alcohol","Pigs/pork",
							"Traditional medicine","Other",
							"Injuries","Burns","Status Epilepticus","Psychosis","Drug Related"];
							

	for(var i = 0; i < all_page_options.length; i++){

		var element_id = all_page_options[i].trim().toLowerCase().replace("/","_").replace(/\s+/g,"_");


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

function loadCardData(){
	var id = window.location.href.match(/\/([^\/]+)$/)[1];

	ajaxRequest("/card_p_demographics/"+id,function(json){
		if (__$("patient_name")) {

            __$("patient_name").innerHTML = json.name;

        }
        if(json.gender == "M"){
        	if(__$("male")){
        		__$("male").style.border ="2px solid red";
        	}
        }
        else if(json.gender == "F"){
        	if(__$("female")){
        		__$("female").style.border ="2px solid red";
        	}
        }
        if(json.dob !="null"){
        	if(__$("dob")){
        		__$("dob").innerHTML=json.dob;
        	}
        }
	});
	ajaxRequest("/card_seizure_type/"+id,function(json){

		var response_id_hash ={}

		var type = ["Tonic Clonic","Absence","Myclonic","Clonic","Tonic","Atonic","Simplex","Complex","Unclassified"]
		
		for(var i = 0; i <type.length;i++ ){

			var element_id = type[i].trim().toLowerCase().replace("/","_").replace(/\s+/g,"_")+"_no";
			
			if(__$(element_id)){

				__$(element_id).style.border ="2px solid red";

			}

			response_id_hash[type[i]] = type[i].trim().toLowerCase().replace("/","_").replace(/\s+/g,"_");
		}

		for(var i = 0; i < json.length; i++){

			var element_id = json[i].value_text.trim().toLowerCase().replace("/","_").replace(/\s+/g,"_")+"_yes";
			
			if(__$(element_id)){

				__$(element_id).style.border ="2px solid red";

				__$(element_id.replace("_yes","_no")).style.border ="1px solid #ffffff";

			}
		}
	});

	ajaxRequest("/card_epilepsy_family_history/"+id,function(json){

		for(var i = 0; i < json.length ; i++){

			var element_id_prefix = json[i].name.replace("Family History of"," ").replace("?","").trim().toLowerCase().replace("/","_").replace(/\s+/g,"_");

			if (json[i].value_text =="Yes"){

				__$(element_id_prefix+"_yes").style.border ="2px solid red";
			}
			if (json[i].value_text =="No"){

				__$(element_id_prefix+"_no").style.border ="2px solid red";
			}
			if (json[i].value_text =="Unknown"){

				__$(element_id_prefix+"_unk").style.border ="2px solid red";
			}
		}

	});

	ajaxRequest("/card_epilepsy_hiv_status/"+id,function(json){
		var status = json.value_text.toLowerCase();

		if(status=="r"){

			__$(status).style.border ="2px solid red";

		}
		if(status=="nr"){

			__$(status).style.border ="2px solid red";
			
		}
		if(status=="u"){

			__$(status).style.border ="2px solid red";
			
		}
		if(status=="vdrl"){

			__$(status).style.border ="2px solid red";
			
		}


	});

	ajaxRequest("/card_epilepsy_patient_history/"+id,function(json){

		for (var i = json.length - 1; i >= 0; i--) {
	
			var element_id = json[i].name.trim().toLowerCase().replace("/","_").replace(/\s+/g,"_");
			if(__$(element_id)){

				__$(element_id).innerHTML = json[i].value_text;

			}
		}

	});

	ajaxRequest("/card_epilepsy_medical_surgical_history/"+id,function(json){

		for(var i = 0; i < json.length ; i++){

			var element_id_prefix = json[i].name.replace("History of"," ");

			element_id_prefix = element_id_prefix.replace("?","").trim().toLowerCase();

			element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");

			element_id_prefix = element_id_prefix.replace("/","").replace("__","_");
			
			if (json[i].value_text =="Yes"){

				__$(element_id_prefix+"_yes").style.border ="2px solid red";
			}
			if (json[i].value_text =="No"){

				__$(element_id_prefix+"_no").style.border ="2px solid red";
			}
			if (json[i].value_text =="Unknown"){

				__$(element_id_prefix+"_unk").style.border ="2px solid red";
			}
		}

	});

	ajaxRequest("/card_epilepsy_triggers/"+id,function(json){

		for(var i = 0; i < json.length ; i++){

			var element_id_prefix = json[i].name.replace("a trigger"," ");

			element_id_prefix = element_id_prefix.replace("?","").trim().toLowerCase();

			element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
			element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

			element_id_prefix = element_id_prefix.replace("/","").replace("__","_");
			
			if (json[i].value_text =="Yes"){

				__$(element_id_prefix+"_yes").style.border ="2px solid red";
			}
			if (json[i].value_text =="No"){

				__$(element_id_prefix+"_no").style.border ="2px solid red";
			}
			if (json[i].value_text =="Unknown"){

				__$(element_id_prefix+"_unk").style.border ="2px solid red";
			}
		}

	});

	ajaxRequest("/card_epilepsy_post_ictal_features/"+id,function(json){

		for(var i = 0; i < json.length ; i++){

			var element_id_prefix = json[i].name.replace("a post-ictal feature?"," ");

			element_id_prefix = element_id_prefix.replace("?","").trim().toLowerCase();

			element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
			element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

			element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

			
			if (json[i].value_text =="Yes"){

				__$(element_id_prefix+"_yes").style.border ="2px solid red";
			}
			if (json[i].value_text =="No"){

				__$(element_id_prefix+"_no").style.border ="2px solid red";
			}
			if (json[i].value_text =="Unknown"){

				__$(element_id_prefix+"_unk").style.border ="2px solid red";
			}
		}

	});

	

	ajaxRequest("/card_epilepsy_patient_overvew/"+id+"/Exposures",function(json){

			
			var concept = json.name;


			var options = json.value_text.split(",");

			for (var i = options.length - 1; i >= 0; i--) {

					var element_id_prefix = options[i];

					element_id_prefix = element_id_prefix.replace("?","").trim().toLowerCase();

					element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
					element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

					element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

					if(concept =="Exposures"){

						element_id_prefix = element_id_prefix+"_exposures";
						__$(element_id_prefix).style.border ="2px solid red";
					}
					if(concept =="Complications"){

						element_id_prefix = element_id_prefix+"_complications";
						__$(element_id_prefix).style.border ="2px solid red";
					}

			}

	});

	ajaxRequest("/card_epilepsy_patient_overvew/"+id+"/Complications",function(json){

			
			var concept = json.name;


			var options = json.value_text.split(",");

			for (var i = options.length - 1; i >= 0; i--) {

					var element_id_prefix = options[i];

					element_id_prefix = element_id_prefix.replace("?","").trim().toLowerCase();

					element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
					element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

					element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

					if(concept =="Exposures"){

						element_id_prefix = element_id_prefix+"_exposures";
						__$(element_id_prefix).style.border ="2px solid red";
					}
					if(concept =="Complications"){

						element_id_prefix = element_id_prefix+"_complications";
						__$(element_id_prefix).style.border ="2px solid red";
					}

			}

	});

	ajaxRequest("/card_epilepsy_patient_overvew/"+id,function(json){

		for (var i = json.length - 1; i >= 0; i--) {

			var element_id_prefix = json[i].name;

			element_id_prefix = element_id_prefix.replace("?","").trim().toLowerCase();

			element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
			element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

			element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

			__$(element_id_prefix).innerHTML = json[i].value_text;
			

		}

	});

	var visits = ["Visit Date","Weight (Kg)","BMI","Seizure since last visit",""]

	ajaxRequest("/card_epilepsy_visits/"+id,function(json){

		var tbody = __$("visits").getElementsByTagName("tbody");



	});
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

			__$(status).style.border ="2px solid red";

		}
		if(status=="nr"){

			__$(status).style.border ="2px solid red";
			
		}
		if(status=="u"){

			__$(status).style.border ="2px solid red";
			
		}
		if(status=="vdrl"){

			__$(status).style.border ="2px solid red";
			
		}

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

function epilepsyVisits(encounter_data,visitDate){

	

	var visitRow = {
		"Visit Date": (new Date(visitDate)).format(),
        "Weight (kg)": "",
        "BMI":"",
        "Seizure since last visit": "",
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

	for(var i = 0 ; i < encounter_data.length ; i++){
			
			var concepts = Object.keys(encounter_data[i]);


			switch (encounter) {

				case "SEIZURE TYPE":
					for( var j = 0; j < concepts.length ; j++ ){

						seizureType(encounter_data[i][concepts[j]].response.value);

					}

					break;
				case "FAMILY HISTORY":

					familyHistory(encounter_data[i]);

					break;

				case "HIV/ART STATUS":

					hivStatus(encounter_data[i]);

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

