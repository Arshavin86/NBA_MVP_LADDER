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
--     CREATE TABLE player (
--         id SERIAL,  
--         playerID text NOT NULL UNIQUE,
--         teamID text NOT NULL REFERENCES team (teamID),
--         firstName text NOT NULL,
--         lastName text NOT NULL,
--         yearsPro text, 
--         collegeName text,
--         country text,
--         dateOfBirth text,
--         affiliation text,
--         heightInMeters text,
--         weightInKilograms text,
--         pos text,
--         jersey text,
--         active text,
--         startNba text,
--         PRIMARY KEY (id, teamID)
--     );

-- -- tables store all players who was MVP in at list 1 game of the season

--     -- DROP TABLE IF EXISTS season18 CASCADE;
--     --     CREATE TABLE season18 (
--     --         id SERIAL,  
--     --         playerID text NOT NULL UNIQUE REFERENCES player (playerID),
--     --         awards integer NOT NULL,
--     --         PRIMARY KEY (id, playerID)
--     --     );


-- -- tables store 30 best players each in from regular season or best players from playoff

-- DROP TABLE IF EXISTS season2016 CASCADE;
--     CREATE TABLE season2016 (
--         id SERIAL,  
--         playerID text NOT NULL UNIQUE REFERENCES player (playerID),
--         awards integer NOT NULL,
--         position integer NOT NULL,
--         PRIMARY KEY (id, playerID)
--     );

--     DROP TABLE IF EXISTS season2017 CASCADE;
--     CREATE TABLE season2017 (
--         id SERIAL,  
--         playerID text NOT NULL UNIQUE REFERENCES player (playerID),
--         awards integer NOT NULL,
--         position integer NOT NULL,
--         PRIMARY KEY (id, playerID)
--     );

--     DROP TABLE IF EXISTS season2018 CASCADE;
--     CREATE TABLE season2018 (
--         id SERIAL,  
--         playerID text NOT NULL UNIQUE REFERENCES player (playerID),
--         awards integer NOT NULL,
--         position integer NOT NULL,
--         PRIMARY KEY (id, playerID)
--     );

--     DROP TABLE IF EXISTS season2019 CASCADE;
--     CREATE TABLE season2019 (
--         id SERIAL,  
--         playerID text NOT NULL UNIQUE REFERENCES player (playerID),
--         awards integer NOT NULL,
--         position integer NOT NULL,
--         PRIMARY KEY (id, playerID)
--     );

-- DROP TABLE IF EXISTS playOff2016 CASCADE;
--     CREATE TABLE playOff2016 (
--         id SERIAL,  
--         playerID text NOT NULL UNIQUE REFERENCES player (playerID),
--         awards integer NOT NULL,
--         position integer not null,
--         PRIMARY KEY (id, playerID)
--     );
--     DROP TABLE IF EXISTS playOff2017 CASCADE;
--     CREATE TABLE playOff2017 (
--         id SERIAL,  
--         playerID text NOT NULL UNIQUE REFERENCES player (playerID),
--         awards integer NOT NULL,
--         position integer not null,
--         PRIMARY KEY (id, playerID)
--     );
--     DROP TABLE IF EXISTS playOff2018 CASCADE;
--     CREATE TABLE playOff2018 (
--         id SERIAL,  
--         playerID text NOT NULL UNIQUE REFERENCES player (playerID),
--         awards integer NOT NULL,
--         position integer not null,
--         PRIMARY KEY (id, playerID)
--     );
--     DROP TABLE IF EXISTS playOff2019 CASCADE;
--     CREATE TABLE playOff2019 (
--         id SERIAL,  
--         playerID text NOT NULL UNIQUE REFERENCES player (playerID),
--         awards integer NOT NULL,
--         position integer not null,
--         PRIMARY KEY (id, playerID)
--     );

-- alter table for deleting rows referenced from another table
-- ALTER TABLE public.game
-- DROP CONSTRAINT game_losingteamid_fkey,
-- ADD CONSTRAINT  game_losingteamid_fkey
--    FOREIGN KEY (losingteamid)
--    REFERENCES team(teamID)
--    ON DELETE CASCADE;

-- ALTER TABLE public.game
-- DROP CONSTRAINT game_winningteamid_fkey,
-- ADD CONSTRAINT  game_winningteamid_fkey
--    FOREIGN KEY (winningteamid)
--    REFERENCES team(teamID)
--    ON DELETE CASCADE;

-- ALTER TABLE public.player
-- DROP CONSTRAINT player_teamid_fkey,
-- ADD CONSTRAINT   player_teamid_fkey
--    FOREIGN KEY (teamid)
--    REFERENCES team(teamid)
--    ON DELETE CASCADE;