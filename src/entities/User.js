import "reflect-metadata";
import { EntitySchema } from "typeorm";

const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns:{
        id: {
            primary: true,
            type: "integer",
            generated: true
        },
        name: {
            type: "text", 
            unique: true,
            nullable: false
        },
        email: {
            type: "text", 
            unique: true,
            nullable: false
        }
    },
    relations: {
        projects: {
            target: "Project",
            type: "one-to-many",
            inverseSide: "user"
        }
    }
});

export default User;