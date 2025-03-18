// import "reflect-metadata";
// import AppDataSource from "./src/database/db.js";

// const generateUsers = (count) => {
//     return Array.from({ length: count }, (_, i) => ({
//         name: `user_${i + 1}`,
//         email: `user${i + 1}@example.com`,
//     }));
// };

// const insertUsers = async (users, batchSize = 50) => {
//     const userRepository = AppDataSource.getRepository('User');
//     for (let i = 0; i < users.length; i += batchSize) {
//         try {
//             await userRepository.insert(users.slice(i, i + batchSize));
//             console.log(`Inserted ${i + batchSize} users...`);
//         } catch (err) {
//             console.error("Error inserting user batch:", err);
//         }
//     }
// };

// const generateProjects = (totalProjects) => {
//     return Array.from({ length: totalProjects }, (_, i) => ({
//         name: `Project ${i + 1}`,
//         color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
//     }));
// };

// const insertProjects = async (projects, batchSize = 100) => {
//     const projectRepository = AppDataSource.getRepository('Project');
//     for (let i = 0; i < projects.length; i += batchSize) {
//         try {
//             await projectRepository.insert(projects.slice(i, i + batchSize));
//             console.log(`Inserted ${i + batchSize} projects...`);
//         } catch (err) {
//             console.error("Error inserting project batch:", err);
//         }
//     }
// };

// const generateTasks = (projects, tasksPerProject) => {
//     const dueDates = ['2025-03-12', '2025-03-15', '2025-03-20', '2025-04-01', '2025-04-15', '2025-05-01'];
    
//     return projects.flatMap((project) =>
//         Array.from({ length: tasksPerProject }, (_, taskNum) => ({
//             project_id: project.id,
//             content: `project${project.id}_task${taskNum + 1}`,
//             description: `This is task ${taskNum + 1} from project ${project.id}`,
//             due_date: dueDates[Math.floor(Math.random() * dueDates.length)],
//             is_completed: Math.random() < 0.3 ? 1 : 0
//         }))
//     );
// };

// const insertTasks = async (tasks, batchSize = 1000) => {
//     const taskRepository = AppDataSource.getRepository('Task');
//     for (let i = 0; i < tasks.length; i += batchSize) {
//         try {
//             await taskRepository.insert(tasks.slice(i, i + batchSize));
//             console.log(`Inserted ${i + batchSize} tasks...`);
//         } catch (err) {
//             console.error("Error inserting task batch:", err);
//         }
//     }
// };

// const populateDatabase = async () => {
//     try {
//         if (!AppDataSource.isInitialized) {
//             console.log("Waiting for database connection...");
//             await new Promise((resolve) => {
//                 const checkConnection = () => {
//                     if (AppDataSource.isInitialized) resolve();
//                     else setTimeout(checkConnection, 100);
//                 };
//                 checkConnection();
//             });
//         }

//         console.log("Starting database population...");

//         const USER_COUNT = 100;
//         const PROJECT_COUNT = 1000000;
//         const TASKS_PER_PROJECT = 10;

//         console.time('DatabasePopulation');

//         const [users, projects] = await Promise.all([
//             generateUsers(USER_COUNT),
//             generateProjects(PROJECT_COUNT)
//         ]);

//         await Promise.all([
//             insertUsers(users, 50),
//             insertProjects(projects, 100)
//         ]);

//         console.log("Fetching inserted projects...");
//         const projectRepository = AppDataSource.getRepository('Project');
//         const insertedProjects = await projectRepository.find({ select: ['id'] });

//         console.log("Generating and inserting tasks...");
//         const tasks = generateTasks(insertedProjects, TASKS_PER_PROJECT);
//         await insertTasks(tasks, 1000);

//         console.timeEnd('DatabasePopulation');
//         console.log("Database population completed.");
//     } catch (err) {
//         console.error("Error populating database:", err);
//     }
// };

// populateDatabase().then(() => {
//     console.log("Script execution complete.");
// }).catch(err => {
//     console.error("Script execution failed:", err);
// });

// import "reflect-metadata";
// import AppDataSource from "./src/database/db.js";

// const generateUsers = (count) => {
//     return Array.from({ length: count }, (_, i) => ({
//         name: `user_${i + 1}`,
//         email: `user${i + 1}@example.com`,
//     }));
// };

// const insertUsers = async (users, batchSize = 50) => {
//     const userRepository = AppDataSource.getRepository('User');
//     for (let i = 0; i < users.length; i += batchSize) {
//         try {
//             await userRepository.insert(users.slice(i, i + batchSize));
//             console.log(`Inserted ${Math.min(i + batchSize, users.length)} users...`);
//         } catch (err) {
//             console.error("Error inserting user batch:", err);
//         }
//     }
// };

// const generateProjects = (totalProjects, users) => {
//     return Array.from({ length: totalProjects }, (_, i) => ({
//         name: `Project ${i + 1}`,
//         user_id: users[Math.floor(Math.random() * users.length)].id,  // Assign a random user
//         color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
//     }));
// };

// const insertProjects = async (projects, batchSize = 100) => {
//     const projectRepository = AppDataSource.getRepository('Project');
//     for (let i = 0; i < projects.length; i += batchSize) {
//         try {
//             await projectRepository.insert(projects.slice(i, i + batchSize));
//             console.log(`Inserted ${Math.min(i + batchSize, projects.length)} projects...`);
//         } catch (err) {
//             console.error("Error inserting project batch:", err);
//         }
//     }
// };

// const generateTasks = (projects, tasksPerProject) => {
//     const dueDates = ['2025-03-12', '2025-03-15', '2025-03-20', '2025-04-01', '2025-04-15', '2025-05-01'];
    
//     return projects.flatMap((project) =>
//         Array.from({ length: tasksPerProject }, (_, taskNum) => ({
//             project_id: project.id,
//             content: `project${project.id}_task${taskNum + 1}`,
//             description: `This is task ${taskNum + 1} from project ${project.id}`,
//             due_date: dueDates[Math.floor(Math.random() * dueDates.length)],
//             is_completed: Math.random() < 0.3 ? 1 : 0
//         }))
//     );
// };

// const insertTasks = async (tasks, batchSize = 1000) => {
//     const taskRepository = AppDataSource.getRepository('Task');
//     for (let i = 0; i < tasks.length; i += batchSize) {
//         try {
//             await taskRepository.insert(tasks.slice(i, i + batchSize));
//             console.log(`Inserted ${Math.min(i + batchSize, tasks.length)} tasks...`);
//         } catch (err) {
//             console.error("Error inserting task batch:", err);
//         }
//     }
// };

// const populateDatabase = async () => {
//     try {
//         if (!AppDataSource.isInitialized) {
//             console.log("Waiting for database connection...");
//             await new Promise((resolve) => {
//                 const checkConnection = () => {
//                     if (AppDataSource.isInitialized) resolve();
//                     else setTimeout(checkConnection, 100);
//                 };
//                 checkConnection();
//             });
//         }

//         console.log("Starting database population...");

//         const USER_COUNT = 100;
//         const PROJECT_COUNT = 1000000;
//         const TASKS_PER_PROJECT = 10;

//         console.time('DatabasePopulation');

//         const users = generateUsers(USER_COUNT);
//         await insertUsers(users, 50);

//         console.log("Fetching inserted users...");
//         const userRepository = AppDataSource.getRepository('User');
//         const insertedUsers = await userRepository.find({ select: ['id'] });

//         const projects = generateProjects(PROJECT_COUNT, insertedUsers);
//         await insertProjects(projects, 100);

//         console.log("Fetching inserted projects...");
//         const projectRepository = AppDataSource.getRepository('Project');
//         const insertedProjects = await projectRepository.find({ select: ['id'] });

//         console.log("Generating and inserting tasks...");
//         const tasks = generateTasks(insertedProjects, TASKS_PER_PROJECT);
//         await insertTasks(tasks, 1000);

//         console.timeEnd('DatabasePopulation');
//         console.log("Database population completed.");
//     } catch (err) {
//         console.error("Error populating database:", err);
//     }
// };

// populateDatabase().then(() => {
//     console.log("Script execution complete.");
// }).catch(err => {
//     console.error("Script execution failed:", err);
// });

import "reflect-metadata";
import AppDataSource from "./src/database/db.js";

const generateUsers = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        name: `user_${i + 1}`,
        email: `user${i + 1}@example.com`,
    }));
};

const insertUsers = async (users, batchSize = 50) => {
    const userRepository = AppDataSource.getRepository('User');
    for (let i = 0; i < users.length; i += batchSize) {
        try {
            await userRepository.insert(users.slice(i, i + batchSize));
            console.log(`Inserted ${Math.min(i + batchSize, users.length)} users...`);
        } catch (err) {
            console.error("Error inserting user batch:", err);
        }
    }
};

const generateProjects = (count, users) => {
    return Array.from({ length: count }, (_, i) => ({
        name: `Project ${i + 1}`,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
    }));
};

const insertProjects = async (projects, batchSize = 100) => {
    const projectRepository = AppDataSource.getRepository('Project');
    for (let i = 0; i < projects.length; i += batchSize) {
        try {
            await projectRepository.insert(projects.slice(i, i + batchSize));
            console.log(`Inserted ${Math.min(i + batchSize, projects.length)} projects...`);
        } catch (err) {
            console.error("Error inserting project batch:", err);
        }
    }
};

const generateTaskBatch = (projectBatch, tasksPerProject) => {
    const dueDates = ['2025-03-12', '2025-03-15', '2025-03-20', '2025-04-01', '2025-04-15', '2025-05-01'];

    return projectBatch.flatMap((project) =>
        Array.from({ length: tasksPerProject }, (_, taskNum) => ({
            project_id: project.id,
            content: `project${project.id}_task${taskNum + 1}`,
            description: `This is task ${taskNum + 1} from project ${project.id}`,
            due_date: dueDates[Math.floor(Math.random() * dueDates.length)],
            is_completed: Math.random() < 0.3 ? 1 : 0
        }))
    );
};

const insertTasksInBatches = async (projects, tasksPerProject, batchSize = 1000) => {
    const taskRepository = AppDataSource.getRepository('Task');

    for (let i = 0; i < projects.length; i += batchSize) {
        const projectBatch = projects.slice(i, i + batchSize);
        const taskBatch = generateTaskBatch(projectBatch, tasksPerProject);

        try {
            await taskRepository.insert(taskBatch);
            console.log(`Inserted tasks for projects ${i + 1} to ${Math.min(i + batchSize, projects.length)}`);
        } catch (err) {
            console.error("Error inserting task batch:", err);
        }
    }
};

const populateDatabase = async () => {
    try {
        if (!AppDataSource.isInitialized) {
            console.log("Waiting for database connection...");
            await new Promise((resolve) => {
                const checkConnection = () => {
                    if (AppDataSource.isInitialized) resolve();
                    else setTimeout(checkConnection, 100);
                };
                checkConnection();
            });
        }

        console.log("Starting database population...");

        const USER_COUNT = 100;
        const PROJECT_COUNT = 1000000;
        const TASKS_PER_PROJECT = 10;

        console.time('DatabasePopulation');

        const users = generateUsers(USER_COUNT);
        await insertUsers(users, 50);

        console.log("Fetching inserted users...");
        const userRepository = AppDataSource.getRepository('User');
        const insertedUsers = await userRepository.find({ select: ['id'] });

        console.log("Generating and inserting projects...");
        const projects = generateProjects(PROJECT_COUNT, insertedUsers);
        await insertProjects(projects, 100);

        console.log("Fetching inserted projects...");
        const projectRepository = AppDataSource.getRepository('Project');
        const insertedProjects = await projectRepository.find({ select: ['id'] });

        console.log("Generating and inserting tasks in batches...");
        await insertTasksInBatches(insertedProjects, TASKS_PER_PROJECT, 1000);

        console.timeEnd('DatabasePopulation');
        console.log("Database population completed.");
    } catch (err) {
        console.error("Error populating database:", err);
    }
};

populateDatabase().then(() => {
    console.log("Script execution complete.");
}).catch(err => {
    console.error("Script execution failed:", err);
});

