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
    logging: true
});

AppDataSource.initialize()
    .then(() => console.log("Database Connected!"))
    .catch((error) => console.log("Database Connection Error:", error));
    
export default AppDataSource;