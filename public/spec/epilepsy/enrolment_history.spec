P.1. PATIENT HISTORY AT ENROLMENT [program:: EPILEPSY PROGRAM$$ scope:: EXISTS$$ includejs:: touchScreenToolkit;epilepsy $$ includecss :: ccc]

Q.1.1. Date of onset [id::date_on_field$$pos:: 0$$field_type::date]

Q.1.3. Marital Status [pos:: 2$$parent::Date of onset]
O.1.3.1. Single
O.1.3.2. Married
O.1.3.3. Widowed

Q.1.4. Occupation [pos:: 3$$ id:: occupation$$allowFreeText:: true$$parent::Date of onset]
O.1.4.1. Business
O.1.4.2. Craftsman
O.1.4.3. Driver
O.1.4.4. Domestic worker
O.1.4.5. Farmer
O.1.4.6. Healthcare worker
O.1.4.7. Housewife
O.1.4.8. Mechanic
O.1.4.9. Messenger
O.1.4.10. Office worker
O.1.4.11. Police
O.1.4.12. Preschool child
O.1.4.13. Prisoner
O.1.4.14. Salesperson
O.1.4.15. Security guard
O.1.4.16. Soldier
O.1.4.17. Student
O.1.4.18. Teacher
O.1.4.19. Other

Q.1.5. Education level [pos:: 4$$parent::Date of onset]
O.1.5.1. None
O.1.5.2. Primary
O.1.5.3. Secondary
O.1.5.4. Tertiary

Q.1.6. Medication History [pos::5$$field_type::text$$parent::Date of onset]

Q.1.7. Summary [pos :: 6 $$ id:: summary $$ tt_onLoad::showSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Summary $$condition::true]

