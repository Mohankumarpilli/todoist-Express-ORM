// Project.js
import "reflect-metadata";
import { EntitySchema } from "typeorm";

const Project = new EntitySchema({
    name: "Project",
    tableName: "projects",
    columns: {
        id: {
            type: "integer",
            primary: true,
            generated: true
        },
        name: {
            type: "text",
            nullable: false,
            unique: true
        },
        user_id: {
            type: "integer",
            nullable: false
        },
        color: {
            type: "text",
            nullable: false
        },
        is_favorite: {
            type: "boolean",
            default: false
        },
        created_at: {
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP"
        }
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinColumn: { name: "user_id" },
            onDelete: "CASCADE"
        },
        tasks: {
            target: "Task",
            type: "one-to-many",
            inverseSide: "project"
        },
        comments: {
            target: "Comment",
            type: "one-to-many",
            inverseSide: "project"
        }
    },
    indices: [
        { name: "idx_project_user_id", columns: ["user_id"] },
        { name: "idx_project_is_favorite", columns: ["is_favorite"] },
        { name: "idx_project_created_at", columns: ["created_at"] }
    ]
});

export default Project;