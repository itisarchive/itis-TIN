const express = require("express");
const router = express.Router();

router.get("/favicon.ico", (req, res) => {
    return res.status(204).send();
});

module.exports = router;
