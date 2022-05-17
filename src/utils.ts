export function getRandomElement(items: any[]) {
    const index = Math.floor(Math.random() * items.length);

    return items[index];
}

const synonyms = [
    'какашках',
    'дерьмище',
    'гуано',
    'навозе',
    'говешках',
    'пропердольках',
    'кале',
    'фекалиях',
    'нечистотах',
    'экскрементах',
    'каловых массах',
];

const w = '💦';

export function getGovnoLevel(index: number, isWater = false) {
    const levels = [
        'по щиколотку в ',
        'по колено в ',
        'по пояс в ',
        'по пупок в ',
        'по ребра в ',
        'по сосцы в ',
        'по плечи в ',
        'по шею в ',
        'по подбородок в ',
        'по нос в ',
        'по глаза в ',
    ];
    const level = levels[index];
    const suffix = isWater ? `${w}воде${w}` : getRandomElement(synonyms);

    if (level) {
        return level + suffix;
    }

    return `утонул в ${suffix}`;
}

export function getPlayerName(player: {name: string; username?: string}) {
    return player.username ? `@${player.username}` : player.name;
}

const intros = [
    ['Пень', 'Столб', 'Нос'],
    ['Стиль', 'Шик', 'Сволочь!'],
    ['День', 'Прошел', 'Кактус'],
];

export function getPidorIntro() {
    return getRandomElement(intros) as string[];
}

export function sleep(ms = 3000) {
    return new Promise<void>((res) => {
        setTimeout(() => {
            res();
        }, ms);
    });
}

// eslint-disable-next-line no-unused-vars
type ForEachCb<T> = (item: T, index: number, items: T[]) => Promise<any>;

export async function asyncForEach<T>(array: T[], callback: ForEachCb<T>) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array); // eslint-disable-line no-await-in-loop
    }
}
