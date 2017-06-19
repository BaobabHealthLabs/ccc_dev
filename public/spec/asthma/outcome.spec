P.1. UPDATE OUTCOME [program:: ASTHMA PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;asthma]

Q.1.1. Outcome [pos:: 0$$ concept:: OUTCOME $$ tt_pageStyleClass::NoKeyboard $$ id :: outcome]
O.1.1.1. Admitted
O.1.1.2. Home
O.1.1.3. Treatment changed
O.1.1.4. Treatment stopped
O.1.1.5. Transfer out
O.1.1.6. Dead

Q.1.2. Refer to clinic [pos :: 1 $$ ajaxURL :: /static_locations?search_string= $$ allowFreeText :: true $$ condition :: __$("outcome").value == "Transfer out" $$ parent :: OUTCOME]

Q.1.3. Outcome Date [pos:: 2$$ field_type :: date $$ parent :: OUTCOME]

Q.1.4. Summary [pos :: 3 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Outcome Summary $$condition::true]