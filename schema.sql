\connect nba;
 CREATE SCHEMA IF NOT EXISTS testNBA AUTHORIZATION andrei;
 
    DROP TABLE IF EXISTS team CASCADE;
    CREATE TABLE team (
        id SERIAL PRIMARY KEY,  
        teamID text NOT NULL UNIQUE,
        name text NOT NULL,
        logo text NOT NULL
    );

    DROP TABLE IF EXISTS player CASCADE;
    CREATE TABLE player (
        id SERIAL,  
        playerID text NOT NULL UNIQUE,
        games text [],
        name text NOT NULL,
        teamID text NOT NULL REFERENCES team (teamID),
        PRIMARY KEY (id, teamID)
    );

    DROP TABLE IF EXISTS game CASCADE;
    CREATE TABLE game (
        id SERIAL,  
        date date NOT NULL,
        gameID text NOT NULL,
        winningTeamID text NOT NULL REFERENCES team (teamID),
        losingTeamID text NOT NULL REFERENCES team (teamID),
        bestPlayer1 text NOT NULL REFERENCES player (playerID),
        bestPlayer2 text NOT NULL REFERENCES player (playerID),
        score text [],
        statsBP1 text [],
        statsBP2 text [],
        PRIMARY KEY (id, winningTeamID, losingTeamID, bestPlayer1, bestPlayer2)
    );
