P.1. EPILEPSY INITIAL QUESTIONS [program:: EPILEPSY PROGRAM$$ scope:: TODAY$$includejs:: touchScreenToolkit;epilepsy]
Q.1.1. Is the patient a: [pos:: 0$$ concept:: TYPE OF PATIENT$$ id:: patient_type$$ condition:: !existingPatient()]
O.1.1.1. New Patient
O.1.1.2. Transfer in
O.1.1.3. Temporary Patient

Q.1.1.2.1. Tranfered from [pos:: 1$$ ajaxURL:: /facilities?name=$$ allowFreeText:: true$$parent::TYPE OF PATIENT$$ condition:: !existingPatient()&&__$("patient_type").value !="New Patient"]

Q.1.1.2.2. Transfer-In Date [pos:: 2$$concept::Hypertension Transfer-In Date$$ id:: transfer_in_date$$ field_type:: date$$ condition:: !existingPatient()&&__$("patient_type").value !="New Patient"$$ estimate_label:: Number of years ago $$ parent :: TYPE OF PATIENT]

Q.1.3. Epilepsy Diagnosis Date [pos:: 3$$ id:: initial_diagnosis_date$$ field_type:: date$$ estimate_label:: Number of years ago$$condition:: !existingPatient()$$parent ::TYPE OF PATIENT$$tt_onUnLoad::diagonosidAndTransfer()]

Q.1.4. Summary [pos :: 4 $$ id:: summary $$ tt_onLoad::showSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Summary $$condition::true]