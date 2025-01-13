import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token; // Assuming you're storing the token in cookies
        if (!token) {
            console.error("No token found in cookies.");
            return res.status(401).json({
                message: 'User not authenticated',
                success: false
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded Token:", decoded); // Log decoded token for debugging

        if (!decoded || !decoded.userId) {
            console.error("Invalid token structure. Missing userId.");
            return res.status(401).json({
                message: 'Invalid token',
                success: false
            });
        }

        req.user = { id: decoded.userId }; // Attach userId to req.user
        console.log("Authenticated User ID:", req.user.id);

        next(); // Proceed to the next middleware/controller
    } catch (error) {
        console.error("Authentication error:", error); // Log the error for debugging
        return res.status(401).json({
            message: 'Invalid token',
            success: false
        });
    }
};

export default isAuthenticated;
