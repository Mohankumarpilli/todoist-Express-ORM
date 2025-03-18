import AppDataSource from "../database/db.js";

export async function createcomment (req, res) {
    try {
        const commentRepository = AppDataSource.getRepository("Comment");
        const comment = commentRepository.create(req.body);
        await commentRepository.save(comment);
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getallcomments (req, res) {
    try {
        const comments = await AppDataSource.getRepository("Comment").find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deletecomment (req, res) {
    const id = req.params;
    try {
        const comments = await AppDataSource.getRepository("Comment").delete(id);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}