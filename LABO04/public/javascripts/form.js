window.onload = async function () {
    const submitButton = document.getElementById("submit");
    submitButton.onclick = processForm;
    await getAvailableCouriers();
};

async function getAvailableCouriers() {
    const request = new Request(
        "/couriers/available",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    try {
        const response = await fetch(request);
        const responseBody = await response.json();
        displayAvailableCouriers(responseBody);
        setTimeout(async function () {
            await getAvailableCouriers();
        }, 15000);
    }
    catch {
        displayError("połączenia", "Połączenie z serwerem zostało przerwane.");
    }
}

function displayAvailableCouriers(responseBody) {
    const courierCounter = document.getElementById("available-couriers");
    courierCounter.innerHTML = responseBody.availableCouriers;
}

async function processForm() {
    const address = document.getElementById("address-input");
    const weight = document.getElementById("weight-input");
    const arrivalTime = document.getElementById("arrival-time-input");
    const requestBody = { address: address.value, weight: weight.value, arrivalTime: arrivalTime.value };
    if (!validateRequest(requestBody)) {
        return;
    }
    const request = new Request(
        "/couriers/add",
        {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    try {
        const response = await fetch(request);
        if (response.status >= 400) {
            displayError(response.status, "Twoje zamówienie nie mogło zostać obsłużone.");
            return;
        }
        const responseBody = await response.json();
        displayResponse(responseBody);
        setTimeout(async function () {
            await updateWaitingTime(responseBody.courierId);
        }, 15000);
    }
    catch {
        displayError("połączenia", "Połączenie z serwerem zostało przerwane.");
    }
}

function displayError(status, message) {
    const snackbar = document.getElementById("snackbar");
    const snackbarContent = document.getElementById("snackbar-content");
    const snackbarStatus = document.getElementById("snackbar-status");
    snackbarContent.innerHTML = message;
    snackbarStatus.innerHTML = `Błąd ${status}`;
    snackbar.className = "show";
    setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
}

async function updateWaitingTime(courierId) {
    const request = new Request(
        `/couriers/waitingTime/${courierId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    try {
        const response = await fetch(request);
        const responseBody = await response.json();
        if (responseBody.waitingTime < 0) {
            displayWaitingTime(0);
            return;
        }
        displayWaitingTime(responseBody.waitingTime);
        setTimeout(async function () {
            await updateWaitingTime(courierId);
        }, 15000);
    }
    catch {
        displayError("połączenia", "Połączenie z serwerem zostało przerwane.");
    }
}

function displayResponse(responseBody) {
    const resultDiv = document.getElementById("response");
    resultDiv.classList.remove("no-display");
    document.getElementById("address-response").innerHTML = responseBody.address;
    document.getElementById("weight-response").innerHTML = responseBody.weight;
    document.getElementById("arrival-time-response").innerHTML = responseBody.arrivalTime.replace("T", " ");
    displayWaitingTime(responseBody.waitingTime);
}

function displayWaitingTime(time) {
    const days = Math.floor(time / (24 * 60 * 60 * 1000));
    let remainder = time % (24 * 60 * 60 * 1000);
    const hours = Math.floor(remainder / (60 * 60 * 1000));
    remainder = remainder % (60 * 60 * 1000);
    const minutes = Math.floor(remainder / (60 * 1000));
    remainder = remainder % (60 * 1000);
    const seconds = Math.floor(remainder / 1000);
    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");
    document.getElementById("waiting-time-response").innerHTML = `${days} dni ${hh}:${mm}:${ss}`;
}

function validateRequest(request) {
    const isAddressValid = validateAddress(request.address);
    const isWeightValid = validateWeight(request.weight);
    const isArrivalTimeValid = validateArrivalTime(request.arrivalTime);
    let isRequestValid = true;
    isRequestValid &&= isAddressValid;
    isRequestValid &&= isWeightValid;
    isRequestValid &&= isArrivalTimeValid;
    return isRequestValid;
}

function validateAddress(address) {
    if (address === "") {
        document.getElementById("address-input").classList.remove("form-input");
        document.getElementById("address-input").classList.add("invalid");
        document.getElementById("address-validation-message").classList.remove("no-display");
        document.getElementById("address-validation-message").innerHTML = "Należy podać adres!";
        return false;
    }
    document.getElementById("address-input").classList.add("form-input");
    document.getElementById("address-input").classList.remove("invalid");
    document.getElementById("address-validation-message").classList.add("no-display");
    document.getElementById("address-validation-message").innerHTML = "";
    return true;
}

function validateWeight(weight) {
    const numeric = Number(weight);
    if (numeric === Infinity || String(numeric) !== weight || numeric <= 0) {
        document.getElementById("weight-input").classList.remove("form-input");
        document.getElementById("weight-input").classList.add("invalid");
        document.getElementById("weight-validation-message").classList.remove("no-display");
        document.getElementById("weight-validation-message").innerHTML = "Waga przesyłki musi być liczbą dodatnią!";
        return false;
    }
    document.getElementById("weight-input").classList.add("form-input");
    document.getElementById("weight-input").classList.remove("invalid");
    document.getElementById("weight-validation-message").classList.add("no-display");
    document.getElementById("weight-validation-message").innerHTML = "";
    return true;
}

function validateArrivalTime(date) {
    const parsedDate = new Date(date);
    if (parsedDate <= Date.now() || isNaN(parsedDate)) {
        document.getElementById("arrival-time-input").classList.remove("form-input");
        document.getElementById("arrival-time-input").classList.add("invalid");
        document.getElementById("arrival-time-validation-message").classList.remove("no-display");
        document.getElementById("arrival-time-validation-message").innerHTML = "Data zamówienia musi być w przyszłości!";
        return false;
    }
    document.getElementById("arrival-time-input").classList.add("form-input");
    document.getElementById("arrival-time-input").classList.remove("invalid");
    document.getElementById("arrival-time-validation-message").classList.add("no-display");
    document.getElementById("arrival-time-validation-message").innerHTML = "";
    return true;
}
