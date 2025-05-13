const jwt = require("jsonwebtoken");
const { userModel } = require('../models/User');
require("dotenv").config();

const RoleBase = (permittedRoles) =>async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send("Authorization header is missing");
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const roleSaved= await userModel.findOne({email:decoded.email})
    
        if (permittedRoles.includes(roleSaved.role)) {
            roleSaved.email= decoded.email;
           
            next();
        } else {
            return res.status(403).send("You are not authorized for this route");
        }
    } catch (error) {
        return res.status(401).send("Invalid token");
    }
};

module.exports = { RoleBase };