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
    ["ONE HUNDRED", 100],
    ["TWENTY", 20],
    ["TEN", 10],
    ["FIVE", 5],
    ["ONE", 1],
    ["QUARTER", 0.25],
    ["DIME", 0.10],
    ["NICKEL", 0.05],
    ["PENNY", 0.01]
];

// break down a number into moneyValue components
const denom = (amount) => {
    let result = "";

    for (let [name, value] of moneyValue) {
        const count = Math.floor(amount / value);
        if (count > 0) {
            result += `\n${name}: ${count}`;
            amount = Math.round((amount - count * value) * 100) / 100;
        }
    }
    return result;
}

// create a register object as a class that has a total and change
class Register {
    constructor() {
        this.price = price;
        this.cash = cid;
        this.status = "CLOSED"
    }

    // draw the CID elements into the cash in drawer element and update total due
    update() {
        drawerCash.innerHTML = "";
        due.textContent = this.price;
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
    const changeDue = Math.round((input.value - price) * 100) / 100;
    const cashInDrawer = reg.totalCash();
    let result = ""

    if (cashInDrawer < changeDue) {
        reg.status = "INSUFFICIENT_FUNDS";
    } else if (cashInDrawer == changeDue) {
        reg.status = "CLOSED";
    } else if (cashInDrawer > changeDue) {
        reg.status = "OPEN";
    }

    if (input.value < reg.price) {
        alert("Customer does not have enough money to purchase the item");
        reg.update();
        input.value = null;
    } else if (input.value = reg.price) {
        result += "No change due - customer paid with exact cash";
        change.textContent = result;
        input.value = null;
    } else if(input.value > reg.price){
        result += denom(input.value - reg.price)
        change.textContent = result;
        input.value = null;
    }
});
