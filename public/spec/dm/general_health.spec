P.1. GENERAL HEALTH [program:: DIABETES PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;dm]

Q.1.1. Smoking? [pos:: 0$$ tt_requireNextClick:: true$$ id:: smoking]
O.1.1.1. Current smoker
O.1.1.2. Past Smoker
O.1.1.3. Never Smoked

Q.1.2. Smoking frequency [pos:: 1$$ condition:: ["Current smoker", "Past smoker"].indexOf(__$("smoking").value.trim()) >= 0$$ tt_requireNextClick:: true $$parent:: Smoking?]
O.1.2.1. Daily
O.1.2.2. Weekly
O.1.2.3. Less than once a month
O.1.2.4. Monthly

Q.1.3. Alcohol? [pos:: 2$$ tt_requireNextClick:: true$$ id:: alcohol$$ tt_requireNextClick:: false$$parent:: Smoking?]
O.1.3.1. Current
O.1.3.2. Past
O.1.3.3. Never

Q.1.4. Alcohol frequency [pos:: 3$$ condition:: ["Current", "Past"].indexOf(__$("alcohol").value.trim()) >= 0$$ tt_requireNextClick:: true$$parent::Alcohol?]
O.1.4.1. Daily
O.1.4.2. Weekly
O.1.4.3. Less than once a month
O.1.4.4. Monthly

Q.1.5. Drug allergy/side effects [pos:: 4$$ id:: drug_allergy$$ concept:: Drug Allergy$$parent:: Smoking?$$ tt_pageStyleClass:: NoKeyboard]
O.1.5.1. Aspirin
O.1.5.2. Sulphur containing drugs
O.1.5.3. Aspirin + other drugs
O.1.5.4. Other drugs
O.1.5.5. None

Q.1.6. Specify other drugs allergic to [pos:: 5$$ condition:: ["Aspirin + other drugs", "Other drugs"].indexOf(__$("drug_allergy").value.trim()) >= 0$$ concept:: Other Drug Allergies$$parent:: Smoking?]

Q.1.7. Summary [pos :: 6 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::General Health Summary $$condition::true]
