// Highlight active option
const options = document.querySelectorAll('.options');
options.forEach(option => {
  option.addEventListener('click', () => {
    options.forEach(o => o.classList.remove('active'));
    option.classList.add('active');
    const category = option.textContent.trim();
    populateUnits(category);
    document.querySelector('.convert p').textContent = `Convert ${category}`;
  });
});

// Units Map
const unitsMap = {
  "Angle": [
    { value: "degree", text: "degree [°]" },
    { value: "radian", text: "radian" }
  ],
  "Area": [
    { value: "square_meter", text: "square meter [m²]" },
    { value: "square_kilometer", text: "square kilometer [km²]" }
  ],
  "Bits & Bytes": [
    { value: "bit", text: "bit" },
    { value: "byte", text: "byte [B]" }
  ],
  "Currency": [
    { value: "USD", text: "US Dollar [USD]" },
    { value: "EUR", text: "Euro [EUR]" },
    { value: "INR", text: "Indian Rupee [INR]" }
  ],
  "Density": [
    { value: "kg_per_cubic_meter", text: "kg/m³" },
    { value: "gram_per_cubic_centimeter", text: "g/cm³" }
  ],
  "Electric Current": [
    { value: "ampere", text: "ampere [A]" },
    { value: "milliampere", text: "milliampere [mA]" }
  ],
  "Energy": [
    { value: "joule", text: "joule [J]" },
    { value: "kilojoule", text: "kilojoule [kJ]" }
  ],
  "Force": [
    { value: "newton", text: "newton [N]" },
    { value: "kilonewton", text: "kilonewton [kN]" }
  ],
  "Fuel Consumption": [
    { value: "liter_per_100km", text: "liters/100km" },
    { value: "miles_per_gallon_us", text: "miles/gallon (US)" }
  ],
  "Length": [
    { value: "meter", text: "meter [m]" },
    { value: "centimeter", text: "centimeter [cm]" }
  ],
  "Mass": [
    { value: "kilogram", text: "kilogram [kg]" },
    { value: "gram", text: "gram [g]" }
  ],
  "Pressure": [
    { value: "pascal", text: "pascal [Pa]" },
    { value: "bar", text: "bar" }
  ],
  "Power": [
    { value: "watt", text: "watt [W]" },
    { value: "kilowatt", text: "kilowatt [kW]" }
  ],
  "Speed": [
    { value: "meter_per_second", text: "meter/second [m/s]" },
    { value: "kilometer_per_hour", text: "km/hour [km/h]" }
  ],
  "Time": [
    { value: "second", text: "second [s]" },
    { value: "minute", text: "minute [min]" }
  ],
  "Volume": [
    { value: "liter", text: "liter [L]" },
    { value: "cubic_meter", text: "cubic meter [m³]" }
  ]
};

// Conversion rates
const conversionRates = {
  "Length": { meter: 1, centimeter: 0.01 },
  "Mass": { kilogram: 1, gram: 0.001 },
  "Time": { second: 1, minute: 60 },
  "Volume": { liter: 0.001, cubic_meter: 1 },
  "Angle": { degree: 1, radian: 57.2958 },
  "Area": { square_meter: 1, square_kilometer: 1e6 },
  "Bits & Bytes": { bit: 1, byte: 8 },
  "Currency": { USD: 85, EUR: 0.9, INR: 1  },
  "Density": { kg_per_cubic_meter: 1, gram_per_cubic_centimeter: 1000 },
  "Electric Current": { ampere: 1, milliampere: 0.001 },
  "Energy": { joule: 1, kilojoule: 1000 },
  "Force": { newton: 1, kilonewton: 1000 },
  "Fuel Consumption": { liter_per_100km: 1, miles_per_gallon_us: 235.215 },
  "Pressure": { pascal: 1, bar: 1e5 },
  "Power": { watt: 1, kilowatt: 1000 },
  "Speed": { meter_per_second: 1, kilometer_per_hour: 0.277778 }
};

// Populate dropdowns
function populateUnits(category) {
  const fromUnit = document.getElementById('fromUnit');
  const toUnit = document.getElementById('toUnit');
  fromUnit.innerHTML = '';
  toUnit.innerHTML = '';
  if (!unitsMap[category]) return;
  unitsMap[category].forEach(unit => {
    const opt1 = document.createElement('option');
    opt1.value = unit.value;
    opt1.textContent = unit.text;
    const opt2 = document.createElement('option');
    opt2.value = unit.value;
    opt2.textContent = unit.text;
    fromUnit.appendChild(opt1);
    toUnit.appendChild(opt2);
  });
}

// Convert
function convert(category, from, to, value) {
  const rates = conversionRates[category];
  if (!rates || rates[from] === undefined || rates[to] === undefined) return null;
  const base = value * rates[from];
  return base / rates[to];
}

// Convert button
document.getElementById("convertBtn").addEventListener("click", () => {
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit = document.getElementById("toUnit").value;
  const inputValue = parseFloat(document.getElementById("inputValue").value);
  const selectedCategory = document.querySelector(".options.active")?.textContent.trim();
  if (!selectedCategory) return alert("Please select a category.");
  if (isNaN(inputValue)) return alert("Please enter a valid number.");
  const result = convert(selectedCategory, fromUnit, toUnit, inputValue);
  if (result === null) return alert(`Conversion not implemented for "${selectedCategory}".`);
  const decimals = parseInt(document.getElementById("decimalPlaces").value);
document.getElementById("outputValue").value = result.toFixed(decimals);

});

const settingsIcon = document.querySelector(".setting");
const settingsPanel = document.querySelector(".settings-panel");

settingsIcon.addEventListener("click", () => {
  if (settingsPanel.style.display === "none" || settingsPanel.style.display === "") {
    settingsPanel.style.display = "block";
  } else {
    settingsPanel.style.display = "none";
  }
});

// Swap button logic
document.querySelector(".swap").addEventListener("click", () => {
  // Swap the selected units
  const fromSelect = document.getElementById("fromUnit");
  const toSelect = document.getElementById("toUnit");

  const tempUnit = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = tempUnit;

  // Swap the input/output values
  const inputField = document.getElementById("inputValue");
  const outputField = document.getElementById("outputValue");

  const tempValue = inputField.value;
  inputField.value = outputField.value;
  outputField.value = tempValue;
});


