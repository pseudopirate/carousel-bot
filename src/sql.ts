export const INSERT_CHAT = 'INSERT OR IGNORE INTO chats (chat_id, name) VALUES (@chatId, @name)';

export const INSERT_PLAYER = 'INSERT INTO players (id, name, chat_id) values (@id, @name, @chatId)';

export const SELECT_PLAYERS = 'SELECT * from players WHERE chat_id = ?';

export const INSERT_GOVNAR = 'INSERT INTO govnars (player_id, created_at) values (@playerId, @createdAt)';

export const SELECT_GOVNARS = `SELECT * 
FROM govnars g
JOIN players p ON g.player_id = p.id
WHERE p.chat_id = ?
ORDER BY g.created_at ASC;`;

export const SELECT_GROUPED_GOVNARS = `SELECT p.name as name, count(p.id) as count
FROM govnars g
JOIN players p ON g.player_id = p.id
WHERE p.chat_id = ?
GROUP BY p.id
HAVING COUNT(p.id) > 1
ORDER BY count DESC
LIMIT 10;`;

export const SELECT_TODAYS_GOVNARS = `SELECT p.name
FROM govnars g
JOIN players p ON g.player_id = p.id
WHERE date(datetime(g.created_at / 1000, 'unixepoch')) = date('now')
AND p.chat_id = ?
ORDER BY g.created_at;`;
