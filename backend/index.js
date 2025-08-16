import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import technologyRoutes from "./routes/technologyRoutes.js";
import businessTypeRoutes from "./routes/businessTypeRoutes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Root route for health check or welcome message
app.get("/", (req, res) => {
  res.json({ message: "Backend is running." });
});

// Routes
app.use("/projects", projectRoutes);
app.use("/categories", categoryRoutes);
app.use("/technologies", technologyRoutes);
app.use("/business-types", businessTypeRoutes);


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
