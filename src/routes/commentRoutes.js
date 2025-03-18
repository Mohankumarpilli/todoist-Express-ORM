import { Router } from "express";
import { createcomment, deletecomment, getallcomments } from "../controllers/commentcontroller.js";

const commentRoutes = Router();


commentRoutes.post("/comments",createcomment);

commentRoutes.get("/comments",getallcomments);

commentRoutes.delete("/comment/:id",deletecomment);

export default commentRoutes;