module.exports = {
    name: 'resume',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}resume',

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
            return message.channel.send(`${client.emotes.error} - Я і так нічого не граю, шо ти там знімати з паузи зібрався?`);
        }


        if (!queue.node.isPaused()) {
            return message.channel.send(`${client.emotes.error} - Та музло і так хуярить, не довби кнопку, сука!`);
        }

  
        const success = queue.node.setPaused(false);

        if (success) {
            message.channel.send(`${client.emotes.success} - Трек **${queue.currentTrack.title}** знову в ділі. Слухаєм далі, пацани!`);
            message.react('✅');
        }
    },
};