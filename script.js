console.log("Script loaded successfully");

const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const customTipInput = document.getElementById("custom-tip");
const tipButtons = document.querySelectorAll("[data-tip]");
const resetButton = document.querySelector(".reset-button");
const tipAmountDisplay = document.getElementById("tip-amount");
const totalAmountDisplay = document.getElementById("total-amount");
const errorMsg = document.querySelector(".error-msg"); 

let currentTipPercent = null;

// Handle clicks on tip buttons
tipButtons.forEach(button => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons and set on current
    tipButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const tipPercent = parseFloat(button.dataset.tip);
    currentTipPercent = tipPercent;
    console.log("Tip button clicked:", tipPercent);
    calculateTip(tipPercent);
  });
});

// Handle custom tip input
customTipInput.addEventListener("input", function () {
  const customTipValue = parseFloat(customTipInput.value);
  if (!isNaN(customTipValue)) {
    tipButtons.forEach(btn => btn.classList.remove("active"));
    currentTipPercent = customTipValue;
    console.log("Custom tip input:", customTipValue);
    calculateTip(customTipValue);
  }
});


peopleInput.addEventListener("input", function () {
  const peopleValue = parseInt(peopleInput.value, 10);

   if (!isNaN(peopleValue) && peopleValue > 0) {
    errorMsg.style.display = "none"; 
    if (currentTipPercent !== null) {
      calculateTip(currentTipPercent);
    }
  } else {
    errorMsg.style.display = "block"; 
  }
})

// Handle input change in bill field
billInput.addEventListener("input", function () {
  if (currentTipPercent !== null) {
    calculateTip(currentTipPercent);
  }
});

// Reset button handler
resetButton.addEventListener("click", function () {
  console.log("Reset button clicked");
  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';
  tipAmountDisplay.textContent = "$0.00";
  totalAmountDisplay.textContent = "$0.00";
  currentTipPercent = null;

  tipButtons.forEach(button => {
    button.classList.remove('active');
  });
});


function calculateTip(tipPercent) {
  const billValue = parseFloat(billInput.value);
  const peopleValue = parseInt(peopleInput.value, 10);

  if (isNaN(billValue) || isNaN(peopleValue) || peopleValue <= 0) {
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";
    return;
  }

  const tipValue = (billValue * (tipPercent / 100)) / peopleValue;
  const totalValue = (billValue + (tipValue * peopleValue)) / peopleValue;

  const currentTip = parseFloat(tipAmountDisplay.textContent.replace('$', '')) || 0;
  const currentTotal = parseFloat(totalAmountDisplay.textContent.replace('$', '')) || 0;

  animateValue(tipAmountDisplay, currentTip, tipValue, 300);
  animateValue(totalAmountDisplay, currentTotal, totalValue, 300);

  triggerAnimation(tipAmountDisplay);
  triggerAnimation(totalAmountDisplay);
}

function animateValue(element, start, end, duration = 300) {
  const range = end - start;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = start + (range * progress);
    element.textContent = `$${value.toFixed(2)}`;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
