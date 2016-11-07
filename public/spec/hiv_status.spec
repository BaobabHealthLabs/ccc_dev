P.1. HIV/ART STATUS [program :: CROSS-CUTTING PROGRAM $$ scope :: TODAY $$ includejs :: touchScreenToolkit;dm]

Q.1.1. HIV Status [pos:: 0 $$ tt_requireNextClick :: false$$ tt_pageStyleClass :: NoKeyboard]
O.1.1.1. Reactive
O.1.1.2. Non-Reactive
O.1.1.3. Unknown
O.1.1.4. Advised to test

Q.1.2. HIV Test Date [pos :: 1 $$ field_type :: date $$ condition :: __$("1.1").value == "Reactive" || __$("1.1").value == "Non-Reactive" $$ parent :: HIV Status]

Q.1.3. On ART? [pos :: 2 $$ condition :: __$("1.1").value == "Reactive" $$ parent :: HIV Status $$ tt_requireNextClick :: false]
O.1.3.1. Yes
O.1.3.2. No
O.1.3.3. Unknown

Q.1.3.1.1. ART Start Date [pos :: 3 $$ field_type :: date $$ parent :: HIV Status]


Q.1.4. Summary [pos :: 4 $$ id:: summary $$ tt_onLoad::showSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Summary $$condition::true]