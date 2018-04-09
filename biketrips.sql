CREATE DATABASE IF NOT EXISTS bikeTrips;

USE bikeTrips;

DROP TABLE IF EXISTS participants;
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS episodes;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS levels;
DROP TABLE IF EXISTS statuses;

CREATE TABLE users (
  username  VARCHAR(30) NOT NULL,
  password  VARCHAR(60) NOT NULL,
  email     VARCHAR(50) NOT NULL,
  firstName VARCHAR(30) NOT NULL,
  lastName  VARCHAR(30) NOT NULL,
  role      VARCHAR(30) NOT NULL,
  photo     MEDIUMBLOB           DEFAULT NULL,
  points    INTEGER     NOT NULL DEFAULT 0,
  PRIMARY KEY (username)
);

CREATE TABLE applications (
  username   VARCHAR(30) NOT NULL,
  email      VARCHAR(50) NOT NULL,
  isActive   BOOLEAN     NOT NULL,
  createDate DATETIME    NOT NULL,
  PRIMARY KEY (username),
  FOREIGN KEY (username) REFERENCES users (username)
);

CREATE TABLE levels (
  idLevel INTEGER     NOT NULL AUTO_INCREMENT,
  name    VARCHAR(15) NOT NULL,
  PRIMARY KEY (idLevel)
);

CREATE TABLE statuses (
  idStatus INTEGER     NOT NULL AUTO_INCREMENT,
  name     VARCHAR(15) NOT NULL,
  PRIMARY KEY (idStatus)
);

CREATE TABLE trips (
  idTrip      INTEGER      NOT NULL AUTO_INCREMENT,
  name        VARCHAR(30)  NOT NULL,
  startDate   DATETIME     NOT NULL,
  endDate     DATETIME     NOT NULL,
  idLevel     INTEGER      NOT NULL,
  idStatus    INTEGER      NOT NULL,
  description VARCHAR(255) NOT NULL,
  points      INTEGER      NOT NULL,
  PRIMARY KEY (idTrip),
  FOREIGN KEY (idLevel) REFERENCES levels (idLevel),
  FOREIGN KEY (idStatus) REFERENCES statuses (idStatus)
);

CREATE TABLE activities (
  idActivity INTEGER     NOT NULL AUTO_INCREMENT,
  name       VARCHAR(15) NOT NULL,
  PRIMARY KEY (idActivity)
);

CREATE TABLE participants (
  username   VARCHAR(30) NOT NULL,
  idTrip     INTEGER     NOT NULL,
  idActivity INTEGER,
  PRIMARY KEY (username, idTrip),
  FOREIGN KEY (username) REFERENCES users (username),
  FOREIGN KEY (idTrip) REFERENCES trips (idTrip),
  FOREIGN KEY (idActivity) REFERENCES activities (idActivity)
);

CREATE TABLE locations (
  idLocation  INTEGER         NOT NULL AUTO_INCREMENT,
  description VARCHAR(60)     NOT NULL,
  latitude    NUMERIC(18, 14) NOT NULL,
  longitude   NUMERIC(18, 14) NOT NULL,
  PRIMARY KEY (idLocation)
);

CREATE TABLE episodes (
  idEpisode   INTEGER      NOT NULL AUTO_INCREMENT,
  idTrip      INTEGER      NOT NULL,
  time        DATETIME     NOT NULL,
  description VARCHAR(255) NOT NULL,
  idLocation  INTEGER      NOT NULL,
  PRIMARY KEY (idEpisode),
  FOREIGN KEY (idTrip) REFERENCES trips (idTrip),
  FOREIGN KEY (idLocation) REFERENCES locations (idLocation)
);

CREATE TABLE albums (
  idAlbum INTEGER NOT NULL AUTO_INCREMENT,
  idTrip  INTEGER NOT NULL,
  PRIMARY KEY (idAlbum),
  FOREIGN KEY (idTrip) REFERENCES trips (idTrip)
);

CREATE TABLE photos (
  idPhoto INTEGER     NOT NULL AUTO_INCREMENT,
  idAlbum INTEGER     NOT NULL,
  url     VARCHAR(40) NOT NULL,
  PRIMARY KEY (idPhoto),
  FOREIGN KEY (idAlbum) REFERENCES albums (idAlbum)
);

INSERT INTO activities (idActivity, name) VALUES
  (1, 'invited'),
  (2, 'accepted'),
  (3, 'denied'),
  (4, 'confirmed');

INSERT INTO statuses (idStatus, name) VALUES
  (1, 'active'),
  (2, 'in progress'),
  (3, 'archived');

INSERT INTO levels (idLevel, name) VALUES
  (1, 'easy'),
  (2, 'medium'),
  (3, 'hard');

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
    'USER'
  ),
  (
    'irmikrys',
    '$2a$10$MRFnsiGe3kSlF0lWALTu2e5e89heCXHFXHA2yuCIUuyyPRDNJ2/Cu',
    'irmi@krys',
    'Irmina',
    'Krysiak',
    'USER'
  );

INSERT INTO applications (username, email, isActive, createDate) VALUES
  (
    'irmikrys',
    'irmi@krys',
    TRUE,
    NOW()
  );
