P.1. MEDICAL AND SURGICAL HISTORY [program:: EPILEPSY PROGRAM$$ scope:: EXISTS$$ includejs:: touchScreenToolkit;epilepsy]
Q.1.1. Year of first seizure? [pos::0$$field_type::number$$tt_pageStyleClass ::NumbersWithUnknown nota]

Q.1.2. What triggered the seizure?[pos::1 $$ multiple :: multiple $$ tt_pageStyleClass :: MultiSelectList $$ optional :: true$$parent::Year of first seizure? ]
O.1.2.1. Head or Brain Trauma
O.1.2.2. Progressive Brain Disease
O.1.2.3. Hemimegalencephaly
O.1.2.4. Stroke
O.1.2.5. Brain Tumors
O.1.2.5. Cortica Dysplasia
O.1.2.6. Mesial Temporal scelrosis
O.1.2.7. Drug/alcohol Withdrawal
O.1.2.8. Medications
O.1.2.9. Birth Trauma
O.1.2.10. Alzhemer's Disease
O.1.2.11. Nuerological Prblems
O.1.2.12. Infection
O.1.2.13. Fever/infection
O.1.2.14. Metabolic or Chemical Imbalances in The Body
O.1.2.15. Menstruation
O.1.2.16. Congenital(Present at Birth) Problems or Conditions
O.1.2.17. Genetic Factors
O.1.2.18. Unknown

Q.1.3. History of Head Injury/Trauma /Head surgery? [pos:: 2$$tt_requirenextclick::false$$parent::Year of first seizure?]
O.1.3.1. Yes
O.1.3.2. No
O.1.3.3. Unknown

Q.1.4. History of seizure? [pos:: 3$$tt_requirenextclick::false$$parent::Year of first seizure?]
O.1.4.1. Yes
O.1.4.2. No
O.1.4.3. Unknown

Q.1.5. History of Complications at Birth? [pos:: 4$$tt_requirenextclick::false$$parent::Year of first seizure?]
O.1.5.1. Yes
O.1.5.2. No
O.1.5.3. Unknown

Q.1.6. History of Neonatal Infection? [pos:: 5$$tt_requirenextclick::false$$parent::Year of first seizure?]
O.1.6.1. Yes
O.1.6.2. No
O.1.6.3. Unknown

Q.1.7. History of Cerebral Malaria? [pos:: 6$$tt_requirenextclick::false$$parent::Year of first seizure?]
O.1.7.1. Yes
O.1.7.2. No
O.1.7.3. Unknown

Q.1.8. History of Meningitis? [pos:: 7$$tt_requirenextclick::false$$parent::Year of first seizure?]
O.1.8.1. Yes
O.1.8.2. No
O.1.8.3. Unknown

Q.1.9. History of Delayed milestones in early childhood? [pos:: 8$$tt_requirenextclick::false$$parent::Year of first seizure?]
O.1.9.1. Yes
O.1.9.2. No
O.1.9.3. Unknown

Q.1.10. Ever had cysticercosis? [pos::9$$parent::Year of first seizure?]
O.1.10.1. Yes
O.1.10.2. No
O.1.10.3. Unknown

Q.1.11. Summary [pos :: 10 $$ id:: summary $$ tt_onLoad::showSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Summary $$condition::true]