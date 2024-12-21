module.exports = function (req, res, next) {
    if (!isRequestValid(req)) {
        return res.status(400).send();
    }
    next();
};

function isRequestValid(request) {
    const isAddressValid = validateAddress(request.body.address);
    const isWeightValid = validateWeight(request.body.weight);
    const isArrivalTimeValid = validateArrivalTime(request.body.arrivalTime);
    let isRequestValid = true;
    isRequestValid &&= isAddressValid;
    isRequestValid &&= isWeightValid;
    isRequestValid &&= isArrivalTimeValid;
    return isRequestValid;
}

function validateAddress(address) {
    return address !== "";
}

function validateWeight(weight) {
    const numeric = Number(weight);
    return !(numeric === Infinity || String(numeric) !== weight || numeric <= 0);
}

function validateArrivalTime(date) {
    const parsedDate = new Date(date);
    return parsedDate > Date.now();
}
