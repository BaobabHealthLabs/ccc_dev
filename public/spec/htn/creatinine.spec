P.1. HYPERTENSION TEST [program:: HYPERTENSION PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit]

Q.1.1. Hypertension Test Type [pos :: 0$$ value :: Creatinine$$ field_type :: hidden]

Q.1.2. Unit for Creatinine Value [pos :: 1$$ tt_requireNextClick :: false $$ parent :: Hypertension Test Type:Creatinine]
O.1.2.1. mg/dl
O.1.2.2. µmol/l

Q.1.2.1.1. Creatinine Result [pos :: 2$$ min :: 0.5$$ max :: 3.6$$ field_type :: number$$ tt_pageStyleClass :: Numeric NumbersOnlyWithDecimal $$ parent :: Hypertension Test Type:Creatinine]

Q.1.2.2.1. Creatinine Result [pos :: 3$$ min:: 45$$ max:: 330$$ field_type:: number$$ tt_pageStyleClass:: Numeric NumbersOnlyWithDecimal $$ parent :: Hypertension Test Type:Creatinine]

Q.1.3. Creatinine Test Date [pos :: 4 $$ field_type:: date $$ estimate_label :: Year(s) ago $$ parent :: Hypertension Test Type:Creatinine]
