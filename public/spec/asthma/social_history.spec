P.1. ASTHMA SOCIAL HISTORY [program:: ASTHMA PROGRAM$$ scope:: EXISTS$$includejs:: touchScreenToolkit;asthma]

Q.1.1. Ever smoked?[pos::0$$id::smoke$$tt_requirenextclick::false]
O.1.1.1. Yes
O.1.1.2. No

Q.1.2. 	Do you currently smoke? [pos::1$$condition::__$("smoke").value == "Yes"$$parent::Ever smoked?$$id::current_smoke$$tt_requirenextclick::false]
O.1.2.1. Yes
O.1.2.2. No

Q.1.3. 	Number of cigarettes per day? [pos::2 $$ condition::__$("current_smoke").value.trim().toLowerCase() == "yes" $$parent::Do you currently smoke?$$field_type::number$$tt_pageStyleClass :: Numeric NumbersOnlyWithDecimal$$min::0max::100]

Q.1.4. 	Do you drink alcohol? [pos::3$$id::alcohol$$tt_requirenextclick::false]
O.1.4.1. Yes
O.1.4.2. No

Q.1.5. 	Are you a heavy alcohol drinker? [pos::4$$condition::__$("alcohol").value == "Yes"$$parent::Do you drink alcohol?$$tt_requirenextclick::false]
O.1.5.1. Yes
O.1.5.2. No

Q.1.6. 	Do you do Exercises? [pos::5$$tt_requirenextclick::false$$parent:: Ever smoked?]
O.1.6.1. Yes
O.1.6.2. No

Q.1.7. Patient mode of cooking? [pos::6$$tt_requirenextclick::false$$parent:: Ever smoked?]
O.1.7.1. Gas
O.1.7.2. Electricity
O.1.7.3. Charcoal
O.1.7.4. None

Q.1.8. Patient exposed to pollution?[pos ::7$$tt_requirenextclick::false$$parent:: Ever smoked?]
O.1.8.1. Yes
O.1.8.2. No

Q.1.9. Patient lives or works near? [pos::8$$tt_requirenextclick::false$$parent:: Ever smoked?]
O.1.9.1. Near factory
O.1.9.2. Near hospital
O.1.9.1. None


Q.1.10. Occupation [pos:: 9$$optional::true$$parent:: Ever smoked?]
O.1.10.1. Business
O.1.10.2. Craftsman
O.1.10.3. Driver
O.1.10.4. Domestic worker
O.1.10.5. Farmer
O.1.10.6. Healthcare worker
O.1.10.7. Housewife
O.1.10.8. Mechanic
O.1.10.9. Messenger
O.1.10.10. Office worker
O.1.10.11. Police
O.1.10.12. Preschool child
O.1.10.13. Prisoner
O.1.10.14. Salesperson
O.1.10.15. Security guard
O.1.10.16. Soldier
O.1.10.17. Student
O.1.10.18. Teacher
O.1.10.19. Other

Q.1.11. Summary [pos :: 10 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Asmatha Social History Summary $$condition::true]

