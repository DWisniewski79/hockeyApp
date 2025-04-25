-- Players
CREATE TABLE IF NOT EXISTS players (
    player_id SERIAL PRIMARY KEY,
    api_player_id INT UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    jersey_number INT,
    position VARCHAR(50),
    shoots CHAR(1),
    headshot_url TEXT,
    status VARCHAR(20)
);

-- Teams
CREATE TABLE IF NOT EXISTS teams (
    team_id SERIAL PRIMARY KEY,
    api_team_id INT UNIQUE NOT NULL,
    team_name VARCHAR(255) NOT NULL,
    team_abbreviation VARCHAR(10),
    dark_color VARCHAR(7),
    light_color VARCHAR(7),
    logo_url TEXT
);

-- Games
CREATE TABLE IF NOT EXISTS games (
    game_id SERIAL PRIMARY KEY,
    api_game_id INT UNIQUE NOT NULL,
    game_date TIMESTAMP,
    home_team_id INT REFERENCES teams(team_id),
    away_team_id INT REFERENCES teams(team_id),
    home_score INT,
    away_score INT,
    game_status VARCHAR(20)
);

-- Player-Team History
CREATE TABLE IF NOT EXISTS player_team_history (
    history_id SERIAL PRIMARY KEY,
    player_id INT REFERENCES players(player_id),
    team_id INT REFERENCES teams(team_id),
    season_id INT,
    start_date DATE,
    end_date DATE
);

-- Player Game Stats
CREATE TABLE IF NOT EXISTS player_game_stats (
    stat_id SERIAL PRIMARY KEY,
    game_id INT REFERENCES games(game_id),
    player_id INT REFERENCES players(player_id),
    goals INT,
    assists INT,
    points INT,
    penalties INT
);

-- Team Game Stats
CREATE TABLE IF NOT EXISTS team_game_stats (
    stat_id SERIAL PRIMARY KEY,
    game_id INT REFERENCES games(game_id),
    team_id INT REFERENCES teams(team_id),
    goals INT,
    shots_on_goal INT,
    penalties INT
);

-- Seasons
CREATE TABLE IF NOT EXISTS seasons (
    season_id SERIAL PRIMARY KEY,
    api_season_id INT UNIQUE NOT NULL,
    season_name VARCHAR(255),
    start_date DATE,
    end_date DATE,
    season_status VARCHAR(20)
);

-- Game Results
CREATE TABLE IF NOT EXISTS game_results (
    result_id SERIAL PRIMARY KEY,
    game_id INT REFERENCES games(game_id),
    team_id INT REFERENCES teams(team_id),
    opponent_id INT REFERENCES teams(team_id),
    goals_for INT,
    goals_against INT,
    result CHAR(1)
);