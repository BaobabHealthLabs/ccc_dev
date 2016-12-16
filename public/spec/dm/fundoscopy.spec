P.1. DIABETES TEST [program:: DIABETES PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;dm;fundoscopy;utils;cascade]

Q.1.1. Diabetes Test Type [pos:: 0$$ value:: Fundoscopy $$ field_type :: hidden]

Q.1.2. Fundoscopy Control [pos:: 1$$ tt_onLoad:: createQuestionare("Fundoscopy")$$ tt_onUnLoad:: removeQuestionaire()$$ tt_pageStyleClass:: NoControls$$ optional:: true$$ disabled:: true $$ parent :: Diabetes Test Type:Fundoscopy]

Q.1.3. Fundoscopy Result Test Date [pos :: 2$$ field_type :: date $$ estimate_label :: Year(s) ago $$ parent :: Diabetes Test Type:Fundoscopy]

Q.1.4. Summary [pos :: 3 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Fundoscopy Test Summary $$condition::true]