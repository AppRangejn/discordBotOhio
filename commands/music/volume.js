module.exports = {
    name: 'volume',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}volume [1-100]',

    execute(client, message, args) {

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
            return message.channel.send(`${client.emotes.error} - В черзі пусто, кому я маю гучність міняти, нахуй?`);
        }


        const vol = parseInt(args[0]);
        if (!args[0] || isNaN(vol) || args[0] === 'Infinity') {
            return message.channel.send(`${client.emotes.error} - Введи нормально цифри, а не якусь хуйню!`);
        }


        if (vol < 1 || vol > 100) {
            return message.channel.send(`${client.emotes.error} - Напиши число від 1 до 100, не гвалтуй колонки!`);
        }


        const success = queue.node.setVolume(vol);

        if (success) {
            message.channel.send(`${client.emotes.success} - Ввалив гучність на **${vol}%**! Тепер пацани почують.`);
            message.react('✅').catch(() => null);
        }
    },
};