import db from '../database.js';

export async function postCakes(req, res) {
    const { name, price, image, description} = req.body;

    try {
        const cake = await db.query(`
            SELECT id 
            FROM cakes 
                WHERE name=$1
        `, [name]);
        if (cake.rowCount > 0) {
            return res.status(409).send("Bolo já criado");
        }

        await db.query(`
            INSERT INTO cakes (name, price, image, description)
                VALUES ($1, $2, $3, $4)
        `, [name, price, image, description]);
        res.sendStatus(201);
    } 
    catch (error) {
        res.status(500).send(error);
    }
}