document.querySelectorAll(".payment_item").forEach((item) => {
    item.addEventListener("click", function () {
        var dataTerms = this.getAttribute("data-terms");
        var inputToUpdate = document.querySelector(".down_payment--text");
        switch (dataTerms) {
            case "36":
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

function calculateMonthlyPayment(loanAmount, annualRate, termMonths) {
    const monthlyRate = annualRate / 100 / 12;
    const discountFactor = (Math.pow(1 + monthlyRate, termMonths) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, termMonths));
    return loanAmount / discountFactor;
}

function calculateLoan(termLength) {
    const totalAmountFinancedElement = document.getElementById('amount_financed');
    const loanPrice = parseFloat(totalAmountFinancedElement.textContent.replace(/[$,]/g, '')); 

    const interestRateStr = document.getElementById("interest_rate").textContent.replace(/%/g, '');
    const interestRate = parseFloat(interestRateStr);

    if (isNaN(loanPrice)) {
        console.log('Please enter a valid loan amount.');
        return;
    }
    const monthlyPayment = calculateMonthlyPayment(loanPrice, 7.49, termLength);
    const formattedMonthlyPayment = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(monthlyPayment);

    document.querySelector('.price_text').textContent = formattedMonthlyPayment; 
}

document.getElementById('loanPrice').addEventListener('input', function () {
    const selectedTerm = document.querySelector('.payment_item.payment_item_active').getAttribute('data-terms');
    calculateLoan(selectedTerm);
});

document.getElementById('estimate_payment_link').addEventListener("click", function () {
    const firstPaymentItem = document.querySelector(".payment_item");
    if (firstPaymentItem) {
        firstPaymentItem.click();
    }
    const estimate_price = parseFloat(document.querySelector("#estimate_price").textContent.replace(/[$,]/g, '')); 
    const down_payment = parseFloat(document.querySelector("#down_payment").value.replace(/[$,]/g, ''));
    const deposit = parseFloat(document.querySelector("#deposit").value.replace(/[$,]/g, ''));

    const totalAmountFinance = estimate_price - down_payment - deposit;
    const formattedTotalAmountFinance = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(totalAmountFinance);
    document.getElementById('amount_financed').textContent = formattedTotalAmountFinance;

});