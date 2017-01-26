P.1. HYPERTENSION TEST [program:: HYPERTENSION PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;dm;htn_fundoscopy;utils;cascade;htn]

Q.1.1. Hypertension Test Type [pos:: 0$$ value:: Fundoscopy $$ field_type :: hidden]

Q.1.2. Fundoscopy Control [pos:: 1$$ tt_onLoad:: createQuestionare("Fundoscopy")$$ tt_onUnLoad:: removeQuestionaire()$$ tt_pageStyleClass:: NoControls$$ optional:: true$$ disabled:: true]

Q.1.3. Fundoscopy Result Test Date [pos :: 2$$ field_type :: date $$ estimate_label :: Year(s) ago $$ parent :: Hypertension Test Type:Fundoscopy]

C.1.4. Summary [pos :: 3 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Fundoscopy Test Summary $$condition::true]