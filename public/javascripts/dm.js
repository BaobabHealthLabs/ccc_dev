/**
 * Created by chimwemwe on 6/23/16.
 */

"use strict"

if (Object.getOwnPropertyNames(HTMLCollection.prototype).indexOf("map") < 0) {

    Object.defineProperty(HTMLCollection.prototype, "map", {
        value: function () {
            var array = this;

            var newArray = [];

            for(var i = 0; i < array.length; i++) {

                newArray.push(array[i].innerHTML);

            }

            return newArray;
        }
    });

}

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

function existingDiabetesPatient() {

    var existing = false;

    if(window.parent.dashboard && window.parent.dashboard.data && window.parent.dashboard.data.data) {

        if(window.parent.dashboard.queryAnyExistingEncounters("DIABETES PROGRAM", "DIABETES INITIAL QUESTIONS")) {

            existing = true;

        } else {

            existing = false;

            if(!__$("data.create_clinic_number") && !window.parent.dashboard.data["data"]["identifiers"][
                window.parent.dashboard.modules[window.parent.dashboard.getCookie("currentProgram")].identifiers[1]] ||
                (window.parent.dashboard.data["data"]["identifiers"][window.parent.dashboard.modules[
                    window.parent.dashboard.getCookie("currentProgram")].identifiers[1]] &&
                    !window.parent.dashboard.data["data"]["identifiers"][window.parent.dashboard.modules[
                        window.parent.dashboard.getCookie("currentProgram")].identifiers[1]].identifier)) {

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

function loadMultipleYears(years) {

    var collection = years.split(";");

    for(var i = 0; i < collection.length; i++) {

        var id = collection[i].trim().toLowerCase().replace(/\s/g, "_");

        if(__$(id)) {

            loadYears(id);

        }

    }

}

function showBloodPressureGraphs() {

    var displayTextBP;

    displayTextBP = 'Blood Pressure Graph';
    displayTextBP += '<div id="weightHistory"></div>';
    displayTextBP += '<div id="graphholder" style="width: 950px; position: relative; height: 550px;"> </div>';
    __$('tt_page_blood_pressure_graph').innerHTML = '<div id="summary">' + displayTextBP + '</div>';

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



}