module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    category: 'Music',
    utilisation: '{prefix}nowplaying',

    async execute(client, message, args) { 

        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying()) {
            return message.channel.send(`❌ - Нічого не грає, пацани в тиші сидять!`);
        }


        const track = queue.currentTrack;


        const progress = queue.node.createProgressBar({
            timecodes: true,
            length: 15,
            indicator: '🔘',
            line: '▬'
        });


        const enabledFilters = queue.filters.ffmpeg.getFiltersEnabled();
        const filtersDisplay = enabledFilters.length > 0 ? enabledFilters.join(', ') : 'Немає';


        message.channel.send({
            embeds: [{
                color: 0x800080,
                title: `🎶 Зараз грає: ${track.title}`,
                thumbnail: { url: track.thumbnail },
                fields: [
                    { name: 'Автор', value: track.author, inline: true },
                    { name: 'Замовив', value: track.requestedBy ? track.requestedBy.username : 'Хтось анонімний', inline: true },
                    { name: 'Фільтри', value: filtersDisplay, inline: true },
                    { name: 'Прогрес', value: progress, inline: false }
                ],
                footer: { text: 'Puzo Gang Bot • Качаємо далі' },
                timestamp: new Date(),
            }],
        });
        
        message.react('🎧').catch(() => null);
    },
};