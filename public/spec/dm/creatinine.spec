P.1. DIABETES TEST [program:: DIABETES PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;dm]

Q.1.1. Diabetes Test Type [pos:: 0$$ value:: Creatinine$$ field_type :: hidden]

Q.1.2. Unit for Creatinine Value [pos:: 1$$ tt_requireNextClick:: false $$ parent :: Diabetes Test Type]
O.1.2.1. mg/dl
O.1.2.2. µmol/l

Q.1.2.1.1. Creatinine Result [pos:: 2$$ min:: 0.5$$ max:: 3.6$$ field_type:: number$$ tt_pageStyleClass:: Numeric NumbersOnlyWithDecimal $$ parent :: Diabetes Test Type]

Q.1.2.2.1. Creatinine Result [pos:: 3$$ min:: 45$$ max:: 330$$ field_type:: number$$ tt_pageStyleClass:: Numeric NumbersOnlyWithDecimal $$ parent :: Diabetes Test Type]

Q.1.3. Creatinine Test Date [pos:: 4$$ field_type:: birthdate$$ estimate_label:: Year(s) ago $$ parent :: Diabetes Test Type]