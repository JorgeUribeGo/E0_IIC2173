# E0_IIC2173
En este repositorio se incluye master y connector para la E0 de Arquitectura de Sistemas de Software

Dominio: tiburonshark.me
Acceso con: `ssh -i "E0-arquisis.pem" ubuntu@ec2-3-148-72-240.us-east-2.compute.amazonaws.com`
En esta entrega se cumplen todos los puntos de los RF, RNF y las dos partes variables.

El formato de entrega de los mensajes es:
```
{
    "id": 158176,           # Autogenerado secuencialmente
    "messageId": 8788,
    "code": "NNY",
    "city": "New New York",
    "demand": "10175.11",
    "unit": "GW",
    "createdAt": "2026-08-28T12:11:48.047Z",
    "updatedAt": "2026-08-28T12:11:48.047Z",
    "message":{
        "id": 8788,
        "idpk": "75288e2f-27fd-4d6e-b097-feb17571c80e",
        "msgId": "5a42c529-d700-47df-afb5-032bc1d903d3",
        "type": "demand-set",
        "messageTimestamp": "2026-08-28T12:11:47.943Z",
        "validUntil": "2026-08-28T12:12:47.943Z",
        "metaContent": "",
        "constraints": {},
        "receivedAt": "2026-08-28T12:11:48.045Z",
        "createdAt": "2026-08-28T12:11:48.045Z",
        "updatedAt": "2026-08-28T12:11:48.045Z"
    }
}
```
Donde en "message" se guarda la información común a los varios registros (guardados en una tabla aparte en postgres para evitar información duplicada).

Y en /history es:
```
{
    "page": 1,
    "limit": 25,
    "total": 219978,
    "totalPages": 8800,
    "data": [
        {
            "id": 1,
            "messageId": 1,
            "code": "HGW",
            "city": "Hogwarts",
            "demand": "4124.447",
            "unit": "GW",
            "createdAt": "2026-08-25T05:09:09.166Z",
            "updatedAt": "2026-08-25T05:09:09.166Z",
            "message": {
                "id": 1,
                "idpk": "690509b9-319d-4a92-951d-27241e03b38c",
                "msgId": "544ff5da-1ddb-4cd7-9f76-377013adf60d",
                "type": "demand-set",
                "messageTimestamp": "2026-08-25T05:09:08.967Z",
                "validUntil": "2026-08-25T05:10:08.967Z",
                "metaContent": "",
                "constraints": {},
                "receivedAt": "2026-08-25T05:09:09.155Z",
                "createdAt": "2026-08-25T05:09:09.156Z",
                "updatedAt": "2026-08-25T05:09:09.156Z"
            }
        },
        {
            (24 mensajes más)
        }
    ]
}
```
