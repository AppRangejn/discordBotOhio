module.exports = {
    name: 'pause',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}pause',

    async execute(client, message, args) {

        console.log('--- DEBUG PAUSE ---');
        console.log('Чи є message:', !!message);
        console.log('Чи є member:', !!message?.member);
        
        if (!message || !message.member) {
            return console.error('Критична помилка: message або member не визначено!');
        }


        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply(`${client.emotes.error} - Чуєш, єблан, зайди в голосовий канал спочатку!`);
        }


        const botMember = message.guild.members.me;
        if (botMember.voice.channel && voiceChannel.id !== botMember.voice.channel.id) {
            return message.reply(`${client.emotes.error} - Ти шо, даун? Я в іншому каналі, йди сюди!`);
        }


        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying()) {
            return message.reply(`${client.emotes.error} - Я і так нічого не граю, шо ти там паузити зібрався?`);
        }

        if (queue.node.isPaused()) {
            return message.reply(`${client.emotes.error} - Та вже на паузі стоїть, не довби кнопку!`);
        }

        const success = queue.node.setPaused(true);

        if (success) {
            message.reply(`${client.emotes.success} - Трек **${queue.currentTrack.title}** на паузі. Відпочиваєм.`);
            message.react('✅').catch(() => null);
        }
    },
};