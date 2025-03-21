import AppDataSource from "../database/db.js";

export async function createUser(req, res) {
    try {
        const userRepository = AppDataSource.getRepository("User");
        const user = userRepository.create(req.body);
        await userRepository.save(user);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getalluser(req, res) {
    try {
        const users = await AppDataSource.getRepository("User").find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getbyid(req, res) {
    const id = req.params;
    try {
        const users = await AppDataSource.getRepository("User").findBy(id);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteuser(req, res) {
    try {
        const id = req.params;
        const users = await AppDataSource.getRepository("User").delete(id);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}