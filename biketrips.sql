CREATE DATABASE IF NOT EXISTS bike_trips;

USE bike_trips;

DROP TABLE IF EXISTS participants;
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
  username   VARCHAR(30) NOT NULL,
  password   VARCHAR(60) NOT NULL,
  email      VARCHAR(50) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name  VARCHAR(30) NOT NULL,
  role       VARCHAR(30) NOT NULL,
  photo      MEDIUMBLOB           DEFAULT NULL,
  points     INTEGER     NOT NULL DEFAULT 0,
  PRIMARY KEY (username)
);

CREATE TABLE levels (
  id_level INTEGER     NOT NULL,
  name     VARCHAR(15) NOT NULL,
  PRIMARY KEY (id_level)
);

CREATE TABLE statuses (
  id_status INTEGER     NOT NULL,
  name      VARCHAR(15) NOT NULL,
  PRIMARY KEY (id_status)
);

CREATE TABLE trips (
  id_trip     INTEGER      NOT NULL,
  name        VARCHAR(30)  NOT NULL,
  start_date  DATETIME     NOT NULL,
  end_date    DATETIME     NOT NULL,
  id_level    INTEGER      NOT NULL,
  id_status   INTEGER      NOT NULL,
  description VARCHAR(255) NOT NULL,
  points      INTEGER      NOT NULL,
  PRIMARY KEY (id_trip),
  FOREIGN KEY (id_level) REFERENCES levels (id_level),
  FOREIGN KEY (id_status) REFERENCES statuses (id_status)
);

CREATE TABLE activities (
  id_activity INTEGER     NOT NULL,
  name        VARCHAR(15) NOT NULL,
  PRIMARY KEY (id_activity)
);

CREATE TABLE participants (
  username    VARCHAR(30) NOT NULL,
  id_trip     INTEGER     NOT NULL,
  id_activity INTEGER,
  PRIMARY KEY (username, id_trip),
  FOREIGN KEY (username) REFERENCES users (username),
  FOREIGN KEY (id_trip) REFERENCES trips (id_trip),
  FOREIGN KEY (id_activity) REFERENCES activities (id_activity)
);

CREATE TABLE locations (
  id_location INTEGER         NOT NULL,
  description VARCHAR(60)     NOT NULL,
  latitude    NUMERIC(18, 14) NOT NULL,
  longitude   NUMERIC(18, 14) NOT NULL,
  PRIMARY KEY (id_location)
);

CREATE TABLE episodes (
  id_episode  INTEGER      NOT NULL,
  id_trip     INTEGER      NOT NULL,
  time        DATETIME     NOT NULL,
  description VARCHAR(255) NOT NULL,
  id_location INTEGER      NOT NULL,
  PRIMARY KEY (id_episode),
  FOREIGN KEY (id_trip) REFERENCES trips (id_trip),
  FOREIGN KEY (id_location) REFERENCES locations (id_location)
);

CREATE TABLE albums (
  id_album INTEGER NOT NULL,
  id_trip  INTEGER NOT NULL,
  PRIMARY KEY (id_album),
  FOREIGN KEY (id_trip) REFERENCES trips (id_trip)
);

CREATE TABLE photos (
  id_photo INTEGER     NOT NULL,
  id_album INTEGER     NOT NULL,
  url      VARCHAR(40) NOT NULL,
  PRIMARY KEY (id_photo),
  FOREIGN KEY (id_album) REFERENCES albums (id_album)
);

INSERT INTO activities (id_activity, name) VALUES
  (1, 'invited'),
  (2, 'accepted'),
  (3, 'denied'),
  (4, 'confirmed');

INSERT INTO statuses (id_status, name) VALUES
  (1, 'active'),
  (2, 'in progress'),
  (3, 'archived');

INSERT INTO levels (id_level, name) VALUES
  (1, 'easy'),
  (2, 'medium'),
  (3, 'hard');
