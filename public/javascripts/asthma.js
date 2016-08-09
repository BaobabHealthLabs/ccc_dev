"use strict"
var visitRows = [];

var checked_checkbox = "data:image/gif;base64,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";


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
function setDate(element){

	var date = (new Date()).format();


	__$(element).value = date;

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

        if(window.parent.dashboard.queryAnyExistingEncounters("ASTHMA PROGRAM", "ASTHMA INITIAL QUESTIONS")) {

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

					var response = encounter_data[concept_names[i]].response.value.split(",");
		  

					if(response.indexOf("COPD") >= 0){

                        var span = __$("copd")

                        span.removeAttribute("class");

                        var img = document.createElement("img");

                        img.style.height = "23px";

                        img.style.width = "23px";

                        img.style.float ="right";

                        img.src = checked_checkbox;

                        span.appendChild(img);

					}

					if(response.indexOf("Asthma") >=0){

                        var span = __$("asthma")

                        span.removeAttribute("class");

                        var img = document.createElement("img");

                        img.style.height = "23px";

                        img.style.width = "23px";

                        img.style.float ="right";

                        img.src = checked_checkbox;

                        span.appendChild(img);

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

						var element_id_prefix = concept_names[i].trim().toLowerCase();

						element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
						element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

						element_id_prefix = element_id_prefix.replace("/","").replace("__","_").replace("?","");


						__$(element_id_prefix).innerHTML = encounter_data[concept_names[i]].response.value;						

					break;

				case "Family History of COPD?":

						var element_id_prefix = concept_names[i].trim().toLowerCase();

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
						
						//__$(element_id_prefix).style.background = "red";

						if(__$(element_id_prefix)){

		                        var element = __$(element_id_prefix);

		                        element.removeAttribute("class");

		                        var img = document.createElement("img");

		                        img.style.height = "23px";

		                        img.style.width = "23px";

		                        img.style.float ="right";

		                        img.src = checked_checkbox;

		                        element.appendChild(img);

		                 }

					 }

					break;
				case "Chronic dry cough duration":

						var element_id_prefix = concept_names[i].trim().toLowerCase()
						element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
						element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

						element_id_prefix = element_id_prefix.replace("/","").replace("__","_").replace("?","");

						
						__$(element_id_prefix).innerHTML = encounter_data[concept_names[i]].response.value;

					break;

				case "Chronic dry cough Age onset":
						

						var element_id_prefix = concept_names[i].trim().toLowerCase()
						element_id_prefix= element_id_prefix.replace("/","_").replace(/\s+/g,"_");
			
						element_id_prefix = element_id_prefix.replace("/","").replace("__","_");

						element_id_prefix = element_id_prefix.replace("/","").replace("__","_").replace("?","");

						
						__$(element_id_prefix).innerHTML = encounter_data[concept_names[i]].response.value;
						
					break;

		}


	}

}

function asthmaVisits(encounter_data,visitDate){

	var visitRow = {
		"Visit Date": (new Date(visitDate)).format(),
		"Planned Visit?":"",
        "Weight (kg)": "",
        "Day sx":"",
        "Night sx": "",
        "Beta-agonist inhaler use: frequency": "",
        "Steroid inhaler daily?":"",
        "Number of cigarette per day?":"",
        "Passive smoking?":"",
        "Indoor cooking?":"",
        "Exacerbation today?":"",
        "Asthma severity":"",
        "Treatment":"",
        "Other Treatment Specify":"",
        "Physical system comment":"",
        "Next Appointment":""

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
		if(concept[0]=="Smoke?"){

			continue;

		}

		visitRow[concept[0]] = encounter_data[i][concept[0]].response.value;

	}

	
	visitRows.push(visitRow);

}

function drawResponse(encounter,encounter_data,visit){

	if(encounter=="ASTHMA VISIT"){
		
		asthmaVisits(encounter_data,visit);

		return;

	}

	if(encounter == "ASTHMA INITIAL QUESTIONS"){

		  var date = new Date(visit).format();

		__$("transfer_in_date").innerHTML = date;

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

function hivStatus(patient_programs){
		

		var patient_program_keys = Object.keys(patient_programs);


		for(var i = 0 ; i < patient_program_keys.length; i++){

			var visits = Object.keys(patient_programs[patient_program_keys[i]]["visits"]).sort(function (a, b) {
                        return (new Date(b)) - (new Date(a))
                    });
			
		
				for (var j = visits.length - 1; j >= 0; j--) {

					var encounters = Object.keys(patient_programs[patient_program_keys[i]]["visits"][visits[j]]);

					for (var k = encounters.length - 1; k >= 0; k--) {

						if(encounters[k] == "HIV/ART STATUS"){

							var concepts = patient_programs[patient_program_keys[i]]["visits"][visits[j]][encounters[k]];

							for (var l = concepts.length - 1; l >= 0; l--) {

								var element_id = Object.keys(concepts[l])[0].toLowerCase();

								element_id= element_id.replace("/","_").replace(/\s+/g,"_");
			
								element_id = element_id.replace("/","").replace("__","_");

								element_id = element_id.replace("/","").replace("__","_");


								if(element_id == "hiv_status"){

									var status = concepts[l][Object.keys(concepts[l])[0]].response.value;

									console.log(status);

									if(status=="Reactive"){

										__$("r").style.border ="2px solid #ffffff";

										__$("nr").style.border ="2px solid #ffffff";

										__$("r").style.border ="2px solid red";

									}
									if(status=="Non-Reactive"){

									 	__$("r").style.border ="2px solid #ffffff";

										__$("nr").style.border ="2px solid #ffffff";

										__$("nr").style.border ="2px solid red";
	
									}

								}

								if(__$(element_id)){

									if(element_id =="date_antiretrovirals_started"){
										
										__$(element_id).innerHTML = new Date(concepts[l][Object.keys(concepts[l])[0]].response.value).format();

									}

									else{

										__$(element_id).innerHTML = concepts[l][Object.keys(concepts[l])[0]].response.value;

									}

								}
									
							}

						}

					}

				}
		
		}
	

}

function loadCardDashboard(){
	var data = window.parent.dashboard.data.data;

	var id_keys = Object.keys(data.identifiers)

	__$("ncd_reg_no").innerHTML = data.identifiers["AST Number"].identifier;

	if(__$("year")){

		__$("year").innerHTML  = (new Date()).getFullYear();

	}


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

   	//HIV ART Status
    hivStatus(data.programs["CROSS-CUTTING PROGRAM"].patient_programs);

    //Program Data

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


	//Visits Table
	for(var i = 0 ; i < visitRows.length; i++){

		var concept_keys = Object.keys(visitRows[i]);

		var tr = document.createElement("tr");

		var height, weight;


		for(var j = 0 ; j < concept_keys.length ; j++){

            console.log(concept_keys[j]);

			if(concept_keys[j]=="Weight (kg)"){

				var td = document.createElement("td");

				console.log(visitRows[i]["Visit Date"]);

				td.innerHTML =  window.parent.dashboard.queryActiveObs("CROSS-CUTTING PROGRAM", visitRows[i]["Visit Date"],"VITALS","Weight (kg)");
				
				tr.appendChild(td);

				continue;

			}

			
			var response = visitRows[i][concept_keys[j]];
			
			if(concept_keys[j]=="Beta-agonist inhaler use: frequency"){

				

				var td = document.createElement("td");

				var span  = document.createElement("span");

				span.setAttribute("class", "square");

				if(response =="day"){


                    span.removeAttribute("class");

                    var img = document.createElement("img");

                    img.style.height = "23px";

                    img.style.width = "23px";

                    img.style.float ="right";

                    img.src = checked_checkbox;

                    span.appendChild(img);

				}

				td.appendChild(span);


				tr.appendChild(td);

				td = document.createElement("td");

				var span  = document.createElement("span");

				span.setAttribute("class", "square");

				if(response =="wk"){


                    span.removeAttribute("class");

                    var img = document.createElement("img");

                    img.style.height = "23px";

                    img.style.width = "23px";

                    img.style.float ="right";

                    img.src = checked_checkbox;

                    span.appendChild(img);

				}

				td.appendChild(span);

				tr.appendChild(td);

				td = document.createElement("td");

				var span  = document.createElement("span");

				span.setAttribute("class", "square");

				if(response =="mo"){


                    span.removeAttribute("class");

                    var img = document.createElement("img");

                    img.style.height = "23px";

                    img.style.width = "23px";

                    img.style.float ="right";

                    img.src = checked_checkbox;

                    span.appendChild(img);

				}

				td.appendChild(span);

				tr.appendChild(td);

				td = document.createElement("td");

				var span  = document.createElement("span");

				span.setAttribute("class", "square");

				if(response =="year"){

				
                    span.removeAttribute("class");

                    var img = document.createElement("img");

                    img.style.height = "23px";

                    img.style.width = "23px";

                    img.style.float ="right";

                    img.src = checked_checkbox;

                    span.appendChild(img);

				}

				td.appendChild(span);

				tr.appendChild(td);

				continue;

			}

			if(concept_keys[j]=="Asthma severity"){

				var td = document.createElement("td");

				var span  = document.createElement("span");

				span.setAttribute("class", "square");

				if(response =="Not Asthma"){

					
                    span.removeAttribute("class");

                    var img = document.createElement("img");

                    img.style.height = "23px";

                    img.style.width = "23px";

                    img.style.float ="right";

                    img.src = checked_checkbox;

                    span.appendChild(img);

				}

				td.appendChild(span);

				tr.appendChild(td);

				td = document.createElement("td");

				var span  = document.createElement("span");

				span.setAttribute("class", "square");

				if(response =="Intemittent"){

				
                    span.removeAttribute("class");

                    var img = document.createElement("img");

                    img.style.height = "23px";

                    img.style.width = "23px";

                    img.style.float ="right";

                    img.src = checked_checkbox;

                    span.appendChild(img);

				}

				td.appendChild(span);

				tr.appendChild(td);

				td = document.createElement("td");

				var span  = document.createElement("span");

				span.setAttribute("class", "square");

				if(response =="Mild persistent"){


                    span.removeAttribute("class");

                    var img = document.createElement("img");

                    img.style.height = "23px";

                    img.style.width = "23px";

                    img.style.float ="right";

                    img.src = checked_checkbox;

                    span.appendChild(img);

                }

				td.appendChild(span);

				tr.appendChild(td);

				td = document.createElement("td");

				var span  = document.createElement("span");

				span.setAttribute("class", "square");

				if(response =="Mod persistent"){

				
                    span.removeAttribute("class");

                    var img = document.createElement("img");

                    img.style.height = "23px";

                    img.style.width = "23px";

                    img.style.float ="right";

                    img.src = checked_checkbox;

                    span.appendChild(img);

				}

				td.appendChild(span);

				tr.appendChild(td);

				td = document.createElement("td");

				var span  = document.createElement("span");

				span.setAttribute("class", "square");

				if(response =="Severe persistent"){


                    span.removeAttribute("class");

                    var img = document.createElement("img");

                    img.style.height = "23px";

                    img.style.width = "23px";

                    img.style.float ="right";

                    img.src = checked_checkbox;

                    span.appendChild(img);

                }

				td.appendChild(span);

				tr.appendChild(td);

				td = document.createElement("td");

				var span  = document.createElement("span");

				span.setAttribute("class", "square");

				if(response =="Uncontrolled"){


                    span.removeAttribute("class");

                    var img = document.createElement("img");

                    img.style.height = "23px";

                    img.style.width = "23px";

                    img.style.float ="right";

                    img.src = checked_checkbox;

                    span.appendChild(img);

                }

				td.appendChild(span);

				tr.appendChild(td);

				

				continue;

			}

			if(concept_keys[j]=="Treatment"){

				var td = document.createElement("td");

				var span  = document.createElement("span");

				span.setAttribute("class", "square");

				if(response =="Inhaled B-agonist"){

					
                    span.removeAttribute("class");

                    var img = document.createElement("img");

                    img.style.height = "23px";

                    img.style.width = "23px";

                    img.style.float ="right";

                    img.src = checked_checkbox;

                    span.appendChild(img);

				}

				td.appendChild(span);

				tr.appendChild(td);

				td = document.createElement("td");

				var span  = document.createElement("span");

				span.setAttribute("class", "square");

				if(response =="Inhaled steroid"){


                    span.removeAttribute("class");

                    var img = document.createElement("img");

                    img.style.height = "23px";

                    img.style.width = "23px";

                    img.style.float ="right";

                    img.src = checked_checkbox;

                    span.appendChild(img);

				}

				td.appendChild(span);

				tr.appendChild(td);

				td = document.createElement("td");

				var span  = document.createElement("span");

				span.setAttribute("class", "square");

				if(response =="Oral steroid"){


                    span.removeAttribute("class");

                    var img = document.createElement("img");

                    img.style.height = "23px";

                    img.style.width = "23px";

                    img.style.float ="right";

                    img.src = checked_checkbox;

                    span.appendChild(img);

                }

				td.appendChild(span);

				tr.appendChild(td);

				td = document.createElement("td");

				var span  = document.createElement("span");

				span.setAttribute("class", "square");

				if(response =="Other"){


                    span.removeAttribute("class");

                    var img = document.createElement("img");

                    img.style.height = "23px";

                    img.style.width = "23px";

                    img.style.float ="right";

                    img.src = checked_checkbox;

                    span.appendChild(img);

				}

				td.appendChild(span);

				tr.appendChild(td);

				continue;

			}

			if(concept_keys[j]=="Other Treatment Specify"){

				continue;

			}
		
            if(concept_keys[j]=="Next Appointment"){

                var td = document.createElement("td");

                td.innerHTML =  window.parent.dashboard.queryActiveObs("ASTHMA PROGRAM",visitRows[i]["Visit Date"],"APPOINTMENT","Appointment date");
                
                tr.appendChild(td);

                continue;

            }
			var td = document.createElement("td");
			td.innerHTML = visitRows[i][concept_keys[j]];
			tr.appendChild(td);

		}

		__$("visit_body").appendChild(tr);


	}

}