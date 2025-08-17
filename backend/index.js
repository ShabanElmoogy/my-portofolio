import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import technologyRoutes from "./routes/technologyRoutes.js";
import businessTypeRoutes from "./routes/businessTypeRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

// Root route for health check or welcome message
app.get("/", (req, res) => {
  res.json({ message: "Backend is running." });
});

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/business-types", businessTypeRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
