import { Router } from "express";
import controller from "../controllers/controllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/validate", controller.validate);

router.use(authMiddleware);

// GET
router.get("/meats", controller.showAllMeats);
router.get("/clients", controller.showAllClients);
router.get("/sales", controller.showAllSales);
router.get("/losses", controller.showAllLosses);
router.get("/cows", controller.showAllCows);

// POST
router.post("/addMeat", controller.addMeat);
router.post("/addClient", controller.addClient);
router.post("/addSale", controller.addSale);
router.post("/addPayment", controller.addPayment);
router.post("/addLoss", controller.addLoss);
router.post("/addCow", controller.addCow);

// DELETE
router.delete("/deleteMeat", controller.deleteMeat);
router.delete("/deleteClient", controller.deleteClient);
router.delete("/deleteCow", controller.deleteCow);

// PUT
router.put("/updateMeat", controller.updateMeat);
router.put("/updateClient", controller.updateClient);
router.put("/updateCow", controller.updateCow);

// PATCH
router.patch("/killCow", controller.killCow);

export default router;
