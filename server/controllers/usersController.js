import { getDatabase } from "../dbConnections.js";

// Controller to get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await getDatabase().User.find().select('-password'); // Excludes password field
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

// Controller to query users based on criteria
export const queryUsers = async (req, res) => {
    try {
        const query = {};
        for (const [k, v] of Object.entries(req.query)) {
            query[k] = { $regex: v, $options: 'i' };
        }
        const users = await getDatabase().User.find(query).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to query users' });
    }
};

export default { getAllUsers, queryUsers };