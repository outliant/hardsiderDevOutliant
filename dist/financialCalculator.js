function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
}

function updateCalculations() {
  const loanPriceElement = document
    .getElementById("loanPrice")
    .value.replace(/[$,]/g, "");
  const errorElement = document.getElementById("loanPriceError");

  const loanPrice = parseFloat(
    document.getElementById("amount_financed").textContent.replace(/[$,]/g, "")
  );
  const downPayment = parseFloat(
    document.getElementById("down_payment").textContent.replace(/[$,]/g, "")
  );
  const estimatePrice = parseFloat(
    document.getElementById("estimate_price").textContent.replace(/[$,-]/g, "")
  );
  const deposit = parseFloat(
    document.getElementById("deposit").textContent.replace(/[$,-]/g, "")
  );

  if (
    isNaN(loanPrice) ||
    isNaN(downPayment) ||
    isNaN(estimatePrice) ||
    isNaN(deposit)
  ) {
    console.error("Invalid input for calculation.");
    return;
  }
  const totalAmountFinance = estimatePrice - downPayment - deposit;
  if (loanPriceElement > estimatePrice * 0.95) {
    errorElement.textContent =
      "Loan amount cannot exceed 95% of the estimated price.";
    errorElement.classList.add("error");
    errorElement.classList.remove("hide");
    return;
  } else {
    errorElement.textContent = "";
    if (errorElement.classList.contains("error")) {
      errorElement.classList.remove("error");
      errorElement.classList.add("hide");
    }
    document.getElementById("amount_financed").textContent =
      formatCurrency(totalAmountFinance);
    const selectedTerm = document
      .querySelector(".payment_item.payment_item_active")
      ?.getAttribute("data-terms");
    if (selectedTerm) {
      const termLength = parseInt(selectedTerm);
      const monthlyPayment = calculateMonthlyPayment(
        totalAmountFinance,
        8.49,
        termLength
      );
      document.querySelector(".price_text").textContent =
        formatCurrency(monthlyPayment);
    }
    calculateDownPaymentPercentage(estimatePrice, downPayment);
  }
}

function calculateMonthlyPayment(loanAmount, annualRate, termMonths) {
  const monthlyRate = annualRate / 100 / 12;
  const discountFactor =
    (Math.pow(1 + monthlyRate, termMonths) - 1) /
    (monthlyRate * Math.pow(1 + monthlyRate, termMonths));
  return loanAmount / discountFactor;
}

function calculateDownPaymentPercentage(estimatedPrice, downPayment) {
  var inputToUpdate = document.querySelector(".down_payment--text");
  if (downPayment > estimatedPrice) {
    console.error("Down payment cannot be greater than the estimated price.");
    inputToUpdate.textContent = "Error";
    return;
  }
  const percentageDown = (downPayment / estimatedPrice) * 100;
  inputToUpdate.textContent = percentageDown.toFixed(2) + "%";
}

document.querySelectorAll(".payment_item").forEach((item) => {
  item.addEventListener("click", function () {
    updateCalculations();
  });
});

document.querySelectorAll("#loanPrice").forEach((input) => {
  input.addEventListener("input", function (e) {
    let cursorPosition = e.target.selectionStart;
    let originalLength = e.target.value.length;
    let value = e.target.value.replace(/[\$,]/g, "");
    value = parseFloat(value).toString();
    if (!isNaN(value)) {
      e.target.value = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(value);
      document.querySelector("#down_payment").textContent =
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
        }).format(value);
    } else {
      e.target.value = "";
    }
    let newLength = e.target.value.length;
    cursorPosition += newLength - originalLength;
    e.target.setSelectionRange(cursorPosition, cursorPosition);
    updateCalculations();
  });
});

document
  .getElementById("loanPrice")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      return false;
    }
  });
document.querySelectorAll(".payment_item").forEach((item) => {
  item.addEventListener("click", function () {
    this.classList.add("payment_item_active");
    let siblings = Array.from(this.parentNode.children).filter(
      (child) => child !== this
    );
    siblings.forEach((sibling) => {
      sibling.classList.remove("payment_item_active");
    });
    updateCalculations();
  });
});
document
  .getElementById("estimate_payment_link")
  .addEventListener("click", function () {
    const defaultLoanPrice = 0;
    const subTotal = document.getElementById("subtotal").textContent;
    document.getElementById("estimate_price").textContent = subTotal;
    document.getElementById("loanPrice").value = new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }
    ).format(defaultLoanPrice);

    document.querySelector("#down_payment").textContent = new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }
    ).format(defaultLoanPrice);
    updateCalculations();
  });
