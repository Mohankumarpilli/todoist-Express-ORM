// Task.js
import "reflect-metadata";
import { EntitySchema } from "typeorm";

const Task = new EntitySchema({
    name: "Task",
    tableName: "tasks",
    columns: {
        id: {
            type: "integer",
            primary: true,
            generated: true
        },
        project_id: {
            type: "integer",
            nullable: false
        },
        content: {
            type: "text",
            nullable: false,
            unique: true
        },
        description: {
            type: "text",
            nullable: true
        },
        due_date: {
            type: "datetime",
            nullable: true
        },
        is_completed: {
            type: "boolean",
            default: false
        },
        created_at: {
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP"
        }
    },
    relations: {
        project: {
            target: "Project",
            type: "many-to-one",
            joinColumn: { name: "project_id" },
            onDelete: "CASCADE"
        },
        comments: {
            target: "Comment",
            type: "one-to-many",
            inverseSide: "task"
        }
    },
    indices: [
        { name: "idx_task_project_id", columns: ["project_id"] },
        { name: "idx_task_is_completed", columns: ["is_completed"] },
        { name: "idx_task_due_date", columns: ["due_date"] },
        { name: "idx_task_created_at", columns: ["created_at"] }
    ]
});

export default Task;