/**
 * Created by chimwemwe on 6/23/16.
 */

"use strict"

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