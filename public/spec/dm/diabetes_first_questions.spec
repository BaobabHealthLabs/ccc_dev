P.1. DIABETES INITIAL QUESTIONS [program:: DIABETES PROGRAM$$ scope:: EXISTS$$ includejs:: touchScreenToolkit;dm]

Q.1.1. Is the patient a: [pos:: 0$$ concept:: TYPE OF PATIENT$$ id:: patient_type$$ condition:: !existingDiabetesPatient()]
O.1.1.1. New Patient
O.1.1.2. Transfer in
O.1.1.3. Temporary Patient

Q.1.2. Diabetes Diagnosis Date [pos:: 1$$ id:: initial_diagnosis_date$$ field_type:: birthdate$$ condition:: !existingDiabetesPatient()]

Q.1.3. Have You Ever Had TB? [pos:: 2$$ tt_onUnLoad:: loadYears("year_of_tb_diagnosis")$$ condition:: !existingDiabetesPatient()]
O.1.3.1. No
O.1.3.2. Yes

Q.1.3.2.1. Year(s) of TB Diagnosis [pos:: 3$$ multiple:: multiple$$ tt_pageStyleClass:: longSelectList$$ id:: year_of_tb_diagnosis$$ disabled:: true]
O.1.3.2.1.1. 1950

Q.1.4. Have you been diagnosed with TB since your LAST clinic visit? [pos:: 4$$ tt_onUnLoad:: loadYears("year_of_tb_diagnosis2")$$ condition:: existingDiabetesPatient()$$ concept:: Have You Ever Had TB?]
O.1.4.1. No
O.1.4.2. Yes

Q.1.4.2.1. Year(s) of TB Diagnosis [pos:: 5$$ multiple:: multiple$$ tt_pageStyleClass:: longSelectList$$ id:: year_of_tb_diagnosis2$$ disabled:: true]
O.1.4.2.1.1. 1950