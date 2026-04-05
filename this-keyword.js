// ─── The 'this' keyword ───────────────────────────────────────────────
// 'this' doesn't care where a function was defined.
// It only cares about HOW the function was called.
//
// Decision tree:
//   obj.method()       → this = obj (object to the left of the dot)
//   function()         → this = undefined (strict) or window (browser)
//   arrow function     → this = inherited from surrounding scope
//   copied method()    → this = undefined (lost its object reference)

// ─── Context 1 — method on an object ─────────────────────────────────
const person = {
  name: "Alice",
  greet: function() {
    console.log(`Hi, I'm ${this.name}`);
  }
};
person.greet(); // "Hi, I'm Alice" — person is to the left of the dot

// ─── Context 2 — the classic bug (copying a method) ──────────────────
const car = {
  brand: "Toyota",
  getBrand: function() {
    return this.brand;
  }
};

console.log(car.getBrand()); // "Toyota" — car is to the left of the dot

const fn = car.getBrand; // copy the function — name tag falls off
console.log(fn());        // undefined — nothing to the left of the dot

// ─── Context 3 — arrow functions inherit this ─────────────────────────
// Arrow functions have no 'this' of their own.
// They look outward and borrow 'this' from the surrounding scope.
// This fixes the common setTimeout bug:

const timer = {
  message: "Time is up!",

  // Broken — regular function loses 'this' inside setTimeout
  startBroken: function() {
    setTimeout(function() {
      console.log(this.message); // undefined — this lost its reference
    }, 100);
  },

  // Fixed — arrow function inherits 'this' from startFixed
  startFixed: function() {
    setTimeout(() => {
      console.log(this.message); // "Time is up!" — this = timer
    }, 100);
  },
};

timer.startBroken(); // undefined
timer.startFixed();  // "Time is up!"

// ─── Exercise — bankAccount using closures vs this ────────────────────
// Closure version — balance is private, cannot be corrupted from outside
function bankAccount(startingBalance) {
  let balance = startingBalance;

  return {
    deposit:    function(amount) { balance = balance + amount; },
    withdraw:   function(amount) { balance = balance - amount; },
    getBalance: function()       { return balance; },
  };
}

const account = bankAccount(100);
account.deposit(50);
account.withdraw(30);
console.log(account.getBalance()); // 120

// Proof closure protects the balance:
account.balance = 9999;            // adds a NEW property — doesn't touch the real balance
console.log(account.getBalance()); // still 120
