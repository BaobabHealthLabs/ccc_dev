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

Q.1.4.1.1.  Attack triggered by [pos::4$$tt_requirenextclick::false]
O.1.4.1.1.1 Smoking
O.1.4.1.1.2. Contact TB
O.1.4.1.1.3. Secondhand smoking
O.1.4.1.1.4. Indoor cooking
O.1.4.1.1.5. Exposure to allergy

Q.1.5. Symptoms[pos::5$$tt_requirenextclick::false]
O.1.5.1. Chest tightiness
O.1.5.2. Chronic cough
O.1.5.3. Finger clubbing
O.1.5.4. Stridor
O.1.5.5. Prolonged expiration
O.1.5.6. Central carinatus
O.1.5.7. Wheezing
O.1.5.8. Shortness of breath
O.1.5.9. Coughing

Q.1.6. Day sx [pos::6$$field_type::number$$parent::Visit Date$$tt_pageStyleClass :: Numeric NumbersOnlyWithDecimal]

Q.1.7. Night sx [pos::7$$field_type::number$$parent::Visit Date$$tt_pageStyleClass :: Numeric NumbersOnlyWithDecimal]


Q.1.8. Beta-agonist inhaler use: frequency [pos::8$$tt_requirenextclick::false$$parent::Visit Date]
O.1.8.1. day
O.1.8.2. wk
O.1.8.3. mo
O.1.8.4. yr

Q.1.9. Steroid inhaler daily? [pos::9$$tt_requirenextclick::false$$parent::Visit Date]
O.1.9.1. Yes
O.1.9.2. No

Q.1.10. Smoke? [pos::10$$id::do_smoke$$tt_requirenextclick::false$$parent::Visit Date]
O.1.10.1. Yes
O.1.10.2. No

Q.1.10.1.1. Number of cigarettes per day? [pos::11$$field_type::number$$condition::__$('do_smoke').value=='Yes'$$parent::Smoke?:Yes$$tt_pageStyleClass :: Numeric NumbersOnlyWithDecimal$$min::0max::100]

Q.1.11. Passive smoking? [pos::12$$tt_requirenextclick::false$$parent::Visit Date]
O.1.11.1. Yes
O.1.11.2. No

Q.1.12. Indoor cooking? [pos::13$$tt_requirenextclick::false$$parent::Visit Date]
O.1.12.1. Yes
O.1.12.2. No

Q.1.13. Exacerbation today? [pos::14$$tt_requirenextclick::false$$parent::Visit Date]
O.1.13.1. Yes
O.1.13.2. No

Q.1.14. Asthma severity [pos::15$$tt_requirenextclick::false$$parent::Visit Date$$tt_pageStyleClass::NoKeyboard]
O.1.14.1. Not Asthma
O.1.14.2. Intemittent
O.1.14.3. Mild persistent
O.1.14.4. Mod persistent
O.1.14.5. Severe persistent
O.1.14.6. Uncontrolled


Q.1.15. Treatment [pos::16$$id::visit_treament$$tt_requirenextclick::false$$parent::Visit Date]
O.1.15.1. Inhaled B-agonist
O.1.15.2. Inhaled steroid
O.1.15.3. Oral steroid
O.1.15.4. Other

Q.1.16. Other Treatment Specify [pos::17$$condition::__$('visit_treament').value=='Other'$$parent::Visit Date]

Q.1.17. Comment [pos::18$$optional::true$$parent::Visit Date]
