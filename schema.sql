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

-- DROP TABLE IF EXISTS player CASCADE;
    -- CREATE TABLE player (
    --     id SERIAL,  
    --     playerID text NOT NULL UNIQUE,
    --     teamID text NOT NULL REFERENCES team (teamID),
    --     firstName text NOT NULL,
    --     lastName text NOT NULL,
    --     yearsPro text, 
    --     collegeName text,
    --     country text,
    --     dateOfBirth text,
    --     affiliation text,
    --     heightInMeters text,
    --     weightInKilograms text,
    --     pos text,
    --     jersey text,
    --     active text,
    --     startNba text,
    --     PRIMARY KEY (id, teamID)
    -- );


-- tables store all players who was MVP in at list 1 game of the season

    -- DROP TABLE IF EXISTS season18 CASCADE;
    --     CREATE TABLE season18 (
    --         id SERIAL,  
    --         playerID text NOT NULL UNIQUE REFERENCES player (playerID),
    --         awards integer NOT NULL,
    --         PRIMARY KEY (id, playerID)
    --     );


-- tables store 30 best players each in from regular season or best players from playoff

-- DROP TABLE IF EXISTS season2016 CASCADE;
--     CREATE TABLE season2016 (
--         id SERIAL,  
--         playerID text NOT NULL UNIQUE REFERENCES player (playerID),
--         awards integer NOT NULL,
--         position integer NOT NULL,
--         PRIMARY KEY (id, playerID)
--     );

    -- DROP TABLE IF EXISTS playOff2018 CASCADE;
    -- CREATE TABLE playOff2018 (
    --     id SERIAL,  
    --     playerID text NOT NULL UNIQUE REFERENCES player (playerID),
    --     awards integer NOT NULL,
    --     position integer not null,
    --     PRIMARY KEY (id, playerID)
    -- );


