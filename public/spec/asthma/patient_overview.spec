P.1. ASTHMA PATIENT OVERVIEW [program:: ASTHMA PROGRAM$$ scope:: EXISTS$$includejs:: touchScreenToolkit;asthma]
Q.1.1. Diagnosis [pos:: 0$$id:: diagnosis$$ multiple:: multiple$$tt_beforeUnLoad::loadCheckConditions()]
O.1.1.1. Asthma
O.1.1.2. COPD

Q.1.2. Asthma diagnosis date [pos:: 1$$field_type::date$$ id:: asthma_date$$condition::false]

Q.1.3. COPD diagnosis date [pos:: 2$$field_type::date$$ id:: copd_date$$condition::false]

Q.1.4. Family History of Asthma? [pos:: 3$$tt_requirenextclick::false]
O.1.4.1. Yes
O.1.4.2. No

Q.1.5. Family History of COPD? [pos:: 4$$tt_requirenextclick::false]
O.1.5.1. Yes
O.1.5.2. No

Q.1.6. HIV Status [pos::5$$id::hiv_status$$tt_requirenextclick::false]
O.1.6.1. R
O.1.6.2. NR
O.1.6.3. U
O.1.6.4. VDRL

Q.1.7. ART start Date [pos::6$$field_type::date$$condition::__$("hiv_status").value=="R"]


Q.1.8. Patient History and Exposures [pos::7$$id::complications$$multiple:: multiple$$tt_beforeUnLoad::loadCheckConditions()]
O.1.8.1. Chronic dry cough
O.1.8.2. Indoor cooking
O.1.8.3. Occupational Exposure
O.1.8.4. TB Contact
O.1.8.5. Smoking
O.1.8.6. Secondhand smoking

Q.1.9. Chronic dry cough duration [pos:: 8$$id::chronic_dry_cough0]

Q.1.10. Chronic dry cough Age onset   [pos:: 9$$field_type::number$$ id::chronic_dry_cough1]

Q.1.11. Indoor cooking date [pos:: 10$$field_type::date$$id::indoor_cooking_date]

Q.1.12. Occupation [pos:: 11$$ id:: occupation$$optional::true$$id::occupational_exposure0]

Q.1.13. Occupation Exposure Date[pos:: 12$$id::occupational_exposure1]

Q.1.15. TB Contact Date [pos:: 14$$field_type::date$$ id::tb_contact_date]

Q.1.16. Smocking Date [pos:: 15$$field_type::date$$ id:: smoking_date]

Q.1.17. Secondhand smocking Date [pos:: 15$$field_type::date$$ id::secondhand_smoking_date]
