P.1. EPILEPSY PATIENT OVERVIEW [program:: EPILEPSY PROGRAM$$ scope:: EXISTS$$ includejs:: touchScreenToolkit;epilepsy]
Q.1.1. Exposures [pos:: 0$$id:: exposures$$ multiple:: multiple$$ tt_beforeUnLoad:: loadCheckConditions()]
O.1.1.1. Smoking
O.1.1.2. Alcohol
O.1.1.3. Pigs/pork
O.1.1.4. Traditional medicine
O.1.1.5. Other

Q.1.2. Smoking Date [pos:: 1$$field_type::date$$ id:: smoking_date$$parent::Exposures:Smoking]

Q.1.3. Alcohol Date [pos:: 2$$field_type::date$$ id:: alcohol_date$$parent::Exposures:Alcohol]

Q.1.4. Pigs/pork Date [pos:: 3$$field_type::date$$ id:: pigs_pork_date$$parent::Exposures:Pigs/pork]

Q.1.5. Traditional medicine Date [pos:: 4$$field_type::date$$ id:: traditional_medicine_date$$parent::Exposures:Traditional medicine]

Q.1.6. Other Exposures Specify [pos:: 5$$id:: other0$$parent::Exposures:Other]

Q.1.7. Other Exposures Date [pos:: 6$$field_type::date$$ id:: other1$$parent::Exposures:Other]

Q.1.8. Complications [pos::7$$id::complications$$multiple:: multiple$$tt_beforeUnLoad:: loadCheckConditions()]
O.1.8.1. Injuries
O.1.8.2. Burns
O.1.8.3. Status Epilepticus
O.1.8.4. Psychosis
O.1.8.5. Drug Related
O.1.8.6. Other

Q.1.9. Injuries Date [pos:: 8$$field_type::date$$ id:: injuries_date$$parent::Complications:Injuries]

Q.1.10. Burns Date   [pos:: 9$$field_type::date$$ id:: burns_date$$parent::Complications:Burns]

Q.1.11. Status Epilepticus Date [pos:: 10$$field_type::date$$id:: status_epilepticus_date$$parent::Complications:Status Epilepticus]

Q.1.12. Psychosis Date [pos:: 11$$field_type::date$$ id:: psychosis_date$$parent::Complications:Psychosis]

Q.1.13. Drug Related Date[pos:: 12$$field_type::date$$ id:: drug_related_date$$parent::Complications:Drug Related]

Q.1.15. Other Date [pos:: 14$$field_type::date$$ id:: other2$$parent::Complications:Other]

Q.1.14. Other Complications Specify [pos:: 13$$id:: other3$$parent::Complications:Other]

Q.1.16. Summary [pos :: 15 $$ id:: summary $$ tt_onLoad::showSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Patient Overvie Summary $$condition::true]