import db from '../database.js';

export async function postClients(req, res) {
    const { name, address, phone} = req.body;

    try {

        await db.query(`
            INSERT INTO clients (name, address, phone)
                VALUES ($1, $2, $3)
        `, [name, address, phone]);
        res.sendStatus(201);
    } 
    catch (error) {
        res.status(500).send(error);
    }
}

export async function getOrdersByClients(req,res){
    
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        return res.status(400).send("Id inválido");
    }

    try {

        const client = await db.query(`
            SELECT id 
            FROM clients
                WHERE id = $1
        `,[id]);
        if (client.rowCount === 0) res.status(404).send('Id não encontrado');

        const orders = await db.query(`
                SELECT 
                    o.id AS "orderId", o.quantity, o.quantity, o."createdAt", o."totalPrice",
                    ck.name AS "cakeName"
                FROM orders o
                    JOIN clients cl ON cl.id= o."clientId"
                    JOIN cakes ck ON ck.id= o."cakeId"
                    WHERE cl.id= $1
            `,[id]);
        res.status(200).send(orders.rows);
    } 
    catch (error) {
        res.status(500).send(error);
    }    
}