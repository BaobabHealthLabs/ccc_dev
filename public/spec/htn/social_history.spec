P.1. HYPERTENSION SOCIAL HISTORY [program:: HYPERTENSION PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;htn]

Q.1.1. Ever smoked?[pos::0]
O.1.1.1. Yes
O.1.1.2. No

Q.1.2. 	Do you currently smoke? [pos::1$$id::smoke]
O.1.2.1. Yes
O.1.2.2. No

Q.1.3. 	Number of cigarette per day? [pos::2$$condition::__$("smoke").value == "Yes"$$parent::Do you currently smoke?$$field_type::number]

Q.1.4. 	Do you do Exercises? [pos::3]
O.1.4.1. Yes
O.1.4.2. No

Q.1.5. Occupation [pos:: 4$$allowFreeText:: true$$ajaxURL::/occupations_query$$optional::true]
