import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import projectRoutes from "./routes/projectRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import technologyRoutes from "./routes/technologyRoutes.js";
import businessTypeRoutes from "./routes/businessTypeRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// API Routes
app.use("/api/projects", projectRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/business-types", businessTypeRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running." });
});

// Serve React app for all non-API routes (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
