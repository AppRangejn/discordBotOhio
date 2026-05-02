module.exports = {
    name: 'queue',
    aliases: ['q'],
    category: 'Music',
    utilisation: '{prefix}queue',

    execute(client, message, args) { 

        if (!message.member.voice.channel) {
            return message.channel.send(`${client.emotes.error} - Чуєш, єблан, зайди в голосовий канал спочатку!`);
        }


        const botMember = message.guild.members.me;
        if (botMember.voice.channel && message.member.voice.channel.id !== botMember.voice.channel.id) {
            return message.channel.send(`${client.emotes.error} - Ти шо, даун? Я в іншому каналі, йди сюди!`);
        }


        const queue = client.player.nodes.get(message.guild.id);


        if (!queue || !queue.currentTrack) {
            return message.channel.send(`${client.emotes.error} - В черзі порожньо, як у холодильнику Ілюшки!`);
        }


        const tracks = queue.tracks.toArray(); 
        const nextTracks = tracks.map((track, i) => {
            return `**#${i + 1}** - ${track.title} | ${track.author} (Замовив: ${track.requestedBy ? track.requestedBy.username : 'Анонім'})`;
        }).slice(0, 5).join('\n');


        const loopStatus = queue.repeatMode !== 0 ? '(на повторі)' : '';


        message.channel.send(
            `**Черга сервера - ${message.guild.name} ${client.emotes.queue} ${loopStatus}**\n` +
            `Зараз хуярить: **${queue.currentTrack.title}** | ${queue.currentTrack.author}\n\n` +
            (nextTracks || "_Далі нічого нема, тишина..._") +
            `\n\n${tracks.length > 5 ? `А також ще **${tracks.length - 5}** треків...` : `В плейлисті **${tracks.length}** пісня (і)...`}`
        );
    },
};