const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const transactionListEl = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');

let transactions = [];

function init() {
    transactionListEl.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

function addTransaction(e) {
    e.preventDefault();
    const description = descriptionInput.value;
    const amount = +amountInput.value;
    const transaction = {
        id: generateID(),
        description,
        amount
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    descriptionInput.value = '';
    amountInput.value = '';
}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'expense' : 'income');
    item.innerHTML = `
        ${transaction.description} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    transactionListEl.appendChild(item);
}

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const expense = (
        amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);
    
    balanceEl.innerText = `$${total}`;
    incomeEl.innerText = `$${income}`;
    expenseEl.innerText = `$${expense}`;
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

form.addEventListener('submit', addTransaction);
init();
