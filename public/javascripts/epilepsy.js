"use strict"

function loadExposureConditions(){

	var opts = __$("touchscreenInput" + tstCurrentPage).value.split(";"); 
   
  	//Exposure Concepts
	if(opts.indexOf("Smoking") >= 0){

		__$("smoking_date").setAttribute("condition", true)

	} else {

		__$("smoking_date").setAttribute("condition", false)

	}

	if(opts.indexOf("Alcohol") >= 0){

		__$("alcohol_date").setAttribute("condition", true)

	} else {

		__$("alcohol_date").setAttribute("condition", false)

	}

	if(opts.indexOf("Pigs")>=0){

		__$("pigs_date").setAttribute("condition", true)

	}
	else{

		__$("pigs_date").setAttribute("condition", false)

	}

	if(opts.indexOf("Traditional medicine")>=0){

		__$("traditional_date").setAttribute("condition", true)

	}
	else{

		__$("traditional_date").setAttribute("condition", false)

	}
	if(opts.indexOf("Other")>=0){

			  __$("other_exposures_specify").setAttribute("condition",true)

			  __$("other_exposures_date").setAttribute("condition", true)

			
	}
	else{

		__$("other_exposures_date").setAttribute("condition", false)
		__$("other_exposures_specify").setAttribute("condition",false)


	}


	//Complicatons concepts
	

}

function loadComplicationsConditions(){

	var opts = __$("touchscreenInput" + tstCurrentPage).value.split(";");

	if(opts.indexOf("Injuries") >= 0){

		__$("injuries_date").setAttribute("condition", true)

	} else {

		__$("injuries_date").setAttribute("condition", false)

	}

	if(opts.indexOf("Burns") >= 0){

		__$("burns_date").setAttribute("condition", true)

	} else {

		__$("burns_date").setAttribute("condition", false)

	}

	if(opts.indexOf("Status Epilepticus")>=0){

		__$("status_epilepticus_date").setAttribute("condition", true)

	}
	else{

		__$("status_epilepticus_date").setAttribute("condition", false)

	}

	if(opts.indexOf("Psychosis")>=0){

		__$("psychosis_date").setAttribute("condition", true)

	}
	else{

		__$("psychosis_date").setAttribute("condition", false)

	}
	if(opts.indexOf("Drug Related")>=0){

		__$("drug_related_date").setAttribute("condition", true)

	}
	else{

		__$("drug_related_date").setAttribute("condition", false)

	}
	if(opts.indexOf("Other")>=0){

			  __$("other_complications_specify").setAttribute("condition",true)

			  __$("other_complications_date").setAttribute("condition", true)

			
	}
	else{

		__$("other_complications_date").setAttribute("condition", false)
		__$("other_complications_specify").setAttribute("condition",false)


	}
}