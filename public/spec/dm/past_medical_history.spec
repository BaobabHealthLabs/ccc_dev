P.1. PAST DIABETES MEDICAL HISTORY [program:: DIABETES PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;dm]

Q.1.1. Select past medical history [pos:: 0$$ concept:: Past medical history$$ id:: medical_history$$ multiple:: multiple$$ tt_pageStyleClass:: MultiSelectList$$ optional:: true$$ tt_beforeUnLoad:: loadMultipleYears(__$("touchscreenInput" + tstCurrentPage).value.trim())]
O.1.1.1. Strokes
O.1.1.2. Serious Cardiac Problems
O.1.1.3. Hypertension
O.1.1.4. Other Medical Conditions

Q.1.2. Years of stroke(s) [pos:: 1$$ condition:: __$("medical_history").selectedOptions.map().indexOf("Strokes") >= 0$$ tt_pageStyleClass:: longSelectList NoKeyboard$$ id:: strokes$$ multiple:: multiple$$parent:: Past medical history]
O.1.2.1. 1950

Q.1.3. What Cardiac Problem? [pos:: 2$$ condition:: __$("medical_history").selectedOptions.map().indexOf("Serious Cardiac Problems") >= 0$$ concept:: Type of cardiac problem$$parent:: Past medical history]
O.1.3.1. Congestive Cardiac Failure (CCF)
O.1.3.2. Ischemic Heart Disease
O.1.3.3. Other

Q.1.3.3.1. Specify Other Type of Cardiac Problem [pos:: 3$$ concept:: Other Type of Cardiac Problem$$parent:: Past medical history]

Q.1.3.1.1. CCF Proven by echo? [pos:: 4$$ tt_onUnLoad:: loadYears("ccf_echo_year")$$parent:: Past medical history]
O.1.3.1.1.1. Yes
O.1.3.1.1.2. No

Q.1.3.1.1.1.1. Year CCF echo done [pos:: 5$$ id:: ccf_echo_year$$ optional:: true$$ tt_pageStyleClass:: longSelectList NoKeyboard$$parent:: Past medical history]
O.1.3.1.1.1.1.1. 1950

Q.1.4. Hypertension diagnosis year [pos:: 6$$ condition:: __$("medical_history").selectedOptions.map().indexOf("Hypertension") >= 0$$ id:: hypertension$$ tt_pageStyleClass:: longSelectList NoKeyboard$$parent:: Past medical history]
O.1.4.1. 1950

Q.1.5. Hypertension diagnosis month [pos:: 7$$ id:: hypertension_diagnosis_month$$ condition:: __$("medical_history").selectedOptions.map().indexOf("Hypertension") >= 0 && __$("hypertension").value.trim().toLowerCase() != "unknown" && ((new Date()).getFullYear() - parseInt(__$("hypertension").value.trim())) <= 2$$ tt_pageStyleClass:: longSelectList NoKeyboard$$parent:: Past medical history]
O.1.5.1. January
O.1.5.2. February
O.1.5.3. March
O.1.5.4. April
O.1.5.5. May
O.1.5.5. June
O.1.5.6. July
O.1.5.7. August
O.1.5.8. September
O.1.5.9. October
O.1.5.10. November
O.1.5.11. December

Q.1.6. Specify Other Type Medical Condition(s) [pos:: 8$$ concept:: Other Medical Conditions$$ condition:: __$("medical_history").selectedOptions.map().indexOf("Other Medical Conditions") >= 0$$parent:: Past medical history]

Q.1.7. Summary [pos :: 9 $$ id:: summary $$ tt_onLoad::showSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Diabetes Past Medical History Summary ]
