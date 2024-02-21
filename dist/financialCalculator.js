document.querySelectorAll(".payment_item").forEach((item) => {
    item.addEventListener("click", function () {
      var dataTerms = this.getAttribute("data-terms");
      var inputToUpdate = document.querySelector(".down_payment--text");
      switch (dataTerms) {
        case "48":
          inputToUpdate.innerHTML = "11";
          calculateLoan(48);
          break;
        case "60":
          inputToUpdate.innerHTML = "15";
          calculateLoan(60);
          break;
        case "72":
          inputToUpdate.innerHTML = "20";
          calculateLoan(72);
          break;
        case "84":
          inputToUpdate.innerHTML = "25";
          calculateLoan(84); 
          break;
        default:
          inputToUpdate.innerHTML = "11";
          calculateLoan(48);
          break;
      }
    });
  });

function calculateMonthlyLoanPrice(loanPrice, interestRate, termLength) {
    const interestAmount = loanPrice * (interestRate / 100) * (termLength / 12);
    const amountAfterInterest = loanPrice + interestAmount;
    return (amountAfterInterest / termLength).toFixed(2);
  }
  function calculateLoan(termLength) {
    const loanPrice = parseFloat(document.getElementById('loanPrice').value);
    const interestRate = parseFloat(document.getElementById("interest_rate").innerHTML); 
    if (isNaN(loanPrice)) {
      console.log('Please enter the loan amount.');
      return;
    }
    const monthlyPayment = calculateMonthlyLoanPrice(loanPrice, interestRate, termLength);
    document.getElementById('estimated_price').textContent = `$${monthlyPayment}`;
  }