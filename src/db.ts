import Database from 'better-sqlite3';
import {
    INSERT_CHAT, INSERT_GOVNAR, INSERT_PLAYER, SELECT_GOVNARS, SELECT_GROUPED_GOVNARS,
    SELECT_PLAYERS, SELECT_TODAYS_GOVNARS,
} from './sql';

const db = new Database(process.env.DB_PATH as string);

function createTables() {
    return db.exec(`
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
    `);
}

createTables();

export const insertChat = db.prepare(INSERT_CHAT);
export const insertPlayer = db.prepare(INSERT_PLAYER);
export const listPlayers = db.prepare(SELECT_PLAYERS);
export const insertGovnar = db.prepare(INSERT_GOVNAR);
export const listGovnars = db.prepare(SELECT_GOVNARS);
export const getGovnoStats = db.prepare(SELECT_GROUPED_GOVNARS);
export const listTodaysGovnars = db.prepare(SELECT_TODAYS_GOVNARS);

export default db;
