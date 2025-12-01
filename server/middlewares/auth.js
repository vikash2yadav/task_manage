import { User } from "../models/users.js";
import { UserToken } from "../models/users_token.js";

export const userAuth = async (req, res, next) => {
    const token = req.headers['token'];

    try {
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Token not found!'
            });
        }

        const tokenDoc = await UserToken.findOne({ token });
        if (!tokenDoc) {
            return res.status(401).send({
                success: false,
                token_not_found: true,
                message: 'Token is not valid!'
            });
        }

        const user = await User.findById(tokenDoc.user_id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found!'
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(500).send({
            success: false,
            message: 'Internal server error'
        });
    }
};
