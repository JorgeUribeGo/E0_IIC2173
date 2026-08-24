const amqp = require('amqplib');
const config = require('./config');

async function connectWithRetry(onConnected) {
    let delay = config.reconnect.initialDelayMs;

    while (true) {
        try {
            console.log('[*] Connectando a RabbitMQ...');
            const connection = await amqp.connect(config.rabbitmq.url);
            console.log('[*] Conectado a RabbitMQ');

            connection.on('error', (err) => {
                console.error('Error en la conexión:', err.message);
            });

            connection.on('close', () => {
                console.warn('Conexión cerrada. Reintentando...');
                connectWithRetry(onConnected);
            });

            delay = config.reconnect.initialDelayMs;
            await onConnected(connection);
            return;
        }   catch (err) {
            console.error(`No se pudo conectar a RabbitMQ (${err.message}). Reintentando en ${delay / 1000} segundos...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            delay = Math.min(delay * 2, config.reconnect.maxDelayMs);
        }
    }
}

module.exports = { connectWithRetry };