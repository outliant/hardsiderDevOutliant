function calculateMonthlyLoanPrice(loanPrice, interestRate, termLength) {
    const interestAmount = loanPrice * (interestRate / 100) * (termLength / 12);
    const amountAfterInterest = loanPrice + interestAmount;
    return (amountAfterInterest / termLength).toFixed(2);
}

function calculateLoan(termLength) {
    const loanPriceStr = document.getElementById('loanPrice').value.replace(/[^0-9.]/g, '');
    const loanPrice = parseFloat(loanPriceStr);

    const interestRateStr = document.getElementById("interest_rate").textContent.replace(/%/g, '');
    const interestRate = parseFloat(interestRateStr);

    if (isNaN(loanPrice)) {
        console.log('Please enter a valid loan amount.');
        return;
    }

    const monthlyPayment = calculateMonthlyLoanPrice(loanPrice, interestRate, termLength);
    document.querySelector('.price_text').textContent = `$${monthlyPayment}`;
}
document.querySelectorAll(".payment_item").forEach((item) => {
    item.addEventListener("click", function () {
        var dataTerms = this.getAttribute("data-terms");
        var inputToUpdate = document.querySelector(".down_payment--text");
        inputToUpdate.textContent = this.textContent;
        calculateLoan(dataTerms);
    });
});

document.getElementById('loanPrice').addEventListener('input', function() {
    const selectedTerm = document.querySelector('.payment_item.active').getAttribute('data-terms');
    calculateLoan(selectedTerm);
});

window.onload = function() {
    const firstPaymentItem = document.querySelector(".payment_item");
    if (firstPaymentItem) {
        firstPaymentItem.click();
    }
};
