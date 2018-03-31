CREATE DATABASE IF NOT EXISTS bike_trips;

USE bike_trips;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  username   VARCHAR(30) NOT NULL,
  password   VARCHAR(60) NOT NULL,
  email      VARCHAR(50) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name  VARCHAR(30) NOT NULL,
  role       VARCHAR(30) NOT NULL,
  PRIMARY KEY (username)
);
