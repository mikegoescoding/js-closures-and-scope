# JavaScript Closures and Scope

Practice exercises for closures, lexical scope, and the `this` keyword in JavaScript.

## What I practiced

- What a closure is and why it exists
- Data privacy — protecting variables from global scope
- The difference between closed-over variables and regular parameters
- Building factory functions that return objects with methods
- The four `this` contexts — method call, plain function, arrow function, copied method
- Why copying a method breaks `this`
- Why arrow functions fix the `setTimeout` problem
- Closures vs `this` for data protection — and why closures are safer

## Files

| File | Description |
|------|-------------|
| `closures.js` | Counter, multiplier factory, and greeter exercises |
| `this-keyword.js` | Four this contexts, the classic bug, and the arrow function fix |

## How to run

```bash
node closures.js
node this-keyword.js
```

## Key concepts

**Closed-over variable** — a variable from an outer function that an inner function retains access to after the outer function finishes. It persists in memory as long as the inner function exists.

**Regular parameter** — passed fresh on every call. Not closed over.

**`this` rule** — `this` is determined at call time, not definition time. Look at what's to the left of the dot when the function is called.

**Arrow functions and `this`** — arrow functions have no `this` of their own. They inherit it from the surrounding scope. This makes them the right choice for callbacks inside methods.

## Tech stack

Vanilla JavaScript, Node.js
