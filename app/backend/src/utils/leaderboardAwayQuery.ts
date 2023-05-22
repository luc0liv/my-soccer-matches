export default `
SELECT 
    teams.team_name AS name,
    CAST(SUM(CASE 
        WHEN matches.away_team_goals > matches.home_team_goals THEN 3 ELSE 0 END) AS UNSIGNED) +
    CAST(SUM(CASE 
        WHEN matches.away_team_goals = matches.home_team_goals THEN 1 ELSE 0 END) AS UNSIGNED)
    AS totalPoints,
    COUNT(teams.team_name) AS totalGames,
    CAST(SUM(CASE
            WHEN matches.away_team_goals > matches.home_team_goals THEN 1
            ELSE 0
        END)
        AS UNSIGNED) AS totalVictories,
    CAST(SUM(CASE
            WHEN matches.away_team_goals = matches.home_team_goals THEN 1
            ELSE 0
        END)
        AS UNSIGNED) AS totalDraws,
    CAST(SUM(CASE
            WHEN matches.away_team_goals < matches.home_team_goals THEN 1
            ELSE 0
        END)
        AS UNSIGNED) AS totalLosses,
    CAST(SUM(matches.away_team_goals) AS UNSIGNED) AS goalsFavor,
    CAST(SUM(matches.home_team_goals) AS UNSIGNED) AS goalsOwn,
    CAST(SUM(matches.away_team_goals) - SUM(matches.home_team_goals)
        AS SIGNED) AS goalsBalance,
ROUND(
    SUM(CASE 
    WHEN matches.away_team_goals > matches.home_team_goals THEN 3
    WHEN matches.away_team_goals = matches.home_team_goals THEN 1 ELSE 0
    END
) / ((COUNT(teams.team_name) * 3)) * 100, 2
    ) AS efficiency
FROM
    TRYBE_FUTEBOL_CLUBE.teams AS teams
        INNER JOIN
    TRYBE_FUTEBOL_CLUBE.matches AS matches ON matches.away_team_id = teams.id
WHERE
    matches.in_progress = 0
GROUP BY teams.team_name
ORDER BY totalPoints DESC ,
 totalVictories DESC ,
 goalsBalance DESC ,
  goalsFavor DESC ,
   goalsOwn DESC;`;
