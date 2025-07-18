const User = require("../models/User");

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id); 
        if (!user || user.role !== "admin") {
            return res.status(403).send({ msg: "Access denied. Admins only." });
        }
        next();
    } catch (err) {
        res.status(500).send({ msg: "Server error" });
    }
};

module.exports = isAdmin;
