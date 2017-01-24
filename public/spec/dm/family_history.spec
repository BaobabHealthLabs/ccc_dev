P.1. DIABETES FAMILY HISTORY [program:: DIABETES PROGRAM$$ scope:: EXISTS$$ includejs:: touchScreenToolkit;dm]

Q.1.1. Family History Of Premature CVD Death? [pos:: 0$$tt_requirenextclick::true]
O.1.1.1. Yes
O.1.1.2. No
O.1.1.3. Unknown

Q.1.2.  Family History Of Diabetes? [pos:: 1$$tt_requirenextclick::true $$parent :: Family History Of Premature CVD Death?]
O.1.2.1. Yes
O.1.2.2. No
O.1.2.3. Unknown

Q.1.3.  Family History Of Hypertension? [pos:: 2$$tt_requirenextclick::true $$parent :: Family History Of Premature CVD Death?]
O.1.3.1. Yes
O.1.3.2. No
O.1.3.3. Unknown

Q.1.4.  Family History Kidney disease? [pos:: 3 $$parent :: Family History Of Premature CVD Death?]
O.1.4.1. Yes
O.1.4.2. No
O.1.4.3. Unknown

Q.1.5. Summary [pos :: 4 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText:: Diabetes Family History Summary $$condition::true]