import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });
/* eslint-disable import/first */
import { Telegraf } from 'telegraf';
import {
    getGovnoStats,
    insertChat, insertGovnar, insertPlayer, listPlayers, listTodaysGovnars,
} from './db';
import { getGovnoLevel, getPlayerName, getRandomElement } from './utils';
/* eslint-enable import/first */

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN as string);

bot.start((ctx) => {
    const chat = ctx.update.message.chat as unknown as {id: string; title: string;};

    insertChat.run({ chatId: chat.id, name: chat.title });
    return ctx.reply('А жизнь веселый карнавал');
});

bot.command('reg', (ctx) => {
    /* eslint-disable camelcase */
    const {
        from: {
            username, first_name, last_name, id,
        }, chat,
    } = ctx.update.message;
    const name = `${first_name} ${last_name}`;
    try {
        insertPlayer.run({
            chatId: chat.id,
            name,
            username,
            id: `${chat.id}:${id}`,
        });
        return ctx.reply(`Добро пожаловать в игру, ${username || name}`, { parse_mode: 'HTML' });
    } catch (error) {
        console.log(error);
        return ctx.reply('Ты уже зарегистрирован');
    }
    /* eslint-enable camelcase */
});

const s = '💩';

bot.command('govno', async (ctx) => {
    const { chat } = ctx.update.message;

    const players = listPlayers.all(chat.id);

    if (players.length === 0) {
        return ctx.reply('Нет зарегистрированных игроков. Используйте команду /reg');
    }

    const today = listTodaysGovnars.all(chat.id);

    if (today.length > 0) {
        const [player] = today;

        return ctx.reply(`Пропердолька дня: ${getPlayerName(player)}. Завтра можно выбрать новую`, { parse_mode: 'HTML' });
    }

    const govnoPlayer = getRandomElement(players);
    insertGovnar.run({
        createdAt: Date.now(),
        playerId: govnoPlayer.id,
    });
    const stats = getGovnoStats.all(govnoPlayer.chat_id) as {name: string; count: number}[];
    const playerStat = stats.find((stat) => stat.name === govnoPlayer.name);

    if (playerStat) {
        const level = getGovnoLevel(playerStat.count - 1);
        return ctx.reply(`Теперь ${getPlayerName(playerStat)} ${level}`, { parse_mode: 'HTML' });
    }

    return 'Ууупс! Ничего не получилось';
});

bot.command('govnostats', (ctx) => {
    const { chat } = ctx.update.message;
    const stats = getGovnoStats.all(chat.id) as {name: string; count: number; username?: string;}[];

    if (stats.length === 0) {
        return ctx.reply(`Утечек ${s} не обнаружено`);
    }
    const msg = stats.reduce((acc, stat, i) => {
        const name = stat.username || stat.name;
        const isWater = /настя|анастасия|anastasia|nastya/gi.test(name.toLocaleLowerCase());
        const level = getGovnoLevel(stat.count - 1, isWater);
        return `${acc}\n${i + 1}. <b>${stat.username || stat.name}</b> - ${level}`;
    }, '');
    return ctx.reply(msg, { parse_mode: 'HTML' });
});

bot.launch();
