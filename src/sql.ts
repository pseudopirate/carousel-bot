export const CREATE_TABLES = `
begin transaction;
    create table if not exists chats (
        chat_id integer primary key,
        name text
    );
    create table if not exists players (
        id text primary key,
        username text,
        name text,
        chat_id integer,
        foreign key (chat_id) references chats(chat_id),
        check(name is not null or username is not null)
    );
    create table if not exists pidors (
        id integer primary key autoincrement,
        player_id integer,
        created_at integer,
        foreign key (player_id) references players(id)
    );
    create table if not exists govnars (
        id integer primary key autoincrement,
        player_id integer,
        created_at integer,
        foreign key (player_id) references players(id)
    );
    create index if not exists chats_chat_id on chats(chat_id);
    create index if not exists players_id on players(id);
commit;
`;

export const INSERT_CHAT = 'INSERT OR IGNORE INTO chats (chat_id, name) VALUES (@chatId, @name)';

export const INSERT_PLAYER = 'INSERT INTO players (id, name, username, chat_id) values (@id, @name, @username, @chatId)';

export const SELECT_PLAYERS = 'SELECT * from players WHERE chat_id = ?';

export const INSERT_GOVNAR = 'INSERT INTO govnars (player_id, created_at) values (@playerId, @createdAt)';
export const INSERT_PIDOR = 'INSERT INTO pidors (player_id, created_at) values (@playerId, @createdAt)';

export const SELECT_GOVNARS = `SELECT * 
FROM govnars g
JOIN players p ON g.player_id = p.id
WHERE p.chat_id = ?
ORDER BY g.created_at ASC;`;

export const SELECT_PIDORS = `SELECT * 
FROM pidors pi
JOIN players p ON pi.player_id = p.id
WHERE p.chat_id = ?
ORDER BY pi.created_at ASC;`;

export const SELECT_GROUPED_GOVNARS = `SELECT p.name as name, p.username as username, count(p.id) as count
FROM govnars g
JOIN players p ON g.player_id = p.id
WHERE p.chat_id = ?
GROUP BY p.id
HAVING COUNT(p.id) > 0
ORDER BY count DESC
LIMIT 10;`;

export const SELECT_GROUPED_PIDORS = `SELECT p.name as name, p.username as username, count(p.id) as count
FROM pidors pi
JOIN players p ON pi.player_id = p.id
WHERE p.chat_id = ?
GROUP BY p.id
HAVING COUNT(p.id) > 0
ORDER BY count DESC
LIMIT 10;`;

export const SELECT_TODAYS_GOVNARS = `SELECT p.name, p.username
FROM govnars g
JOIN players p ON g.player_id = p.id
WHERE date(datetime(g.created_at / 1000, 'unixepoch')) = date('now')
AND p.chat_id = ?
ORDER BY g.created_at;`;

export const SELECT_TODAYS_PIDORS = `SELECT p.name, p.username
FROM pidors pi
JOIN players p ON pi.player_id = p.id
WHERE date(datetime(pi.created_at / 1000, 'unixepoch')) = date('now')
AND p.chat_id = ?
ORDER BY pi.created_at;`;
