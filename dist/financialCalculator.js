// document.querySelectorAll(".payment_item").forEach((item) => {
//   item.addEventListener("click", function () {
//     var dataTerms = this.getAttribute("data-terms");
//     calculateLoan(dataTerms);
//   });
// });

// function calculateMonthlyPayment(loanAmount, annualRate, termMonths) {
//   const monthlyRate = annualRate / 100 / 12;
//   const discountFactor =
//     (Math.pow(1 + monthlyRate, termMonths) - 1) /
//     (monthlyRate * Math.pow(1 + monthlyRate, termMonths));
//   return loanAmount / discountFactor;
// }

// function calculateLoan(termLength) {
//   const totalAmountFinancedElement = document.getElementById("amount_financed");
//   const loanPrice = parseFloat(
//     totalAmountFinancedElement.textContent.replace(/[$,]/g, "")
//   );

//   const interestRateStr = document
//     .getElementById("interest_rate")
//     .textContent.replace(/%/g, "");
//   const interestRate = parseFloat(interestRateStr);

//   if (isNaN(loanPrice)) {
//     console.log("Please enter a valid loan amount.");
//     return;
//   }
//   const monthlyPayment = calculateMonthlyPayment(loanPrice, 7.49, termLength);
//   const formattedMonthlyPayment = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(monthlyPayment);

//   document.querySelector(".price_text").textContent = formattedMonthlyPayment;
// }
// document.getElementById("down_payment").addEventListener("input", function (e) {
//   let cursorPosition = e.target.selectionStart;
//   let originalLength = e.target.value.length;
//   let value = e.target.value.replace(/[\$,]/g, "");
//   value = parseFloat(value).toString();
//   if (!isNaN(value)) {
//     e.target.value = new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//     }).format(value);

//     document.querySelector("#down_payment").textContent = new Intl.NumberFormat(
//       "en-US",
//       {
//         style: "currency",
//         currency: "USD",
//         minimumFractionDigits: 0,
//       }
//     ).format(value);
//   } else {
//     e.target.value = "";
//   }
//   let newLength = e.target.value.length;
//   cursorPosition += newLength - originalLength;
//   e.target.setSelectionRange(cursorPosition, cursorPosition);

//   const selectedTerm = document
//     .querySelector(".payment_item.payment_item_active")
//     ?.getAttribute("data-terms");
//   if (selectedTerm) {
//     calculateLoan(selectedTerm);
//   }
// });

// function calculateDownPaymentPercentage(estimatedPrice, downPayment) {
//   var inputToUpdate = document.querySelector(".down_payment--text");
//   if (downPayment > estimatedPrice) {
//     console.error("Down payment cannot be greater than the estimated price.");
//     inputToUpdate.textContent = "Error";
//     return;
//   }
//   const percentageDown = (downPayment / estimatedPrice) * 100;
//   inputToUpdate.textContent = percentageDown.toFixed(2) + "%";
// }

// document
//   .getElementById("estimate_payment_link")
//   .addEventListener("click", function () {
//     const firstPaymentItem = document.querySelector(".payment_item");
//     if (firstPaymentItem) {
//       firstPaymentItem.click();
//     }
//     document.getElementById("loanPrice").value = `$10,000`;
//     const estimate_price = parseFloat(
//       document
//         .querySelector("#estimate_price")
//         .textContent.replace(/[$,-]/g, "")
//     );
//     const down_payment = parseFloat(
//       document.querySelector("#down_payment").textContent.replace(/[$,-]/g, "")
//     );
//     const deposit = parseFloat(
//       document.querySelector("#deposit").textContent.replace(/[$,-]/g, "")
//     );

//     const totalAmountFinance = estimate_price - down_payment - deposit;
//     const formattedTotalAmountFinance = new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(totalAmountFinance);
//     document.getElementById("amount_financed").textContent =
//       formattedTotalAmountFinance;
//     if (!isNaN(estimate_price) && !isNaN(down_payment)) {
//       calculateDownPaymentPercentage(estimate_price, down_payment);
//     } else {
//       console.error("Invalid input for estimated price or down payment.");
//     }
//   });


function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
}

function updateCalculations() {
  const loanPrice = parseFloat(
    document.getElementById("amount_financed").textContent.replace(/[$,]/g, "")
  );
  const interestRate = parseFloat(
    document.getElementById("interest_rate").textContent.replace(/%/g, "")
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
    isNaN(interestRate) ||
    isNaN(downPayment) ||
    isNaN(estimatePrice) ||
    isNaN(deposit)
  ) {
    console.error("Invalid input for calculation.");
    return;
  }

  const totalAmountFinance = estimatePrice - downPayment - deposit;
  document.getElementById("amount_financed").textContent =
    formatCurrency(totalAmountFinance);
  const selectedTerm = document
    .querySelector(".payment_item.payment_item_active")
    ?.getAttribute("data-terms");
  if (selectedTerm) {
    const termLength = parseInt(selectedTerm);
    const monthlyPayment = calculateMonthlyPayment(
      totalAmountFinance,
      interestRate,
      termLength
    );
    document.querySelector(".price_text").textContent =
      formatCurrency(monthlyPayment);
  }

  calculateDownPaymentPercentage(estimatePrice, downPayment);
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
  .getElementById("estimate_payment_link")
  .addEventListener("click", function () {
    document.getElementById("#loanPrice").value = "$10,000";
    updateCalculations();
  });
