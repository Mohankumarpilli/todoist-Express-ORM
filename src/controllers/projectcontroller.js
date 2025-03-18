import AppDataSource from "../database/db.js";
import { Raw } from "typeorm";

export async function createproject(req,res) {
    try {
        const projectRepository = AppDataSource.getRepository("Project");
        console.log("in create project",req.body);
        const project = projectRepository.create(req.body);
        await projectRepository.save(project);
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
}

export async function getallprojects(req,res) {
    try{
        const projectRepository = AppDataSource.getRepository("Project");
        const projects = await projectRepository.find();
        res.json(projects);
    }catch (error){
        res.status(500).json({ error: error.message });
    }
}

export async function getbyanyid(req, res) {
    console.log(req.query);

    // try {
    //     const projectRepository = AppDataSource.getRepository("Project");

    //     let filters = {};

    //     if (req.query.user_id) {
    //         filters.user_id = req.query.user_id;
    //     }
    //     if (req.query.project_id) {
    //         filters.id = req.query.project_id;
    //     }
    //     if (req.query.due_date) {
    //         filters.due_date = req.query.due_date;
    //     }
    //     if (req.query.is_favorite) {
    //         filters.is_favorite = req.query.is_favorite === "true";
    //     }
    //     if (req.query.created_at) {
    //         filters.created_at = Raw((alias) => `DATE(${alias}) = :created_at`, { created_at: req.query.created_at });
    //     }

    //     const projects = await projectRepository.find({
    //         where: filters,
    //     });

    //     res.json(projects);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
    try {
        const projectRepository = AppDataSource.getRepository("Project");
        let query = projectRepository.createQueryBuilder("project");

        if (req.query.user_id) {
            query.andWhere("project.user_id = :user_id", { user_id: req.query.user_id });
        }
        if (req.query.project_id) {
            query.andWhere("project.id = :id", { id: req.query.project_id });
        }
        if (req.query.is_favorite) {
            query.andWhere("project.is_favorite = :is_favorite", { is_favorite: req.query.is_favorite === "true" });
        }
        if (req.query.created_at) {
            query.andWhere("DATE(project.created_at) = :created_at", { created_at: req.query.created_at });
        }

        const projects = await query.getMany();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteproject(req,res) {
    const id = req.params.id;
    try{
        const projectRepository = AppDataSource.getRepository("Project");
        const projects = await projectRepository.delete(id);
        res.json(projects);
    }catch (error){
        res.status(500).json({ error: error.message });
    }
}

export async function is_favoriteproject(req,res) {
    const is_favorite = req.body.is_favorite;
    const id = req.params.id;
    try{
        const projectRepository = AppDataSource.getRepository("Project");
        const updateResult = await projectRepository.update(id, { is_favorite });
        if (updateResult.affected === 0) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(updateResult);
    }catch (error){
        res.status(500).json({ error: error.message });
    }
}