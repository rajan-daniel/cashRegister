const input = document.getElementById("input");
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

// create a register object as a class that has a total and change
class Register {
    constructor() {
        this.total = price;
        this.change = cid;
    }

    // draw the CID elements into the cash in drawer element and update total due
    update() {
        due.textContent = this.total;
        for(let i = 0; i < this.change.length; i++){
            const li = document.createElement('li');
            li.textContent = `${this.change[i][0]}: $${this.change[i][1]}`;
            drawerCash.appendChild(li);
        }
    }
}

const reg = new Register();
reg.update();
// create functions of a register purchase, update, reset

// add event listener to purchase button with callback for functionality
purchaseBtn.addEventListener(() => {
    
});