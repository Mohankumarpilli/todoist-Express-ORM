// Comment.js
import "reflect-metadata";
import { EntitySchema } from "typeorm";

const Comment = new EntitySchema({
    name: "Comment",
    tableName: "comments",
    columns: {
        id: {
            type: "integer",
            primary: true,
            generated: true
        },
        content: {
            type: "text",
            nullable: false
        },
        posted_at: {
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP"
        },
        task_id: {
            type: "integer",
            nullable: true
        },
        project_id: {
            type: "integer",
            nullable: true
        }
    },
    relations: {
        task: {
            target: "Task",
            type: "many-to-one",
            joinColumn: { name: "task_id" },
            onDelete: "CASCADE",
            nullable: true
        },
        project: {
            target: "Project",
            type: "many-to-one",
            joinColumn: { name: "project_id" },
            onDelete: "CASCADE",
            nullable: true
        }
    },
    indices: [
        { name: "idx_comment_task_id", columns: ["task_id"] },
        { name: "idx_comment_project_id", columns: ["project_id"] },
        { name: "idx_comment_posted_at", columns: ["posted_at"] }
    ]
});

export default Comment;