P.1. EPILEPSY VISIT [program:: EPILEPSY PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;epilepsy]
Q.1.1. Visit Date [pos::0$$field_type::date]

Q.1.2. Weight (Kg) [pos::1$$field_type::number]

Q.1.3. Height (cm) [pos::2$$field_type::number]

Q.1.4. Seizure since last visit [pos::3$$tt_requirenextclick::false]
O.1.4.1. Yes
O.1.4.2. No

Q.1.5. Number of seizures [pos::4$$field_type::number]

Q.1.6. Any triggers [pos::5$$tt_requirenextclick::false$$id::triggers]
O.1.6.1. Yes
O.1.6.2. No

Q.1.7. Alcohol a trigger? [pos::6$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes" ]
O.1.7.1. Yes
O.1.7.2. No

Q.1.8. Sleep deprivation / Overtiredness a trigger? [pos::7$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"]
O.1.8.1. Yes
O.1.8.2. No

Q.1.9. Missed medication a trigger? [pos::8$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"]
O.1.9.1. Yes
O.1.9.2. No

Q.1.10. Sound /Light /Touch a trigger? [pos::9$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"]
O.1.10.1. Yes
O.1.10.2. No

Q.1.11. Fever a trigger? [pos::10$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"]
O.1.11.1. Yes
O.1.11.2. No

Q.1.12. Stress a trigger? [pos::11$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"]
O.1.12.1. Yes
O.1.12.2. No

Q.1.13. Menstruation a trigger? [pos::12$$tt_requirenextclick::false$$condition::__$('triggers').value=="Yes"]
O.1.13.1. Yes
O.1.13.2. No

Q.1.14. Toungue bitting a silent marker? [pos::13$$tt_requirenextclick::false]
O.1.14.1. Yes
O.1.14.2. No

Q.1.15. Incontinence bitting a silent marker? [pos::14$$tt_requirenextclick::false]
O.1.15.1. Yes
O.1.15.2. No

Q.1.16. Hospitalized since a last visit? [pos::15$$tt_requirenextclick::false]
O.1.16.1. Yes
O.1.16.2. No

Q.1.17. Is patient pregnant? [pos::16$$tt_requirenextclick::false]
O.1.17.1. Yes
O.1.17.2. No

O.1.18. On family planing? [pos::17]
O.1.18.1. Yes
O.1.18.2. No
