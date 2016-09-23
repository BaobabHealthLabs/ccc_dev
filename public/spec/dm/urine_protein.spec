P.1. DIABETES TEST [program:: DIABETES PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;dm]

Q.1.1. Diabetes Test Type [pos :: 0$$ value :: Urine Protein $$ field_type :: hidden]

Q.1.2. Urine Protein Result [pos :: 1$$ tt_pageStyleClass :: LongSelectList noKeyboard $$ tt_requireNextClick :: false $$ parent :: Diabetes Test Type:Urine Protein]
O.1.2.1. Negative
O.1.2.2. Trace
O.1.2.3. +
O.1.2.4. ++
O.1.2.5. +++
O.1.2.6. ++++

Q.1.3. Urine Protein Result Test Date [pos :: 2 $$ field_type :: date $$ estimate_label :: Year(s) ago $$ parent :: Diabetes Test Type:Urine Protein]

Q.1.4. Summary [pos :: 3 $$ id:: summary $$ tt_onLoad::showSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Urine Protein Test Summary $$condition::true]