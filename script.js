const Calories = document.getElementById("Calories");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const cal = document.getElementById("cal");
const notification = document.getElementById("notification");


 const localStorageTransactions = JSON.parse(
   localStorage.getItem("transactions")
);
let transactions =
  localStorageTransactions !== null ? localStorageTransactions : [];

function updateLocaleStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || cal.value.trim() === "") {
    showNotification();
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      cal: +cal.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocaleStorage();
    text.value = "";
    cal.value = "";
  }
}

function addTransactionDOM(transaction) {
  const sign = transaction.cal < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(sign === "+" ? "plus" : "minus");
  item.innerHTML = `
          ${transaction.text} <span>${sign}${Math.abs(transaction.cal)}</span
          ><button class="delete-btn" onclick="removeTransaction(${
            transaction.id
          })"><i class="fa fa-times"></i></button>
    `;
  list.appendChild(item);
}

function updateValues() {
  const cals = transactions.map((transaction) => transaction.cal);
  const total = cals
    .reduce((accumulator, value) => (accumulator += value), 0)
    .toFixed(2);

  Calories.innerText = `${total}`;
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocaleStorage();
  init();
}

function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);