P.1. HYPERTENSION INITIAL QUESTIONS [program:: HYPERTENSION PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;htn]

Q.1.1. Is the patient a: [pos:: 0$$ concept:: TYPE OF PATIENT$$ id:: patient_type$$ condition:: !existingPatient()]
O.1.1.1. New Patient
O.1.1.2. Transfer in
O.1.1.3. Temporary Patient

Q.1.2. Hypertension Diagnosis Date [pos:: 1$$ id:: initial_diagnosis_date$$ field_type:: birthdate$$ estimate_label:: Number of years ago]