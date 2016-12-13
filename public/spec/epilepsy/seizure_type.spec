P.1. SEIZURE TYPE [program:: EPILEPSY PROGRAM$$ scope:: EXISTSY$$ includejs:: touchScreenToolkit;epilepsy]
Q.1.1. Epilepsy Category [pos:: 0$$id::epilepsy_category$$tt_requirenextclick::false]
O.1.1.1. Generalized Epilepsy
O.1.1.2. Partial Epilepsy

Q.1.2. Generalized Epilepsy [pos::1$$allowFreeText:: false$$condition::__$('epilepsy_category').value=="Generalized Epilepsy"$$parent::Epilepsy Category:Generalized Epilepsy]
O.1.2.1. Tonic clonic
O.1.2.2. Absence
O.1.2.3. Myoclonic
O.1.2.4. Clonic
O.1.2.5. Tonic
O.1.2.6. Atonic

Q.1.3. Partial Epilepsy [pos:: 2$$allowFreeText:: false$$condition::__$('epilepsy_category').value=="Partial Epilepsy"$$parent::Epilepsy Category:Partial Epilepsy]
O.1.3.1. Simple
O.1.3.2. Complex
O.1.3.3. Unclassfied

Q.1.4. Summary [pos :: 3 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Seizure Type Summary $$condition::true]

