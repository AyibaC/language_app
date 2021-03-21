const path = require("path");
const express = require("express");
const router = express.Router();
const {
    getWords,
    addWord,
    updateWord,
    removeWord,
} = require("../controllers/words.controller.js");

router
    .get("/:id?", getWords)
    .post("/", addWord)
    .put("/:id", updateWord)
    .delete("/:id", removeWord);

module.exports = router;