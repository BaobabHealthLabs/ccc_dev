P.1. DIABETES FAMILY HISTORY [program:: DIABETES PROGRAM$$ scope:: EXISTS$$ includejs:: touchScreenToolkit;dm]

Q.1.1. Family history of premature CVD death? [pos:: 0$$tt_requirenextclick::true]
O.1.1.1. Yes
O.1.1.2. No
O.1.1.3. Unknown

Q.1.2.  Family history of diabetes? [pos:: 1$$tt_requirenextclick::true $$parent :: Family history of premature CVD death?]
O.1.2.1. Yes
O.1.2.2. No
O.1.2.3. Unknown

Q.1.3.  Family history of hypertension? [pos:: 2$$tt_requirenextclick::true $$parent :: Family history of premature CVD death?]
O.1.3.1. Yes
O.1.3.2. No
O.1.3.3. Unknown

Q.1.4.  Family history kidney disease? [pos:: 3 $$parent :: Family history of premature CVD death?]
O.1.4.1. Yes
O.1.4.2. No
O.1.4.3. Unknown

Q.1.5. Summary [pos :: 4 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText:: Diabetes Family History Summary $$condition::true]