INSERT INTO role (role, description, uuid) VALUES  ("Admin", "CCC System Administrator role", (SELECT UUID()));

START TRANSACTION;

SELECT user_id INTO @user_id FROM users WHERE username = 'admin';

DELETE FROM user_role WHERE user_id = @user_id;

INSERT INTO user_role VALUES (@user_id, "Admin"), (@user_id, "Nurse"), (@user_id, "Clinician"),(@user_id, "Registration Clerk");

COMMIT;
