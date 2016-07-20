P.1. HYPERTENSION SOCIAL HISTORY [program:: HYPERTENSION PROGRAM$$ scope:: EXISTS$$ includejs:: touchScreenToolkit;htn]

Q.1.1. Ever smoked?[pos::0$$tt_requirenextclick::false]
O.1.1.1. Yes
O.1.1.2. No

Q.1.2. 	Do you currently smoke? [pos::1$$id::smoke$$tt_requirenextclick::false]
O.1.2.1. Yes
O.1.2.2. No

Q.1.3. 	Number of cigarette per day? [pos::2$$condition::__$("smoke").value == "Yes"$$parent::Do you currently smoke?$$field_type::number$$tt_pageStyleClass :: Numeric NumbersOnlyWithDecimal$$min::0max::30]

Q.1.4. 	Do you drink alcohol? [pos::3$$id::alcohol$$tt_requirenextclick::false]
O.1.4.1. Yes
O.1.4.2. No

Q.1.5. 	Are you a heavy alcohol drinker? [pos::4$$condition::__$("alcohol").value == "Yes"$$parent::Do you drink alcohol?$$tt_requirenextclick::false]
O.1.5.1. Yes
O.1.5.2. No

Q.1.6. 	Do you do Exercises? [pos::5$$tt_requirenextclick::false]
O.1.6.1. Yes
O.1.6.2. No

Q.1.7. Occupation [pos:: 6$$allowFreeText:: true$$ajaxURL::/occupations_query$$optional::true]
