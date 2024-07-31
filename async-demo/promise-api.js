// already resolved
const p = Promise.resolve(1);
p.then((result) => console.log(result));

// already rejected
const r = Promise.reject(new Error("reason for rejection"));
r.catch((err) => console.log(err));

// Running Promises in Parallel
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 1...");
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 2...");
    resolve(2);
  }, 2000);
});

Promise.all([p1, p2]).then((result) => console.log(result));

Promise.race([p1, p2]).then((result) => console.log(result));
