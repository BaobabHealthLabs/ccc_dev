P.1. HYPERTENSION TEST [program:: HYPERTENSION PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit]

Q.1.1. Hypertension Test Type [pos :: 0$$ value :: Oedema$$ field_type :: hidden]

Q.1.2. Any sign of Oedema? [pos :: 1$$ tt_requireNextClick :: false $$ parent :: Hypertension Test Type:Oedema]
O.1.2.1. Yes
O.1.2.2. No

Q.1.2.1.1. Oedema measure [pos :: 2$$ min :: 0$$ max :: 100$$ field_type :: number$$ tt_pageStyleClass :: Numeric NumbersOnlyWithDecimal $$ parent :: Hypertension Test Type:Oedema]

Q.1.2.1.2. Oedema Test Date [pos :: 4 $$ field_type:: date $$ estimate_label :: Year(s) ago $$ parent :: Hypertension Test Type:Oedema]
