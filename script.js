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
const denom = (amount, drawer) => {
    let result = "";
    let changeArray = [];

    for (let [name, value] of moneyValue) {
        const drawerIndex = drawer.findIndex(d => d[0] === name);
        let available = drawer[drawerIndex][1];

        let count = Math.min(Math.floor(amount / value), Math.floor(available / value));

        if (count > 0) {
            let totalUsed = Math.round(count * value * 100) / 100;

            drawer[drawerIndex][1] = Math.round((drawer[drawerIndex][1] - totalUsed) * 100) / 100;

            amount = Math.round((amount - totalUsed) * 100) / 100;

            result += `<br>${name}: ${count}`;
            changeArray.push([name, totalUsed]);
        }
    }

    if (amount > 0) {
        return { result: "INSUFFICIENT_FUNDS", changeArray: [] };
    }

    return { result, changeArray };
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
        return Math.round(acc * 100) / 100;
    }
}

const reg = new Register();
reg.update();
// create functions of a register purchase, update, reset

// add event listener to purchase button with callback for functionality
purchaseBtn.addEventListener("click", () => {
    const cashPaid = parseFloat(input.value);
    const changeDue = Math.round((cashPaid - price) * 100) / 100;
    let result = "";

    if (changeDue < 0) {
        alert("Customer does not have enough money to purchase the item");
        reg.update();
        input.value = null;
        return;
    }

    const totalDrawer = parseFloat(reg.totalCash());

    if (totalDrawer < changeDue) {
        reg.status = "INSUFFICIENT_FUNDS";
        result = "INSUFFICIENT_FUNDS";
        change.innerHTML = result;
    } else if (totalDrawer === changeDue) {
        reg.status = "CLOSED";

        let allChange = reg.cash.map(([name, val]) => [name, val]);
        result = allChange.map(([name, val]) => `${name}: ${val.toFixed(2)}`).join("<br>");
        reg.cash = reg.cash.map(([name, val]) => [name, 0]);
        change.innerHTML = result;
    } else {
        reg.status = "OPEN";
        const { result: changeStr } = denom(changeDue, reg.cash);
        if (changeStr === "INSUFFICIENT_FUNDS") {
            reg.status = "INSUFFICIENT_FUNDS";
            change.innerHTML = "INSUFFICIENT_FUNDS";
        } else {
            change.innerHTML = `Status: ${reg.status}${changeStr}`;
        }
    }

    reg.update();
    input.value = null;
});
