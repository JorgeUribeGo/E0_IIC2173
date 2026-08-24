const { connectWithRetry } = require('./connection');
const { startConsuming } = require('./consumer');

connectWithRetry(startConsuming).catch((err) => {
    console.error('Error al iniciar el consumidor:', err.message);
    process.exit(1);
});