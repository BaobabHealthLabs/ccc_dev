P.1. TREATMENTS [program ::EPILEPSY PROGRAM$$ scope:: TODAY $$ includejs :: touchScreenToolkit;treatment;epilepsydrugs;epilepsydrugsdata $$ includecss :: treatment]

Q.1.1. Has patient taken Clinical medicine for seizure before? [pos :: 0]
O.1.1.1. Yes
O.1.1.2. No

Q.1.2. Has patient taken traditional medicine for seizure before? [pos :: 1]
O.1.2.1. Yes
O.1.2.2. No

Q.1.3. Seizure remission [pos :: 2$$tt_pageStyleClass:: NoKeyboard]
O.1.3.1. Spontaneous
O.1.3.2. Has not improved
O.1.3.3. Has improved

Q.1.4. Confirm diagnosis of epilepsy? [pos :: 3$$id:: confirm_diagnosis_of_epilepsy]
O.1.4.1. Yes
O.1.4.2. No

Q.1.5. Prescribe Epilepsy Drugs [pos :: 4$$id:: prescribe_epilepsy_drugs$$condition::__$('confirm_diagnosis_of_epilepsy').value=="Yes"$$parent::Confirm diagnosis of epilepsy?:Yes]
O.1.5.1. Yes
O.1.5.2. No

Q.1.6. Drugs [pos :: 5$$condition::__$('confirm_diagnosis_of_epilepsy').value=="Yes"&& __$('prescribe_epilepsy_drugs').value=="Yes"$$ disabled :: true $$ tt_onLoad :: generateDrugs(); __$("patient_id").value = getCookie("patient_id"); __$("selfDispenseDrugs").value = window.parent.dashboard.modules[getCookie("currentProgram")].selfDispenseDrugs; $$ tt_onUnLoad :: removeDrugs() $$ tt_pageStyleClass :: NoControls NoKeyboard $$ optional :: true]

Q.1.7. Patient ID [pos :: 6 $$ id :: patient_id $$ name :: patient_id $$ disabled :: true $$ field_type :: hidden]

Q.1.8. datatype [pos :: 7 $$ field_type :: hidden $$ value :: prescriptions]

Q.1.9. selfDispenseDrugs [pos :: 8 $$ field_type :: hidden $$ id :: selfDispenseDrugs]



