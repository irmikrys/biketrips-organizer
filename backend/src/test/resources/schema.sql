DROP SCHEMA IF EXISTS bikeTripsTest;
CREATE SCHEMA bikeTripsTest;
USE bikeTripsTest;

DROP TABLE IF EXISTS users;
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

DROP TABLE IF EXISTS applications;
CREATE TABLE applications (
  username VARCHAR(30) NOT NULL,
  email    VARCHAR(50) NOT NULL,
  isActive BOOLEAN     NOT NULL,
  PRIMARY KEY (username),
  FOREIGN KEY (username) REFERENCES users (username)
);

DROP TABLE IF EXISTS levels;
CREATE TABLE levels (
  idLevel INTEGER     NOT NULL,
  name    VARCHAR(15) NOT NULL,
  PRIMARY KEY (idLevel)
);

DROP TABLE IF EXISTS statuses;
CREATE TABLE statuses (
  idStatus INTEGER     NOT NULL,
  name     VARCHAR(15) NOT NULL,
  PRIMARY KEY (idStatus)
);

DROP TABLE IF EXISTS trips;
CREATE TABLE trips (
  idTrip      INTEGER      NOT NULL,
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

DROP TABLE IF EXISTS activities;
CREATE TABLE activities (
  idActivity INTEGER     NOT NULL,
  name       VARCHAR(15) NOT NULL,
  PRIMARY KEY (idActivity)
);

DROP TABLE IF EXISTS participants;
CREATE TABLE participants (
  username   VARCHAR(30) NOT NULL,
  idTrip     INTEGER     NOT NULL,
  idActivity INTEGER,
  PRIMARY KEY (username, idTrip),
  FOREIGN KEY (username) REFERENCES users (username),
  FOREIGN KEY (idTrip) REFERENCES trips (idTrip),
  FOREIGN KEY (idActivity) REFERENCES activities (idActivity)
);

DROP TABLE IF EXISTS locations;
CREATE TABLE locations (
  idLocation  INTEGER         NOT NULL,
  description VARCHAR(60)     NOT NULL,
  latitude    NUMERIC(18, 14) NOT NULL,
  longitude   NUMERIC(18, 14) NOT NULL,
  PRIMARY KEY (idLocation)
);

DROP TABLE IF EXISTS episodes;
CREATE TABLE episodes (
  idEpisode   INTEGER      NOT NULL,
  idTrip      INTEGER      NOT NULL,
  time        DATETIME     NOT NULL,
  description VARCHAR(255) NOT NULL,
  idLocation  INTEGER      NOT NULL,
  PRIMARY KEY (idEpisode),
  FOREIGN KEY (idTrip) REFERENCES trips (idTrip),
  FOREIGN KEY (idLocation) REFERENCES locations (idLocation)
);

DROP TABLE IF EXISTS albums;
CREATE TABLE albums (
  idAlbum INTEGER NOT NULL,
  idTrip  INTEGER NOT NULL,
  PRIMARY KEY (idAlbum),
  FOREIGN KEY (idTrip) REFERENCES trips (idTrip)
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
  idPhoto INTEGER     NOT NULL,
  idAlbum INTEGER     NOT NULL,
  url     VARCHAR(40) NOT NULL,
  PRIMARY KEY (idPhoto),
  FOREIGN KEY (idAlbum) REFERENCES albums (idAlbum)
);
