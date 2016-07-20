P.1. HYPERTENSION TEST [program:: HYPERTENSION PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit]

Q.1.1. Hypertension Test Type [pos :: 0$$ value :: Shortness of breath$$ field_type :: hidden]

Q.1.2. Any shortness breath? [pos :: 1$$ tt_requireNextClick :: false $$ parent :: Hypertension Test Type:Shortness of breath]
O.1.2.1. Yes
O.1.2.2. No

Q.1.2.1.1. Shortness of breath measure [pos :: 2$$ min :: 0$$ max :: 100$$ field_type :: number$$ tt_pageStyleClass :: Numeric NumbersOnlyWithDecimal $$ parent :: Hypertension Test Type:Shortness of breath]

Q.1.2.1.2. Shortness of breath Test Date [pos :: 4 $$ field_type:: date $$ estimate_label :: Year(s) ago $$ parent :: Hypertension Test Type:Shortness of breath]
