P.1. HYPERTENSION TEST [program:: HYPERTENSION PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;htn_visual_acuity;utils;cascade;htn]

Q.1.1. Hypertension Test Type [pos :: 0 $$ value :: Visual Acuity $$ field_type :: hidden]

Q.1.2. Visual Acuity Control [pos :: 1 $$ tt_onLoad :: createQuestionare("Visual_Acuity") $$ tt_onUnLoad :: removeQuestionaire() $$ tt_pageStyleClass :: NoControls $$ optional :: true $$ disabled :: true]

Q.1.3. Visual Acuity Result Test Date [pos :: 2 $$ field_type:: date $$ estimate_label :: Year(s) ago $$ parent :: Hypertension Test Type:Visual Acuity]

C.1.4. Summary [pos :: 3 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Visual Acuity Test Summary $$condition::true]