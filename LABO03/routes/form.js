const express = require("express");
const path = require("path");
const { processForm } = require("../model/formProcessor");
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "form.html"));
});

router.post("/submit-form", (req, res) => {
    if (req.invalidFields) {
        return res.status(400).render("invalid", { invalidFields: req.invalidFields });
    }

    const data = processForm(req.body);
    const { name, email, dateUntil } = data;
    res.render("result", { name, email, dateUntil });
});

module.exports = router;
