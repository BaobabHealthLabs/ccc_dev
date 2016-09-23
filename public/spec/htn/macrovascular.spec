P.1. HYPERTENSION TEST [program:: HYPERTENSION PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;htn]

Q.1.1. Hypertension Test Type [pos:: 0$$ value:: Macrovascular $$ field_type :: hidden]

Q.1.2. Macrovascular Result [pos:: 1$$ tt_pageStyleClass:: LongSelectList noKeyboard$$ multiple:: multiple $$ parent :: Hypertension Test Type:Macrovascular]
O.1.2.1. Myocardial Infarction
O.1.2.2. Angina
O.1.2.3. Stroke
O.1.2.4. Peripheral Vascular Disease
O.1.2.5. Cerebrovascular accident

Q.1.3. Macrovascular Result Test Date [pos:: 2$$ field_type:: date $$ estimate_label:: Year(s) ago $$ parent :: Hypertension Test Type:Macrovascular]

Q.1.4. Summary [pos :: 3 $$ id:: summary $$ tt_onLoad::showSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Macrovascular Test Summary $$condition::true]