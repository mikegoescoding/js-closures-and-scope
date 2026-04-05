// ─── Closures ─────────────────────────────────────────────────────────
// A closure is when an inner function retains access to variables
// from its outer function's scope, even after the outer function
// has finished running.
//
// Why closures exist:
// - Data privacy — variables are protected from global scope
// - Persistence — values survive between function calls
// - The only way to interact with a closed-over variable is through
//   the functions deliberately exposed — nothing outside can touch it directly

// ─── Exercise 1 — counter with data privacy ───────────────────────────
// count is private — nothing outside makeCounter can access or corrupt it
function makeCounter() {
  let count = 0; // closed-over variable — lives here permanently

  return {
    increment: function() { count = count + 1; },
    decrement: function() { count = count - 1; },
    getCount:  function() { return count; },
  };
}

const counter = makeCounter(); // makeCounter finishes, but count lives on
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getCount()); // 2

// Proof of privacy — this does NOT affect the real count:
counter.count = 9999;
console.log(counter.getCount()); // still 2

// ─── Exercise 2 — multiplier factory ─────────────────────────────────
// multiplier is the closed-over variable — locked in when makeMultiplier runs
// number is a regular parameter — fresh on every call
function makeMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = makeMultiplier(2); // multiplier = 2, locked in permanently
const triple = makeMultiplier(3); // brand new closure, multiplier = 3

console.log(double(5));  // 10 — multiplier is 2, number is 5
console.log(triple(5));  // 15 — multiplier is 3, number is 5
console.log(double(10)); // 20 — multiplier is still 2
// double and triple are completely independent closures

// ─── Exercise 3 — spot the closure ───────────────────────────────────
function makeGreeter(greeting) {
  return function(name) {
    console.log(`${greeting}, ${name}!`);
  };
}

const greet = makeGreeter("Hello");
// greeting = "Hello" is the closed-over variable
// name is a regular parameter, fresh on every call
greet("Alice"); // Hello, Alice!
greet("Alice"); // Hello, Alice!
greet("Alice"); // Hello, Alice! — greeting never changes
