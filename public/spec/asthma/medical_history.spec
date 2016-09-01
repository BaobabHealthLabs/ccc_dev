P.1. ASTHMA MEDICAL HISTORY [program:: ASTHMA PROGRAM$$ scope:: EXISTS$$includejs:: touchScreenToolkit;asthma]

Q.1.1. Diagnosis [pos:: 0$$id:: diagnosis$$ multiple:: multiple$$tt_beforeUnLoad::loadCheckConditions()]
O.1.1.1. Asthma
O.1.1.2. COPD

Q.1.1.1.1. Asthma diagnosis date [pos:: 1$$field_type::date$$ id:: asthma_date$$condition::false$$parent::Diagnosis]

Q.1.1.2.1. COPD diagnosis date [pos:: 2$$field_type::date$$ id:: copd_date$$condition::false$$parent::Diagnosis]

Q.1.3. Allergic to:[pos::3$$tt_pageStyleClass::MultiSelectList$$parent::Diagnosis]
O.1.3.1. Exposure to cold water or cold weather
O.1.3.2. Exposure to pollen, dust or strong smell
O.1.3.3. Change of soap

Q.1.4.  Attack triggered by [pos::4$$concept::Exposures$$id::complications$$multiple:: multiple$$tt_beforeUnLoad::loadCheckConditions()$$tt_pageStyleClass::NoKeyboard$$parent::Any triggers:Yes$$parent::Diagnosis]
O.1.4.1. Smoking
O.1.4.2. TB Contact
O.1.4.3. Secondhand smoking
O.1.4.4. Indoor cooking
O.1.4.5. Exposure to allergy
O.1.4.6. Occupational Exposure

Q.1.4.1.1. Smoking Date [pos:: 5$$field_type::date$$ id:: smoking_date$$parent::Exposures:Smoking]

Q.1.4.2.1. TB Contact Date [pos::6$$field_type::date$$ id::tb_contact_date$$parent::Exposures: TB Contact]

Q.1.4.3.1. Secondhand smoking Date [pos:: 7$$field_type::date$$ id::secondhand_smoking_date$$parent::Exposures:Secondhand smoking]

Q.1.4.4.1. Indoor cooking date [pos:: 8$$field_type::date$$id::indoor_cooking_date$$parent::Exposures:Indoor cooking]

Q.1.4.6.1. Occupation [pos:: 9$$ id:: occupation$$optional::true$$id::occupational_exposure0$$parent::Exposures:Occupational Exposure]
O.1.4.6.1.1. Business
O.1.4.6.1.2. Craftsman
O.1.4.6.1.3. Driver
O.1.4.6.1.4. Domestic worker
O.1.4.6.1.5. Farmer
O.1.4.6.1.6. Healthcare worker
O.1.4.6.1.7. Housewife
O.1.4.6.1.8. Mechanic
O.1.4.6.1.9. Messenger
O.1.4.6.1.10. Office worker
O.1.4.6.1.11. Police
O.1.4.6.1.12. Preschool child
O.1.4.6.1.13. Prisoner
O.1.4.6.1.14. Salesperson
O.1.4.6.1.15. Security guard
O.1.4.6.1.16. Soldier
O.1.4.6.1.17. Student
O.1.4.6.1.18. Teacher
O.1.4.6.1.19. Other

Q.1.4.6.2. Occupation Exposure Date[pos:: 10$$field_type::date$$id::occupational_exposure1$$parent::Exposures:Occupational Exposure]

Q.1.5. Asthma history in the past month? [pos:: 11$$tt_requirenextclick::false$$parent::Diagnosis]
O.1.5.1. Yes
O.1.5.2. No
O.1.5.3. Unknown

Q.1.6. History of TB in the Past Two Years? [pos:: 12$$tt_requirenextclick::false$$parent::Diagnosis]
O.1.6.1. Yes
O.1.6.2. No

Q.1.7. History of Stroke? [pos:: 13$$tt_requirenextclick::false$$parent::Diagnosis]
O.1.7.1. Yes
O.1.7.2. No

Q.1.8. Chest deformities at Birth? [pos:: 14$$tt_requirenextclick::false$$parent::Diagnosis]
O.1.8.1. Yes
O.1.8.2. No

Q.1.9. Complication [pos:: 15$$multiple::multiple$$tt_pageStyleClass::NoKeyboard$$ helpText :: Does the patient have any of these complications$$parent::Diagnosis ]
O.1.9.1. Amputation
O.1.9.2. Stroke
O.1.9.3. Ulcers
O.1.9.4. Myocardial Injactia
O.1.9.5. Impotence
O.1.9.5. Visual Blindness
O.1.9.6. Foot Ulcers
O.1.9.7. Peripheral nueropathy
0.1.9.8. CVA

Q.1.10. Advice on life changes [pos:: 16$$multiple::multiple$$tt_pageStyleClass::NoKeyboard$$parent::Diagnosis]
O.1.10.1. Cigarette or smoke free enviroment
O.1.10.2. Correct use of inhaler
O.1.10.3. Weight loss
O.1.10.4. Breathing exercises
O.1.10.5. Allergen avoidance
O.1.10.6. Acid reflux


     
     
     
     
     

     
     
     
     
     
     
     
     


