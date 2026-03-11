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

const moneyValue = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

// break down a number into moneyValue components
const denom = (amount) => {
    const denominations = moneyValue;
    const result = {};

    for (let d of denominations) {
        const count = Math.floor(amount / d);
        result[d] = count;
        amount = amount % d;
    }
    return toString(result);
}

// create a register object as a class that has a total and change
class Register {
    constructor() {
        this.total = price;
        this.cash = cid;
        this.status = "CLOSED"
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

    totalCash() {
        let acc = 0;
        for (let i = 0; i < this.cash.length; i++) {
            acc += this.cash[i][1];
        }
        return acc.toFixed(2);
    }
}

const reg = new Register();
reg.update();
// create functions of a register purchase, update, reset

// add event listener to purchase button with callback for functionality
purchaseBtn.addEventListener("click", () => {
    if (input.value < price) {
        alert("Customer does not have enough money to purchase the item");
        input.value = null;
    } else if (input.value == price) {
        change.textContent = "No change due - customer paid with exact cash";
        input.value = null;
    } else if(input.value > price){
        let result = ""
        reg.status = "OPEN"
        result += `Status: ${reg.status}`;
        result += denom(input.value - price);
        change.textContent = result;
        input.value = null;
    }
});
