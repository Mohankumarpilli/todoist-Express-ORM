import { Router } from 'express';
import { createUser, deleteuser, getalluser, getbyid } from '../controllers/usercontroller.js';

const userRoutes = Router();

userRoutes.get("/users",getalluser);
userRoutes.get("/user/:id",getbyid);

userRoutes.post('/user',createUser);

userRoutes.delete('/user/:id',deleteuser);

export default userRoutes;