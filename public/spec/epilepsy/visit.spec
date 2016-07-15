P.1. EPILEPSY VISIT [program:: EPILEPSY PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;epilepsy]
Q.1.1. Visit Date [pos::0$$field_type::date]

Q.1.4. Seizure since last visit? [pos::3$$tt_requirenextclick::false$$id::seizure_since_last_visit$$parent::Visit Date]
O.1.4.1. Yes
O.1.4.2. No

Q.1.5. Number of seizures [pos::4$$field_type::number$$condition::__$('seizure_since_last_visit').value=="Yes"$$parent::Seizure since last visit?:Yes$$ tt_pageStyleClass :: Numeric NumbersOnly$$ min :: 0$$ max :: 20]

Q.1.6. Any triggers [pos::5$$tt_requirenextclick::false$$id::triggers$$parent::Visit Date]
O.1.6.1. Yes
O.1.6.2. No

Q.1.7. Alcohol a trigger? [pos::6$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"$$parent::Any triggers:Yes]
O.1.7.1. Yes
O.1.7.2. No

Q.1.8. Sleep deprivation / Overtiredness a trigger? [pos::7$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"$$parent::Any triggers:Yes]
O.1.8.1. Yes
O.1.8.2. No

Q.1.9. Missed medication a trigger? [pos::8$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"$$parent::Any triggers:Yes]
O.1.9.1. Yes
O.1.9.2. No

Q.1.10. Sound /Light /Touch a trigger? [pos::9$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"$$parent::Any triggers:Yes]
O.1.10.1. Yes
O.1.10.2. No

Q.1.11. Fever a trigger? [pos::10$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"$$parent::Any triggers:Yes]
O.1.11.1. Yes
O.1.11.2. No

Q.1.12. Stress a trigger? [pos::11$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"$$parent::Any triggers:Yes]
O.1.12.1. Yes
O.1.12.2. No

Q.1.13. Menstruation a trigger? [pos::12$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes" && patientIsANC()$$parent::Any triggers:Yes]
O.1.13.1. Yes
O.1.13.2. No

Q.1.14. Any silent markers?[pos::13$$id::silent_markers$$parent::Visit Date$$tt_requirenextclick::false]
O.1.14.1. Yes
O.1.14.2. No


Q.1.15. Toungue bitting a silent marker? [pos::14$$tt_requirenextclick::false$$condition::__$("silent_markers").value == "Yes"$$parent::Any silent markers?:Yes]
O.1.15.1. Yes
O.1.15.2. No

Q.1.16. Incontinence bitting a silent marker? [pos::15$$tt_requirenextclick::false$$condition::__$("silent_markers").value == "Yes"$$parent::Any silent markers?:Yes]
O.1.16.1. Yes
O.1.16.2. No

Q.1.17. Hospitalized since a last visit? [pos::16$$tt_requirenextclick::false$$parent::Visit Date]
O.1.17.1. Yes
O.1.17.2. No

Q.1.18. Is patient pregnant? [pos::17$$tt_requirenextclick::false$$condition::patientIsANC()$$parent::Visit Date]
O.1.18.1. Yes
O.1.18.2. No

O.1.19. On family planing? [pos::18$$parent::Visit Date]
O.1.19.1. Yes
O.1.19.2. No
