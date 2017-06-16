P.1. ASTHMA SOCIAL HISTORY [program:: ASTHMA PROGRAM$$ scope:: EXISTS$$includejs:: touchScreenToolkit;asthma]

Q.1.1. Ever smoked?[pos::0$$id::smoke$$tt_requirenextclick::false]
O.1.1.1. Yes
O.1.1.2. No

Q.1.2. 	Do you currently smoke? [pos::1$$condition::__$("smoke").value == "Yes"$$parent::Ever smoked?$$id::current_smoke$$tt_requirenextclick::false]
O.1.2.1. Yes
O.1.2.2. No

Q.1.3. 	Number of cigarettes per day? [pos::2 $$ condition::__$("current_smoke").value.trim().toLowerCase() == "yes" $$parent::Ever smoked?$$field_type::number$$tt_pageStyleClass :: Numeric NumbersOnlyWithDecimal$$min::0max::100]

Q.1.4. 	Do you drink alcohol? [pos::3$$id::alcohol$$tt_requirenextclick::false$$parent:: Ever smoked?]
O.1.4.1. Yes
O.1.4.2. No

Q.1.5. 	Are you a heavy alcohol drinker? [pos::4$$condition::__$("alcohol").value == "Yes"$$parent::Do you drink alcohol?$$tt_requirenextclick::false$$parent:: Ever smoked?]
O.1.5.1. Yes
O.1.5.2. No

Q.1.6. 	Do you do Exercises? [pos::5$$tt_requirenextclick::false$$parent:: Ever smoked?]
O.1.6.1. Yes
O.1.6.2. No

Q.1.7. Patient mode of cooking? [pos::6$$tt_requirenextclick::false$$ tt_pageStyleClass::NoKeyboard$$parent:: Ever smoked?]
O.1.7.1. Gas
O.1.7.2. Electricity
O.1.7.3. Charcoal
O.1.7.4. Firewood
O.1.7.5. None

Q.1.8. Patient exposed to pollution?[pos ::7$$tt_requirenextclick::false$$parent:: Ever smoked?]
O.1.8.1. Yes
O.1.8.2. No

Q.1.9. Patient lives or works near? [pos::8$$id::social_near$$tt_requirenextclick::false$$parent:: Ever smoked?]
O.1.9.1. Near factory
O.1.9.2. Near hospital
O.1.9.3. Other

Q.1.10. Other Location [pos::9$$condition::__$('social_near').value=='Other'$$ concept:: Other Location$$parent::Ever smoked?]

Q.1.11. Occupation [pos:: 10$$optional::true$$parent:: Ever smoked?]
O.1.11.1. Business
O.1.11.2. Craftsman
O.1.11.3. Driver
O.1.11.4. Domestic worker
O.1.11.5. Farmer
O.1.11.6. Healthcare worker
O.1.11.7. Housewife
O.1.11.8. Mechanic
O.1.11.9. Messenger
O.1.11.10. Office worker
O.1.11.11. Police
O.1.11.12. Preschool child
O.1.11.13. Prisoner
O.1.11.14. Salesperson
O.1.11.15. Security guard
O.1.11.16. Soldier
O.1.11.17. Student
O.1.11.18. Teacher
O.1.11.19. Other

Q.1.12. Summary [pos :: 11 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Asmatha Social History Summary $$condition::true]

