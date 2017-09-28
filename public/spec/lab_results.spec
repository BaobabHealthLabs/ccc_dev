P.1. LAB RESULTS [program:: CROSS-CUTTING PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;dm;lab]

Q.1.1. Select the type of test taken: [pos :: 0 $$ id :: test_types$$ tt_pageStyleClass :: MultiSelectList NoKeyboard$$ optional :: true $$ concept :: Blood Sugar Test Type]
O.1.1.1. Fasting Blood Sugar
O.1.1.2. Random Blood Sugar
O.1.1.3. Cholesterol Fasting
O.1.1.4. Cholesterol Not Fasting
O.1.1.5. HbA1c

Q.1.2. Select blood sugar units of measure [pos:: 1$$ condition:: __$("test_types").selectedOptions.map().indexOf("Fasting Blood Sugar") >= 0$$ concept:: Fasting Blood Sugar Units$$ tt_onLoad:: __$('infoBar'+tstCurrentPage).innerHTML = ' Fasting Blood Sugar'$$ tt_requireNextClick:: false$$ id:: fbs_unit$$ tt_onUnLoad:: resetPageAttributes(__$("fbs_value"), "fbs")]
O.1.2.1. mmol/l
O.1.2.2. mg/dl

Q.1.3. Fasting Blood Sugar value [pos:: 2$$ field_type:: number$$ validationRule:: ([0-9]+(\\.)*[0-9]*)|Unknown$ $$ validationMessage:: You must enter a decimal between 0 and 9 (for example: 36<b>.6</b>)$$ tt_pageStyleClass:: Numeric NumbersOnlyWithDecimal$$condition::__$("fbs_unit").value=="mmol/l" || __$("fbs_unit").value=="mg/dl"$$ id:: fbs_value]

Q.1.4. Select blood sugar units of measure [pos:: 3$$ condition:: __$("test_types").selectedOptions.map().indexOf("Random Blood Sugar") >= 0$$ concept:: Random Blood Sugar Units$$ tt_onLoad:: __$('infoBar'+tstCurrentPage).innerHTML = ' Random Blood Sugar'$$ tt_requireNextClick:: false$$ id:: rbs_unit$$ tt_onUnLoad:: resetPageAttributes(__$("rbs_value"), "rbs")]
O.1.4.1. mmol/l
O.1.4.2. mg/dl

Q.1.5. Random Blood Sugar value [pos:: 4$$ field_type:: number$$ validationRule:: ([0-9]+(\\.)*[0-9]*)|Unknown$ $$ validationMessage:: You must enter a decimal between 0 and 9 (for example: 36<b>.6</b>)$$ tt_pageStyleClass:: Numeric NumbersOnlyWithDecimal$$condition::__$("rbs_unit").value=="mmol/l" || __$("rbs_unit").value=="mg/dl"$$ id:: rbs_value]

Q.1.6. HbA1c value [pos:: 5$$ field_type:: number$$ validationRule:: ([0-9]+(\\.)*[0-9]*)|Unknown$ $$ validationMessage:: You must enter a decimal between 0 and 9 (for example: 36<b>.6</b>)$$ tt_pageStyleClass:: Numeric NumbersOnlyWithDecimal$$ id:: HbA1c_value$$ condition:: __$("test_types").selectedOptions.map().indexOf("HbA1c") >= 0$$ min:: 0$$ max:: 30$$ absoluteMin:: 0$$ absoluteMax:: 50$$ tt_onLoad:: resetPageAttributes(__$('touchscreenInput'+tstCurrentPage), 'hba1c')]

Q.1.7. Select cholesterol units of measure [pos:: 6$$ condition:: __$("test_types").selectedOptions.map().indexOf("Cholesterol Fasting") >= 0$$ concept:: Cholesterol Fasting Units$$ tt_onLoad:: __$('infoBar'+tstCurrentPage).innerHTML = ' Fasting Blood Sugar'$$ tt_requireNextClick:: false$$ id:: cf_unit$$ tt_onUnLoad:: resetPageAttributes(__$("cf_value"), "cf")]
O.1.7.1. mmol/l
O.1.7.2. mg/dl
O.1.7.3. Lo/Hi

Q.1.8. Cholesterol Fasting value [pos:: 7$$ field_type:: number$$ validationRule:: ([0-9]+(\\.)*[0-9]*)|Unknown$ $$ validationMessage:: You must enter a decimal between 0 and 9 (for example: 36<b>.6</b>)$$ tt_pageStyleClass:: Numeric NumbersOnlyWithDecimal$$ id:: cf_value$$ condition:: __$("test_types").selectedOptions.map().indexOf("Cholesterol Fasting") >= 0 && __$("cf_unit").value != "Lo/Hi"]

Q.1.9. Cholesterol Fasting value [pos:: 8$$ id:: cf_value$$ concept:: Cholesterol Fasting Lo/Hi Value$$ condition:: __$("test_types").selectedOptions.map().indexOf("Cholesterol Fasting") >= 0 && __$("cf_unit").value == "Lo/Hi"]
O.1.9.1. Lo
O.1.9.2. Hi

Q.1.10. Select cholesterol units of measure [pos:: 9$$ condition:: __$("test_types").selectedOptions.map().indexOf("Cholesterol Not Fasting") >= 0$$ concept:: Cholesterol Not Fasting Units$$ tt_onLoad:: __$('infoBar'+tstCurrentPage).innerHTML = ' Fasting Blood Sugar'$$ tt_requireNextClick:: false$$ id:: cnf_unit$$ tt_onUnLoad:: resetPageAttributes(__$("cnf_value"), "cnf")]
O.1.10.1. mmol/l
O.1.10.2. mg/dl
O.1.10.3. Lo/Hi

Q.1.11. Cholesterol Not Fasting value [pos:: 10$$ field_type:: number$$ validationRule:: ([0-9]+(\\.)*[0-9]*)|Unknown$ $$ validationMessage:: You must enter a decimal between 0 and 9 (for example: 36<b>.6</b>)$$ tt_pageStyleClass:: Numeric NumbersOnlyWithDecimal$$ id:: cnf_value$$ condition:: __$("test_types").selectedOptions.map().indexOf("Cholesterol Not Fasting") >= 0 && __$("cnf_unit").value != "Lo/Hi"]

Q.1.12. Cholesterol Not Fasting value [pos:: 11$$ id:: cnf_value$$ concept:: Cholesterol Not Fasting Lo/Hi Value$$ condition:: __$("test_types").selectedOptions.map().indexOf("Cholesterol Not Fasting") >= 0 && __$("cnf_unit").value == "Lo/Hi"]
O.1.12.1. Lo
O.1.12.2. Hi

Q.1.13. Summary [pos :: 12 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Summary $$condition::true]