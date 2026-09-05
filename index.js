const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot de Minecraft en linea 24/7'));
app.listen(process.env.PORT || 3000);

const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'zebrafish.aternos.host', 
        port: 33753,
        username: 'BotGuardian',          
        version: '1.21.1'                      
    });

    bot.on('spawn', () => {
        console.log('[BOT] Conectado exitosamente.');
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 600000); 
    });

    bot.on('kick', (reason) => {
        console.log('[BOT] Expulsado por: ' + reason + '. Reconectando...');
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => {
        console.log('[BOT] Error detectado. Reconectando...');
        setTimeout(createBot, 15000);
    });
}

createBot();
