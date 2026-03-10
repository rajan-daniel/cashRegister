const input = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const due = document.getElementById("due");
const drawerCash = document.getElementById("cash-in-drawer");
const change = document.getElementById("change-due");

let price = 1.87;
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

const moneyValue = [
    ['PENNY', .01],
    ['NICKEL', .05],
    ['DIME', .1],
    ['QUARTER', .25],
    ['ONE', 1],
    ['FIVE', 5],
    ['TEN', 10],
    ['TWENTY', 20],
    ['ONE HUNDRED', 100]
];

// create a register object as a class that has a total and change
class Register {
    constructor() {
        this.total = price;
        this.cash = cid;
    }

    // draw the CID elements into the cash in drawer element and update total due
    update() {
        due.textContent = this.total;
        for (let i = 0; i < this.cash.length; i++) {
            const li = document.createElement('li');
            li.textContent = `${this.cash[i][0]}: $${this.cash[i][1]}`;
            drawerCash.appendChild(li);
        }
    }

    deposit(amount) {

    }

    withdraw(amount) {

    }

}

const reg = new Register();
reg.update();
// create functions of a register purchase, update, reset

// add event listener to purchase button with callback for functionality
purchaseBtn.addEventListener("click", () => {
    change.textContent = (reg.total - input.value).toFixed(2);
});