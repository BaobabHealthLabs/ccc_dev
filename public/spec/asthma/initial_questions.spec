P.1. ASTHMA INITIAL QUESTIONS [program:: ASTHMA PROGRAM$$ scope:: TODAY$$includejs:: touchScreenToolkit;epilepsy]
Q.1.1. Is the patient a: [pos:: 0$$ concept:: TYPE OF PATIENT$$ id:: patient_type$$condition:: !existingPatient()]
O.1.1.1. New Patient
O.1.1.2. Transfer in
O.1.1.3. Temporary Patient

Q.1.2. Transfer-In Date [pos:: 1$$concept:: Asthma Transfer-In Date $$ id:: transfer_in_date$$ field_type:: date$$ condition:: !existingPatient()&&__$("patient_type").value !="New Patient" $$ estimate_label:: Number of years ago $$ parent :: TYPE OF PATIENT]

