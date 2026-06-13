const form = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalDisplay = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateUI() {

    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach((expense, index) => {

        total += Number(expense.amount);

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="expense-info">
                <strong>${expense.title}</strong>
                <span class="category">${expense.category}</span>
            </div>

            <div>
                ₹${expense.amount}
                <button class="delete-btn" onclick="deleteExpense(${index})">
                    Delete
                </button>
            </div>
        `;

        expenseList.appendChild(li);
    });

    totalDisplay.textContent = `₹${total}`;
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    saveExpenses();
    updateUI();
}

form.addEventListener("submit", function(e){

    e.preventDefault();

    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;

    const expense = {
        title,
        amount,
        category
    };

    expenses.push(expense);

    saveExpenses();
    updateUI();

    form.reset();
});

updateUI();