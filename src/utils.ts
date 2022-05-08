export function getRandomElement(items: any[]) {
    const index = Math.floor(Math.random() * items.length);

    return items[index];
}

export function getGovnoLevel(index: number) {
    const levels = [
        'по щиколотку в говне',
        'по колено в говне',
        'по пояс в говне',
        'по пупок в говне',
        'по ребра в говне',
        'по сосцы в говне',
        'по плечи в говне',
        'по шею в говне',
        'по подбородок в говне',
        'по нос в говне',
        'по глаза в говне',
    ];
    const level = levels[index];

    if (level) {
        return level;
    }

    return 'утонул в говне';
}
