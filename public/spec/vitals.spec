P.1. VITALS [program:: CROSS-CUTTING PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;dm]

Q.1.1. Temperature (<sup>o</sup>C) [pos:: 0$$ concept:: Temperature (C)$$ condition:: window.parent.dashboard.modules[window.parent.dashboard.getCookie("currentProgram")].vitals && window.parent.dashboard.modules[window.parent.dashboard.getCookie("currentProgram")].vitals.ask_temperature$$ field_type:: number$$ min:: 20$$ max:: 45$$ validationRule:: ([0-9]+(\\.)*[0-9]*)|Unknown$ $$ validationMessage:: You must enter a decimal between 0 and 9 (for example: 36<b>.6</b>) $$ tt_pageStyleClass:: Numeric NumbersOnlyWithDecimal]

Q.1.2. Systolic Blood Pressure [pos:: 1$$ concept:: Systolic Blood Pressure$$ condition:: window.parent.dashboard.modules[window.parent.dashboard.getCookie("currentProgram")].vitals && window.parent.dashboard.modules[window.parent.dashboard.getCookie("currentProgram")].vitals.ask_blood_pressure$$ field_type:: number$$ id:: systolic_blood_pressure$$ min:: 80$$ max:: 180:: absoluteMin:: 40$$ absoluteMax:: 250$$ validationRule:: ^([0-9]+)|Unknown$ $$ validationMessage:: You must enter numbers only (for example 157)$$ tt_pageStyleClass:: Numeric NumbersOnly]

Q.1.3. Diastolic Blood Pressure [pos:: 2$$ concept:: Diastolic Blood Pressure$$ condition:: window.parent.dashboard.modules[window.parent.dashboard.getCookie("currentProgram")].vitals && window.parent.dashboard.modules[window.parent.dashboard.getCookie("currentProgram")].vitals.ask_blood_pressure$$ field_type:: number$$ id:: diastolic_blood_pressure$$ min:: 50$$ max:: 110:: absoluteMin:: 30$$ absoluteMax:: 200$$ validationRule:: ^([0-9]+)|Unknown$ $$ validationMessage:: You must enter numbers only (for example 157)$$ tt_pageStyleClass:: Numeric NumbersOnly]

C.1.4. Blood Pressure Graph [pos:: 3$$ optional:: true$$ tt_pageStyleClass:: NoControls NoKeyboard$$ tt_onLoad:: showBloodPressureGraphs()]

Q.1.5. Weight (kg) [pos:: 4$$ field_type:: number$$ absoluteMin:: 0$$ validationRule:: ([0-9]+(\\.)*[0-9]*)|Unknown$ $$ validationMessage:: You must enter a decimal between 0 and 9 (for example: 54<b>.6</b>)$$ tt_pageStyleClass:: Numeric NumbersOnlyWithDecimal]

Q.1.6. Height (cm) [pos:: 5$$ field_type:: number$$ absoluteMin:: 10$$ absoluteMax:: 228$$ validationRule:: ([0-9]+(\\.)*[0-9]*)|Unknown$ $$ validationMessage:: You must enter numbers only (for example 157)$$ tt_pageStyleClass:: Numeric NumbersOnly$$ condition:: !window.parent.dashboard.queryAnyExistingObs("Height (cm)") || (window.parent.dashboard.queryAnyExistingObs("Height (cm)") && window.parent.dashboard.age <= 14)]

Q.1.6. Summary [pos :: 6 $$ id:: summary $$ tt_onLoad::showSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Summary $$condition::true]