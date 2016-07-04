P.1. UPDATE OUTCOME [program:: DIABETES PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;dm]

Q.1.1. Discharge outcome [pos:: 0$$ concept:: OUTCOME]
O.1.1.1. Alive
O.1.1.2. Dead
O.1.1.3. Treatment stopped
O.1.1.4. Transfer out

Q.1.1.4.1. Refer to clinic [pos:: 1$$ ajaxURL:: /static_locations?search_string=$$ allowFreeText:: true $$ parent :: OUTCOME]

Q.1.2. Outcome Date [pos:: 2$$ field_type:: date $$ parent :: OUTCOME]