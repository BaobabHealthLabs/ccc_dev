P.1. TREATMENTS [program :: DIABETES PROGRAM $$ scope:: TODAY $$ includejs :: touchScreenToolkit;treatment;drugs;drugsdata $$ includecss :: treatment]

Q.1.1. Drugs [pos :: 0 $$ disabled :: true $$ tt_onLoad :: generateDrugs(); __$("patient_id").value = getCookie("patient_id"); __$("selfDispenseDrugs").value = window.parent.dashboard.modules[getCookie("currentProgram")].selfDispenseDrugs; $$ tt_onUnLoad :: removeDrugs() $$ tt_pageStyleClass :: NoControls NoKeyboard $$ optional :: true]

Q.1.2. Patient ID [pos :: 1 $$ id :: patient_id $$ name :: patient_id $$ disabled :: true $$ field_type :: hidden]

Q.1.3. datatype [pos :: 2 $$ field_type :: hidden $$ value :: prescriptions]

Q.1.4. selfDispenseDrugs [pos :: 3 $$ field_type :: hidden $$ id :: selfDispenseDrugs]