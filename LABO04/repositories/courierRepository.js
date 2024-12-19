const app = require("../app");

module.exports.getCourier = async function (id) {
    const sql = "SELECT * FROM Couriers WHERE id = ?";
    const params = [id];
    return await app.db.get(sql, params);
};

module.exports.addCourier = async function (courier) {
    const sql = "INSERT INTO Couriers (address, weight, arrivalTime) VALUES (?, ?, ?)";
    const params = [courier.address, courier.weight, courier.arrivalTime];
    const result = await app.db.run(sql, params);
    return result.lastID;
};
