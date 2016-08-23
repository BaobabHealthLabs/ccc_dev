P.1. EPILEPSY VISIT [program:: EPILEPSY PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;epilepsy]
Q.1.1. Visit Date [pos::0$$field_type::date]

Q.1.2. Seizure since last visit? [pos::1$$tt_requirenextclick::false$$id::seizure_since_last_visit$$parent::Visit Date]
O.1.2.1. Yes
O.1.2.2. No

Q.1.3. Patient in active seizure? [pos::2]
O.1.3.1. Yes
O.1.3.2. No

Q.1.4. How often seizure occurrs[pos::3]
O.1.4.1. Regulary
O.1.4.2. Occasionaly

Q.1.5. Number of seizures [pos::4$$field_type::number$$condition::__$('seizure_since_last_visit').value=="Yes"$$parent::Seizure since last visit?:Yes$$ tt_pageStyleClass :: Numeric NumbersOnly$$ min :: 0$$ max :: 20]

Q.1.6. Seizure duration [pos::5$$condition::__$('seizure_since_last_visit').value=="Yes"$$parent::Seizure since last visit?:Yes$$ tt_pageStyleClass:: NoKeyboard]
O.1.6.1. A few seconds
O.1.6.2. 1 minute
O.1.6.3. Less than 5 minutes
O.1.6.4. More than 5 minutes
O.1.6.5. More than 30 minutes
O.1.6.6. Unknown

Q.1.7. What patient experiences before seizure [pos:: 6$$condition::__$('seizure_since_last_visit').value=="Yes"$$parent::Seizure since last visit?:Yes$$multiple:: multiple$$ tt_pageStyleClass :: MultiSelectList]
O.1.7.1. No memory recall
O.1.7.2. Rising feeling in the stomach
O.1.7.3. Heart palpitations
O.1.7.4. Strange Smell
O.1.7.5. Headache
O.1.7.6. Dizziness
O.1.7.7. Jerking/twitching
O.1.7.8. Tingling
O.1.7.9. Numbness

Q.1.8. What patient experiences after seizure [pos:: 7$$condition::__$('seizure_since_last_visit').value=="Yes"$$parent::Seizure since last visit?:Yes$$multiple:: multiple$$ tt_pageStyleClass:: NoKeyboard]
O.1.8.1. No memory recall
O.1.8.2. Tiredness
O.1.8.3. Muscles aches
O.1.8.4. Weakness
O.1.8.5. Sleepiness

Q.1.9. Witness available before/during/after seizure? [pos:: 8$$condition::__$('seizure_since_last_visit').value=="Yes"$$parent::Seizure since last visit?:Yes]
O.1.9.1. Yes
O.1.9.2. No

Q.1.10. Any triggers [pos::9$$tt_requirenextclick::false$$id::triggers$$parent::Visit Date]
O.1.10.1. Yes
O.1.10.2. No

Q.1.11. Alcohol a trigger? [pos::10$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"$$parent::Any triggers:Yes]
O.1.11.1. Yes
O.1.11.2. No

Q.1.12. Sleep deprivation / Overtiredness a trigger? [pos::11$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"$$parent::Any triggers:Yes]
O.1.12.1. Yes
O.1.12.2. No

Q.1.13. Missed medication a trigger? [pos::12$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"$$parent::Any triggers:Yes]
O.1.13.1. Yes
O.1.13.2. No

Q.1.14. Sound /Light /Touch a trigger? [pos::13$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"$$parent::Any triggers:Yes]
O.1.14.1. Yes
O.1.14.2. No

Q.1.15. Fever a trigger? [pos::14$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"$$parent::Any triggers:Yes]
O.1.15.1. Yes
O.1.15.2. No

Q.1.16. Stress a trigger? [pos::15$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"$$parent::Any triggers:Yes]
O.1.16.1. Yes
O.1.16.2. No

Q.1.17. Menstruation a trigger? [pos::16$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes" && patientIsANC()$$parent::Any triggers:Yes]
O.1.17.1. Yes
O.1.17.2. No

Q.1.18. Any silent markers?[pos::17$$id::silent_markers$$parent::Visit Date$$tt_requirenextclick::false]
O.1.18.1. Yes
O.1.18.2. No


Q.1.19. Toungue bitting a silent marker? [pos::18$$tt_requirenextclick::false$$condition::__$("silent_markers").value == "Yes"$$parent::Any silent markers?:Yes]
O.1.19.1. Yes
O.1.19.2. No

Q.1.20. Incontinence bitting a silent marker? [pos::19$$tt_requirenextclick::false$$condition::__$("silent_markers").value == "Yes"$$parent::Any silent markers?:Yes]
O.1.20.1. Yes
O.1.20.2. No

Q.1.21. Seizure frequency since last visit [pos :: 20$$tt_requirenextclick::false$$condition::__$("silent_markers").value == "Yes"$$parent::Any silent markers?:Yes]
O.1.21.1. Constant
O.1.21.2. Decreased
O.1.21.3. Increased

Q.1.22. Hospitalized since the last visit? [pos::21$$tt_requirenextclick::false$$parent::Visit Date]
O.1.22.1. Yes
O.1.22.2. No

Q.1.23. Is patient pregnant? [pos::22$$tt_requirenextclick::false$$condition::patientIsANC()$$parent::Visit Date]
O.1.23.1. Yes
O.1.23.2. No

Q.1.24. On family planing? [pos::23$$parent::Visit Date]
O.1.24.1. Yes
O.1.24.2. No
