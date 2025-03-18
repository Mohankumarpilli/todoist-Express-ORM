import { Router } from 'express';
import { createproject, deleteproject, getallprojects, getbyanyid, is_favoriteproject } from '../controllers/projectcontroller.js';

const projectRoutes = Router();

projectRoutes.post('/project',createproject);
projectRoutes.get('/project', getbyanyid);
projectRoutes.get('/projects',getallprojects);

projectRoutes.patch('/project/:id',is_favoriteproject);

projectRoutes.delete('/project/:id',deleteproject);

export default projectRoutes;