import pool from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Decimal } from "decimal.js";

const toNum = (val) => new Decimal(val || 0).toNumber();

async function showAllMeats() {
  try {
    const result = await pool.query("SELECT * FROM meats ORDER BY id desc");
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function showAllClients() {
  try {
    const query = `
      SELECT 
        c.id, 
        c.username,
        -- Subquery para somar vendas sem duplicar por causa dos pagamentos
        COALESCE((
          SELECT SUM(s.total) 
          FROM sales s 
          WHERE s.client_id = c.id
        ), 0) as total_vendas,
        -- Subquery para somar todos os pagamentos vinculados às vendas deste cliente
        COALESCE((
          SELECT SUM(p.amount) 
          FROM payments p
          JOIN sales s ON p.sale_id = s.id
          WHERE s.client_id = c.id
        ), 0) as total_pago
      FROM clients c
      ORDER BY c.username
    `;

    const result = await pool.query(query);

    return result.rows.map((client) => {
      const vendas = new Decimal(client.total_vendas || 0);
      const pago = new Decimal(client.total_pago || 0);

      const balance = pago.minus(vendas);

      return {
        id: client.id,
        username: client.username,
        total_vendas: vendas.toFixed(2),
        total_pago: pago.toFixed(2),
        balance: balance.toFixed(2),
      };
    });
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
}

async function showAllSales() {
  try {
    const query = `
      SELECT 
        s.id AS sale_id,
        s.total,
        s.date,
        c.username AS client_name,
        si.id AS item_id,
        si.meat_id,
        si.weight,
        si.price,
        m.name AS meat_name,
        p.id AS payment_id,
        p.amount,
        p.created_at AS payment_date,
        p.type
      FROM sales s
      JOIN clients c ON c.id = s.client_id
      LEFT JOIN sale_items si ON si.sale_id = s.id
      LEFT JOIN meats m ON m.id = si.meat_id
      LEFT JOIN payments p ON p.sale_id = s.id
      ORDER BY s.id DESC
    `;

    const result = await pool.query(query);
    const salesMap = {};

    for (const row of result.rows) {
      if (!salesMap[row.sale_id]) {
        salesMap[row.sale_id] = {
          id: row.sale_id,
          clientName: row.client_name,
          total: Number(row.total || 0),
          date: row.date,
          items: [],
          payments: [],
        };
      }

      const sale = salesMap[row.sale_id];

      if (row.item_id) {
        const itemExists = sale.items.find((i) => i.id === row.item_id);
        if (!itemExists) {
          sale.items.push({
            id: row.item_id,
            meatId: row.meat_id,
            meatName: row.meat_name,
            weight: row.weight,
            price: Number(row.price || 0),
          });
        }
      }

      if (row.payment_id) {
        const paymentExists = sale.payments.find(
          (p) => p.id === row.payment_id,
        );
        if (!paymentExists) {
          sale.payments.push({
            id: row.payment_id,
            amount: Number(row.amount || 0),
            date: row.payment_date,
            type: row.type || "dinheiro",
          });
        }
      }
    }

    return Object.values(salesMap).sort((a, b) => b.id - a.id);
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
    throw error;
  }
}

async function showAllLosses() {
  try {
    const query = `
      SELECT 
        id, 
        description, 
        value, 
        reason, 
        loss_date AS date 
      FROM losses 
      ORDER BY loss_date DESC
    `;
    const result = await pool.query(query);

    return result.rows.map((row) => ({
      ...row,
      value: toNum(row.value),
    }));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function showAllCows() {
  try {
    const result = await pool.query("SELECT * FROM cows ORDER BY id desc");
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addMeat(data) {
  try {
    const values = [data.name, data.price];
    const query = "INSERT INTO meats (name, price) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addClient(data) {
  try {
    const values = [data.username, data.balance];
    const query =
      "INSERT INTO clients (username, balance) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addSale(data) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Calculando ou validando o total com precisão absoluta
    const safeTotal = new Decimal(data.total).toString();

    const saleQuery = `
      INSERT INTO sales (client_id, total, date)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
    const saleValues = [data.clientId, safeTotal, data.date];
    const saleResult = await client.query(saleQuery, saleValues);
    const saleId = saleResult.rows[0].id;

    for (const item of data.items) {
      const safePrice = new Decimal(item.price).toString();
      const safeWeight = new Decimal(item.weight).toString();

      const itemQuery = `
        INSERT INTO sale_items (sale_id, meat_id, weight, price)
        VALUES ($1, $2, $3, $4)
      `;
      const itemValues = [saleId, item.meatId, safeWeight, safePrice];
      await client.query(itemQuery, itemValues);
    }

    await client.query("COMMIT");
    return { saleId };
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
}

async function addPayment(data) {
  try {
    const safeAmount = new Decimal(data.amount).toString();

    const values = [data.saleId, safeAmount, data.date, data.type];

    const query =
      "INSERT INTO payments (sale_id, amount, created_at, type) VALUES ($1, $2, $3, $4) RETURNING *";

    const result = await pool.query(query, values);

    const row = result.rows[0];
    if (row) {
      row.amount = toNum(row.amount);
    }

    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addLoss(data) {
  try {
    const safeValue = new Decimal(data.value).toString();

    const values = [data.description, safeValue, data.reason, data.date];
    const query = `
      INSERT INTO losses (description, value, reason, loss_date) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *, loss_date AS date
    `;

    const result = await pool.query(query, values);
    const row = result.rows[0];

    if (row) {
      row.value = toNum(row.value);
    }

    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addCow(data) {
  try {
    const values = [
      data.numberTag,
      data.weight,
      data.supplier,
      data.description,
    ];

    const query =
      "INSERT INTO cows (number_tag, weight, supplier, description) VALUES ($1, $2, $3, $4) RETURNING *";

    const result = await pool.query(query, values);

    const row = result.rows[0];

    if (!row) {
      throw new Error(
        "Failed to register cow: No data returned from database.",
      );
    }

    return row;
  } catch (error) {
    console.error("Error in addCow:", error.message);
    throw error;
  }
}

async function validate(data) {
  try {
    const query = "SELECT * FROM users WHERE username = $1";
    const result = await pool.query(query, [data.username]);

    if (result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      return null;
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10h",
      },
    );

    return {
      user: {
        id: user.id,
        username: user.username,
      },
      token,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteMeat({ id }) {
  try {
    const query = "DELETE FROM meats WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);

    return result.rows[0] || null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteClient({ id }) {
  try {
    // Com ON DELETE CASCADE, o banco faz o trabalho pesado sozinho!
    const query = "DELETE FROM clients WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);

    return result.rows[0] || null;
  } catch (error) {
    console.error("Erro ao deletar:", error);
    throw error;
  }
}

async function deleteCow({ id }) {
  try {
    const query = "DELETE FROM cows WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);

    return result.rows[0] || null;
  } catch (error) {
    console.error("Erro ao deletar:", error);
    throw error;
  }
}

async function updateMeat(data) {
  try {
    const values = [data.id, data.name, data.price];
    const query = "UPDATE meats SET name = $2, price = $3 WHERE id = $1";
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateClient(data) {
  try {
    const values = [data.id, data.username, data.balance];
    const query =
      "UPDATE clients SET username = $2, balance = $3 WHERE id = $1";
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateCow(data) {
  try {
    const values = [
      data.id,
      data.number_tag,
      data.weight,
      data.supplier,
      data.description,
    ];
    const query =
      "UPDATE cows SET number_tag = $2, weight = $3, supplier = $4, description = $5 WHERE id = $1 RETURNING *";
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function killCow(data) {
  try {
    const newStatus = !data.is_alive;

    const query = "UPDATE cows SET is_alive = $2 WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [data.id, newStatus]);

    return result.rows[0];
  } catch (error) {
    console.error("Error toggling cow status:", error);
    throw error;
  }
}

export default {
  showAllMeats,
  showAllClients,
  showAllSales,
  showAllLosses,
  showAllCows,
  addMeat,
  addSale,
  addPayment,
  addLoss,
  addCow,
  addClient,
  validate,
  deleteMeat,
  deleteClient,
  deleteCow,
  updateMeat,
  updateClient,
  updateCow,
  killCow,
};
