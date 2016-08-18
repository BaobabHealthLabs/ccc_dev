P.1. ASTHMA INITIAL QUESTIONS [program:: ASTHMA PROGRAM$$ scope:: TODAY$$includejs:: touchScreenToolkit;asthma]
Q.1.1. Is the patient a: [pos:: 0$$ concept:: TYPE OF PATIENT$$ id:: patient_type$$condition:: !existingPatient()]
O.1.1.1. New Patient
O.1.1.2. Transfer in
O.1.1.3. Temporary Patient

Q.1.2. Transfer-In Date [pos:: 1$$concept:: Asthma Transfer-In Date $$ id:: transfer_in_date$$ field_type:: date$$ condition:: !existingPatient()&&__$("patient_type").value !="New Patient" $$ estimate_label:: Number of years ago $$ parent :: TYPE OF PATIENT]

Q.1.3. Asthma Diagnosis Date [pos:: 2$$ id:: initial_diagnosis_date$$ field_type:: date$$ condition:: false$$ estimate_label:: Number of years ago $$ parent :: TYPE OF PATIENT]

Q.1.4. Have You Ever Had TB? [pos:: 3$$ tt_onUnLoad:: loadYears("year_of_tb_diagnosis")$$ condition:: !existingPatient() $$ parent :: TYPE OF PATIENT]
O.1.4.1. No
O.1.4.2. Yes

Q.1.4.2.1. Year(s) of TB Diagnosis [pos:: 4$$ multiple:: multiple$$ tt_pageStyleClass:: longSelectList$$ id:: year_of_tb_diagnosis$$ disabled:: true $$ parent :: Have You Ever Had TB?]
O.1.4.2.1.1. 1950

Q.1.5. Is patient pregnant? [pos::5$$tt_requirenextclick::false$$condition::patientIsANC()]
O.1.5.1. No
O.1.5.2. Yes

Q.1.6. Is patient breastfeeding? [pos::5$$condition::patientIsANC()]
O.1.6.1. No
O.1.6.2. Yes