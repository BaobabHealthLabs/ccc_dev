// drugs.js

var controlCount = 0;
var current_drug = "";

var icoClose = "data:image/png;base64,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";

function $(id){
    return document.getElementById(id);
}

String.prototype.toProperCase = function()
{
    return this.toLowerCase().replace(/^(.)|\s(.)/g,
        function($1) {
            return $1.toUpperCase();
        });
}

function valueExists(number_array, number){
    for(var i = 0; i < number_array.length; i++){
        if(number_array[i] == number){
            return true;
        }
    }
    return false;
}

function generateDrugs(){
    if($("parent_container")){
        $("content").removeChild($("parent_container"));
    }

    var parent_container = document.createElement("div");
    parent_container.id = "parent_container";
    parent_container.style.position = "absolute";
    parent_container.style.top = "0px";
    parent_container.style.left = "0px";
    parent_container.style.height = "calc(100vh - 85px)";
    parent_container.style.width = "100%";
    parent_container.style.overflow = "hidden";
    parent_container.style.zIndex = 20;
    parent_container.style.backgroundColor = "#FFFFFF";

    $("content").appendChild(parent_container);
    
    var mainTable = document.createElement("table");
    mainTable.width = "100%";
    mainTable.cellPadding = 30;

    parent_container.appendChild(mainTable);

    var mainTBody = document.createElement("tbody");
    var trMain = document.createElement("tr");
    var tdMain = document.createElement("td");

    tdMain.innerHTML = "<br />";

    mainTable.appendChild(mainTBody);
    mainTBody.appendChild(trMain);
    trMain.appendChild(tdMain);

    var tblBorder = document.createElement("table");
    var tbodyBorder = document.createElement("tbody");

    var trBorder1 = document.createElement("tr");
    
    var tdBorder1 = document.createElement("td");
    tdBorder1.width = "28%";
    tdBorder1.style.verticalAlign = "top";

    var tdBorder2 = document.createElement("td");
    tdBorder2.width = "54%";
    tdBorder2.style.verticalAlign = "top";

    var tdBorder4 = document.createElement("td");
    tdBorder4.width = "18%";
    tdBorder4.style.verticalAlign = "top";

    tblBorder.bgColor = "#000000";
    tblBorder.width = "100%";
    tblBorder.cellSpacing = 1;
    tblBorder.cellPadding = 0;

    trBorder1.appendChild(tdBorder1);
    tbodyBorder.appendChild(trBorder1);

    trBorder1.appendChild(tdBorder2);
    tbodyBorder.appendChild(trBorder1);

    trBorder1.appendChild(tdBorder4);
    tbodyBorder.appendChild(trBorder1);

    tblBorder.appendChild(tbodyBorder);

    tdMain.appendChild(tblBorder);

    var title = document.createElement("label");
    title.innerHTML = "Treatments";
    title.style.fontSize = "2em";
    title.style.position = "absolute";
    title.style.top = "5px";
    title.style.left = "25px";

    parent_container.appendChild(title);

    // GROUP 1
    var tbl1 = document.createElement("table");
    tbl1.style.width = "100%";
    // tbl1.style.height = "calc(100vh - 55px)";
    tbl1.style.backgroundColor = "#EEEEEE";
    tbl1.border = 0;
    tbl1.cellPadding = 3;
    tbl1.cellSpacing = 0;

    var tbody1 = document.createElement("tbody");
    var tr1 = document.createElement("tr");
    var td1 = document.createElement("th");
    td1.innerHTML = "DRUG";
    td1.align = "left";
    td1.bgColor = "#CCCCCC";
    
    var tr1b = document.createElement("tr");
    var td1b = document.createElement("td");

    tr1.appendChild(td1);
    tbl1.appendChild(tr1);

    tr1b.appendChild(td1b);
    tbl1.appendChild(tr1b);

    tbl1.appendChild(tbody1);
    
    var div1 = document.createElement("div");
    div1.style.width = "100%";
    div1.style.height = "calc(100vh - 180px)";
    div1.style.overflow = "auto";
    div1.id = "div1";

    td1b.appendChild(div1);
    tdBorder1.appendChild(tbl1);

    // MIDDLE CONTAINER
    var divMid = document.createElement("div");
    divMid.style.width = "100%";
    divMid.style.height = "calc(100vh - 147px)";
    divMid.style.overflow = "hidden";
    divMid.id = "divMid";
    divMid.style.backgroundColor = "#EEEEEE";
    divMid.style.verticalAlign = "top";

    tdBorder2.appendChild(divMid);

    // GROUP 4
    var tbl4 = document.createElement("table");
    tbl4.style.width = "100%";
    // tbl4.style.height = "calc(100vh - 55px)";
    tbl4.style.backgroundColor = "#EEEEEE";
    tbl4.border = 0;
    tbl4.cellPadding = 3;
    tbl4.cellSpacing = 0;

    var tbody4 = document.createElement("tbody");
    var tr4 = document.createElement("tr");
    var td4 = document.createElement("th");
    td4.innerHTML = "DURATION";
    td4.align = "left";
    td4.bgColor = "#CCCCCC";

    var tr4b = document.createElement("tr");
    var td4b = document.createElement("td");
    td4b.id = "idDuration";

    tr4.appendChild(td4);
    tbl4.appendChild(tr4);

    tr4b.appendChild(td4b);
    tbl4.appendChild(tr4b);

    tbl4.appendChild(tbody4);

    var div4 = document.createElement("div");
    div4.style.width = "100%";
    div4.style.height = "calc(100vh - 180px)";
    div4.style.overflow = "auto";
    div4.id = "div4";

    td4b.appendChild(div4);
    tdBorder4.appendChild(tbl4);

    var optTable1 = document.createElement("table");
    var optTBody1 = document.createElement("tbody");
    optTable1.width = "100%";
    optTable1.border = 0;
    optTable1.style.fontSize = "1.1em";
    optTable1.cellPadding = 5;

    optTable1.appendChild(optTBody1);

    generic.sort();

    for(var i = 0; i < generic.length; i++){
        var optTr1 = document.createElement("tr");
        var optTd1 = document.createElement("td");
        optTd1.id = "generic_cell_"+i;
        optTd1.setAttribute("generic", generic[i]);
        optTd1.bgColor = ((selected_drugs)?((selected_drugs[generic[i]])?"#F0F000":""):"");
        
        var optRadio1 = document.createElement("input");
        optRadio1.type = "radio";
        optRadio1.name = "generics";
        optRadio1.value = generic[i];
        optRadio1.id = "rdo_generic_cell_"+i;

        optTd1.onclick = function(){
            var id = "rdo_" + this.id;
            $(id).click();
        }

        optRadio1.onclick = function(){
            var id = this.id.match(/(generic_cell_\d+)/);

            if(id){
                if(this.checked){
                    var c = document.getElementsByName("generics");

                    for(var k = 0; k < c.length; k++){
                        var d = c[k].id.match(/(generic_cell_\d+)/);

                        if(d){
                            if($(d[1]).getAttribute("generic")){
                                var drug = $(d[1]).getAttribute("generic");

                                $(d[1]).bgColor = ((selected_drugs)?((selected_drugs[drug])?"#F0F000":""):"");
                            } else {
                                $(d[1]).bgColor = "";
                            }
                        }
                    }

                    $(id[1]).bgColor = "#add8e6";

                    if($(id[1]).getAttribute("generic")){
                        $("divMid").innerHTML = "";
                        loadDrugs($(id[1]).getAttribute("generic"), $("divMid"));
                    }

                    current_drug = this.value;
                    
                } else {
                    $(id[1]).bgColor = "";
                }
            }
        }

        optTd1.appendChild(optRadio1);
        optTr1.appendChild(optTd1);
        optTBody1.appendChild(optTr1);

        var lbl1 = document.createElement("label");
        lbl1.innerHTML = ((generic[i].toUpperCase()=="NIFEDIPINE SR")?"Nifedipine SR":generic[i].toProperCase());

        optTd1.appendChild(lbl1);
    }

    div1.appendChild(optTable1);

    var optTable4 = document.createElement("table");
    var optTBody4 = document.createElement("tbody");
    optTable4.width = "100%";
    optTable4.border = 0;
    optTable4.style.fontSize = "1.1em";
    optTable4.cellPadding = 5;

    optTable4.appendChild(optTBody4);

    div4.appendChild(optTable4);

    var duration = ["1 WEEK", "2 WEEKS", "1 MONTH", "2 MONTHS", "3 MONTHS", "4 MONTHS", "5 MONTHS", "6 MONTHS"];
    var duration_values = ["7", "14", "30", "60", "90", "120", "150", "180"];

    for(var i = 0; i < duration.length; i++){
        var optTr4 = document.createElement("tr");
        var optTd4 = document.createElement("td");
        optTd4.id = "duration_cell_"+i;
        optTd4.bgColor = ((durations)?((durations[duration_values[i]])?"#F0F000":""):"");

        var optRadio4 = document.createElement("input");
        optRadio4.type = "radio";
        optRadio4.name = "duration";
        optRadio4.value = duration_values[i];
        optRadio4.id = "rdo_duration_cell_"+i;

        optTd4.onclick = function(){
            var id = "rdo_" + this.id;
            $(id).click();
        }

        optRadio4.onclick = function(){
            var id = this.id.match(/(duration_cell_\d+)/);

            if(id){
                if(this.checked){
                    controlCount++;

                    var c = document.getElementsByName("duration");

                    for(var k = 0; k < c.length; k++){
                        var d = c[k].id.match(/(duration_cell_\d+)/);
                        
                        $(d[1]).bgColor = ((durations)?((durations[c[k].value])?"#F0F000":""):"");
                        
                    }

                    $(id[1]).bgColor = "#add8e6";

                    var generics = document.getElementsByName("generics");
                    var generics_value = "";

                    for(var g = 0; g < generics.length; g++){
                        if(generics[g].checked){
                            generics_value = generics[g].value;
                            break;
                        }
                    }
                    
                    var dose = document.getElementsByName("dose");
                    var dose_value = "";

                    var formulation = "";

                    for(var d = 0; d < dose.length; d++){
                        if(dose[d].checked){
                            dose_value = dose[d].value;

                            for(var f = 0; f < drugs[generics_value].length; f++) {

                                if(drugs[generics_value][f][0] == dose_value) {

                                    formulation = drugs[generics_value][f][2];

                                }

                            }

                            break;
                        }
                    }

                    var frequency = document.getElementsByName("frequency");
                    var frequency_value = "";

                    for(var f = 0; f < frequency.length; f++){
                        if(frequency[f].checked){
                            frequency_value = frequency[f].value;
                            break;
                        }
                    }

                    var group2 = document.getElementsByName("group2");
                    var group2_value = "";

                    var group4 = document.getElementsByName("group4");
                    var group4_value = "";

                    var group6 = document.getElementsByName("group6");
                    var group6_value = "";

                    if(!generics_value.match(/^$/)){
                        
                        if((dose_value.match(/^$/) && frequency_value.match(/^$/)) ||
                            (dose_value.match(/^$/) && current_drug.toLowerCase() == "glibenclamide")){

                            for(var g2 = 0; g2 < group2.length; g2++){
                                if(group2[g2].checked){
                                    group2_value = group2[g2].value;
                                    break;
                                }
                            }

                            for(var g4 = 0; g4 < group4.length; g4++){
                                if(group4[g4].checked){
                                    group4_value = group4[g4].value;
                                    break;
                                }
                            }

                            for(var g6 = 0; g6 < group6.length; g6++){
                                if(group6[g6].checked){
                                    group6_value = group6[g6].value;
                                    break;
                                }
                            }

                            /*
                             *
                             *  SUFFIX CODE LEGEND
                             *
                             *          0.  generic
                             *          1.  drug_strength
                             *          2.  frequency
                             *          3.  duration
                             *          4.  morning_dose
                             *          5.  afternoon_dose
                             *          6.  evening_dose
                             *          7.  diagnosis
                             *          8.  patient_id
                             *          9.  suggestion
                             *          10. concept_name
                             *          11. value_coded_text
                             *          12. type_of_prescription
                             *          13. drug_name
                             *          
                             */

                            if((!group2_value.match(/^$/) || !group4_value.match(/^$/) || !group6_value.match(/^$/)) && generics_value == "SOLUBLE INSULIN"){

                                var txtConceptName = document.createElement("input");
                                txtConceptName.type = "hidden";
                                txtConceptName.name = "data.prescriptions[" + controlCount + "].concept_name";
                                txtConceptName.value = "DIAGNOSIS";
                                txtConceptName.id = "group_"+controlCount+"_10";

                                document.forms[0].appendChild(txtConceptName);

                                var txtValueCodedText = document.createElement("input");
                                txtValueCodedText.type = "hidden";
                                txtValueCodedText.name = "data.prescriptions[" + controlCount + "].value_coded_or_text";
                                txtValueCodedText.value = "ASTHMA MEDICATION";
                                txtValueCodedText.id = "group_"+controlCount+"_11";

                                document.forms[0].appendChild(txtValueCodedText);

                                var txtSuggestion = document.createElement("input");
                                txtSuggestion.type = "hidden";
                                txtSuggestion.name = "data.prescriptions[" + controlCount + "].suggestion";
                                txtSuggestion.value = 0;
                                txtSuggestion.id = "group_"+controlCount+"_9";

                                document.forms[0].appendChild(txtSuggestion);

                                var txtTypeOfPrescription = document.createElement("input");
                                txtTypeOfPrescription.type = "hidden";
                                txtTypeOfPrescription.name = "data.prescriptions[" + controlCount + "].type_of_prescription";
                                txtTypeOfPrescription.value = "variable";
                                txtTypeOfPrescription.id = "group_"+controlCount+"_12";

                                document.forms[0].appendChild(txtTypeOfPrescription);

                                var txtPatientID = document.createElement("input");
                                txtPatientID.type = "hidden";
                                txtPatientID.name = "data.prescriptions[" + controlCount + "].patient_id";
                                txtPatientID.value = $('patient_id').value;
                                txtPatientID.id = "group_"+controlCount+"_8";

                                document.forms[0].appendChild(txtPatientID);

                                var txtDiagnosis = document.createElement("input");
                                txtDiagnosis.type = "hidden";
                                txtDiagnosis.name = "data.prescriptions[" + controlCount + "].diagnosis";
                                txtDiagnosis.value = "ASTHMA MEDICATION";
                                txtDiagnosis.id = "group_"+controlCount+"_7";

                                document.forms[0].appendChild(txtDiagnosis);

                                var txtGenerics = document.createElement("input");
                                txtGenerics.type = "hidden";
                                txtGenerics.name = "data.prescriptions[" + controlCount + "].generic";
                                txtGenerics.value = generics_value;
                                txtGenerics.id = "group_"+controlCount+"_0";

                                document.forms[0].appendChild(txtGenerics);

                                var txtGroup2 = document.createElement("input");
                                txtGroup2.type = "hidden";
                                txtGroup2.name = "data.prescriptions[" + controlCount + "].morning_dose";
                                txtGroup2.value = group2_value;
                                txtGroup2.id = "group_"+controlCount+"_4";

                                document.forms[0].appendChild(txtGroup2);

                                var txtGroup4 = document.createElement("input");
                                txtGroup4.type = "hidden";
                                txtGroup4.name = "data.prescriptions[" + controlCount + "].afternoon_dose";
                                txtGroup4.value = group4_value;
                                txtGroup4.id = "group_"+controlCount+"_5";

                                document.forms[0].appendChild(txtGroup4);

                                var txtGroup6 = document.createElement("input");
                                txtGroup6.type = "hidden";
                                txtGroup6.name = "data.prescriptions[" + controlCount + "].evening_dose";
                                txtGroup6.value = group6_value;
                                txtGroup6.id = "group_"+controlCount+"_6";

                                document.forms[0].appendChild(txtGroup6);

                                var txtDuration = document.createElement("input");
                                txtDuration.type = "hidden";
                                txtDuration.name = "data.prescriptions[" + controlCount + "].duration";
                                txtDuration.value = this.value;
                                txtDuration.id = "group_"+controlCount+"_3";

                                document.forms[0].appendChild(txtDuration);

                                var txtFormualtion = document.createElement("input");
                                txtFormualtion.type = "hidden";
                                txtFormualtion.name = "data.prescriptions[" + controlCount + "].formulation";
                                txtFormualtion.value = "Soluble Insulin";
                                txtFormualtion.id = "group_"+controlCount+"_40";

                                document.forms[0].appendChild(txtFormualtion);

                                generateDrugs();

                            } else if((!group2_value.match(/^$/) || !group6_value.match(/^$/)) && generics_value == "LENTE INSULIN"){

                                var txtConceptName = document.createElement("input");
                                txtConceptName.type = "hidden";
                                txtConceptName.name = "data.prescriptions[" + controlCount + "].concept_name";
                                txtConceptName.value = "DIAGNOSIS";
                                txtConceptName.id = "group_"+controlCount+"_10";

                                document.forms[0].appendChild(txtConceptName);

                                var txtValueCodedText = document.createElement("input");
                                txtValueCodedText.type = "hidden";
                                txtValueCodedText.name = "data.prescriptions[" + controlCount + "].value_coded_or_text";
                                txtValueCodedText.value = "ASTHMA MEDICATION";
                                txtValueCodedText.id = "group_"+controlCount+"_11";

                                document.forms[0].appendChild(txtValueCodedText);

                                var txtSuggestion = document.createElement("input");
                                txtSuggestion.type = "hidden";
                                txtSuggestion.name = "data.prescriptions[" + controlCount + "].suggestion";
                                txtSuggestion.value = 0;
                                txtSuggestion.id = "group_"+controlCount+"_9";

                                document.forms[0].appendChild(txtSuggestion);

                                var txtTypeOfPrescription = document.createElement("input");
                                txtTypeOfPrescription.type = "hidden";
                                txtTypeOfPrescription.name = "data.prescriptions[" + controlCount + "].type_of_prescription";
                                txtTypeOfPrescription.value = "variable";
                                txtTypeOfPrescription.id = "group_"+controlCount+"_12";

                                document.forms[0].appendChild(txtTypeOfPrescription);

                                var txtPatientID = document.createElement("input");
                                txtPatientID.type = "hidden";
                                txtPatientID.name = "data.prescriptions[" + controlCount + "].patient_id";
                                txtPatientID.value = $('patient_id').value;
                                txtPatientID.id = "group_"+controlCount+"_8";

                                document.forms[0].appendChild(txtPatientID);

                                var txtDiagnosis = document.createElement("input");
                                txtDiagnosis.type = "hidden";
                                txtDiagnosis.name = "data.prescriptions[" + controlCount + "].diagnosis";
                                txtDiagnosis.value = "ASTHMA MEDICATION";
                                txtDiagnosis.id = "group_"+controlCount+"_7";

                                document.forms[0].appendChild(txtDiagnosis);

                                var txtGenerics = document.createElement("input");
                                txtGenerics.type = "hidden";
                                txtGenerics.name = "data.prescriptions[" + controlCount + "].generic";
                                txtGenerics.value = generics_value;
                                txtGenerics.id = "group_"+controlCount+"_0";

                                document.forms[0].appendChild(txtGenerics);

                                var txtGroup2 = document.createElement("input");
                                txtGroup2.type = "hidden";
                                txtGroup2.name = "data.prescriptions[" + controlCount + "].morning_dose";
                                txtGroup2.value = group2_value;
                                txtGroup2.id = "group_"+controlCount+"_4";

                                document.forms[0].appendChild(txtGroup2);

                                var txtGroup6 = document.createElement("input");
                                txtGroup6.type = "hidden";
                                txtGroup6.name = "data.prescriptions[" + controlCount + "].evening_dose";
                                txtGroup6.value = group6_value;
                                txtGroup6.id = "group_"+controlCount+"_6";

                                document.forms[0].appendChild(txtGroup6);

                                var txtDuration = document.createElement("input");
                                txtDuration.type = "hidden";
                                txtDuration.name = "data.prescriptions[" + controlCount + "].duration";
                                txtDuration.value = this.value;
                                txtDuration.id = "group_"+controlCount+"_3";

                                document.forms[0].appendChild(txtDuration);

                                var txtFormualtion = document.createElement("input");
                                txtFormualtion.type = "hidden";
                                txtFormualtion.name = "data.prescriptions[" + controlCount + "].formulation";
                                txtFormualtion.value = "Lente Insulin";
                                txtFormualtion.id = "group_"+controlCount+"_40";

                                document.forms[0].appendChild(txtFormualtion);

                                generateDrugs();
                                    
                            }
                            
                        } else if(!dose_value.match(/^$/) && !frequency_value.match(/^$/)){

                            var txtConceptName = document.createElement("input");
                            txtConceptName.type = "hidden";
                            txtConceptName.name = "data.prescriptions[" + controlCount + "].concept_name";
                            txtConceptName.value = "DIAGNOSIS";
                            txtConceptName.id = "group_"+controlCount+"_10";

                            document.forms[0].appendChild(txtConceptName);

                            var txtValueCodedText = document.createElement("input");
                            txtValueCodedText.type = "hidden";
                            txtValueCodedText.name = "data.prescriptions[" + controlCount + "].value_coded_or_text";
                            txtValueCodedText.value = "ASTHMA MEDICATION";
                            txtValueCodedText.id = "group_"+controlCount+"_11";

                            document.forms[0].appendChild(txtValueCodedText);

                            var txtSuggestion = document.createElement("input");
                            txtSuggestion.type = "hidden";
                            txtSuggestion.name = "data.prescriptions[" + controlCount + "].suggestion";
                            txtSuggestion.value = 0;
                            txtSuggestion.id = "group_"+controlCount+"_9";

                            document.forms[0].appendChild(txtSuggestion);

                            var txtTypeOfPrescription = document.createElement("input");
                            txtTypeOfPrescription.type = "hidden";
                            txtTypeOfPrescription.name = "data.prescriptions[" + controlCount + "].type_of_prescription";
                            txtTypeOfPrescription.value = "standard";
                            txtTypeOfPrescription.id = "group_"+controlCount+"_12";

                            document.forms[0].appendChild(txtTypeOfPrescription);

                            var txtPatientID = document.createElement("input");
                            txtPatientID.type = "hidden";
                            txtPatientID.name = "data.prescriptions[" + controlCount + "].patient_id";
                            txtPatientID.value = $('patient_id').value;
                            txtPatientID.id = "group_"+controlCount+"_8";

                            document.forms[0].appendChild(txtPatientID);

                            var txtDiagnosis = document.createElement("input");
                            txtDiagnosis.type = "hidden";
                            txtDiagnosis.name = "data.prescriptions[" + controlCount + "].diagnosis";
                            txtDiagnosis.value = "ASTHMA MEDICATION";
                            txtDiagnosis.id = "group_"+controlCount+"_7";

                            document.forms[0].appendChild(txtDiagnosis);

                            var txtGenerics = document.createElement("input");
                            txtGenerics.type = "hidden";
                            txtGenerics.name = "data.prescriptions[" + controlCount + "].generic";
                            txtGenerics.value = generics_value;
                            txtGenerics.id = "group_"+controlCount+"_0";

                            document.forms[0].appendChild(txtGenerics);

                            var txtDose = document.createElement("input");
                            txtDose.type = "hidden";
                            txtDose.name = "data.prescriptions[" + controlCount + "].drug_strength";
                            txtDose.value = dose_value;
                            txtDose.id = "group_"+controlCount+"_1";

                            document.forms[0].appendChild(txtDose);

                            var txtFrequency = document.createElement("input");
                            txtFrequency.type = "hidden";
                            txtFrequency.name = "data.prescriptions[" + controlCount + "].frequency";
                            txtFrequency.value = frequency_value;
                            txtFrequency.id = "group_"+controlCount+"_2";

                            document.forms[0].appendChild(txtFrequency);

                            var txtDuration = document.createElement("input");
                            txtDuration.type = "hidden";
                            txtDuration.name = "data.prescriptions[" + controlCount + "].duration";
                            txtDuration.value = this.value;
                            txtDuration.id = "group_"+controlCount+"_3";

                            document.forms[0].appendChild(txtDuration);

                            var txtFormualtion = document.createElement("input");
                            txtFormualtion.type = "hidden";
                            txtFormualtion.name = "data.prescriptions[" + controlCount + "].formulation";
                            txtFormualtion.value = formulation;
                            txtFormualtion.id = "group_"+controlCount+"_40";

                            document.forms[0].appendChild(txtFormualtion);

                            generateDrugs();

                        } else if(!dose_value.match(/^$/) && current_drug.toLowerCase() == "glibenclamide"){
                            var r = dose_value.match(/\[[^\]]+\]/g);
                            var morning_dose = "";
                            var evening_dose = "";
                            
                            if(r){
                                for(var j=0; j < r.length; j++){
                                    var vals = r[j].match(/\[(.+):(.+)\]/);

                                    if(vals){
                                        switch(vals[2].toUpperCase()){
                                            case "AM":
                                                morning_dose = vals[1].match(/\d+/g)[0];
                                                break;
                                            case "PM":
                                                evening_dose = vals[1].match(/\d+/g)[0];
                                                break;
                                        }

                                    }
                                }

                                var txtConceptName = document.createElement("input");
                                txtConceptName.type = "hidden";
                                txtConceptName.name = "data.prescriptions[" + controlCount + "].concept_name";
                                txtConceptName.value = "DIAGNOSIS";
                                txtConceptName.id = "group_"+controlCount+"_10";

                                document.forms[0].appendChild(txtConceptName);

                                var txtValueCodedText = document.createElement("input");
                                txtValueCodedText.type = "hidden";
                                txtValueCodedText.name = "data.prescriptions[" + controlCount + "].value_coded_or_text";
                                txtValueCodedText.value = "ASTHMA MEDICATION";
                                txtValueCodedText.id = "group_"+controlCount+"_11";

                                document.forms[0].appendChild(txtValueCodedText);

                                var txtSuggestion = document.createElement("input");
                                txtSuggestion.type = "hidden";
                                txtSuggestion.name = "data.prescriptions[" + controlCount + "].suggestion";
                                txtSuggestion.value = 0;
                                txtSuggestion.id = "group_"+controlCount+"_9";

                                document.forms[0].appendChild(txtSuggestion);

                                var txtTypeOfPrescription = document.createElement("input");
                                txtTypeOfPrescription.type = "hidden";
                                txtTypeOfPrescription.name = "data.prescriptions[" + controlCount + "].type_of_prescription";
                                txtTypeOfPrescription.value = "variable";
                                txtTypeOfPrescription.id = "group_"+controlCount+"_12";

                                document.forms[0].appendChild(txtTypeOfPrescription);

                                var txtPatientID = document.createElement("input");
                                txtPatientID.type = "hidden";
                                txtPatientID.name = "data.prescriptions[" + controlCount + "].patient_id";
                                txtPatientID.value = $('patient_id').value;
                                txtPatientID.id = "group_"+controlCount+"_8";

                                document.forms[0].appendChild(txtPatientID);

                                var txtDiagnosis = document.createElement("input");
                                txtDiagnosis.type = "hidden";
                                txtDiagnosis.name = "data.prescriptions[" + controlCount + "].diagnosis";
                                txtDiagnosis.value = "ASTHMA MEDICATION";
                                txtDiagnosis.id = "group_"+controlCount+"_7";

                                document.forms[0].appendChild(txtDiagnosis);

                                var txtGenerics = document.createElement("input");
                                txtGenerics.type = "hidden";
                                txtGenerics.name = "data.prescriptions[" + controlCount + "].generic";
                                txtGenerics.value = generics_value;
                                txtGenerics.id = "group_"+controlCount+"_0";

                                document.forms[0].appendChild(txtGenerics);

                                var txtGroup2 = document.createElement("input");
                                txtGroup2.type = "hidden";
                                txtGroup2.name = "data.prescriptions[" + controlCount + "].morning_dose";
                                txtGroup2.value = morning_dose;
                                txtGroup2.id = "group_"+controlCount+"_4";

                                document.forms[0].appendChild(txtGroup2);

                                var txtGroup6 = document.createElement("input");
                                txtGroup6.type = "hidden";
                                txtGroup6.name = "data.prescriptions[" + controlCount + "].evening_dose";
                                txtGroup6.value = evening_dose;
                                txtGroup6.id = "group_"+controlCount+"_6";

                                document.forms[0].appendChild(txtGroup6);

                                var txtDuration = document.createElement("input");
                                txtDuration.type = "hidden";
                                txtDuration.name = "data.prescriptions[" + controlCount + "].duration";
                                txtDuration.value = this.value;
                                txtDuration.id = "group_"+controlCount+"_3";

                                document.forms[0].appendChild(txtDuration);

                                var txtFormualtion = document.createElement("input");
                                txtFormualtion.type = "hidden";
                                txtFormualtion.name = "data.prescriptions[" + controlCount + "].formulation";
                                txtFormualtion.value = "Glibenclamide (10mg tablet)";
                                txtFormualtion.id = "group_"+controlCount+"_40";

                                document.forms[0].appendChild(txtFormualtion);

                                generateDrugs();
                                    
                            } else {
                                return;
                            }
                            
                        }
                    }
                    
                } else {
                    $(id[1]).bgColor = "";
                }
            }
        }

        optTd4.appendChild(optRadio4);
        optTr4.appendChild(optTd4);
        optTBody4.appendChild(optTr4);

        var lbl4 = document.createElement("label");
        lbl4.innerHTML = duration[i].toProperCase();

        optTd4.appendChild(lbl4);
    }

    var btnView = document.createElement("input");
    btnView.type = "button";
    btnView.value = "View Selection";
    btnView.style.width = "150px";
    btnView.style.height = "40px";
    btnView.style.fontSize = "1em";
    
    btnView.onclick = function(){
        viewSelectedDrugs();
    }

    var trBtn = document.createElement("tr");
    var tdBtn = document.createElement("td");

    trBtn.appendChild(tdBtn);
    tdBtn.appendChild(btnView);

    optTBody4.appendChild(trBtn);

}

function viewSelectedDrugs(){
    if($("parent_container")){
        $("content").removeChild($("parent_container"));
    }

    var parent_container = document.createElement("div");
    parent_container.id = "parent_container";
    parent_container.style.position = "absolute";
    parent_container.style.top = "0px";
    parent_container.style.left = "0px";
    parent_container.style.height = "calc(100vh - 95px)";
    parent_container.style.width = "100%";
    parent_container.style.overflow = "hidden";
    parent_container.style.zIndex = 20;
    parent_container.style.backgroundColor = "#FFFFFF";

    $("content").appendChild(parent_container);

    var mainTable = document.createElement("table");
    mainTable.width = "100%";
    mainTable.cellPadding = 30;

    parent_container.appendChild(mainTable);

    var mainTBody = document.createElement("tbody");
    var trMain = document.createElement("tr");
    var tdMain = document.createElement("td");

    tdMain.innerHTML = "<br />";

    mainTable.appendChild(mainTBody);
    mainTBody.appendChild(trMain);
    trMain.appendChild(tdMain);

    var tblBorder = document.createElement("table");
    var tbodyBorder = document.createElement("tbody");

    var trBorder1 = document.createElement("tr");

    var tdBorder1 = document.createElement("td");
    tdBorder1.width = "28%";
    tdBorder1.style.verticalAlign = "top";

    var tdBorder2 = document.createElement("td");
    tdBorder2.width = "54%";
    tdBorder2.style.verticalAlign = "top";

    var tdBorder4 = document.createElement("td");
    tdBorder4.width = "18%";
    tdBorder4.style.verticalAlign = "top";

    tblBorder.bgColor = "#000000";
    tblBorder.width = "100%";
    tblBorder.cellSpacing = 1;
    tblBorder.cellPadding = 0;

    trBorder1.appendChild(tdBorder1);
    tbodyBorder.appendChild(trBorder1);

    tblBorder.appendChild(tbodyBorder);

    tdMain.appendChild(tblBorder);

    var title = document.createElement("label");
    title.innerHTML = "Selected Treatments";
    title.style.fontSize = "2em";
    title.style.position = "absolute";
    title.style.top = "5px";
    title.style.left = "25px";

    parent_container.appendChild(title);

    var divMid = document.createElement("div");
    divMid.style.width = "100%";
    divMid.style.height = "calc(100vh - 180px)";
    divMid.style.overflow = "hidden";
    divMid.id = "divMid";
    divMid.style.backgroundColor = "#EEEEEE";
    divMid.style.overflow = "auto";

    tdBorder1.appendChild(divMid);

    var tbl = document.createElement("table");
    tbl.cellSpacing = 1;
    tbl.cellPadding = 5;
    tbl.width = "100%";
    tbl.id = "tblFirst";
    
    var tbody = document.createElement("tbody");
    tbody.id = "tbody1";

    divMid.appendChild(tbl);
    tbl.appendChild(tbody);

    var tbl2 = document.createElement("table");
    tbl2.cellSpacing = 1;
    tbl2.cellPadding = 5;
    tbl2.width = "100%";
    tbl2.id = "tblSecond";

    var tbody2 = document.createElement("tbody");
    tbody2.id = "tbody2";

    var br = document.createElement("br");

    divMid.appendChild(br);
    
    divMid.appendChild(tbl2);
    tbl2.appendChild(tbody2);

    var trH1 = document.createElement("tr");
    var trH2 = document.createElement("tr");

    var s1 = ["DRUG", "DOSAGE", "FREQUENCY", "DURATION", "&nbsp;"];
    var s2 = ["DRUG", "morning dose", "lunchtime dose", "evening dose", "DURATION", "&nbsp;"];

    tbody.appendChild(trH1);
    tbody2.appendChild(trH2);

    for(var i = 0; i < s1.length; i++){
        var tdH = document.createElement("th");
        tdH.align = "left";
        tdH.bgColor = "#CCCCCC";

        tdH.innerHTML = s1[i];

        trH1.appendChild(tdH);
    }

    for(var i = 0; i < s2.length; i++){
        var tdH = document.createElement("th");
        tdH.align = "left";
        tdH.bgColor = "#CCCCCC";

        tdH.innerHTML = s2[i];

        trH2.appendChild(tdH);
    }

    var ctrls = document.getElementsByTagName("input");

    for(var i = 0; i < ctrls.length; i++){
        if(ctrls[i].name.match(/^data\.prescriptions\[\d+\]\.generic$$/)){
            var tr = document.createElement("tr");

            var id = ctrls[i].id.match(/^group_(\d+)_\d+$/);
            
            if(id){
                tr.id = "row_"+id[1];
            }

            var td = document.createElement("td");

            if(ctrls[i+1].name.match(/^data\.prescriptions\[\d+\]\.drug_strength$$/)){
                tbody.appendChild(tr);
                tr.appendChild(td);

                td.innerHTML = ctrls[i].value.toProperCase();
                td.bgColor = "#EAEAEA";

                var td2 = document.createElement("td");
                td2.align = "center";

                tr.appendChild(td2);

                td2.innerHTML = ctrls[i+1].value;

                if(ctrls[i+2].name.match(/^data\.prescriptions\[\d+\]\.frequency$$/)){
                    var td3 = document.createElement("td");

                    tr.appendChild(td3);

                    td3.innerHTML = ctrls[i+2].value;
                    td3.bgColor = "#EAEAEA";
                    td3.align = "center";

                    if(ctrls[i+3].name.match(/^data\.prescriptions\[\d+\]\.duration$$/)){
                        var td4 = document.createElement("td");
                        td4.align = "center";

                        tr.appendChild(td4);

                        td4.innerHTML = ctrls[i+3].value + " days";

                    }

                    var td5 = document.createElement("th");
                    td5.style.color = "#FF0000";
                    td5.id = "cell_"+id[1];

                    tr.appendChild(td5);

                    td5.onclick = function(){
                        var idi = this.id.match(/^cell_(\d+)$/);

                        if(idi){
                            var ctrs = document.getElementsByTagName("input");

                            var lim = ctrs.length;
                                
                            for(var c = lim-1; c >= 0; c--){
                                if(ctrs[c].id.match("^group_"+idi[1]+"_\\d+$")){
                                    document.forms[0].removeChild(ctrs[c]);
                                }
                            }
                            $("tbody1").removeChild($("row_"+idi[1]));
                        }
                    }

                    var img = document.createElement("img");
                    img.src = icoClose;
                    img.height = 25;
                    img.style.cursor = "pointer";

                    td5.appendChild(img);
                        
                }
            } else if(ctrls[i+1].name.match(/^data\.prescriptions\[\d+\]\.morning_dose$$/)){
                tbody2.appendChild(tr);
                
                tr.appendChild(td);

                td.innerHTML = ctrls[i].value.toProperCase();

                var td2 = document.createElement("td");
                td2.bgColor = "#EAEAEA";
                td2.align = "center";

                tr.appendChild(td2);

                td2.innerHTML = ctrls[i+1].value;

                if(ctrls[i+2].name.match(/^data\.prescriptions\[\d+\]\.afternoon_dose$$/)){
                    var td3 = document.createElement("td");
                    td3.align = "center";

                    tr.appendChild(td3);

                    td3.innerHTML = ctrls[i+2].value;

                    if(ctrls[i+3].name.match(/^data\.prescriptions\[\d+\]\.evening_dose$$/)){
                        var td4 = document.createElement("td");
                        td4.align = "center";

                        tr.appendChild(td4);

                        td4.innerHTML = ctrls[i+3].value;

                        if(ctrls[i+4].name.match(/^data\.prescriptions\[\d+\]\.duration$$/)){
                            var td5 = document.createElement("td");
                            td5.align = "center";

                            tr.appendChild(td5);

                            td5.innerHTML = ctrls[i+4].value + " days";

                        }

                        var td6 = document.createElement("th");
                        td6.style.color = "#FF0000";
                        td6.id = "cell_"+id[1];

                        tr.appendChild(td6);

                        td6.onclick = function(){
                            var idi = this.id.match(/^cell_(\d+)$/);

                            if(idi){
                                var ctrs = document.getElementsByTagName("input");

                                var lim = ctrs.length;

                                for(var c = lim-1; c >= 0; c--){
                                    if(ctrs[c].id.match("^group_"+idi[1]+"_\\d+$")){
                                        document.forms[0].removeChild(ctrs[c]);
                                    }
                                }
                                $("tbody2").removeChild($("row_"+idi[1]));
                            }
                        }

                        var img = document.createElement("img");
                        img.src = icoClose;
                        img.height = 25;
                        img.style.cursor = "pointer";

                        td6.appendChild(img);

                    }
                } else {
                    var td3 = document.createElement("td");
                    td3.align = "center";

                    tr.appendChild(td3);

                    td3.innerHTML = "&nbsp;";

                    if(ctrls[i+2].name.match(/^data\.prescriptions\[\d+\]\.evening_dose$$/)){
                        var td4 = document.createElement("td");
                        td4.align = "center";

                        tr.appendChild(td4);

                        td4.innerHTML = ctrls[i+2].value;

                        if(ctrls[i+3].name.match(/^data\.prescriptions\[\d+\]\.duration$$/)){
                            var td5 = document.createElement("td");
                            td5.align = "center";

                            tr.appendChild(td5);

                            td5.innerHTML = ctrls[i+3].value + " days";

                        }

                        var td6 = document.createElement("th");
                        td6.style.color = "#FF0000";
                        td6.id = "cell_"+id[1];

                        tr.appendChild(td6);

                        td6.onclick = function(){
                            var idi = this.id.match(/^cell_(\d+)$/);

                            var ctrs = document.getElementsByTagName("input");

                            var lim = ctrs.length;

                            for(var c = lim-1; c >= 0; c--){
                                if(ctrs[c].id.match("^group_"+idi[1]+"_\\d+$")){
                                    document.forms[0].removeChild(ctrs[c]);
                                }
                            }
                            $("tbody2").removeChild($("row_"+idi[1]));
                        }

                        var img = document.createElement("img");
                        img.src = icoClose;
                        img.height = 25;
                        img.style.cursor = "pointer";

                        td6.appendChild(img);

                    }
                }
            }
        }

    }

    if(tbl.rows.length <= 1){
        var trD = document.createElement("tr");
        var tdD = document.createElement("td");
        tdD.colSpan = 4;
        tdD.align = "center";
        tdD.style.fontStyle = "italic";

        tdD.innerHTML = "No Drugs Selected in this Category";

        trD.appendChild(tdD);
        tbody.appendChild(trD);
    }

    if(tbl2.rows.length <= 1){
        var trD2 = document.createElement("tr");
        var tdD2 = document.createElement("td");
        tdD2.colSpan = 5;
        tdD2.align = "center";
        tdD2.style.fontStyle = "italic";

        tdD2.innerHTML = "No Drugs Selected in this Category";

        trD2.appendChild(tdD2);
        tbody2.appendChild(trD2);
    }

    var br2 = document.createElement("br");
    
    divMid.appendChild(br2);
    
    var btnContinue = document.createElement("input");
    btnContinue.type = "button";
    btnContinue.style.height = "60px";
    btnContinue.style.width = "100%";
    btnContinue.value = "Continue...";
    btnContinue.style.fontSize = "1.5em";
    btnContinue.align = "center";

    btnContinue.onclick = function(){
        generateDrugs();
    }

    divMid.appendChild(btnContinue);
}

function loadDrugs(drug, dosefreqdiv){
    
    switch(drug){
        case "SOLUBLE INSULIN":
            createSolubleInsulinDosageFrequencyTable(drug, dosefreqdiv);
            break;
        case "LENTE INSULIN":
            createLenteInsulinDosageFrequencyTable(drug, dosefreqdiv);
            break;
        default:
            createNormalDoseFrequencyTable(drug, dosefreqdiv);
            break;
    }

}

function createSolubleInsulinDosageFrequencyTable(drug, dosefreqdiv){
    var tbl = document.createElement("table");
    tbl.id = "lente";
    tbl.width = "100%";
    tbl.cellSpacing = 0;
    tbl.cellPadding = 3;

    var tbody = document.createElement("tbody");

    dosefreqdiv.appendChild(tbl);
    tbl.appendChild(tbody);

    var trTop = document.createElement("tr");
    var tdTop = document.createElement("th");
    tdTop.bgColor = "#CCCCCC";
    tdTop.align = "left";
    tdTop.innerHTML = "DOSAGE";
    tdTop.style.height = "20px !important";

    tbl.appendChild(trTop);
    trTop.appendChild(tdTop);

    var trBody = document.createElement("tr");
    var tdBody = document.createElement("td");
    tdBody.style.verticalAlign = "top";

    tbl.appendChild(trBody);
    trBody.appendChild(tdBody);

    var div = document.createElement("div");
    div.style.overflow = "auto";
    div.style.width = "100%";
    div.style.height = "calc(100vh - 180px)";
    div.style.backgroundColor = "#EEEEEE";

    tdBody.appendChild(div);

    var tblContent = document.createElement("table");
    tbl.id = "lente";
    tblContent.cellSpacing = 1;
    tblContent.cellPadding = 2;
    tblContent.width = "100%";
    tblContent.border = 0;
    tblContent.style.fontSize = "0.7em";
    
    var trHead = document.createElement("tr");
    
    var tdHead1 = document.createElement("th");
    tdHead1.innerHTML = "morning";
    tdHead1.bgColor = "#999999";
    tdHead1.style.color = "#EEEEEE";
    tdHead1.colSpan = 2;

    var tdHead2 = document.createElement("th");
    tdHead2.innerHTML = "lunchtime";
    tdHead2.bgColor = "#999999";
    tdHead2.style.color = "#EEEEEE";
    tdHead2.colSpan = 2;
    
    var tdHead3 = document.createElement("th");
    tdHead3.innerHTML = "evening";
    tdHead3.bgColor = "#999999";
    tdHead3.style.color = "#EEEEEE";
    tdHead3.colSpan = 2;

    div.appendChild(tblContent);
    tblContent.appendChild(trHead);

    trHead.appendChild(tdHead1);
    trHead.appendChild(tdHead2);
    trHead.appendChild(tdHead3);

    var durat = document.getElementsByName("duration");

    for(var k = 0; k < durat.length; k++){
        var d = durat[k].id.match(/(duration_cell_\d+)/);

        if(d){
            $(d[1]).bgColor = ((durations)?((durations[durat[k].value])?"#F0F000":""):"");
            $("rdo_" + d[1]).checked = false;
        }
    }

    for(var i = 0; i < 10; i++){
        var tr = document.createElement("tr");
        
        // SET 1:
        var td1 = document.createElement("td");
        td1.vAlign = "middle";
        td1.id = "group1_" + (((i*10)+1) + "-" + ((i+1)*10));
        td1.height = "40px";
        td1.width = "19%";
        td1.bgColor = "#DDDDDD";

        td1.onclick = function(){            
            var rdo = this.getElementsByTagName("input");

            if(rdo[0]){
                if(rdo[0].type=="radio") rdo[0].click();
            }
        }

        var rdo1 = document.createElement("input");
        rdo1.type = "radio";
        rdo1.value = (((i*10)+1) + "-" + ((i+1)*10));
        rdo1.name = "group1";

        rdo1.onclick = function(){
            var tds = document.getElementsByName("group1");

            for(var k = 0; k < tds.length; k++){
                $("group1_" + tds[k].value).bgColor = "#DDDDDD";
            }
            
            this.offsetParent.bgColor = "#add8e6";

            var targets = document.getElementsByName("group1");
            var v = this.value.split("-");
            var start = v[0];
            var end = v[1];

            var val = start;
            
            for(var k = 0; k < targets.length; k++){
                var td = $("group2_" + (k+1));

                var irdo = td.getElementsByTagName("input");

                if(irdo){
                    irdo[0].value = val;
                }
                
                var ilbl = td.getElementsByTagName("label");

                if(ilbl){
                    ilbl[0].innerHTML = val;
                }

                val++;
            }

        }

        td1.appendChild(rdo1);

        var lbl1 = document.createElement("label");
        lbl1.style.width = "100%";
        lbl1.innerHTML = (((i*10)+1) + "-" + ((i+1)*10));

        td1.appendChild(lbl1);
        
        tblContent.appendChild(tr);
        tr.appendChild(td1);


        var td2 = document.createElement("td");
        td2.vAlign = "middle";
        td2.id = "group2_" + (i+1);
        td2.width = "14%";

        td2.onclick = function(){
            var rdo = this.getElementsByTagName("input");

            if(rdo[0]){
                if(rdo[0].type=="radio") rdo[0].click();
            }
        }

        var rdo2 = document.createElement("input");
        rdo2.type = "radio";
        rdo2.name = "group2";

        rdo2.onclick = function(){
            var tds = document.getElementsByName("group2");

            for(var k = 0; k < tds.length; k++){
                var p = String(tds[k].value).match(/\d$/);
                
                if(p){
                    $("group2_" + (p==0?10:p)).bgColor = "";
                }
                
            }

            this.offsetParent.bgColor = "#add8e6";
        }

        td2.appendChild(rdo2);

        var lbl2 = document.createElement("label");
        lbl2.style.width = "100%";
        lbl2.innerHTML = "&nbsp;";

        td2.appendChild(lbl2);

        tr.appendChild(td2);

        // SET 2:
        var td3 = document.createElement("td");
        td3.vAlign = "middle";
        td3.id = "group3_" + (((i*10)+1) + "-" + ((i+1)*10));
        td3.width = "19%";
        td3.bgColor = "#DDDDDD";

        td3.onclick = function(){
            var rdo = this.getElementsByTagName("input");

            if(rdo[0]){
                if(rdo[0].type=="radio") rdo[0].click();
            }
        }

        var rdo3 = document.createElement("input");
        rdo3.type = "radio";
        rdo3.value = (((i*10)+1) + "-" + ((i+1)*10));
        rdo3.name = "group3";

        rdo3.onclick = function(){
            var tds = document.getElementsByName("group3");

            for(var k = 0; k < tds.length; k++){
                $("group3_" + tds[k].value).bgColor = "#DDDDDD";
            }

            this.offsetParent.bgColor = "#add8e6";

            var targets = document.getElementsByName("group3");
            var v = this.value.split("-");
            var start = v[0];
            var end = v[1];

            var val = start;

            for(var k = 0; k < targets.length; k++){
                var td = $("group4_" + (k+1));

                var irdo = td.getElementsByTagName("input");

                if(irdo){
                    irdo[0].value = val;
                }

                var ilbl = td.getElementsByTagName("label");

                if(ilbl){
                    ilbl[0].innerHTML = val;
                }

                val++;
            }

        }

        td3.appendChild(rdo3);

        var lbl3 = document.createElement("label");
        lbl3.style.width = "100%";
        lbl3.innerHTML = (((i*10)+1) + "-" + ((i+1)*10));

        td3.appendChild(lbl3);

        tblContent.appendChild(tr);
        tr.appendChild(td3);


        var td4 = document.createElement("td");
        td4.vAlign = "middle";
        td4.id = "group4_" + (i+1);
        td4.width = "14%";

        td4.onclick = function(){
            var rdo = this.getElementsByTagName("input");

            if(rdo[0]){
                if(rdo[0].type=="radio") rdo[0].click();
            }
        }

        var rdo4 = document.createElement("input");
        rdo4.type = "radio";
        rdo4.name = "group4";

        rdo4.onclick = function(){
            var tds = document.getElementsByName("group4");

            for(var k = 0; k < tds.length; k++){
                var p = String(tds[k].value).match(/\d$/);

                if(p){
                    $("group4_" + (p==0?10:p)).bgColor = "";
                }

            }

            this.offsetParent.bgColor = "#add8e6";
        }

        td4.appendChild(rdo4);

        var lbl4 = document.createElement("label");
        lbl4.style.width = "100%";
        lbl4.innerHTML = "&nbsp;";

        td4.appendChild(lbl4);

        tr.appendChild(td4);

        // SET 3:
        var td5 = document.createElement("td");
        td5.vAlign = "middle";
        td5.id = "group5_" + (((i*10)+1) + "-" + ((i+1)*10));
        td5.width = "19%";
        td5.bgColor = "#DDDDDD";

        td5.onclick = function(){
            var rdo = this.getElementsByTagName("input");

            if(rdo[0]){
                if(rdo[0].type=="radio") rdo[0].click();
            }
        }

        var rdo5 = document.createElement("input");
        rdo5.type = "radio";
        rdo5.value = (((i*10)+1) + "-" + ((i+1)*10));
        rdo5.name = "group5";

        rdo5.onclick = function(){
            var tds = document.getElementsByName("group5");

            for(var k = 0; k < tds.length; k++){
                $("group5_" + tds[k].value).bgColor = "#DDDDDD";
            }

            this.offsetParent.bgColor = "#add8e6";

            var targets = document.getElementsByName("group5");
            var v = this.value.split("-");
            var start = v[0];
            var end = v[1];

            var val = start;

            for(var k = 0; k < targets.length; k++){
                var td = $("group6_" + (k+1));

                var irdo = td.getElementsByTagName("input");

                if(irdo){
                    irdo[0].value = val;
                }

                var ilbl = td.getElementsByTagName("label");

                if(ilbl){
                    ilbl[0].innerHTML = val;
                }

                val++;
            }

        }

        td5.appendChild(rdo5);

        var lbl5 = document.createElement("label");
        lbl5.style.width = "100%";
        lbl5.innerHTML = (((i*10)+1) + "-" + ((i+1)*10));

        td5.appendChild(lbl5);

        tblContent.appendChild(tr);
        tr.appendChild(td5);


        var td6 = document.createElement("td");
        td6.vAlign = "middle";
        td6.id = "group6_" + (i+1);
        td6.width = "14%";

        td6.onclick = function(){
            var rdo = this.getElementsByTagName("input");

            if(rdo[0]){
                if(rdo[0].type=="radio") rdo[0].click();
            }
        }

        var rdo6 = document.createElement("input");
        rdo6.type = "radio";
        rdo6.name = "group6";

        rdo6.onclick = function(){
            var tds = document.getElementsByName("group6");

            for(var k = 0; k < tds.length; k++){
                var p = String(tds[k].value).match(/\d$/);

                if(p){
                    $("group6_" + (p==0?10:p)).bgColor = "";
                }

            }

            this.offsetParent.bgColor = "#add8e6";
        }

        td6.appendChild(rdo6);

        var lbl6 = document.createElement("label");
        lbl6.style.width = "100%";
        lbl6.innerHTML = "&nbsp;";

        td6.appendChild(lbl6);

        tr.appendChild(td6);
    }

}

function createLenteInsulinDosageFrequencyTable(drug, dosefreqdiv){
    var tbl = document.createElement("table");
    tbl.width = "100%";
    tbl.cellSpacing = 0;
    tbl.cellPadding = 3;

    var tbody = document.createElement("tbody");

    dosefreqdiv.appendChild(tbl);
    tbl.appendChild(tbody);

    var trTop = document.createElement("tr");
    var tdTop = document.createElement("th");
    tdTop.bgColor = "#CCCCCC";
    tdTop.align = "left";
    tdTop.innerHTML = "DOSAGE";

    tbl.appendChild(trTop);
    trTop.appendChild(tdTop);

    var trBody = document.createElement("tr");
    var tdBody = document.createElement("td");

    tbl.appendChild(trBody);
    trBody.appendChild(tdBody);

    var div = document.createElement("div");
    div.style.overflow = "auto";
    div.style.width = "100%";
    div.style.height = "calc(100vh - 180px)";
    div.style.backgroundColor = "#EEEEEE";

    tdBody.appendChild(div);

    var tblContent = document.createElement("table");
    tbl.id = "lente";
    tblContent.cellSpacing = 1;
    tblContent.cellPadding = 2;
    tblContent.width = "100%";
    tblContent.border = 0;
    tblContent.style.fontSize = "0.7em";

    var trHead = document.createElement("tr");

    var tdHead1 = document.createElement("th");
    tdHead1.innerHTML = "morning";
    tdHead1.bgColor = "#999999";
    tdHead1.style.color = "#EEEEEE";
    tdHead1.colSpan = 2;

    var tdHead2 = document.createElement("th");
    tdHead2.innerHTML = "lunchtime";
    tdHead2.bgColor = "#DDDDDD";
    tdHead2.style.color = "#EEEEEE";
    tdHead2.colSpan = 2;

    var tdHead3 = document.createElement("th");
    tdHead3.innerHTML = "evening";
    tdHead3.bgColor = "#999999";
    tdHead3.style.color = "#EEEEEE";
    tdHead3.colSpan = 2;

    div.appendChild(tblContent);
    tblContent.appendChild(trHead);

    trHead.appendChild(tdHead1);
    trHead.appendChild(tdHead2);
    trHead.appendChild(tdHead3);

    var durat = document.getElementsByName("duration");

    for(var k = 0; k < durat.length; k++){
        var d = durat[k].id.match(/(duration_cell_\d+)/);

        if(d){
            $(d[1]).bgColor = ((durations)?((durations[durat[k].value])?"#F0F000":""):"");
            $("rdo_" + d[1]).checked = false;
        }
    }

    for(var i = 0; i < 10; i++){
        var tr = document.createElement("tr");

        // SET 1:
        var td1 = document.createElement("td");
        td1.vAlign = "middle";
        td1.id = "group1_" + (((i*10)+1) + "-" + ((i+1)*10));
        td1.height = "40px";
        td1.width = "19%";
        td1.bgColor = "#DDDDDD";

        td1.onclick = function(){
            var rdo = this.getElementsByTagName("input");

            if(rdo[0]){
                if(rdo[0].type=="radio") rdo[0].click();
            }
        }

        var rdo1 = document.createElement("input");
        rdo1.type = "radio";
        rdo1.value = (((i*10)+1) + "-" + ((i+1)*10));
        rdo1.name = "group1";

        rdo1.onclick = function(){
            var tds = document.getElementsByName("group1");

            for(var k = 0; k < tds.length; k++){
                $("group1_" + tds[k].value).bgColor = "#DDDDDD";
            }

            this.offsetParent.bgColor = "#add8e6";

            var targets = document.getElementsByName("group1");
            var v = this.value.split("-");
            var start = v[0];
            var end = v[1];

            var val = start;

            for(var k = 0; k < targets.length; k++){
                var td = $("group2_" + (k+1));

                var irdo = td.getElementsByTagName("input");

                if(irdo){
                    irdo[0].value = val;
                }

                var ilbl = td.getElementsByTagName("label");

                if(ilbl){
                    ilbl[0].innerHTML = val;
                }

                val++;
            }

        }

        td1.appendChild(rdo1);

        var lbl1 = document.createElement("label");
        lbl1.style.width = "100%";
        lbl1.innerHTML = (((i*10)+1) + "-" + ((i+1)*10));

        td1.appendChild(lbl1);

        tblContent.appendChild(tr);
        tr.appendChild(td1);


        var td2 = document.createElement("td");
        td2.vAlign = "middle";
        td2.id = "group2_" + (i+1);
        td2.width = "14%";

        td2.onclick = function(){
            var rdo = this.getElementsByTagName("input");

            if(rdo[0]){
                if(rdo[0].type=="radio") rdo[0].click();
            }
        }

        var rdo2 = document.createElement("input");
        rdo2.type = "radio";
        rdo2.name = "group2";

        rdo2.onclick = function(){
            var tds = document.getElementsByName("group2");

            for(var k = 0; k < tds.length; k++){
                var p = String(tds[k].value).match(/\d$/);

                if(p){
                    $("group2_" + (p==0?10:p)).bgColor = "";
                }

            }

            this.offsetParent.bgColor = "#add8e6";
        }

        td2.appendChild(rdo2);

        var lbl2 = document.createElement("label");
        lbl2.style.width = "100%";
        lbl2.innerHTML = "&nbsp;";

        td2.appendChild(lbl2);

        tr.appendChild(td2);

        // SET 2:
        var td3 = document.createElement("td");
        td3.vAlign = "middle";
        td3.id = "group3_" + (((i*10)+1) + "-" + ((i+1)*10));
        td3.width = "19%";
        td3.bgColor = "#EAEAEA";

        tblContent.appendChild(tr);
        tr.appendChild(td3);


        var td4 = document.createElement("td");
        td4.vAlign = "middle";
        td4.id = "group4_" + (i+1);
        td4.width = "14%";
        td4.bgColor = "#EEEEEE";

        tr.appendChild(td4);

        // SET 3:
        var td5 = document.createElement("td");
        td5.vAlign = "middle";
        td5.id = "group5_" + (((i*10)+1) + "-" + ((i+1)*10));
        td5.width = "19%";
        td5.bgColor = "#DDDDDD";

        td5.onclick = function(){
            var rdo = this.getElementsByTagName("input");

            if(rdo[0]){
                if(rdo[0].type=="radio") rdo[0].click();
            }
        }

        var rdo5 = document.createElement("input");
        rdo5.type = "radio";
        rdo5.value = (((i*10)+1) + "-" + ((i+1)*10));
        rdo5.name = "group5";

        rdo5.onclick = function(){
            var tds = document.getElementsByName("group5");

            for(var k = 0; k < tds.length; k++){
                $("group5_" + tds[k].value).bgColor = "#DDDDDD";
            }

            this.offsetParent.bgColor = "#add8e6";

            var targets = document.getElementsByName("group5");
            var v = this.value.split("-");
            var start = v[0];
            var end = v[1];

            var val = start;

            for(var k = 0; k < targets.length; k++){
                var td = $("group6_" + (k+1));

                var irdo = td.getElementsByTagName("input");

                if(irdo){
                    irdo[0].value = val;
                }

                var ilbl = td.getElementsByTagName("label");

                if(ilbl){
                    ilbl[0].innerHTML = val;
                }

                val++;
            }

        }

        td5.appendChild(rdo5);

        var lbl5 = document.createElement("label");
        lbl5.style.width = "100%";
        lbl5.innerHTML = (((i*10)+1) + "-" + ((i+1)*10));

        td5.appendChild(lbl5);

        tblContent.appendChild(tr);
        tr.appendChild(td5);


        var td6 = document.createElement("td");
        td6.vAlign = "middle";
        td6.id = "group6_" + (i+1);
        td6.width = "14%";

        td6.onclick = function(){
            var rdo = this.getElementsByTagName("input");

            if(rdo[0]){
                if(rdo[0].type=="radio") rdo[0].click();
            }
        }

        var rdo6 = document.createElement("input");
        rdo6.type = "radio";
        rdo6.name = "group6";

        rdo6.onclick = function(){
            var tds = document.getElementsByName("group6");

            for(var k = 0; k < tds.length; k++){
                var p = String(tds[k].value).match(/\d$/);

                if(p){
                    $("group6_" + (p==0?10:p)).bgColor = "";
                }

            }

            this.offsetParent.bgColor = "#add8e6";
        }

        td6.appendChild(rdo6);

        var lbl6 = document.createElement("label");
        lbl6.style.width = "100%";
        lbl6.innerHTML = "&nbsp;";

        td6.appendChild(lbl6);

        tr.appendChild(td6);
    }

}

function createNormalDoseFrequencyTable(drug, dosefreqdiv){
    var c = drugs[drug];
    var freqcount = {};
    var frequency = [];
    var dose = [];
    var dosecount = {};
    var drugNames = [];
    var drugNamesCount = {};

    var tbl = document.createElement("table");
    tbl.cellSpacing = 1;
    tbl.cellPadding = 0;
    tbl.border = 0;
    tbl.width = "100%";
    tbl.bgColor = "#000000";

    var trmain1 = document.createElement("tr");
    var tdmain1 = document.createElement("th");
    tdmain1.width = "60%";
    tdmain1.bgColor = "#CCCCCC";
    tdmain1.style.verticalAlign = "top";
    
    var tdmain2 = document.createElement("th");
    tdmain2.width = "40%";
    tdmain2.bgColor = "#CCCCCC";
    tdmain2.style.verticalAlign = "top";

    trmain1.appendChild(tdmain1);
    trmain1.appendChild(tdmain2);
    tbl.appendChild(trmain1);
    dosefreqdiv.appendChild(tbl);

    var div1 = document.createElement("div");
    div1.style.width = "100%";
    div1.style.height = "calc(100vh - 180px)";
    div1.style.overflow = "auto";
    div1.id = "divDose";

    var div2 = document.createElement("div");
    div2.style.width = "100%";
    div2.style.height = "calc(100vh - 180px)";
    div2.style.overflow = "auto";
    div2.id = "divFreq";

    // GROUP 1
    var tbl1 = document.createElement("table");
    tbl1.style.width = "100%";
    // tbl1.style.height = "400px";
    tbl1.style.backgroundColor = "#EEEEEE";
    tbl1.border = 0;
    tbl1.cellPadding = 3;
    tbl1.cellSpacing = 0;

    var tbody1 = document.createElement("tbody");
    var tr1 = document.createElement("tr");
    var td1 = document.createElement("th");
    td1.innerHTML = "DOSAGE";
    td1.align = "left";
    td1.bgColor = "#CCCCCC";

    var tr1b = document.createElement("tr");
    var td1b = document.createElement("td");
    td1b.id = "idDosage";
    td1b.style.verticalAlign = "top";

    tr1.appendChild(td1);
    tbl1.appendChild(tr1);

    tr1b.appendChild(td1b);
    tbl1.appendChild(tr1b);

    tbl1.appendChild(tbody1);

    td1b.appendChild(div1);
    tdmain1.appendChild(tbl1);

    // GROUP 2
    var tbl2 = document.createElement("table");
    tbl2.style.width = "100%";
    // tbl2.style.height = "390px";
    tbl2.style.backgroundColor = "#EEEEEE";
    tbl2.border = 0;
    tbl2.cellPadding = 3;
    tbl2.cellSpacing = 0;

    var tbody2 = document.createElement("tbody");
    var tr2 = document.createElement("tr");
    var td2 = document.createElement("th");
    td2.innerHTML = "FREQUENCY";
    td2.align = "left";
    td2.bgColor = "#CCCCCC";

    var tr2b = document.createElement("tr");
    var td2b = document.createElement("td");
    td2b.id = "idFrequency";

    tr2.appendChild(td2);
    tbl2.appendChild(tr2);

    tr2b.appendChild(td2b);
    tbl2.appendChild(tr2b);

    tbl2.appendChild(tbody2);

    td2b.appendChild(div2);
    tdmain2.appendChild(tbl2);

    for(var i = 0; i < c.length; i++){
        if(c[i]){
            if(c[i][0]){
                if(!dosecount[c[i][0]]){
                    dose.push(c[i][0]);
                    dosecount[c[i][0]] = true;
                }
            }
            if(c[i][1]){
                if(!freqcount[ c[i][1]] ){
                    frequency.push( c[i][1] );
                    freqcount[ c[i][1] ] = true;
                }
            }
            if(c[i][2]) {
                drugNames.push(c[i][2]);
                drugNamesCount[c[i][2]] = true;
            }
        }
    }

    var durat = document.getElementsByName("duration");

    for(var k = 0; k < durat.length; k++){
        var d = durat[k].id.match(/(duration_cell_\d+)/);

        if(d){
            $(d[1]).bgColor = ((durations)?((durations[durat[k].value])?"#F0F000":""):"");
            $("rdo_" + d[1]).checked = false;
        }
    }

    var optTable1 = document.createElement("table");
    var optTBody1 = document.createElement("tbody");
    optTable1.width = "100%";
    optTable1.border = 0;
    optTable1.style.fontSize = "1.1em";
    optTable1.cellPadding = 5;

    optTable1.appendChild(optTBody1);

    div1.appendChild(optTable1);

    for(var i = 0; i < dose.length; i++){
        var optTr1 = document.createElement("tr");
        var optTd1 = document.createElement("td");
        optTd1.id = "dose_cell_"+i;
        optTd1.align = "left";
        optTd1.style.fontStyle = "normal";
        optTd1.bgColor = ((doses[drug+"_"+dose[i].match(/\d+(\.?\d+)?/g)[0]])?((doses[drug+"_"+dose[i].match(/\d+(\.?\d+)?/g)[0]])?"#F0F000":""):"");
       
        var optRadio1 = document.createElement("input");
        optRadio1.type = "radio";
        optRadio1.name = "dose";
        optRadio1.value = dose[i];
        optRadio1.setAttribute("drug", drugNames[i][2]);
        optRadio1.id = "rdo_dose_cell_"+i;

        optTd1.onclick = function(){
            var id = "rdo_" + this.id;
            $(id).click();
        }

        optRadio1.onclick = function(){
            var id = this.id.match(/(dose_cell_\d+)/);

            if(id){
                if(this.checked){
                    var c = document.getElementsByName("dose");

                    if(current_drug.toLowerCase()=="glibenclamide"){

                        var f = document.getElementsByName("frequency");

                        for(var g = 0; g < f.length; g++){
                            var o = f[g].id.match(/(frequency_cell_\d+)/);

                            f[g].disabled = false;

                            if(o){
                                $(o[1]).bgColor = ((freqs[drug+"_"+f[g].value])?((freqs[drug+"_"+f[g].value])?"#F0F000":""):"");
                            }
                        }

                    }
            
                    for(var k = 0; k < c.length; k++){
                        var d = c[k].id.match(/(dose_cell_\d+)/);

                        if(d){
                            if(c[k].value == "[10MG:AM],[5MG:PM]"){
                                $(d[1]).bgColor = ((doses[drug+"_10MG_AM_5MG_PM"])?((doses[drug+"_10MG_AM_5MG_PM"])?"#F0F000":""):"");
                            } else {
                                $(d[1]).bgColor = ((doses[drug+"_"+c[k].value.match(/\d+(\.?\d+)?/g)[0]])?((doses[drug+"_"+c[k].value.match(/\d+(\.?\d+)?/g)[0]])?"#F0F000":""):"");
                            }
                        }
                    }

                    $(id[1]).bgColor = "#add8e6";

                } else {
                    $(id[1]).bgColor = "";
                }
            }
        }

        optTd1.appendChild(optRadio1);
        optTr1.appendChild(optTd1);
        optTBody1.appendChild(optTr1);

        var lbl1 = document.createElement("label");
        lbl1.innerHTML = dose[i].toProperCase();

        optTd1.appendChild(lbl1);
    }

    if(drug.toLowerCase() == "glibenclamide"){
        var optTr = document.createElement("tr");
        var optTd = document.createElement("td");
        optTd.id = "dose_cell_1000";
        optTd.align = "left";
        optTd.style.fontStyle = "normal";
        optTd.bgColor = ((doses[drug+"_10MG_AM_5MG_PM"])?((doses[drug+"_10MG_AM_5MG_PM"])?"#F0F000":""):"");

        var optRadio = document.createElement("input");
        optRadio.type = "radio";
        optRadio.name = "dose";
        optRadio.value = "[10MG:AM],[5MG:PM]";
        optRadio.id = "rdo_dose_cell_1000";

        optTd.onclick = function(){
            var id = "rdo_" + this.id;
            $(id).click();
        }

        optRadio.onclick = function(){
            var id = this.id.match(/(dose_cell_\d+)/);

            if(id){
                if(this.checked){
                    var c = document.getElementsByName("dose");

                    for(var k = 0; k < c.length; k++){
                        var d = c[k].id.match(/(dose_cell_\d+)/);

                        if(d){
                            if(c[k].value == "[10MG:AM],[5MG:PM]"){
                                $(d[1]).bgColor = ((doses[drug+"_10MG_AM_5MG_PM"])?((doses[drug+"_10MG_AM_5MG_PM"])?"#F0F000":""):"");
                            } else {
                                $(d[1]).bgColor = ((doses[drug+"_"+c[k].value.match(/\d+(\.?\d+)?/g)[0]])?((doses[drug+"_"+c[k].value.match(/\d+(\.?\d+)?/g)[0]])?"#F0F000":""):"");
                            }
                        }
                    }

                    var f = document.getElementsByName("frequency");

                    for(var g = 0; g < f.length; g++){
                        var o = f[g].id.match(/(frequency_cell_\d+)/);

                        f[g].checked = false;
                        f[g].disabled = true;
                        
                        if(o){
                            $(o[1]).bgColor = ((freqs[drug+"_"+f[g].value])?((freqs[drug+"_"+f[g].value])?"#F0F000":"#DDDDDD"):"#DDDDDD"); //"#DDDDDD";
                        }
                    }

                    $(id[1]).bgColor = "#add8e6";

                } else {
                    $(id[1]).bgColor = "";
                }
            }
        }

        optTd.appendChild(optRadio);
        optTr.appendChild(optTd);
        optTBody1.appendChild(optTr);

        var lbl = document.createElement("label");
        lbl.innerHTML = "10mg AM : 5mg PM";

        optTd.appendChild(lbl);
    }

    var optTable2 = document.createElement("table");
    var optTBody2 = document.createElement("tbody");
    optTable2.width = "100%";
    optTable2.border = 0;
    optTable2.style.fontSize = "1.1em";
    optTable2.cellPadding = 5;

    optTable2.appendChild(optTBody2);

    div2.appendChild(optTable2);

    for(var i = 0; i < frequency.length; i++){
        var optTr2 = document.createElement("tr");
        var optTd2 = document.createElement("td");
        optTd2.id = "frequency_cell_"+i;
        optTd2.align = "left";
        optTd2.style.fontStyle = "normal";
        optTd2.bgColor = ((freqs[drug+"_"+frequency[i]])?((freqs[drug+"_"+frequency[i]])?"#F0F000":""):"");

        var optRadio2 = document.createElement("input");
        optRadio2.type = "radio";
        optRadio2.name = "frequency";
        optRadio2.value = frequency[i];
        optRadio2.id = "rdo_frequency_cell_"+i;

        optTd2.onclick = function(){
            var id = "rdo_" + this.id;
            $(id).click();
        }

        optRadio2.onclick = function(){
            var id = this.id.match(/(frequency_cell_\d+)/);

            if(id){
                if(this.checked){
                    var c = document.getElementsByName("frequency");

                    for(var k = 0; k < c.length; k++){
                        var d = c[k].id.match(/(frequency_cell_\d+)/);

                        if(d){
                            $(d[1]).bgColor = ((freqs[drug+"_"+c[k].value])?((freqs[drug+"_"+c[k].value])?"#F0F000":""):"");
                        }
                    }

                    $(id[1]).bgColor = "#add8e6";

                } else {
                    $(id[1]).bgColor = "";
                }
            }
        }

        optTd2.appendChild(optRadio2);
        optTr2.appendChild(optTd2);
        optTBody2.appendChild(optTr2);

        var lbl2 = document.createElement("label");
        lbl2.innerHTML = frequency[i];//.toProperCase();

        optTd2.appendChild(lbl2);
    }
}

function removeDrugs(){
    $("content").removeChild($('parent_container'));
}
