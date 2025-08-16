import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

// GET /categories - Get all categories
router.get("/", getAllCategories);

// POST /categories - Create a new category
router.post("/", createCategory);

// PUT /categories/:id - Update a category
router.put("/:id", updateCategory);

// DELETE /categories/:id - Delete a category
router.delete("/:id", deleteCategory);

export default router;