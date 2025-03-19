import express, { json } from "express";
import compression from "express-compression";
import helmet from "helmet";
import userRoutes from './routes/userRoutes.js';
import projectroutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();

// // Add compression for response payload
// app.use(compression());

// // Add security headers
// app.use(helmet());

// // Increase payload size limit if needed
// app.use(json({ limit: '1mb' }));

app.use(json());

// Add API version prefix
const API_PREFIX = '/api';

// Mount routes
app.use(API_PREFIX, userRoutes);
app.use(API_PREFIX, projectroutes);
app.use(API_PREFIX, taskRoutes);
app.use(API_PREFIX, commentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message 
  });
});

// Not found middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));