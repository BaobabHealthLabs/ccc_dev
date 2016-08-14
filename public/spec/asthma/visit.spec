P.1. ASTHMA VISIT [program:: ASTHMA PROGRAM$$ scope:: EXISTS$$includejs:: touchScreenToolkit;asthma]

Q.1.1. Visit Date [pos::0$$field_type::date]

Q.1.2. Planned Visit? [pos::1$$tt_requirenextclick::false$$parent::Visit Date]
O.1.2.1. Yes
O.1.2.2. No


Q.1.3. Patient is currently having an attack[pos::2$$tt_requirenextclick::false]
O.1.3.1. Yes
O.1.3.2. No

Q.1.4. Any triggers [pos::3$$tt_requirenextclick::false]
O.1.4.1. Yes 
O.1.4.2.  No

Q.1.4.1.1.  Attack triggered by [pos::4$$concept::Exposures$$id::complications$$multiple:: multiple$$tt_beforeUnLoad::loadCheckConditions()$$tt_pageStyleClass::NoKeyboard]
O.1.4.1.1.1. Smoking
O.1.4.1.1.2. TB Contact
O.1.4.1.1.3. Secondhand smoking
O.1.4.1.1.4. Indoor cooking
O.1.4.1.1.5. Exposure to allergy
O.1.4.1.1.6. Occupational Exposure

Q.1.4.1.1.1.1. Smoking Date [pos:: 5$$field_type::date$$ id:: smoking_date$$parent::Exposures:Smoking]

Q.1.4.1.1.2.1. TB Contact Date [pos::6$$field_type::date$$ id::tb_contact_date$$parent::Exposures:Indoor cooking]

Q.1.4.1.1.3.1 Secondhand smocking Date [pos:: 7$$field_type::date$$ id::secondhand_smoking_date$$parent::Exposures:Secondhand smoking]

Q.1.4.1.1.4.1 Indoor cooking date [pos:: 8$$field_type::date$$id::indoor_cooking_date$$parent::Exposures:TB Contact]

Q.1.4.1.1.6.1. Occupation [pos:: 9$$ id:: occupation$$optional::true$$id::occupational_exposure0$$parent::Exposures:Occupational Exposure]
O.1.4.1.1.6.1.1. Business
O.1.4.1.1.6.1.2. Craftsman
O.1.4.1.1.6.1.3. Driver
O.1.4.1.1.6.1.4. Domestic worker
O.1.4.1.1.6.1.5. Farmer
O.1.4.1.1.6.1.6. Healthcare worker
O.1.4.1.1.6.1.7. Housewife
O.1.4.1.1.6.1.8. Mechanic
O.1.4.1.1.6.1.9. Messenger
O.1.4.1.1.6.1.10. Office worker
O.1.4.1.1.6.1.11. Police
O.1.4.1.1.6.1.12. Preschool child
O.1.4.1.1.6.1.13. Prisoner
O.1.4.1.1.6.1.14. Salesperson
O.1.4.1.1.6.1.15. Security guard
O.1.4.1.1.6.1.16. Soldier
O.1.4.1.1.6.1.17. Student
O.1.4.1.1.6.1.18. Teacher
O.1.4.1.1.6.1.19. Other

Q.1.4.1.1.6.2. Occupation Exposure Date[pos:: 10$$field_type::date$$id::occupational_exposure1$$parent::Patient History and Exposures:Occupational Exposure]

Q.1.5. Symptoms[pos::11$$tt_requirenextclick::false]
O.1.5.1. Chest tightiness
O.1.5.2. Chronic cough
O.1.5.3. Finger clubbing
O.1.5.4. Stridor
O.1.5.5. Prolonged expiration
O.1.5.6. Central carinatus
O.1.5.7. Wheezing
O.1.5.8. Shortness of breath
O.1.5.9. Coughing

Q.1.5.2.1. Chronic dry cough duration [pos:: 11$$field_type::number$$id::chronic_dry_cough0$$parent::Patient History and Exposures:Chronic dry cough$$tt_pageStyleClass :: Numeric NumbersOnly]

Q.1.5.2.2. Chronic dry cough Age onset   [pos::12$$field_type::number$$ id::chronic_dry_cough1$$parent::Patient History and Exposures:Chronic dry cough]

Q.1.6. Day sx [pos::13$$field_type::number$$parent::Visit Date$$tt_pageStyleClass :: Numeric NumbersOnlyWithDecimal]

Q.1.7. Night sx [pos::14$$field_type::number$$parent::Visit Date$$tt_pageStyleClass :: Numeric NumbersOnlyWithDecimal]


Q.1.8. Beta-agonist inhaler use: frequency [pos::15$$tt_requirenextclick::false$$parent::Visit Date]
O.1.8.1. day
O.1.8.2. wk
O.1.8.3. mo
O.1.8.4. yr

Q.1.9. Steroid inhaler daily? [pos::16$$tt_requirenextclick::false$$parent::Visit Date]
O.1.9.1. Yes
O.1.9.2. No

Q.1.10. Smoke? [pos::17$$id::do_smoke$$tt_requirenextclick::false$$parent::Visit Date]
O.1.10.1. Yes
O.1.10.2. No

Q.1.10.1.1. Number of cigarettes per day? [pos::18$$field_type::number$$condition::__$('do_smoke').value=='Yes'$$parent::Smoke?:Yes$$tt_pageStyleClass :: Numeric NumbersOnlyWithDecimal$$min::0max::100]

Q.1.11. Passive smoking? [pos::19$$tt_requirenextclick::false$$parent::Visit Date]
O.1.11.1. Yes
O.1.11.2. No

Q.1.12. Indoor cooking? [pos::20$$tt_requirenextclick::false$$parent::Visit Date]
O.1.12.1. Yes
O.1.12.2. No

Q.1.13. Exacerbation today? [pos::21$$tt_requirenextclick::false$$parent::Visit Date]
O.1.13.1. Yes
O.1.13.2. No

Q.1.14. Asthma severity [pos::22$$tt_requirenextclick::false$$parent::Visit Date$$tt_pageStyleClass::NoKeyboard]
O.1.14.1. Not Asthma
O.1.14.2. Intemittent
O.1.14.3. Mild persistent
O.1.14.4. Mod persistent
O.1.14.5. Severe persistent
O.1.14.6. Uncontrolled


Q.1.15. Treatment [pos::23$$id::visit_treament$$tt_requirenextclick::false$$parent::Visit Date]
O.1.15.1. Inhaled B-agonist
O.1.15.2. Inhaled steroid
O.1.15.3. Oral steroid
O.1.15.4. Other

Q.1.16. Other Treatment Specify [pos::24$$condition::__$('visit_treament').value=='Other'$$parent::Visit Date]

Q.1.17. Comment [pos::25$$optional::true$$parent::Visit Date]
