P.1. DIABETES INITIAL QUESTIONS [program:: DIABETES PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;dm]

Q.1.1. Is the patient a: [pos:: 0$$ concept:: TYPE OF PATIENT$$ id:: patient_type$$ condition:: !existingDiabetesPatient() $$ tt_requireNextClick :: false]
O.1.1.1. New Patient
O.1.1.2. Transfer in
O.1.1.3. Temporary Patient

Q.1.2. Transfer-In Date [pos:: 1$$ id:: transfer_in_date$$ field_type:: date$$ condition:: !existingDiabetesPatient()$$ estimate_label:: Number of years ago $$ parent :: TYPE OF PATIENT$$condition::false]

Q.1.3. Diabetes Diagnosis Date [pos:: 2$$ id:: initial_diagnosis_date$$ field_type:: date$$ condition:: !existingDiabetesPatient()$$ estimate_label:: Number of years ago $$ parent :: TYPE OF PATIENT]

Q.1.4. Have You Ever Had TB? [pos:: 3$$ tt_onUnLoad:: loadYears("year_of_tb_diagnosis")$$ condition:: !existingDiabetesPatient() $$ parent :: TYPE OF PATIENT]
O.1.4.1. No
O.1.4.2. Yes

Q.1.4.2.1. Year(s) of TB Diagnosis [pos :: 4 $$ multiple:: multiple $$ tt_pageStyleClass :: longSelectList $$ id :: year_of_tb_diagnosis $$ disabled :: true $$ parent :: TYPE OF PATIENT]
O.1.4.2.1.1. 1950

Q.1.5. Have you been diagnosed with TB since your LAST clinic visit? [pos:: 5$$ tt_onUnLoad:: loadYears("year_of_tb_diagnosis2")$$ condition:: existingDiabetesPatient()$$ concept:: Have You Ever Had TB?]
O.1.5.1. No
O.1.5.2. Yes

Q.1.5.2.1. Year(s) of TB Diagnosis [pos:: 6$$ multiple:: multiple$$ tt_pageStyleClass:: longSelectList$$ id:: year_of_tb_diagnosis2$$ disabled:: true $$ parent :: Have You Ever Had TB?]
O.1.5.2.1.1. 1950