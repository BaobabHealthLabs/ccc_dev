P.1. HYPERTENSION TEST [program:: HYPERTENSION PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;htn]

Q.1.1. Hypertension Test Type [pos :: 0$$ value :: Shortness of breath$$ field_type :: hidden]

Q.1.2. Any shortness breath? [pos :: 1$$ tt_requireNextClick :: false $$ parent :: Hypertension Test Type:Shortness of breath]
O.1.2.1. Yes
O.1.2.2. No

Q.1.2.1.1. Shortness of breath measure [pos :: 2 $$ parent :: Hypertension Test Type:Shortness of breath]
O.1.2.1.1.1. Mild
O.1.2.1.1.2. Moderate
O.1.2.1.1.3. Severe

Q.1.2.1.2. Shortness of breath Test Date [pos :: 4 $$ field_type:: date $$ estimate_label :: Year(s) ago $$ parent :: Hypertension Test Type:Shortness of breath validateWithBirthDate()]

C.1.3. Summary [pos :: 5 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Shortness of breath Test Summary $$condition::true]
