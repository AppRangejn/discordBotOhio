module.exports = {
    name: 'skip',
    aliases: ['sk'],
    category: 'Music',
    utilisation: '{prefix}skip',

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
            return message.channel.send(`${client.emotes.error} - Я і так нічого не граю, шо ти там скіпати зібрався?`);
        }

        const currentTrack = queue.currentTrack;
        
        const success = queue.node.skip();

        if (success) {
            message.channel.send(`${client.emotes.success} - Вирубив **${currentTrack.title}**! Вмикаю наступне лайно.`);
            message.react('✅').catch(() => null);
        } else {
            message.channel.send(`${client.emotes.error} - Не зміг скіпнути, шось пішло по пизді.`);
        }
    },
};