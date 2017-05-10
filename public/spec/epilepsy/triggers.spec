P.1. TRIGGERS [program:: EPILEPSY PROGRAM$$ scope:: EXISTS$$ includejs:: touchScreenToolkit;epilepsy]

Q.1.1. Any triggers [pos::0$$id::triggers]
O.1.1.1. Yes
O.1.1.2. No

Q.1.2. Sound /Light /Touch a trigger? [pos:: 1$$tt_requirenextclick::false$$condition::__$("triggers").value == "Yes"$$parent::Any triggers]
O.1.2.1. Yes
O.1.2.2. No
O.1.2.3. Unknown

Q.1.3. Emotional Stress /Anger /Boredom a trigger? [pos:: 2$$tt_requirenextclick::false$$condition::__$("triggers").value == "Yes"$$parent::Any triggers]
O.1.3.1. Yes
O.1.3.2. No
O.1.3.3. Unknown

Q.1.4. Sleep deprivation / Overtiredness a trigger? [pos:: 3$$tt_requirenextclick::false$$condition::__$("triggers").value == "Yes"$$parent::Any triggers]
O.1.4.1. Yes
O.1.4.2. No
O.1.4.3. Unknown

Q.1.5. Missed medication a trigger? [pos:: 4$$tt_requirenextclick::false$$condition::__$("triggers").value == "Yes"$$parent::Any triggers]
O.1.5.1. Yes
O.1.5.2. No
O.1.5.3. Unknown

Q.1.6. Menstruation a trigger? [pos:: 5$$tt_requirenextclick::false$$condition::patientIsANC()&&__$("triggers").value == "Yes"$$parent::Any triggers]
O.1.6.1. Yes
O.1.6.2. No
O.1.6.3. Unknown

Q.1.7. Alcohol a trigger? [pos:: 6$$tt_requirenextclick::false$$condition::__$("triggers").value == "Yes"$$parent::Any triggers]
O.1.7.1. Yes
O.1.7.2. No
O.1.7.3. Unknown

Q.1.8. Fever a trigger? [pos::7$$condition::__$("triggers").value == "Yes"$$parent::Any triggers]
O.1.8.1. Yes
O.1.8.2. No
O.1.8.3. Unknown

Q.1.9. Summary [pos :: 7 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Triggers Summary $$condition::true]
