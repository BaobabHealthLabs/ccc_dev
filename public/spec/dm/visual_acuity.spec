P.1. DIABETES TEST [program:: DIABETES PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;dm;visual_acuity;utils;cascade]

Q.1.1. Diabetes Test Type [pos :: 0 $$ value :: Visual Acuity $$ field_type :: hidden]

Q.1.2. Visual Acuity Control [pos :: 1 $$ tt_onLoad :: createQuestionare("Visual_Acuity") $$ tt_onUnLoad :: removeQuestionaire() $$ tt_pageStyleClass :: NoControls $$ optional :: true $$ disabled :: true]

Q.1.3. Visual Acuity Result Test Date [pos :: 2 $$ field_type:: date $$ estimate_label :: Year(s) ago $$ parent :: Diabetes Test Type:Visual Acuity]