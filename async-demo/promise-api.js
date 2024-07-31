// already resolved
const p = Promise.resolve(1);
p.then((result) => console.log(result));

// already rejected
const r = Promise.reject(new Error("reason for rejection"));
r.catch((err) => console.log(err));
