const { Op } = require('sequelize');
const { Message, DemandRecord } = require('../models');

// Definir filtros posibles
const RECORD_FILTER_FIELDS = ['code', 'city', 'demand', 'unit'];
const MESSAGE_DATE_FIELDS = ['messageTimestamp', 'validUntil', 'receivedAt'];
const MESSAGE_OTHER_FIELDS = ['idpk', 'msgId', 'type'];

function buildRecordWhere(query) {
    const where = {};
    for (const field of RECORD_FILTER_FIELDS) {
        if (query[field] !== undefined && query[field] !== null) {
            where[field] = query[field];
        }
    }
    return where;
}

function buildMessageWhere(query) {
    const where = {};
    for (const field of MESSAGE_OTHER_FIELDS) {
        if (query[field] !== undefined && query[field] !== null) {
            where[field] = query[field];
        }
    }

    for (const field of MESSAGE_DATE_FIELDS) {

        if (query[field] !== undefined && query[field] !== null) {
            const startDate = new Date(query[field]);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 1); // Agregar un día para incluir todo el día
            where[field] = {
                [Op.gte]: startDate,
                [Op.lt]: endDate
            };
        }
    }

    return where;
}

async function getHistory(req, res) {
    try {
        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit, 10) || 25, 1);
        const offset = (page - 1) * limit;

        const recordWhere = buildRecordWhere(req.query);
        const messageWhere = buildMessageWhere(req.query);
        const hasMessageFilters = Object.keys(messageWhere).length > 0;

        const { count, rows } = await DemandRecord.findAndCountAll({
            where: recordWhere,
            include: hasMessageFilters ? [{
                model: Message,
                as: 'message',
                where: messageWhere,
                required: true
            }] : [],
            limit,
            offset,
            order: [['id', 'ASC']]
        });

        return res.status(200).json({
            page,
            limit,
            total: count,
            totalPages: Math.ceil(count / limit),
            data: rows
        });
    } catch (error) {
        console.error('Error al obtener el historial:', error);
        return res.status(500).json({ error: 'Error interno del servidor'
        });
    }
}

async function getHistoryById(req, res) {
    const { id } = req.params;

    // Ver si el ID es un número válido
    if (isNaN(parseInt(id, 10))) {
        return res.status(400).json({ error: 'ID inválido (debe ser un número)' });
    }

    try {
        const record = await DemandRecord.findByPk(id, {
            include: [{
                model: Message,
                as: 'message'
            }]
        });

        if (!record) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        return res.status(200).json(record);
    } catch (error) {
        console.error('Error al obtener el registro por ID:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getHistory,
    getHistoryById
};