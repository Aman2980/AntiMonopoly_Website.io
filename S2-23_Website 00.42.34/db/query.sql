-- 2 files

SELECT game_id,
       int_players.player_name,
       role,
       balance,
       games_played,
       games_won,
       total_game_time,
       total_points
FROM int_players
         JOIN int_player_info ON int_players.player_name = int_player_info.player_name;


select player_name, reverse(player_name) as userPasswd
from int_player_info;
y

--

