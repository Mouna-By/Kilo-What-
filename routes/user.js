const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/user");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const {
    getAllUsers,
    deleteUser,
    updateUser,
} = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);

// Route protégée
router.get("/current", isAuth, (req, res) => {
    res.status(200).send({ msg: "Authorized", user: req.user });
});

// ADMIN : get all users
router.get("/all", isAuth, isAdmin, getAllUsers);

// ADMIN : delete user
router.delete("/:id", isAuth, isAdmin, deleteUser);

// ADMIN : update user
router.put("/:id", isAuth, isAdmin, updateUser);

module.exports = router;
