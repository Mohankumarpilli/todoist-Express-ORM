import AppDataSource from "../database/db.js";

export async function createtask (req, res) {
    try {
        const taskRepository = AppDataSource.getRepository("Task");
        if(!req.body.content){
            return res.status(500).json({ error: "name should be there for task" });
        }
        if(!req.body.project_id){
            return res.status(500).json({ error: "project_id should be there for task" });
        }
        const task = taskRepository.create(req.body);
        await taskRepository.save(task);
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export async function getbyanyid(req, res) {

    try {
        const taskRepository = AppDataSource.getRepository("Task");
        let query = taskRepository.createQueryBuilder("task");

        if (req.query.id) {
            query.andWhere("task.id = :id", { id: req.query.id });
        }
        if (req.query.project_id) {
            query.andWhere("task.project_id = :id", { id: req.query.project_id });
        }
        if (req.query.is_completed) {
            query.andWhere("task.is_completed = :is_completed", { is_completed: req.query.is_completed === "true" });
        }
        if (req.query.due_date) {
            query.andWhere("DATE(task.due_date) = :id", { id: req.query.due_date });
        }
        if (req.query.created_at) {
            query.andWhere("DATE(task.created_at) = :created_at", { created_at: req.query.created_at });
        }

        const projects = await query.getMany();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}


export async function getalltask(_req, res) {
    try {
        const tasks = await AppDataSource.getRepository("Task").find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};