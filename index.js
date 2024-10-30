const bill = document.getElementById("Bill");
const billError = document.getElementById("billError");
const currency = document.getElementById("currency");
const tipSlider = document.getElementById("Tip-slider");
const tipPercentage = document.getElementById("Tip-percentage");
const tipAmount = document.getElementById("Tip-Amount");
const totalBill = document.getElementById("Total-Bill");
// disabling the feilds
tipPercentage.disabled = true;
tipAmount.disabled = true;
totalBill.disabled = true;

const rates = {
    USD: 1,
    JPY: 149.34,
    INR: 84.07
};

const symbols = {
    USD: "$",
    JPY: "¥",
    INR: "₹"
};
/*function isValidInput(value) {
    return /^\d*\.?\d*$/.test(value) && value > 0;
}*/
function formatAmount(amount, currency) {
    const rate = rates[currency];
    const symbol = symbols[currency];
    const convertedAmount = amount * rate;
    return `${symbol}${convertedAmount.toFixed(2)}`;
}
// tip caluclating function
function calculateTip() {
    const num = bill.value;
// detecting error values
    if (isNaN(num) || num < 0) {
        billError.classList.add('show');
        tipAmount.value = '';
        totalBill.value = '';
        return;
    }

    billError.classList.remove('show');
    const billValue = parseFloat(bill.value);
    const tipValue = parseInt(tipSlider.value);
    const selectedCurrency = currency.value;
    const tipAmountUSD = billValue * (tipValue / 100);
    const totalBillUSD = billValue + tipAmountUSD;

    tipPercentage.value = `${tipValue}%`;
    tipAmount.value = formatAmount(tipAmountUSD, selectedCurrency);
    totalBill.value = formatAmount(totalBillUSD, selectedCurrency);

    
}

bill.addEventListener('input', function(e) {
    if (e.target.value === '') {
        billError.classList.remove('show');
        tipAmount.value = '';
        totalBill.value = '';
        return;
    }
    calculateTip();
});

tipSlider.addEventListener('input', calculateTip);
currency.addEventListener('change', calculateTip);

// Prevent non-numeric input
/*bill.addEventListener('keypress', function(e) {
    if (!/[\d.]/.test(e.key)) {
        e.preventDefault();
    }
    if (e.key === '.' && this.value.includes('.')) {
        e.preventDefault();
    }
});*/

// Initial calculation

calculateTip();