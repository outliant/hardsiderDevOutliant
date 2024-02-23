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

// document.querySelector("#down_payment").addEventListener("input", function () {
//   const downPaymentValue = parseFloat(this.value.replace(/[$,-]/g, ""));
//   if (!isNaN(downPaymentValue)) {
//     const loanPriceElement = document.getElementById("loanPrice");
//     const estimatePriceElement = document.querySelector("#estimate_price");
//     const estimatedPrice = parseFloat(
//       estimatePriceElement.textContent.replace(/[$,-]/g, "")
//     );
//     const newLoanPrice = estimatedPrice - downPaymentValue;
//     const formattedNewLoanPrice = new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(newLoanPrice);
//     loanPriceElement.value = formattedNewLoanPrice;
//     const selectedTerm = document
//       .querySelector(".payment_item.payment_item_active")
//       ?.getAttribute("data-terms");
//     if (selectedTerm) {
//       calculateLoan(selectedTerm);
//     }
//   } else {
//     console.error("Invalid input for down payment.");
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



document.querySelectorAll(".payment_item").forEach((item) => {
    item.addEventListener("click", function () {
      recalculate();
    });
  });
  
  document.getElementById("loanPrice").addEventListener("input", recalculate);
  
  function calculateMonthlyPayment(loanAmount, annualRate, termMonths) {
    const monthlyRate = annualRate / 100 / 12;
    const discountFactor =
      (Math.pow(1 + monthlyRate, termMonths) - 1) /
      (monthlyRate * Math.pow(1 + monthlyRate, termMonths));
    return loanAmount / discountFactor;
  }
  
  function recalculate() {
    const termLength = document.querySelector(".payment_item.payment_item_active")?.getAttribute("data-terms");
    const estimatedPrice = parseFloat(document.querySelector("#estimate_price").textContent.replace(/[$,]/g, "")) || 0;
    const downPayment = parseFloat(document.querySelector("#down_payment").textContent.replace(/[$,]/g, "")) || 0;
    const deposit = parseFloat(document.querySelector("#deposit").textContent.replace(/[$,]/g, "")) || 0;
  
    const totalAmountFinanced = estimatedPrice - downPayment - deposit;
    document.getElementById("amount_financed").textContent = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(totalAmountFinanced);
  
    if (!isNaN(termLength) && totalAmountFinanced > 0) {
      const interestRateStr = document.getElementById("interest_rate").textContent.replace(/%/g, "");
      const interestRate = parseFloat(interestRateStr);
      const monthlyPayment = calculateMonthlyPayment(totalAmountFinanced, interestRate, termLength);
      document.querySelector(".price_text").textContent = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(monthlyPayment);
    }
  
    calculateDownPaymentPercentage(estimatedPrice, downPayment);
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
  
  document.getElementById("estimate_payment_link").addEventListener("click", function () {
    recalculate();
  });