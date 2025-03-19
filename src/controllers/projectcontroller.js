import AppDataSource from "../database/db.js";

export async function getallprojects(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const projectRepository = AppDataSource.getRepository("Project");
        const [projects, total] = await projectRepository.findAndCount({
            skip,
            take: limit,
            cache: 30000
        });
        
        res.json({
            meta: {
                total,
                page,
                last_page: Math.ceil(total / limit)
            },
            data: projects
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getbyanyid(req, res) {
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
            const dateValue = req.query.created_at;
            const startDate = new Date(dateValue);
            const endDate = new Date(dateValue);
            endDate.setDate(endDate.getDate() + 1);
            
            query.andWhere("project.created_at >= :startDate AND project.created_at < :endDate", 
                { startDate, endDate });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        query.skip(skip).take(limit);
        
        query.cache(30000);
        
        const [projects, total] = await Promise.all([
            query.getMany(),
            query.getCount()
        ]);
        
        res.json({
            meta: {
                total,
                page,
                last_page: Math.ceil(total / limit)
            },
            data: projects
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


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