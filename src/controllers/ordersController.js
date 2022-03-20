import db from "../database.js";

export async function postOrders(req, res) {
  const { clientId, cakeId, quantity, totalPrice } = req.body;

  try {
    const client = await db.query(`
        SELECT * 
        FROM clients 
            WHERE id=$1
        `, [clientId]);
    if(client.rowCount === 0) {
      return res.status(404).send('Cliente não encontrado');
    }

    const cake = await db.query(`
        SELECT * 
        FROM cakes 
            WHERE id=$1
    `, [cakeId]);
    if(cake.rowCount === 0) {
      return res.status(404).send('Bolo não encontrado');
    }

    await db.query(`
        INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice")
            VALUES ($1, $2, $3, $4)
    `, [clientId, cakeId, quantity, totalPrice]);
    res.sendStatus(201);
  } 
  catch (error) {
    res.status(500).send(error);
  }
}