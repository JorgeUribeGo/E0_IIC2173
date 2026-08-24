require('dotenv').config();

module.exports = {
    rabbitmq: {
        username: process.env.RABBITMQ_USERNAME,
        password: process.env.RABBITMQ_PASSWORD,
        host: process.env.RABBITMQ_HOST,
        port: process.env.RABBITMQ_PORT,
        vhost: process.env.RABBITMQ_VHOST || '',
        get url() {
            return `amqps://${this.username}:${this.password}@${this.host}:${this.port}/${this.vhost}`;
        },
        get queue() {
            return `${this.username}.q`;
        },
    },
    master: {
        eventsUrl: process.env.MASTER_EVENTS_URL || 'http://localhost:3000/events',
    },
    reconnect: {
        initialDelayMs: 1000,
        maxDelayMs: 30000,
    },
};