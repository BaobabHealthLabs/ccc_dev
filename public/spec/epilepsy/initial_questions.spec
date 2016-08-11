P.1. EPILEPSY INITIAL QUESTIONS [program:: EPILEPSY PROGRAM$$ scope:: TODAY$$includejs:: touchScreenToolkit;epilepsy]
Q.1.1. Is the patient a: [pos:: 0$$ concept:: TYPE OF PATIENT$$ id:: patient_type$$ condition:: !existingPatient()]
O.1.1.1. New Patient
O.1.1.2. Transfer in
O.1.1.3. Temporary Patient

Q.1.2. Transfer-In Date [pos:: 1 $$ concept::Epilepsy Transfer-In Date $$ id:: transfer_in_date$$ field_type:: date$$ condition:: !existingPatient()&&__$("patient_type").value !="New Patient"$$ estimate_label:: Number of years ago $$ parent :: TYPE OF PATIENT]

Q.1.3. Epilepsy Diagnosis Date [pos:: 2$$ id:: initial_diagnosis_date$$ field_type:: date$$ estimate_label:: Number of years ago$$condition:: !existingPatient()]
