#password: Admin123

INSERT INTO users (username, password, email, firstName, lastName, role) VALUES
  (
    'admin',
    '$2a$10$MRFnsiGe3kSlF0lWALTu2e5e89heCXHFXHA2yuCIUuyyPRDNJ2/Cu',
    'biketrips.admin@gmail.com',
    'admin',
    'admin',
    'ADMIN'
  ),
  (
    'kacpkasp',
    '$2a$10$MRFnsiGe3kSlF0lWALTu2e5e89heCXHFXHA2yuCIUuyyPRDNJ2/Cu',
    'kacp@kasp',
    'Kacper',
    'Kasprzyk',
    'MODER'
  ),
  (
    'irmikrys',
    '$2a$10$MRFnsiGe3kSlF0lWALTu2e5e89heCXHFXHA2yuCIUuyyPRDNJ2/Cu',
    'irmi@krys',
    'Irmina',
    'Krysiak',
    'USER'
  ),
  (
    'rebirebi',
    '$2a$10$MRFnsiGe3kSlF0lWALTu2e5e89heCXHFXHA2yuCIUuyyPRDNJ2/Cu',
    'rebi@rebi',
    'Rebecca',
    'Krysiak',
    'USER'
  ),
  (
    'test',
    '$2a$10$MRFnsiGe3kSlF0lWALTu2e5e89heCXHFXHA2yuCIUuyyPRDNJ2/Cu',
    'test@test',
    'Test',
    'Test',
    'USER'
  ),
  (
    'user',
    '$2a$10$MRFnsiGe3kSlF0lWALTu2e5e89heCXHFXHA2yuCIUuyyPRDNJ2/Cu',
    'user@user',
    'User',
    'User',
    'USER'
  ),
  (
    'user2',
    '$2a$10$MRFnsiGe3kSlF0lWALTu2e5e89heCXHFXHA2yuCIUuyyPRDNJ2/Cu',
    'user2@user2',
    'Usertwo',
    'Usertwo',
    'USER'
  );

INSERT INTO applications (username, email, isActive) VALUES
  (
    'irmikrys',
    'irmi@krys',
    true
  ),
  (
    'kacpkasp',
    'kacp@kasp',
    false
  ),
  (
    'rebirebi',
    'rebi@rebi',
    true
  );

INSERT INTO trips (idTrip, moderator, name, startDate, endDate, idLevel, idStatus, description, points)
VALUES
  (1, 'kacpkasp', 'Trip 1', '2018-05-14 12:00:00', '2018-05-20 12:00:00', 1, 1, 'Trip 1 description', 23),
  (2, 'kacpkasp', 'Trip 2', '2018-05-05 12:00:00', '2018-05-11 12:00:00', 2, 1, 'Trip 2 description', 60),
  (3, 'kacpkasp', 'Trip 3', '2018-04-28 12:00:00', '2018-04-30 12:00:00', 3, 1, 'Trip 3 description', 400),
  (4, 'kacpkasp', 'Trip 4', '2018-04-23 12:00:00', '2018-04-26 12:00:00', 1, 2, 'Trip 4 description', 40),
  (5, 'kacpkasp', 'Trip 5', '2018-04-18 12:00:00', '2018-04-22 12:00:00', 2, 3, 'Trip 5 description', 240);


INSERT INTO participants (username, idTrip, idActivity) VALUES
  ('test', 1, 1),
  ('user', 4, 2),
  ('user2', 4, 1);
