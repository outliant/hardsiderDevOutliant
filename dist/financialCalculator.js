// Assuming subTotal input exists and has a value
const subTotal = document.getElementById('subtotal').innerHTML.replace(/[$,]/g, '');
document.getElementById('loanPrice').value = subTotal;

document.querySelectorAll(".payment_item").forEach((item) => {
    item.addEventListener("click", function () {
        var dataTerms = this.getAttribute("data-terms");
        var inputToUpdate = document.querySelector(".down_payment--text");
        switch (dataTerms) {
            case "48":
                inputToUpdate.textContent = "11%";
                break;
            case "60":
                inputToUpdate.textContent = "15%";
                break;
            case "72":
                inputToUpdate.textContent = "20%";
                break;
            case "84":
                inputToUpdate.textContent = "25%"; 
                break;
            default:
                inputToUpdate.textContent = "11%";
                break;
        }
        calculateLoan(dataTerms); 
    });
});
function calculateMonthlyLoanPrice(loanPrice, interestRate, termLength) {
    const interestAmount = loanPrice * (interestRate / 100) * (termLength / 12);
    const amountAfterInterest = loanPrice + interestAmount;
    return (amountAfterInterest / termLength).toFixed(2);
}

function calculateLoan(termLength) {
    const loanPrice = parseFloat(document.getElementById('loanPrice').value);
    const interestRateElement = document.getElementById("interest_rate").textContent;
    const interestRate = parseFloat(interestRateElement.replace(/%/g, ''));
        if (isNaN(loanPrice)) {
        console.log('Please enter the loan amount.');
        return;
    }
    const monthlyPayment = calculateMonthlyLoanPrice(loanPrice, interestRate, termLength);
    document.getElementById('estimated_price').textContent = `$${monthlyPayment}`;
}

window.onload = function() {
    document.querySelector(".payment_item").click();
};
