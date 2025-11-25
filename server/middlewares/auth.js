import { UserToken } from "../models/users_token.js";

export const userAuth = async (req, res, next) => {
    const token = req?.headers['token'];

    try {
        if (!token) {
            return res.send({
                success: false,
                message: 'Token not found!'
            })
        }

        const user = await UserToken.findOne({ token });
        if (!user) {
            return res.send({
                success: false,
                token_not_found: true,
                message: 'Token is not valid!'
            });
        }

        next();
    } catch (error) {
        console.log("Error", error);
    }
}