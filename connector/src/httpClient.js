const axios = require('axios');
const config = require('./config');

async function sendEvent(event) {
    try {
        const response = await axios.post(config.master.eventsUrl, event, { timeout: 15000 });
        console.log('Evento enviado exitosamente:', response.data);
        return true;
    } catch (error) {
        console.error('Error enviando el evento:', error.message);
        return false;
    }
}

module.exports = { sendEvent };