const { addCourier, getCourier } = require("../repositories/courierRepository");

module.exports.addCouriers = async function (courier) {
    const courierId = await addCourier(courier);
    const waitingTime = await calcuateWaitingTime(courierId);
    return {
        courierId: courierId,
        address: courier.address,
        weight: courier.weight,
        arrivalTime: courier.arrivalTime,
        waitingTime: waitingTime
    };
};

module.exports.getWaitingTime = async function (courierId) {
    const waitingTime = await calcuateWaitingTime(courierId);
    return { waitingTime: waitingTime };
};

async function calcuateWaitingTime(courierId) {
    const courier = await getCourier(courierId);
    const arrivalTime = new Date(courier.arrivalTime);
    return arrivalTime - Date.now();
}

module.exports.getAvailableCouriers = function () {
    const minAvailableCouriers = 1;
    const maxAvailableCouriers = 10;
    return minAvailableCouriers + Math.floor(Math.random() * (maxAvailableCouriers - minAvailableCouriers + 1));
};
