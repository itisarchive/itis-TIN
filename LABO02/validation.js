function validateForm(event) {
    event.preventDefault();

    const name = document.forms["validated-form"]["name"].value;
    const email = document.forms["validated-form"]["email"].value;
    const password = document.forms["validated-form"]["password"].value;

    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isNameValid || !isEmailValid || !isPasswordValid) {
        return false;
    }

    displayResponse(email);
}

function validateName(name) {
    if (name === "") {
        document.getElementById("name").setAttribute("class", "invalid");
        document.getElementById("name-validation-message").innerHTML = "Name cannot be empty!";
        return false;
    }
    document.getElementById("name").setAttribute("class", "text-input");
    document.getElementById("name-validation-message").innerHTML = "";
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (email === "") {
        document.getElementById("email").setAttribute("class", "invalid");
        document.getElementById("email-validation-message").innerHTML = "E-mail cannot be empty!";
        return false;
    } else if (!emailRegex.test(email)) {
        document.getElementById("email").setAttribute("class", "invalid");
        document.getElementById("email-validation-message").innerHTML = "E-mail is invalid!";
        return false;
    }

    document.getElementById("email").setAttribute("class", "text-input");
    document.getElementById("email-validation-message").innerHTML = "";
    return true;
}

function validatePassword(password) {
    if (password === "") {
        document.getElementById("password").setAttribute("class", "invalid");
        document.getElementById("password-validation-message").innerHTML = "Password cannot be empty!";
        return false;
    } else if (password.length < 8) {
        document.getElementById("password").setAttribute("class", "invalid");
        document.getElementById("password-validation-message").innerHTML = "Password must be at least 8 characters long!";
        return false;
    } else if (!/[a-z]/.test(password)) {
        document.getElementById("password").setAttribute("class", "invalid");
        document.getElementById("password-validation-message").innerHTML = "Password must contain at least one lowercase letter!";
        return false;
    } else if (!/[A-Z]/.test(password)) {
        document.getElementById("password").setAttribute("class", "invalid");
        document.getElementById("password-validation-message").innerHTML = "Password must contain at least one uppercase letter!";
        return false;
    } else if (!/[0-9]/.test(password)) {
        document.getElementById("password").setAttribute("class", "invalid");
        document.getElementById("password-validation-message").innerHTML = "Password must contain at least one digit!";
        return false;
    }
    document.getElementById("password").setAttribute("class", "text-input");
    document.getElementById("password-validation-message").innerHTML = "";
    return true;

}

function displayResponse(email) {
    const response = document.getElementById("response");
    response.setAttribute("class", "response");
    response.innerHTML = "E-mail " + email + " was successfully signed up for newsletter!";
}