"use strict"
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
	ajaxRequest("/card_p_demographics/24",function(json){
		if (__$("patient_name")) {

            __$("patient_name").innerHTML = json.name;

        }
        if(json.gender == "M"){
        	if(__$("male")){
        		__$("male").style.border ="1px solid red";
        	}
        }
        else if(json.gender == "F"){
        	if(__$("female")){
        		__$("female").style.border ="1px solid red";
        	}
        }
        if(json.dob !="null"){
        	if(__$("dob")){
        		__$("dob").innerHTML=json.dob;
        	}
        }
	});
	ajaxRequest("/card_seizure_type/24",function(json){
		var type = ["Tonic Clonic","Absence","Myclonic","Clonic","Tonic","Atonic","Simplex","Complex","Unclassified"]
		for(var i = 0; i <type.length;i++ ){

		}
	});
}
