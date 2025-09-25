import jwt from "jsonwebtoken"
const isAuth= async (req,res,next) =>{
    try{
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({message:"No token provided"});
        }
        
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            return res.status(500).json({message: "Server configuration error"});
        }
        
        const verifyToken=await jwt.verify(token,process.env.JWT_SECRET)
        req.userId=verifyToken.userId;
        
        next();
        
    } catch (error) {
        console.error("JWT verification error:", error.message);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({message: "Invalid token"});
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({message: "Token expired"});
        }
        return res.status(500).json({message: "Authentication error"});
    }
}

export default isAuth;