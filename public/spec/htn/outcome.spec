P.1. UPDATE OUTCOME [program:: HYPERTENSION PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;htn]

Q.1.1. Outcome [pos:: 0$$ concept:: OUTCOME$$tt_requirenextclick::false]
O.1.1.1. Alive
O.1.1.2. Dead
O.1.1.3. Treatment changed
O.1.1.4. Treatment stopped
O.1.1.5. Transfer out

Q.1.1.4.1. Refer to clinic [pos:: 1$$ ajaxURL:: /facilities?name=$$ allowFreeText:: true]

Q.1.2. Outcome Date [pos:: 2$$ field_type:: date]

Q.1.3. Notes [pos:: 3]

Q.1.4. Summary [pos :: 4 $$ id:: summary $$ tt_onLoad::showSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Summary $$condition::true]