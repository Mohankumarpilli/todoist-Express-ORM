import { createtask, getalltask, getbyanyid } from "../controllers/taskcontroller.js";
import { Router } from "express";

const taskRoutes = Router();

taskRoutes.get("/tasks",getalltask);
taskRoutes.get("/task",getbyanyid);

taskRoutes.post("/tasks",createtask);

export default taskRoutes;