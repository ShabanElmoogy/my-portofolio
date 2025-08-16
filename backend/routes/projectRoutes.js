import express from "express";
import {
  getAllProjects,
  getProjectById,
  getProjectsByBusinessType,
  getProjectsByCategory,
  getProjectsByTechnology,
  getFeaturedProjects,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

const router = express.Router();

// GET /projects - Get all projects (with optional query filters)
router.get("/", getAllProjects);

// GET /projects/featured - Get featured projects
router.get("/featured", getFeaturedProjects);

// GET /projects/business-type/:businessTypeId - Get projects by business type
router.get("/business-type/:businessTypeId", getProjectsByBusinessType);

// GET /projects/category/:categoryId - Get projects by category
router.get("/category/:categoryId", getProjectsByCategory);

// GET /projects/technology/:technologyId - Get projects by technology
router.get("/technology/:technologyId", getProjectsByTechnology);

// GET /projects/:id - Get single project by ID
router.get("/:id", getProjectById);

// POST /projects - Create a new project
router.post("/", createProject);

// PUT /projects/:id - Update a project
router.put("/:id", updateProject);

// DELETE /projects/:id - Delete a project
router.delete("/:id", deleteProject);

export default router;