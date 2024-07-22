const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.post("/", itemController.createItem);
router.put("/:itemId/combinations/:index", itemController.updateCombination);
router.get("/", itemController.getItems);
router.get("/:id/combinations", itemController.getItemCombinations);

module.exports = router;
