DROP SCHEMA IF EXISTS test;
CREATE SCHEMA test;
USE test;

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
  isActive   BOOLEAN     NOT NULL DEFAULT TRUE,
  createDate DATETIME    NOT NULL DEFAULT NOW(),
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
  idTrip      BIGINT       NOT NULL AUTO_INCREMENT,
  moderator   VARCHAR(30)  NOT NULL,
  name        VARCHAR(30)  NOT NULL,
  startDate   DATETIME     NOT NULL,
  endDate     DATETIME     NOT NULL,
  idLevel     INTEGER      NOT NULL,
  idStatus    INTEGER      NOT NULL,
  description VARCHAR(255) NOT NULL,
  points      INTEGER      NOT NULL,
  PRIMARY KEY (idTrip),
  FOREIGN KEY (moderator) REFERENCES users (username),
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
  idTrip     BIGINT      NOT NULL,
  idActivity INTEGER,
  PRIMARY KEY (username, idTrip),
  FOREIGN KEY (username) REFERENCES users (username),
  FOREIGN KEY (idTrip) REFERENCES trips (idTrip),
  FOREIGN KEY (idActivity) REFERENCES activities (idActivity)
);

CREATE TABLE locations (
  idLocation  BIGINT          NOT NULL AUTO_INCREMENT,
  description VARCHAR(60)     NOT NULL,
  latitude    NUMERIC(18, 14) NOT NULL,
  longitude   NUMERIC(18, 14) NOT NULL,
  PRIMARY KEY (idLocation)
);

CREATE TABLE episodes (
  idEpisode   BIGINT       NOT NULL AUTO_INCREMENT,
  idTrip      BIGINT       NOT NULL,
  time        DATETIME     NOT NULL,
  description VARCHAR(255) NOT NULL,
  idLocation  BIGINT       NOT NULL,
  PRIMARY KEY (idEpisode),
  FOREIGN KEY (idTrip) REFERENCES trips (idTrip),
  FOREIGN KEY (idLocation) REFERENCES locations (idLocation)
);

CREATE TABLE albums (
  idAlbum BIGINT NOT NULL AUTO_INCREMENT,
  idTrip  BIGINT NOT NULL,
  PRIMARY KEY (idAlbum),
  FOREIGN KEY (idTrip) REFERENCES trips (idTrip)
);

CREATE TABLE photos (
  idPhoto BIGINT      NOT NULL AUTO_INCREMENT,
  idAlbum BIGINT      NOT NULL,
  url     VARCHAR(40) NOT NULL,
  PRIMARY KEY (idPhoto),
  FOREIGN KEY (idAlbum) REFERENCES albums (idAlbum)
);
