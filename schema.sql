\connect nba;
--  CREATE SCHEMA IF NOT EXISTS testNBA AUTHORIZATION andrei;
 
--     DROP TABLE IF EXISTS team CASCADE;
--     CREATE TABLE team (
--         id SERIAL PRIMARY KEY,  
--         teamID text NOT NULL UNIQUE,
--         name text NOT NULL,
--         logo text NOT NULL
--     );


--     DROP TABLE IF EXISTS game CASCADE;
--     CREATE TABLE game (
--         id SERIAL,  
--         date date NOT NULL,
--         gameID text NOT NULL,
--         winningTeamID text NOT NULL REFERENCES team (teamID),
--         losingTeamID text NOT NULL REFERENCES team (teamID),
--         bestPlayer1 text NOT NULL REFERENCES player (playerID),
--         bestPlayer2 text NOT NULL,
--         score text [],
--         statsBP1 text [],
--         statsBP2 text [],
--         PRIMARY KEY (id, winningTeamID, losingTeamID, bestPlayer1, bestPlayer2)
--     );

--     DROP TABLE IF EXISTS playOff19 CASCADE;
--     CREATE TABLE playOff19 (
--         id SERIAL,  
--         playerID text NOT NULL UNIQUE REFERENCES player (playerID),
--         awards integer NOT NULL,
--         PRIMARY KEY (id, playerID)
--     );

--     DROP TABLE IF EXISTS season19 CASCADE;
--     CREATE TABLE season19 (
--         id SERIAL,  
--         playerID text NOT NULL UNIQUE REFERENCES player (playerID),
--         awards integer NOT NULL,
--         PRIMARY KEY (id, playerID)
--     );

    -- DROP TABLE IF EXISTS playOff18 CASCADE;
    -- CREATE TABLE playOff18 (
    --     id SERIAL,  
    --     playerID text NOT NULL UNIQUE REFERENCES player (playerID),
    --     awards integer NOT NULL,
    --     PRIMARY KEY (id, playerID)
    -- );

    -- DROP TABLE IF EXISTS playOff17 CASCADE;
    -- CREATE TABLE playOff17 (
    --     id SERIAL,  
    --     playerID text NOT NULL UNIQUE REFERENCES player (playerID),
    --     awards integer NOT NULL,
    --     PRIMARY KEY (id, playerID)
    -- );

    -- DROP TABLE IF EXISTS playOff16 CASCADE;
    -- CREATE TABLE playOff16 (
    --     id SERIAL,  
    --     playerID text NOT NULL UNIQUE REFERENCES player (playerID),
    --     awards integer NOT NULL,
    --     PRIMARY KEY (id, playerID)
    -- );

    -- DROP TABLE IF EXISTS season18 CASCADE;
    -- CREATE TABLE season18 (
    --     id SERIAL,  
    --     playerID text NOT NULL UNIQUE REFERENCES player (playerID),
    --     awards integer NOT NULL,
    --     PRIMARY KEY (id, playerID)
    -- );

    -- DROP TABLE IF EXISTS season17 CASCADE;
    --     CREATE TABLE season17 (
    --         id SERIAL,  
    --         playerID text NOT NULL UNIQUE REFERENCES player (playerID),
    --         awards integer NOT NULL,
    --         PRIMARY KEY (id, playerID)
    --     );

        -- DROP TABLE IF EXISTS season16 CASCADE;
        -- CREATE TABLE season16 (
        --     id SERIAL,  
        --     playerID text NOT NULL UNIQUE REFERENCES player (playerID),
        --     awards integer NOT NULL,
        --     PRIMARY KEY (id, playerID)
        -- );

        DROP TABLE IF EXISTS player CASCADE;
    CREATE TABLE player (
        id SERIAL,  
        playerID text NOT NULL UNIQUE,
        teamID text NOT NULL REFERENCES team (teamID),
        firstName text NOT NULL,
        lastName text NOT NULL,
        yearsPro text, 
        collegeName text,
        country text,
        dateOfBirth text,
        affiliation text,
        heightInMeters text,
        weightInKilograms text,
        pos text,
        jersey text,
        active text,
        startNba text,
        PRIMARY KEY (id, teamID)
    );

