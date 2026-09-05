const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot de Minecraft en linea 24/7'));
app.listen(process.env.PORT || 3000);

const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'Idontkow.aternos.me', // 1. CAMBIA ESTO por la IP de tu servidor
        port: 33753,
        username: 'Bot',          // El nombre que tendrá tu bot
        version: '1.21.1'                      // 2. CAMBIA ESTO por tu versión si es otra
    });

    bot.on('spawn', () => {
        console.log(`[BOT] Conectado exitosamente.`);
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 600000); 
    });

    bot.on('kick', (reason) => {
        console.log(`[BOT] Expulsado por: ${reason}. Reconectando...`);
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => {
        console.log('[BOT] Error detectado. Reconectando...');
        setTimeout(createBot, 15000);
    });
}

createBot();
