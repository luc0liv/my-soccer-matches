export default `
SELECT 
    teams.team_name AS name,
    CAST(SUM(matches.home_team_goals) AS UNSIGNED) AS totalPoints,
    COUNT(teams.team_name) AS totalGames,
    CAST(SUM(CASE
            WHEN matches.home_team_goals > matches.away_team_goals THEN 1
            ELSE 0
        END)
        AS UNSIGNED) AS totalVictories,
    CAST(SUM(CASE
            WHEN matches.home_team_goals = matches.away_team_goals THEN 1
            ELSE 0
        END)
        AS UNSIGNED) AS totalDraws,
    CAST(SUM(CASE
            WHEN matches.home_team_goals < matches.away_team_goals THEN 1
            ELSE 0
        END)
        AS UNSIGNED) AS totalLosses,
    CAST(SUM(matches.home_team_goals) AS UNSIGNED) AS goalsFavor,
    CAST(SUM(matches.away_team_goals) AS UNSIGNED) AS goalsOwn,
    CAST(SUM(matches.home_team_goals - matches.away_team_goals)
        AS SIGNED) AS goalsBalance
FROM
    TRYBE_FUTEBOL_CLUBE.teams AS teams
        INNER JOIN
    TRYBE_FUTEBOL_CLUBE.matches AS matches ON matches.home_team_id = teams.id
WHERE
    matches.in_progress = FALSE
        AND matches.home_team_goals > matches.away_team_goals
GROUP BY teams.team_name
ORDER BY 
 totalPoints DESC ,
 totalVictories DESC , 
 goalsBalance DESC , 
 goalsFavor DESC , 
 goalsOwn DESC;
`;
