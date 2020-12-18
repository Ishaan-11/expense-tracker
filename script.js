const balance = document.getElementById('balance'),
  moneyPLus = document.getElementById('money-plus'),
  moneyMinus = document.getElementById('money-minus'),
  listEle = document.getElementById('list'),
  form = document.getElementById('form'),
  text = document.getElementById('text'),
  amount = document.getElementById('amount');


const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];

let transactions = dummyTransactions;

// Add new transaction
function addNewTransaction(e) {
  e.preventDefault();

  if (text.value === '' || amount.value === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);

    showTransactionHistory(transaction);

    updateBalance();

    text.value = '';
    amount.value = '';
  }
}

// Generate random ID
function generateId() {
  return Math.floor(Math.random() * 1000000);
}

// show transaction history
function showTransactionHistory(transaction) {
  // Get sign
  const sign = transaction.amount > 0 ? '+' : '';

  const list = document.createElement('li');

  // Add class based on value
  list.classList.add(transaction.amount > 0 ? 'plus' : 'minus');

  list.innerHTML = `
    ${transaction.text} <span>${sign}${transaction.amount}</span>
    <button class="delete-btn" onclick=removeTransaction(${transaction.id})>X</button>
  `;

  listEle.appendChild(list);
}

// Update the balance, income and expense
function updateBalance() {
  const amount = transactions.map(trans => trans.amount);

  const total = amount.reduce((sum, item) => (sum + item), 0);

  const income = amount
                .filter(item => item > 0)
                .reduce((sum, item) => (sum + item), 0)
                .toFixed(2);
  
  const expense = (amount
                .filter(item => item < 0)
                .reduce((sum, item) => (sum + item), 0) * -1)
                .toFixed(2);
  
  balance.innerHTML = `₹${total}`;
  moneyPLus.innerHTML = `+₹${income}`;
  moneyMinus.innerHTML = `-₹${expense}`;
}

function removeTransaction(transId) {
  transactions = transactions.filter(item => item.id !== transId);

  init();
}

// Init app
function init() {
  listEle.innerHTML = '';

  transactions.forEach(showTransactionHistory);
  updateBalance();
}

init();

form.addEventListener('submit', addNewTransaction);