
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
// Optimized Task Controller
export async function getalltask(req, res) {
    try {
        // Add pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const taskRepository = AppDataSource.getRepository("Task");
        const [tasks, total] = await taskRepository.findAndCount({
            skip,
            take: limit,
            cache: 30000 // Enable query cache for 30 seconds
        });
        
        res.json({
            data: tasks,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

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
            // Store date range values to enable index usage
            const dateValue = req.query.due_date;
            const startDate = new Date(dateValue);
            const endDate = new Date(dateValue);
            endDate.setDate(endDate.getDate() + 1);
            
            query.andWhere("task.due_date >= :startDate AND task.due_date < :endDate", 
                { startDate, endDate });
        }
        if (req.query.created_at) {
            // Store date range values to enable index usage
            const dateValue = req.query.created_at;
            const startDate = new Date(dateValue);
            const endDate = new Date(dateValue);
            endDate.setDate(endDate.getDate() + 1);
            
            query.andWhere("task.created_at >= :startDate AND task.created_at < :endDate", 
                { startDate, endDate });
        }

        // Add pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        query.skip(skip).take(limit);
        
        // Enable query caching
        query.cache(30000);
        
        const [tasks, total] = await Promise.all([
            query.getMany(),
            query.getCount()
        ]);
        
        res.json({
            data: tasks,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


