P.1. APPOINTMENT [program:: CROSS-CUTTING PROGRAM$$ scope:: TODAY$$ includejs:: touchScreenToolkit;load_balancer;dm $$ includecss::calendar]

Q.1.1.  Book appointment in next [pos :: 0 $$ id :: book_in $$ tt_pageStyleClass::NoKeyboard $$ tt_onUnLoad :: setAppointmentCalendar("book_in", "appointment_calendar")]
O.1.1.1. 1 week
O.1.1.2. 2 weeks
O.1.1.3. 3 weeks
O.1.1.4. 1 month
O.1.1.5. 2 months
O.1.1.6. 3 months
O.1.1.7. 4 months
O.1.1.8. 5 months
O.1.1.9. 6 months

Q.1.2. Appointment [pos :: 1 $$ concept :: Appointment date $$ id :: appointment_calendar $$ field_type :: calendar $$ optional :: true $$ tt_onUnLoad :: validateAppointment()]

Q.1.3. Appointment date [pos :: 2 $$ id :: appointment_date $$ field_type :: hidden$$parent::Appointment $$condition::false]

Q.1.4. Summary [pos :: 3 $$ id:: summary $$ tt_onLoad::validateAppointment(),loadSummary() $$ tt_pageStyleClass::NoControls $$ helpText::Summary $$condition::true]