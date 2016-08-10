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
function loadYears(id){

    if(__$(id)) {

        __$(id).innerHTML = "";

        __$(id).removeAttribute("disabled");

        var endYear = 1950;

        if(window.parent.dashboard && window.parent.dashboard.data && window.parent.dashboard.data.data) {

            var year = (new Date(window.parent.dashboard.data.data.birthdate)).getFullYear()

            if(!isNaN(year)) {

                endYear = year;

            }

        }

        for(var i = (new Date()).getFullYear(); i > endYear; i--) {

            var opt = document.createElement("option");
            
            opt.innerHTML = i;

            __$(id).appendChild(opt);

        }

    }

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

function loadVisits(visit_dates){

    var visit_dates = Object.keys(visit_dates);

    var dashboard = window.parent.dashboard;

    for (var i = 0; i < visit_dates.length; i++) {

        var visit_row = {

                "Visit Date": (new Date(visit_dates[i])).format("YYYY-mm-dd"),
                "Weight (kg)": "",
                "BMI":"",
                "BP":"",
                "PR":"",
                "Fasting":"",
                "Random":"",
                "alcohol":"",
                "# of F/V portions":"",
                "exercise / wk of 30 min":"",
                "CV Risk %":"",
                "Neuropathy / PVD":"",
                "Deformities" :"",
                "Ulcers":"",
                "Long acting":"",
                "Short acting":"",
                "M":"",
                "G":"",
                "Diuretic":"",
                "CCB":"",
                "ACE-I":"",
                "BB":"",
                "Other Treatment":"",
                "Comments" :"",
                "Next Appointment Date" :""
            }

            var weight = window.parent.dashboard.queryActiveObs("CROSS-CUTTING PROGRAM",(new Date(visit_dates[i])).format("YYYY-mm-dd"),"VITALS","Weight (kg)");

            visit_row["Weight (kg)"] = weight;

            var height = window.parent.dashboard.queryActiveObs("CROSS-CUTTING PROGRAM",(new Date(visit_dates[i])).format("YYYY-mm-dd"),"VITALS","Height (cm)");
            
            if(weight && height) {

                var bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);

                visit_row["BMI"] = bmi;

            }

            var sp = dashboard.queryActiveObs("CROSS-CUTTING PROGRAM",(new Date(visit_dates[i])).format("YYYY-mm-dd"),"VITALS","Systolic blood pressure");

            var dp = dashboard.queryActiveObs("CROSS-CUTTING PROGRAM",(new Date(visit_dates[i])).format("YYYY-mm-dd"),"VITALS","Diastolic blood pressure");
           
            if(sp && dp ){

                 visit_row["BP"] = sp+"/"+dp;

            }
           

            var fasting = dashboard.queryActiveObs("CROSS-CUTTING PROGRAM",(new Date(visit_dates[i])).format("YYYY-mm-dd"),"LAB RESULTS","Fasting Blood Sugar Value");

            var random = dashboard.queryActiveObs("CROSS-CUTTING PROGRAM",(new Date(visit_dates[i])).format("YYYY-mm-dd"),"LAB RESULTS","Random Blood Sugar Value");

            if(fasting){

                visit_row["Fasting"] = fasting;

            }

            if(random){

                visit_row["Random"] = random;

            }
         

            visitRows.push(visit_row);
        

    }

}

function loadCardDashboard(){
    var data = window.parent.dashboard.data.data;

    var id_keys = Object.keys(data.identifiers)

    __$("ncd_reg_no").innerHTML = data.identifiers["HTN Number"].identifier;

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

   


    /*Address*/
    var address = data.addresses[0]["Current District"] +"\tDistrict, TA\t"
                +data.addresses[0]["Current T/A"]+",\t"+data.addresses[0]["Current Village"]+"\tvillage";

    __$("address").innerHTML = address;     

    //HIV ART Status
    hivStatus(data.programs["CROSS-CUTTING PROGRAM"].patient_programs);


    //Gardian Data

    var guardain = data.relationships;
    
    if(guardain.length > 0){

        __$("guardian_name").innerHTML = guardain[0].relative_name; 

        __$("relation_to_patient").innerHTML =  guardain[0].relative_type;
    }


    var visit_dates  = {};

    var programs  = data.programs

    var patient_program_keys = Object.keys(programs);


    for(var i = 0 ; i < patient_program_keys.length ; i++){

        var program_data_key = Object.keys(programs[patient_program_keys[i]].patient_programs);


        var visit_keys = Object.keys(programs[patient_program_keys[i]].patient_programs[program_data_key[0]]["visits"]);

        for(var j = 0 ; j < visit_keys.length ; j ++){

            visit_dates[visit_keys[j]] = visit_keys[j];

        }

        

    }

    loadVisits(visit_dates);

    for(var i = 0 ; i < visitRows.length; i++){

        var concept_keys = Object.keys(visitRows[i]);

        var tr = document.createElement("tr");

        var height, weight;


        for(var j = 0 ; j < concept_keys.length ; j++){

            if(concept_keys[j]=="BMI"){

                var td = document.createElement("td");

                if(visitRows[i][concept_keys[j]] < 19){

                        td.innerHTML = "<span class='circle' style='border:2px solid red' >U</span>";

                }
                else{

                     td.innerHTML = "<span class='circle'>U</span>";


                }

                tr.appendChild(td);


                td = document.createElement("td");

                if(visitRows[i][concept_keys[j]] >= 19 && visitRows[i][concept_keys[j]] < 25){

                        td.innerHTML = "<span class='circle' style='border:2px solid red' >N</span>";

                }
                else{

                     td.innerHTML = "<span class='circle'>N</span>";


                }
                tr.appendChild(td);

                td = document.createElement("td");

                if(visitRows[i][concept_keys[j]] >= 25){

                        td.innerHTML = "<span class='circle' style='border:2px solid red' >O</span>";

                }
                else{

                     td.innerHTML = "<span class='circle'>O</span>";


                }
                tr.appendChild(td);

                continue;

            }
            if(concept_keys[j]=="Next Appointment Date"){

                var td = document.createElement("td");

                console.log(visitRows[i]["Visit Date"]);

                td.innerHTML =  window.parent.dashboard.queryActiveObs("HYPERTENSION PROGRAM",visitRows[i]["Visit Date"],"APPOINTMENT","Appointment date");
                
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