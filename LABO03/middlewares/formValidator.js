module.exports = function (req, res, next) {
    const { name, email, duration, password } = req.body;
    const invalidFields = [];

    if (!isNameValid(name)) invalidFields.push("name");
    if (!isEmailValid(email)) invalidFields.push("email");
    if (!isDurationValid(duration)) invalidFields.push("duration");
    if (!isPasswordValid(password)) invalidFields.push("password");

    if (invalidFields.length > 0) req.invalidFields = invalidFields;

    next();
};

function isNameValid(name) {
    if (!name) return false;
    return typeof name === "string" && name.trim().length > 0;
}

function isEmailValid(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

function isDurationValid(duration) {
    const parsed = parseInt(duration, 10);
    return !isNaN(parsed) && parsed > 0;
}

function isPasswordValid(password) {
    return (
        typeof password === "string"
        && password.length >= 8
        && /[a-z]/.test(password)
        && /[A-Z]/.test(password)
        && /[0-9]/.test(password)
    );
}
