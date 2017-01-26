P.1. DIABETES TEST [program:: DIABETES PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;dm;foot_check;utils;cascade]

Q.1.1. Diabetes Test Type [pos:: 0$$ value:: Foot Check $$ field_type :: hidden]

Q.1.2. Foot Check Control [pos:: 1$$ tt_onLoad:: createQuestionare("Footcheck")$$ tt_onUnLoad:: removeQuestionaire()$$ tt_pageStyleClass:: NoControls$$ optional:: true$$ disabled:: true $$ parent :: Diabetes Test Type:Foot Check]

Q.1.3. Foot Check Result Test Date [pos:: 2$$ field_type:: date $$ estimate_label:: Year(s) ago $$ parent :: Diabetes Test Type:Foot Check]

C.1.4. Summary [pos :: 4 $$ id:: summary $$ tt_onLoad::loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Foot Check Summary $$condition::true]