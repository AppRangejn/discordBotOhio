module.exports = {
    name: 'w-filters',
    aliases: ['filters'],
    category: 'Music',
    utilisation: '{prefix}w-filters',

    async execute(client, message, args) {
        if (!message || !message.member) return;


        if (args[0]) {
            const filterCommand = client.commands.get('filter');
            if (filterCommand) return filterCommand.execute(client, message, args);
        }

        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying()) {
            return message.channel.send(`${client.emotes.error} - Включи шось спочатку!`);
        }

        const enabledFilters = queue.filters.ffmpeg.getFiltersEnabled();
        const filtersList = ['bassboost', '8D', 'nightcore', 'vibrato', 'vaporwave', 'reverse'];
        
        const col1 = [];
        const col2 = [];

        filtersList.forEach((filter, index) => {
            const isEnabled = enabledFilters.includes(filter);
            const statusEmoji = isEnabled ? (client.emotes.success || '✅') : (client.emotes.off || '❌');
            const text = `${filter.charAt(0).toUpperCase() + filter.slice(1)} : ${statusEmoji}`;
            
            if (index % 2 === 0) col1.push(text);
            else col2.push(text);
        });

        message.channel.send({
            embeds: [{
                color: 0x800080,
                title: '🎧 Налаштування звуку Puzo Gang',
                description: `Використовуй \`!filter [назва]\` для вкл/викл`,
                fields: [
                    { name: 'Фільтри', value: col1.join('\n'), inline: true },
                    { name: '** **', value: col2.join('\n'), inline: true },
                ],
                footer: { text: 'Puzo Gang Bot' },
                timestamp: new Date(),
            }],
        });
    },
};