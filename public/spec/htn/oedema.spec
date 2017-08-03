P.1. HYPERTENSION TEST [program:: HYPERTENSION PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;htn]

Q.1.1. Hypertension Test Type [pos :: 0$$ value :: Oedema$$ field_type :: hidden]

Q.1.2. Any sign of Oedema? [pos :: 1$$ tt_requireNextClick :: false $$ parent :: Hypertension Test Type:Oedema]
O.1.2.1. Yes
O.1.2.2. No

Q.1.2.1.1. Oedema measure [pos :: 2 $$ tt_requireNextClick :: false $$ parent :: Hypertension Test Type:Oedema]
O.1.2.1.1.1. Mild
O.1.2.1.1.2. Moderate
O.1.2.1.1.3. Severe

Q.1.2.1.2. Oedema Test Date [pos :: 4 $$ field_type:: date $$ estimate_label :: Year(s) ago $$ parent :: Hypertension Test Type:Oedema validateWithBirthDate()]

C.1.3. Summary [pos :: 5 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Oedama Test Summary $$condition::true]
