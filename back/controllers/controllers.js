import service from "../services/services.js";
import jwt from "jsonwebtoken";

async function showAllMeats(req, res) {
  try {
    const result = await service.showAllMeats();

    res.json(result);
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      error: "Erro ao conectar no banco",
    });
  }
}

async function showAllClients(req, res) {
  try {
    const result = await service.showAllClients();

    res.json(result);
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      error: "Erro ao conectar no banco",
    });
  }
}

async function showAllSales(req, res) {
  try {
    const result = await service.showAllSales();

    res.json(result);
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      error: "Erro ao conectar no banco",
    });
  }
}

async function showAllLosses(req, res) {
  try {
    const result = await service.showAllLosses();
    res.json(result);
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      error: "Erro ao conectar no banco",
    });
  }
}

async function showAllCows(req, res) {
  try {
    const result = await service.showAllCows();
    res.json(result);
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      error: "Erro ao conectar no banco",
    });
  }
}

async function addMeat(req, res) {
  try {
    const data = req.body;
    const result = await service.addMeat(data);
    res.json(result);
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      error: "Erro ao conectar no banco",
    });
  }
}

async function addClient(req, res) {
  try {
    const data = req.body;
    const result = await service.addClient(data);
    res.json(result);
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      error: "Erro ao conectar no banco",
    });
  }
}

async function addSale(req, res) {
  try {
    const data = req.body;
    const result = await service.addSale(data);
    res.json(result);
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      error: "Erro ao conectar no banco",
    });
  }
}

async function addPayment(req, res) {
  try {
    const data = req.body;
    const result = await service.addPayment(data);
    res.json(result);
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      error: "Erro ao conectar no banco",
    });
  }
}

async function addLoss(req, res) {
  try {
    const data = req.body;
    const result = await service.addLoss(data);
    res.json(result);
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      error: "Erro ao conectar no banco",
    });
  }
}

async function addCow(req, res) {
  try {
    const data = req.body;
    const result = await service.addCow(data);
    res.json(result);
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      error: "Erro ao conectar no banco",
    });
  }
}

async function validate(req, res) {
  try {
    const data = req.body;
    const result = await service.validate(data);

    if (!result) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function deleteMeat(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const result = await service.deleteMeat({ id });

    if (!result) {
      return res.status(404).json({ error: "Meat not found" });
    }

    return res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database connection error",
    });
  }
}

async function deleteClient(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const result = await service.deleteClient({ id });

    if (!result) {
      return res.status(404).json({ error: "Meat not found" });
    }

    return res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database connection error",
    });
  }
}

async function deleteCow(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const result = await service.deleteCow({ id });

    if (!result) {
      return res.status(404).json({ error: "Cow not found" });
    }

    return res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database connection error",
    });
  }
}

async function updateMeat(req, res) {
  try {
    const data = req.body;
    const result = await service.updateMeat(data);
    res.json(result);
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      error: "Erro ao conectar no banco",
    });
  }
}

async function updateClient(req, res) {
  try {
    const data = req.body;
    const result = await service.updateClient(data);
    res.json(result);
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      error: "Erro ao conectar no banco",
    });
  }
}

async function updateCow(req, res) {
  try {
    const data = req.body;
    const result = await service.updateCow(data);
    res.json(result);
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      error: "Erro ao conectar no banco",
    });
  }
}

async function killCow(req, res) {
  try {
    const data = req.body;
    const result = await service.killCow(data);
    res.json(result);
  } catch (errors) {
    console.log(errors);
    res.status(500).json({
      error: "Erro ao conectar no banco",
    });
  }
}

export default {
  showAllMeats,
  showAllClients,
  showAllLosses,
  showAllSales,
  showAllCows,
  addMeat,
  addClient,
  addSale,
  addPayment,
  addLoss,
  addCow,
  validate,
  deleteMeat,
  deleteClient,
  deleteCow,
  updateMeat,
  updateClient,
  updateCow,
  killCow,
};
