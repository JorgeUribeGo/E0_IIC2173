const config = require('./config');
const { sendEvent } = require('./httpClient');
const fs = require('fs');

async function startConsuming(connection) {
    const channel = await connection.createChannel();
    const queue = config.rabbitmq.queue;

    await channel.prefetch(5);

    console.log(`[*] Consumiendo mensajes de la cola: ${queue}`);

    channel.consume(queue, async (msg) => {
        if (!msg) return;

        let event;
        try {
            event = JSON.parse(msg.content.toString());
        } catch (err) {
            console.error('Error al parsear el mensaje:', err.message);
            channel.ack(msg); // Si está mal hecho, nunca lo vamos a leer bien.
            return;
        }

        const success = await sendEvent(event);

        if (success) {
            channel.ack(msg);
        } else {
            channel.nack(msg, false, true);
        }

        fs.writeFileSync('/tmp/healthy', '');
    }, { noAck: false });
}

module.exports = { startConsuming };