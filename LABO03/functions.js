function isAnyFieldEmpty(body) {
    return Object.values(body).some(value => value === '');
}

function isNameValid(name) {
    return name !== '';
}

function isEmailValid(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

function isDurationValid(duration) {
    return duration > 0;
}

function isPasswordValid(password) {
    if (password === "") {
        return false;
    } else if (password.length < 8) {
        return false;
    } else if (!/[a-z]/.test(password)) {
        return false;
    } else if (!/[A-Z]/.test(password)) {
        return false;
    } else if (!/[0-9]/.test(password)) {
        return false;
    }
    return true;
}

module.exports = {isAnyFieldEmpty, isEmailValid, isNameValid, isDurationValid, isPasswordValid};