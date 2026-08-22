const express = require('express');
const eventsRouter = require('./routes/events');
const historyRouter = require('./routes/history');

const app = express();

app.use(express.json());
app.use('/events', eventsRouter);
app.use('/history', historyRouter);

module.exports = app;