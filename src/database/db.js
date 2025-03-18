import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "../entities/User.js";
import Project from "../entities/Project.js";
import Task from "../entities/Task.js";
import Comment from "../entities/Comment.js";

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    entities: [User, Project, Task, Comment],
    synchronize: true,
    // Disable logging in production
    logging: process.env.NODE_ENV === 'development',
    // Add connection pooling
    pool: {
        max: 10,
        min: 2,
        idleTimeoutMillis: 30000
    },
    // Add query caching
    cache: {
        duration: 30000 // 30 seconds cache
    }
});

AppDataSource.initialize()
    .then(() => console.log("Database Connected!"))
    .catch((error) => console.log("Database Connection Error:", error));
    
export default AppDataSource;