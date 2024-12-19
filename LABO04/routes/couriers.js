const express = require("express");
const { getAvailableCouriers, addCouriers, getWaitingTime } = require("../services/courierService");
const router = express.Router();

router.post("/add", async (req, res) => {
    const courier = req.body;
    if (req.invalidFields) {
        return res.status(400).render("invalid", { invalidFields: req.invalidFields });
    }
    const response = await addCouriers(courier);
    res.json(response);
});

router.get("/waitingTime/:id", async (req, res) => {
    const courierId = parseInt(req.params.id);
    const response = await getWaitingTime(courierId);
    if (!response) {
        return res.status(400).render("invalid", { errorMessage: "Nie znaleziono zamówienia!" });
    }
    res.json(response);
});

router.get("/available", (req, res) => {
    const availableCouriers = getAvailableCouriers();
    res.json({ availableCouriers: availableCouriers });
});

module.exports = router;
