P.1. DIABETES TEST [program:: DIABETES PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;dm]

Q.1.1. Diabetes Test Type [pos:: 0$$ value:: Macrovascular $$ field_type :: hidden]

Q.1.2. Macrovascular Result [pos:: 1$$ tt_pageStyleClass:: LongSelectList noKeyboard$$ multiple:: multiple $$ parent :: Diabetes Test Type:Macrovascular]
O.1.2.1. Myocardial Infarction
O.1.2.2. Angina
O.1.2.3. Stroke
O.1.2.4. Peripheral Vascular Disease

Q.1.3. Macrovascular Result Test Date [pos:: 2$$ field_type:: date $$ estimate_label:: Year(s) ago $$ parent :: Diabetes Test Type:Macrovascular]

C.1.4. Summary [pos :: 4 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Macrovacular Test Summary $$condition::true]