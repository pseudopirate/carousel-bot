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

export function getGovnoLevel(index: number) {
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
    const suffix = getRandomElement(synonyms);

    if (level) {
        return level + suffix;
    }

    return `утонул в ${suffix}`;
}

export function getPlayerName(player: {name: string; username?: string}) {
    return player.username ? `@${player.username}` : `<b>${player.name}/<b>`;
}
