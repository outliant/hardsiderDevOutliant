  function calculateMonthlyLoanPrice(loanPrice, interestRate, termLength) {
    const interestAmount = loanPrice * interestRate * termLength;
    const amountAfterInterest = loanPrice + interestAmount;
    
    return ((amountAfterInterest / termLength) / 12).toFixed(2);
  }