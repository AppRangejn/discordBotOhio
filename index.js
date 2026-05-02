require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Player } = require('discord-player');
const { DefaultExtractors } = require('@discord-player/extractor');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.GuildVoiceStates,
    ],
});


client.player = new Player(client, {
    skipFFmpeg: false,
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25,
    }
});

client.player.events.on('error', (queue, error) => console.log(`❌ [Помилка черги] ${error.message}`));
client.player.events.on('playerError', (queue, error) => console.log(`❌ [Помилка плеєра] ${error.message}`));

async function initPlayer() {
    try {
        await client.player.extractors.loadMulti(DefaultExtractors);
        console.log('✅ Екстрактори активовані');
    } catch (e) {
        console.error('❌ Помилка екстракторів:', e.message);
    }
}
initPlayer();

client.emotes = { error: '❌', success: '✅', queue: '🎵', music: '🎶', off: '🚫' };
client.commands = new Collection();


const commandsPath = path.join(__dirname, 'commands');

const loadCommands = (dir) => {
    if (!fs.existsSync(dir)) return console.log(`⚠️ Папка ${dir} не знайдена!`);
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            loadCommands(filePath);
        } else if (file.endsWith('.js')) {
            try {
                delete require.cache[require.resolve(filePath)];
                const command = require(filePath);
                
                if (command.name) {
                    client.commands.set(command.name, command);
                    if (command.aliases && Array.isArray(command.aliases)) {
                        command.aliases.forEach(alias => client.commands.set(alias, command));
                    }
                }
            } catch (err) {
                console.log(`❌ Помилка завантаження файлу ${file}: ${err.message}`);
            }
        }
    }
};

loadCommands(commandsPath);

client.once('ready', (c) => { 
    console.log(`🚀 Бот онлайн як ${c.user.tag}`);
    console.log(`📊 Завантажено команд: ${client.commands.size}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    const prefix = '!'; 
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (command) {
        try {

            await command.execute(client, message, args);
        } catch (error) {
            console.error(`❌ Помилка в команді ${commandName}:`, error);
            message.reply('Сталася якась хуйня в цій команді!').catch(() => null);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);