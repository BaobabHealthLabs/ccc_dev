P.1. HYPERTENSION SOCIAL HISTORY [program:: HYPERTENSION PROGRAM$$ scope:: EXISTS$$ includejs:: touchScreenToolkit;htn]

Q.1.1. Ever smoked?[pos::0$$id::smoke$$tt_requirenextclick::false]
O.1.1.1. Yes
O.1.1.2. No

Q.1.2. 	Do you currently smoke? [pos::1$$condition::__$("smoke").value == "Yes"$$parent::Ever smoked?$$id::current_smoke$$tt_requirenextclick::false]
O.1.2.1. Yes
O.1.2.2. No

Q.1.3. 	Number of cigarettes per day? [pos::2$$condition::__$("current_smoke").value.trim().toLowerCase() == "Yes"$$parent::Do you currently smoke?$$field_type::number$$tt_pageStyleClass :: Numeric NumbersOnlyWithDecimal$$min::0max::100]

Q.1.4. 	Do you drink alcohol? [pos::3$$id::alcohol$$tt_requirenextclick::false]
O.1.4.1. Yes
O.1.4.2. No

Q.1.5. 	Are you a heavy alcohol drinker? [pos::4$$condition::__$("alcohol").value == "Yes"$$parent::Do you drink alcohol?$$tt_requirenextclick::false]
O.1.5.1. Yes
O.1.5.2. No

Q.1.6. 	Do you do Exercises? [pos::5$$tt_requirenextclick::false]
O.1.6.1. Yes
O.1.6.2. No

Q.1.7. Occupation [pos:: 6$$allowFreeText:: true]
O.1.7.1. Business
O.1.7.2. Craftsman
O.1.7.3. Driver
O.1.7.4. Domestic worker
O.1.7.5. Farmer
O.1.7.6. Healthcare worker
O.1.7.7. Housewife
O.1.7.8. Mechanic
O.1.7.9. Messenger
O.1.7.10. Office worker
O.1.7.11. Police
O.1.7.12. Preschool child
O.1.7.13. Prisoner
O.1.7.14. Salesperson
O.1.7.15. Security guard
O.1.7.16. Soldier
O.1.7.17. Student
O.1.7.18. Teacher
O.1.7.19. Other

Q.1.8. Summary [pos :: 7 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Hypertension Social History Summary $$condition::true]
