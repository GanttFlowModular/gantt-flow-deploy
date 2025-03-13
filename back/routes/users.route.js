import express from "express";

import { createUser, deleteUser, getUsers, updatedUser, loginUser } from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/login", loginUser);
router.post("/", createUser);
router.put("/:id", updatedUser);
router.delete("/:id", deleteUser);

export default router;