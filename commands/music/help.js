module.exports = {
    name: 'music',
    aliases: ['mhelp', 'commands'],
    category: 'Music',
    utilisation: '{prefix}music',

    execute(client, message) {
        message.channel.send({
            embeds: [{
                color: 0x800080,
                title: '🎵 Музичний Гайд Puzo Gang',
                description: 'Ось список команд через `!`',
                footer: { text: 'Puzo Gang Bot' },
                fields: [
                    { name: '🚀 Основне', value: '`!play [назва/URL]` — Грати.\n`!stop` — Вирубити.\n`!skip` — Скіпнути.', inline: false },
                    { name: '🕹️ Керування', value: '`!pause` — Пауза.\n`!resume` — Продовжити.\n`!volume [1-100]` — Гучність.', inline: false },
                    { name: '📜 Черга', value: '`!queue` — Список.\n`!clear-queue` — Чистка.\n`!shuffle` — Рандом.', inline: false },
                    { name: '✨ Ефекти', value: '`!nowplaying` — Шо грає.\n`!filters` — Список ефектів.\n`!filter [назва]` — Вкл/Викл ефект.', inline: false }
                ],
                timestamp: new Date(),
            }],
        });
        message.react('📖');
    },
};