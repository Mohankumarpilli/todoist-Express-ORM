import express, { json } from "express";
import userRoutes from './routes/userRoutes.js';
import projectroutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();
app.use(json());
app.use('/api',userRoutes);
app.use('/api',projectroutes);
app.use('/api',taskRoutes);
app.use('/api',commentRoutes);

app.listen(3000, () => console.log("🚀 Server running on port 3000"));