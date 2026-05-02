module.exports = {
    name: 'help', 
    execute(client, message, args) { 
        const helpText = `
**Шо ти, єблан, заблудився? Ось шо я вмію в Puzo Gang:**

🤖 **!ask [текст]** — спитати шось в нейронкі
🎯 **!who [питання]** — вибирає рандомного тіпа з сопровожденієм текста
🎲 **!random [мін] [макс]** — рандомне число
❓ **!help** — гайд для чайніков
❓ **!music** — команди для музикі

*Адмін бота: Джусів. Папа: TuSobakaSuna.*
        `;
        message.reply(helpText);
    }
};