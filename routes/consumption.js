const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const {
    addConsumption,
    getUserConsumptions,
    updateConsumption,
    deleteConsumption
} = require("../controllers/consumption");

router.post("/", isAuth, addConsumption);
router.get("/", isAuth, getUserConsumptions);
router.put("/:id", isAuth, updateConsumption);
router.delete("/:id", isAuth, deleteConsumption);

module.exports = router;
