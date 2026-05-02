module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    category: 'Music',
    utilisation: '{prefix}shuffle',

    async execute(client, message, args) {
        if (!message || !message.member) return;


        if (!message.member.voice.channel) {
            return message.channel.send(`${client.emotes.error} - Чуєш, єблан, зайди в голосовий канал спочатку!`);
        }


        const botMember = message.guild.members.me;
        if (botMember.voice.channel && message.member.voice.channel.id !== botMember.voice.channel.id) {
            return message.channel.send(`${client.emotes.error} - Ти шо, даун? Я в іншому каналі, йди сюди!`);
        }


        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying()) {
            return message.channel.send(`${client.emotes.error} - В черзі порожньо, як у холодильнику Ілюшки!`);
        }

        queue.tracks.shuffle();

        const currentTracks = queue.tracks.toArray();
        queue.tracks.clear();
        queue.tracks.add(currentTracks);

        message.channel.send(`${client.emotes.success} - Перемішав все нахуй! Тепер черга реально рандомна.`);
        message.react('✅').catch(() => null);
    },
};