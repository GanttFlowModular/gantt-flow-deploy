import express from "express";

import { createUser, deleteUser, getUsers, updatedUser, loginUser, sendRecoveryEmail,resetPassword } from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/login", loginUser);
router.post("/forgot-password", sendRecoveryEmail);
router.post("/reset-password", resetPassword);
router.post("/", createUser);
router.put("/:id", updatedUser);
router.delete("/:id", deleteUser);

export default router;