import express from 'express';    
import cors from 'cors';          
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import adminRoutes from "./modules/admin/admin.routes";
import taskRoutes from "./modules/task/task.routes";
import {
  swaggerUi,
  specs,
} from "./config/swagger";

const app = express();

// Middleware
app.use(helmet());           // Security headers
app.use(cors());             // Cross-origin requests
app.use(morgan('dev'));      // Request logging
app.use(express.json());     // Parse JSON bodies
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Amazing Backend Running",
  });
});

export default app;