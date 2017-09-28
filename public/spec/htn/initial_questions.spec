P.1. HYPERTENSION INITIAL QUESTIONS [program:: HYPERTENSION PROGRAM$$ scope:: EXISTS$$ includejs:: touchScreenToolkit;htn]

Q.1.1. Is the patient a: [pos:: 0$$ concept:: TYPE OF PATIENT$$ id:: patient_type$$ condition:: !existingPatient()$$tt_requirenextclick::false]
O.1.1.1. New patient
O.1.1.2. Transfer In

Q.1.1.2.1. Tranfered from [pos:: 1$$ ajaxURL:: /facilities?name=$$ allowFreeText:: true$$parent::TYPE OF PATIENT$$ condition:: !existingPatient()&&__$("patient_type").value !="New patient"]

Q.1.1.2.2. Transfer-In date [pos:: 2$$concept::Hypertension Transfer-In Date$$ id:: transfer_in_date$$ field_type:: date$$ condition:: !existingPatient()&&__$("patient_type").value !="New patient"$$ estimate_label:: Number of years ago $$ parent :: TYPE OF PATIENT $$tt_onUnLoad::validateWithBirthDate()]

Q.1.3. Hypertension diagnosis date [pos:: 3$$ id:: initial_diagnosis_date$$ field_type:: date$$ estimate_label:: Number of years ago$$tt_onUnLoad::diagonosidAndTransfer();validateWithBirthDate()]

Q.1.4. Have you ever had TB? [pos:: 4$$ tt_onUnLoad:: loadYears("year_of_tb_diagnosis")$$ condition:: !existingPatient() $$ parent :: TYPE OF PATIENT$$tt_requirenextclick::false]
O.1.4.1. No
O.1.4.2. Yes

Q.1.4.2.1. Year(s) of TB diagnosis [pos :: 5 $$ multiple:: multiple $$ tt_pageStyleClass :: longSelectList $$ id :: year_of_tb_diagnosis $$ disabled :: true $$ parent :: TYPE OF PATIENT]
O.1.4.2.1.1. 1950

Q.1.5. Have you been diagnosed with TB since your LAST clinic visit? [pos:: 6$$ tt_onUnLoad:: loadYears("year_of_tb_diagnosis2")$$ condition:: existingPatient()$$ concept:: Have You Ever Had TB?]
O.1.5.1. No
O.1.5.2. Yes

Q.1.5.2.1. Year(s) of TB diagnosis [pos:: 7$$ multiple:: multiple$$ tt_pageStyleClass:: longSelectList$$ id:: year_of_tb_diagnosis2$$ disabled:: true $$ parent :: Have You Ever Had TB?]
O.1.5.2.1.1. 1950

Q.1.6. Summary [pos :: 8 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Initial Questions Summary$$condition::true]