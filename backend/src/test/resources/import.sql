INSERT INTO `activities` (idActivity, name) VALUES (1, 'invited'), (2, 'accepted'), (3, 'denied'), (4, 'confirmed');

INSERT INTO `statuses` (idStatus, name) VALUES (1, 'active'), (2, 'in progress'), (3, 'archived');

INSERT INTO `levels` (idLevel, name) VALUES (1, 'easy'), (2, 'medium'), (3, 'hard');

INSERT INTO `users` (username, password, email, firstName, lastName, role) VALUES ('admin', '$2a$10$MRFnsiGe3kSlF0lWALTu2e5e89heCXHFXHA2yuCIUuyyPRDNJ2/Cu', 'biketrips.admin@gmail.com', 'admin', 'admin', 'ADMIN');
