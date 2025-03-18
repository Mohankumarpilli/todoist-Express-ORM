import "reflect-metadata";
import  AppDataSource from "./src/database/db.js";

const generateUsers = (count) => {
    const users = [];
    for (let i = 1; i <= count; i++) {
        users.push({
            name: `user_${i}`,
            email: `user${i}@example.com`,
        });
    }
    return users;
};

const insertUsers = async (userRecords, batchSize = 50) => {
    const userRepository = AppDataSource.getRepository('User');
    
    for (let i = 0; i < userRecords.length; i += batchSize) {
        const batch = userRecords.slice(i, i + batchSize);
        
        try {
            await userRepository.save(batch);
            console.log(`Inserted ${i + batch.length} users...`);
        } catch (err) {
            console.error("Error inserting user batch:", err);
        }
    }
};

const generateAndInsertProjects = async (totalProjects, batchSize = 10000) => {
    const projectRepository = AppDataSource.getRepository('Project');
    const userRepository = AppDataSource.getRepository('User');
    
    const users = await userRepository.find();
    
    if (users.length === 0) {
        throw new Error("No users found in database. Please insert users first.");
    }
    
    for (let i = 1; i <= totalProjects; i += batchSize) {
        const projectBatch = [];
        const endIndex = Math.min(i + batchSize - 1, totalProjects);
        
        for (let j = i; j <= endIndex; j++) {
            const randomUserIndex = Math.floor(Math.random() * users.length);
            
            projectBatch.push({
                name: `Project ${j}`,
                color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
            });
        }
        
        try {
            await projectRepository.save(projectBatch);
            console.log(`Inserted projects ${i} to ${endIndex}...`);
        } catch (err) {
            console.error("Error inserting project batch:", err);
        }
    }
};

const generateAndInsertTasks = async (projectCount, tasksPerProject, batchSize = 100000) => {
    const taskRepository = AppDataSource.getRepository('Task');
    const projectRepository = AppDataSource.getRepository('Project');
    
    const dueDates = [
        '2025-03-12', '2025-03-15', '2025-03-20', 
        '2025-04-01', '2025-04-15', '2025-05-01'
    ];
    
    const chunkSize = 100;
    
    for (let startId = 1; startId <= projectCount; startId += chunkSize) {
        const endId = Math.min(startId + chunkSize - 1, projectCount);
        
        console.log(`Fetching projects ${startId} to ${endId}...`);
        
        try {
            const projects = await projectRepository
                .createQueryBuilder("project")
                .where("project.id BETWEEN :startId AND :endId", { startId, endId })
                .getMany();
            
            if (projects.length === 0) {
                console.log(`No projects found with IDs ${startId}-${endId}.`);
                continue;
            }
            
            console.log(`Found ${projects.length} projects. Generating tasks...`);
            
            for (let i = 0; i < projects.length; i += Math.ceil(batchSize / tasksPerProject)) {
                const projectBatch = projects.slice(i, i + Math.ceil(batchSize / tasksPerProject));
                const taskBatch = [];
                
                for (const project of projectBatch) {
                    for (let taskNum = 1; taskNum <= tasksPerProject; taskNum++) {
                        taskBatch.push({
                            project_id: project.id,
                            content: `project${project.id}_task${taskNum}`,
                            description: `This is task ${taskNum} from project ${project.id}`,
                            due_date: dueDates[Math.floor(Math.random() * dueDates.length)],
                            is_completed: Math.random() < 0.3 ? 1 : 0
                        });
                    }
                }
                
                if (taskBatch.length > 0) {
                    await taskRepository.save(taskBatch);
                    console.log(`Inserted ${taskBatch.length} tasks for ${projectBatch.length} projects...`);
                }
            }
        } catch (err) {
            console.error(`Error processing projects ${startId}-${endId}:`, err);
        }
    }
};

const populateDatabase = async () => {
    try {
        if (!AppDataSource.isInitialized) {
            console.log("Waiting for database connection...");
            await new Promise(resolve => {
                const checkConnection = () => {
                    if (AppDataSource.isInitialized) {
                        resolve();
                    } else {
                        setTimeout(checkConnection, 100);
                    }
                };
                checkConnection();
            });
        }
        
        console.log("Starting database population...");
        
        const USER_COUNT = 100;
        const PROJECT_COUNT = 1000000; 
        const TASKS_PER_PROJECT = 10;  

        console.time('AppDataSourcePopulation');
        const startTime = Date.now();

        const users = generateUsers(USER_COUNT);
        await insertUsers(users, 50);
        
        await generateAndInsertProjects(PROJECT_COUNT, 100);
        
        await generateAndInsertTasks(PROJECT_COUNT, TASKS_PER_PROJECT, 1000);
        
        console.timeEnd('AppDataSourcePopulation');
        const endTime = Date.now();
        const executionTime = (endTime - startTime) / 1000;

        console.log(`Database population completed in ${executionTime} seconds.`);

    } catch (err) {
        console.error("Error populating database:", err);
        console.error(err.stack);
    }
};

populateDatabase().then(() => {
    console.log("Script execution complete.");
}).catch(err => {
    console.error("Script execution failed:", err);
});