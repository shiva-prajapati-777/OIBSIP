const temperatureInput = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");

const convertBtn = document.getElementById("convertBtn");
const clearBtn = document.getElementById("clearBtn");
const swapBtn = document.getElementById("swapBtn");

const resultValue = document.getElementById("resultValue");
const resultCard = document.getElementById("resultCard");
const error = document.getElementById("error");
const formula = document.getElementById("formula");


// Convert button
convertBtn.addEventListener("click", convertTemperature);


// Enter key
temperatureInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        convertTemperature();
    }
});


// Clear button
clearBtn.addEventListener("click", function() {

    temperatureInput.value = "";

    fromUnit.value = "C";
    toUnit.value = "F";

    error.textContent = "";

    resultValue.innerHTML =
        '<span class="placeholder">Your result will appear here</span>';

    formula.textContent =
        "Enter a temperature and click Convert.";

    resultCard.classList.remove("active");

    temperatureInput.focus();
});


// Swap button
swapBtn.addEventListener("click", function() {

    const currentFrom = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = currentFrom;

    if (temperatureInput.value !== "") {
        convertTemperature();
    }
});


// Main conversion function
function convertTemperature() {

    const value = parseFloat(temperatureInput.value);

    error.textContent = "";

    if (temperatureInput.value.trim() === "") {

        showError("Please enter a temperature.");

        return;
    }

    if (isNaN(value)) {

        showError("Please enter a valid number.");

        return;
    }


    // Absolute zero validation

    if (fromUnit.value === "C" && value < -273.15) {

        showError("Celsius cannot be below -273.15°C.");

        return;
    }

    if (fromUnit.value === "F" && value < -459.67) {

        showError("Fahrenheit cannot be below -459.67°F.");

        return;
    }

    if (fromUnit.value === "K" && value < 0) {

        showError("Kelvin cannot be below 0 K.");

        return;
    }


    // Convert to Celsius first

    let celsius;

    if (fromUnit.value === "C") {

        celsius = value;

    } else if (fromUnit.value === "F") {

        celsius = (value - 32) * 5 / 9;

    } else {

        celsius = value - 273.15;
    }


    // Convert Celsius to target unit

    let result;

    if (toUnit.value === "C") {

        result = celsius;

    } else if (toUnit.value === "F") {

        result = (celsius * 9 / 5) + 32;

    } else {

        result = celsius + 273.15;
    }


    const symbol = getSymbol(toUnit.value);

    resultValue.textContent =
        `${formatNumber(result)} ${symbol}`;

    formula.textContent =
        `${value} ${getSymbol(fromUnit.value)} → ${formatNumber(result)} ${symbol}`;

    resultCard.classList.add("active");

}


// Error function
function showError(message) {

    error.textContent = message;

    resultCard.classList.remove("active");

    resultValue.innerHTML =
        '<span class="placeholder">Conversion unavailable</span>';

    formula.textContent =
        "Please correct the value above.";
}


// Get temperature symbol
function getSymbol(unit) {

    if (unit === "C") return "°C";

    if (unit === "F") return "°F";

    return "K";
}


// Format result
function formatNumber(number) {

    return Number(number.toFixed(2));
}


// Quick conversion buttons
const quickButtons = document.querySelectorAll(".quick-btn");

quickButtons.forEach(button => {

    button.addEventListener("click", function() {

        temperatureInput.value = button.dataset.value;

        fromUnit.value = button.dataset.from;

        toUnit.value = button.dataset.to;

        convertTemperature();

        document.querySelector(".result-card").scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    });

});