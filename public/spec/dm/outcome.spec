P.1. UPDATE OUTCOME [program:: DIABETES PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;dm]

Q.1.1. Discharge outcome [pos:: 0$$ concept:: OUTCOME $$ id :: outcome]
O.1.1.1. Alive
O.1.1.2. Dead
O.1.1.3. Treatment stopped
O.1.1.4. Transfer out

Q.1.2. Refer to clinic [pos :: 1 $$ ajaxURL :: /facilities?name= $$ allowFreeText :: true $$ condition :: __$("outcome").value == "Transfer out" $$ parent :: OUTCOME]

Q.1.3. Outcome Date [pos:: 2$$ field_type :: date $$ parent :: OUTCOME]

Q.1.4. Summary [pos :: 3 $$ id:: summary $$ tt_onLoad::showSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Summary $$condition::true]