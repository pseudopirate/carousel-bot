import Database from 'better-sqlite3';
import {
    CREATE_TABLES,
    INSERT_CHAT, INSERT_GOVNAR, INSERT_PLAYER, SELECT_GOVNARS, SELECT_GROUPED_GOVNARS,
    SELECT_PLAYERS, SELECT_TODAYS_GOVNARS,
} from './sql';

const db = new Database(process.env.DB_PATH as string);

function createTables() {
    return db.exec(CREATE_TABLES);
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
