import dayjs from "dayjs";
import db from "../database.js";


function mapOrdersArrayToObject(row) {
  const [
    clientId,
    clientName,
    clientAddress,
    clientPhone,
    cakeId,
    cakeName,
    cakePrice,
    cakeDescription,
    cakeImage,
    createdAt,
    quantity,
    totalPrice,
  ] = row;

  return {
    client: {
      id: clientId,
      name: clientName,
      address: clientAddress,
      phone: clientPhone,
    },
    cake: {
      id: cakeId,
      name: cakeName,
      price: cakePrice,
      description: cakeDescription,
      image: cakeImage,
    },
    createdAt: dayjs(createdAt).format('YYYY-MM-DD HH:mm'),
    quantity,
    totalPrice,
  };
}

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

export async function getOrders(req, res){

  const { date } = req.query;
 
  try {

    const conditions = [];
    const params = [];
    let where = "";

    const { rowCount: existingOrder } = await db.query(`
      SELECT "createdAt" 
      FROM orders
        WHERE "createdAt"=$1
    `,[date]);

    if (existingOrder === 0 && date !== undefined) {
      res.status(404).send([]);
    }
    
    if (date) {
      params.push(date);
      conditions.push(`orders."createdAt"=$${params.length}`);
    }
    if (params.length > 0) {
      where += `WHERE ${conditions.join("")}`;
    }

    const result = await db.query(
      {
        text: `
        SELECT 
          clients.*,
          cakes.*,
          orders."createdAt", orders.quantity, orders."totalPrice"
        FROM orders
          JOIN clients ON clients.id=orders."clientId"
          JOIN cakes ON cakes.id=orders."cakeId"
        ${where}
      `,
        rowMode: "array",
      },
      params
    );
    res.status(200).send(result.rows.map(mapOrdersArrayToObject));
  } 
  catch (error) {
    res.status(500).send(error);
  }
}

export async function getOrdersById(req,res){

  const { id } = req.params;
  if (isNaN(parseInt(id))) {
    return res.status(400).send("Id inválido");
  }

  try {
    const result = await db.query(
      {
        text: `
        SELECT 
          clients.*,
          cakes.*,
          orders."createdAt", orders.quantity, orders."totalPrice"
        FROM orders
          JOIN clients ON clients.id=orders."clientId"
          JOIN cakes ON cakes.id=orders."cakeId"
        WHERE orders.id=$1`,
        rowMode: "array",
      },
      [id]
    );
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.status(200).send(result.rows.map(mapOrdersArrayToObject));
  } 
  catch (error) {
    res.status(500).send(error);
  }
}