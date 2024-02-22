document.getElementById('loanPrice').addEventListener('input', function(e) {
    let value = e.target.value.replace(/[^0-9.]/g, '');
    let numberValue = parseFloat(value);
    if (!isNaN(numberValue)) {
        e.target.value = numberValue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        });
    } else {
        e.target.value = '';
    }
});


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
    const loanPriceStr = document.getElementById('loanPrice').value.replace(/[^0-9.]/g, '');
    const loanPrice = parseFloat(loanPriceStr);

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
document.querySelectorAll(".payment_item").forEach((item) => {
    item.addEventListener("click", function () {
        var dataTerms = this.getAttribute("data-terms");
        calculateLoan(dataTerms);
    });
});


document.getElementById('loanPrice').addEventListener('input', function() {
    const selectedTerm = document.querySelector('.payment_item.payment_item_active').getAttribute('data-terms');
    calculateLoan(selectedTerm);
});

document.getElementById('estimate_payment_link').addEventListener("click", function () {
    const firstPaymentItem = document.querySelector(".payment_item");
    if (firstPaymentItem) {
        firstPaymentItem.click();
    }
});