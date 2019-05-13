\connect nba;
 CREATE SCHEMA IF NOT EXISTS testNBA AUTHORIZATION andrei;
    CREATE TABLE matchDay (
        id SERIAL PRIMARY KEY,  
        date date NOT NULL,
        gameIDs integer []
    );