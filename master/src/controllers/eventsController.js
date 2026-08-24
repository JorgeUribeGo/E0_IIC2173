const { Message, DemandRecord, sequelize } = require('../models');

async function createEvent(req, res) {
    const {idpk, msgId, type, timestamp, packageBody } = req.body;

    if (!idpk || !packageBody || !Array.isArray(packageBody.demands)) {
        return res.status(400).json({ error: 'Payload inválido: Faltan campos requeridos' });
    }

    const existing = await Message.findOne({ where: { idpk }, attributes: ['id'] });
    if (existing) {
        return res.status(200).json({ message: 'Evento ya registrado previamente' });
    }

    try {
        const result = await sequelize.transaction(async (t) => {
            const message = await Message.create({
                idpk,
                msgId,
                type,
                messageTimestamp: timestamp,
                validUntil: packageBody.validUntil,
                metaContent: packageBody.metaContent,
                constraints: packageBody.constraints || {},
                receivedAt: new Date()
            }, { transaction: t });

            const records = packageBody.demands.map(demand => ({
                messageId: message.id,
                code: demand.code,
                city: demand.city,
                demand: demand.demand,
                unit: demand.unit
            }));

            await DemandRecord.bulkCreate(records, { transaction: t });

            return message;
        });

        return res.status(201).json({ id: result.id, idpk: result.idpk });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(200).json({ error: 'El evento ya fue registrado' });
        }
        console.error('Error al crear el evento:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    createEvent
};