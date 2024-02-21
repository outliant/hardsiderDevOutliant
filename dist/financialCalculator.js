document.querySelectorAll(".payment_item").forEach((item) => {
  item.addEventListener("click", function () {
    var dataTerms = this.getAttribute("data-terms");
    var inputToUpdate = document.querySelector(".down_payment--text");
    switch (dataTerms) {
      case "48":
        inputToUpdate.innerHTML = "11%";
        break;
      case "60":
        inputToUpdate.innerHTML = "15%";
        break;
      default:
        inputToUpdate.innerHTML = "11%";
        break;
    }
  });
});

function calculateMonthlyLoanPrice(loanPrice, interestRate, termLength) {
  const interestAmount = loanPrice * interestRate * termLength;
  const amountAfterInterest = loanPrice + interestAmount;
  return (amountAfterInterest / termLength / 12).toFixed(2);
}

function selectTerm(term) {
  document.getElementById("termLength").value = term;
}

function calculateLoan() {
  const loanPrice = parseFloat(document.getElementById("loanPrice").value);
  const interestRate =
    parseFloat(document.getElementById("interestRate").value) / 100;
  const termLength = parseFloat(document.getElementById("termLength").value);
  if (isNaN(loanPrice) || isNaN(interestRate) || isNaN(termLength)) {
    console.log("Please fill in all fields.");
    return;
  }

  // For testing
  const monthlyPayment = calculateMonthlyLoanPrice(
    loanPrice,
    interestRate,
    termLength
  );
  document.getElementById(
    "monthlyPayment"
  ).textContent = `Monthly Payment: $${monthlyPayment}`;
}
