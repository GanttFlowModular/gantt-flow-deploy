import express from "express";

import { getGantt, createGantt, deleteGantt, updateGantt } from "../controllers/gantt.controller.js";

const router = express.Router();

router.get("/", getGantt);
router.post("/", createGantt);
router.delete("/:id", deleteGantt);
router.put("/:id", updateGantt);

export default router;