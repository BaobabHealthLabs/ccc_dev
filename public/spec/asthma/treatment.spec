P.1. TREATMENTS [program ::ASTHMA PROGRAM $$ scope:: TODAY $$ includejs :: touchScreenToolkit;generics;dispense $$ includecss :: dispense]

Q.1.1. Refill [pos :: 0 $$ field_type :: hidden $$ id :: Refill]

Q.1.2. Drugs [pos :: 1 $$ disabled :: true $$ tt_onLoad :: refill(); generateGenerics(); __$("patient_id").value = getCookie("patient_id"); __$("selfDispenseDrugs").value = window.parent.dashboard.modules[getCookie("currentProgram")].selfDispenseDrugs; $$ tt_onUnLoad :: removeGenerics() $$ tt_pageStyleClass :: NoControls NoKeyboard $$ optional :: true]

Q.1.3. Patient ID [pos :: 2 $$ id :: patient_id $$ name :: patient_id $$ disabled :: true $$ field_type :: hidden]

Q.1.4. datatype [pos :: 3 $$ field_type :: hidden $$ value :: prescriptions]

Q.1.5. selfDispenseDrugs [pos :: 4 $$ field_type :: hidden $$ id :: selfDispenseDrugs]