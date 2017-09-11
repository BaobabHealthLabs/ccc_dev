P.1. TREATMENTS [program ::EPILEPSY PROGRAM$$ scope:: TODAY $$ includejs :: touchScreenToolkit;generics;dispense $$ includecss :: dispense]

Q.1.1. Refill [pos :: 0 $$ field_type :: hidden $$ id :: Refill]

Q.1.2. Has patient taken Clinical medicine for seizure before? [pos :: 1$$tt_requirenextclick::false]
O.1.2.1. Yes
O.1.2.2. No

Q.1.3. Has patient taken traditional medicine for seizure before? [pos :: 2$$tt_requirenextclick::false$$parent::Has patient taken Clinical medicine for seizure before?]
O.1.3.1. Yes
O.1.3.2. No

Q.1.4. Seizure remission [pos :: 3$$tt_pageStyleClass:: NoKeyboard$$tt_requirenextclick::false$$parent::Has patient taken Clinical medicine for seizure before?]
O.1.4.1. Spontaneous
O.1.4.2. Has not improved
O.1.4.3. Has improved

Q.1.5. Confirm diagnosis of epilepsy? [pos :: 4$$id:: confirm_diagnosis_of_epilepsy$$tt_requirenextclick::false]
O.1.5.1. Yes
O.1.5.2. No

Q.1.6. Prescribe Epilepsy Drugs [pos :: 5$$id:: prescribe_epilepsy_drugs$$condition::__$('confirm_diagnosis_of_epilepsy').value=="Yes"$$parent::Confirm diagnosis of epilepsy?:Yes]
O.1.6.1. Yes
O.1.6.2. No

Q.1.7. Drugs [pos :: 6$$condition::__$('confirm_diagnosis_of_epilepsy').value=="Yes"&& __$('prescribe_epilepsy_drugs').value=="Yes"$$ disabled :: true $$ tt_onLoad :: generateGenerics(); __$("patient_id").value = getCookie("patient_id"); __$("selfDispenseDrugs").value = window.parent.dashboard.modules[getCookie("currentProgram")].selfDispenseDrugs; $$ tt_onUnLoad :: removeGenerics() $$ tt_pageStyleClass :: NoControls NoKeyboard $$ optional :: true$$parent::Confirm diagnosis of epilepsy?:Yes]

Q.1.8. Patient ID [pos :: 7 $$ id :: patient_id $$ name :: patient_id $$ disabled :: true $$ field_type :: hidden]

Q.1.9. datatype [pos :: 8 $$ field_type :: hidden $$ value :: prescriptions]

Q.1.10. selfDispenseDrugs [pos :: 9 $$ field_type :: hidden $$ id :: selfDispenseDrugs]



