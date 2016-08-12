P.1. UPDATE OUTCOME [program:: DIABETES PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;asthma]

Q.1.1. Discharge outcome [pos:: 0$$ concept:: OUTCOME $$ id :: outcome]
O.1.1.1. Dead
O.1.1.2. Treatment stopped
O.1.1.3. Transfer out

Q.1.2. Refer to clinic [pos :: 1 $$ ajaxURL :: /static_locations?search_string= $$ allowFreeText :: true $$ condition :: __$("outcome").value == "Transfer out" $$ parent :: OUTCOME]

Q.1.3. Outcome Date [pos:: 2$$ field_type :: date $$ parent :: OUTCOME]