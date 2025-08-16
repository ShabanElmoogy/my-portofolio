import express from "express";
import {
  getAllTechnologies,
  createTechnology,
  updateTechnology,
  deleteTechnology
} from "../controllers/technologyController.js";

const router = express.Router();

// GET /technologies - Get all technologies
router.get("/", getAllTechnologies);

// POST /technologies - Create a new technology
router.post("/", createTechnology);

// PUT /technologies/:id - Update a technology
router.put("/:id", updateTechnology);

// DELETE /technologies/:id - Delete a technology
router.delete("/:id", deleteTechnology);

export default router;