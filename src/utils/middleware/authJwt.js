import jwtToken from "jsonwebtoken";
import { configKey } from "../../config/auth.config";
class JwtTokenVerificationMiddlerWare {

    constructor(){

    }

    async verifyToken (req,res,next) {
        const token = req.headers["x-access-token"];
        
        if(!token) {
            return res.status(403).send({
                message:"No token provided!"
            });
        }
        
        jwtToken.verify(token,configKey,(err,decoded) => {
            if(err){
                return res.status(401).send({
                    message: "Unauthorized!"
                  });
            };

            req.userId = decoded.id;
            next();
        });

    }

}

module.exports = new JwtTokenVerificationMiddlerWare();