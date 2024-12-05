const { format, addDays } = require("date-fns");

module.exports.processForm = function (data) {
    const { name, email, duration } = data;
    const dateUntil = format(calculateUntil(duration), "dd MMM yyyy");
    return { name, email, dateUntil };
};

function calculateUntil(duration) {
    return addDays(new Date(), parseInt(duration));
}
