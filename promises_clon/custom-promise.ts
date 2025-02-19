const PROMISE_STATE = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2,
};

function CustomPromise(executor) {
  let state = PROMISE_STATE.PENDING;
  let value: any = null;

  const successHandlers: Array<(value: any) => void> = [];
  const catchHandlers: Array<(value: any) => void> = [];

  const resolve = (result: any) => {
    // if state is no longer pending it means this promise was resolved and promises only resolve once
    if (state !== PROMISE_STATE.PENDING) return;

    // mark the promise as fullfilled and fill the value
    state = PROMISE_STATE.FULFILLED;
    value = result;

    // execute all handlers
    successHandlers.forEach((handler) => handler(value));
  };

  const reject = (error: any) => {
    // if state is no longer pending it means this promise was resolved and promises only resolve once
    if (state !== PROMISE_STATE.PENDING) return;

    // mark the promise as fullfilled and fill the value
    state = PROMISE_STATE.REJECTED;
    value = error;

    // execute all handlers
    catchHandlers.forEach((handler) => handler(value));
  };

  // In order to chain callbacks .then() method needs to return an instance of a Promise (CustomPromise)
  // and pass the result of the callback to the resolve() method to asign a value to the new Promise and execute handlers
  this.then = (callback: (args?: any) => any) => {
    return new CustomPromise((resolve, reject) => {
      const handleResolve = (resolvedValue) => {
        try {
          const result = callback(resolvedValue);
          if (result instanceof (CustomPromise as any)) {
            result.then(resolve).catch(reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      };

      if (state === PROMISE_STATE.FULFILLED) {
        // if the promise is resolved execute the handler
        handleResolve(value);
      } else {
        // if the promise is still pending queue the handler to execute later
        successHandlers.push(handleResolve);
      }
    });
  };

  this.catch = (callback: (args?: any) => any) => {
    return new CustomPromise((resolve, reject) => {
      const handleReject = (errorValue) => {
        try {
          const result = callback(errorValue);
          if (result instanceof (CustomPromise as any)) {
            result.then(resolve).catch(reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      };

      if (state === PROMISE_STATE.REJECTED) {
        // if the promise is resolved execute the handler
        handleReject(value);
      } else {
        // if the promise is still pending queue the handler to execute later
        catchHandlers.push(handleReject);
      }
    });
  };

  // Run the executor function passing the resolve and reject
  executor(resolve, reject);
}

const myPromise = new CustomPromise((resolve, reject) => {
  setTimeout(() => resolve("Hello World"), 1000);

  // this should never run since the promise was already resolved by this time
  setTimeout(() => reject("Failed Hello World"), 2000);
});

function incrementBy10(value: number) {
  return new CustomPromise((resolve, reject) => {
    setTimeout(() => resolve(value + 10), 1000);

    // this should never run since the promise was already resolved by this time
    setTimeout(() => reject("Failed"), 2000);
  });
}

function multiplyBy10(value: number) {
  return new CustomPromise((resolve, reject) => {
    setTimeout(() => resolve(value * 10), 2000);

    // this should never run since the promise was already resolved by this time
    setTimeout(() => reject("Failed"), 4000);
  });
}

// -------- IMPLEMENTATION --------
// This chaining doesn't like the JavaScript built-in Promise object, value is always the same
function callPromise() {
  incrementBy10(5)
    .then((value) => {
      console.log("Promise.then(): " + value);

      return multiplyBy10(value);
    })
    .then((value) => console.log("Promise.then(): " + value));
}

// As long as the object has a "then" method it can be awaited
async function callPromiseAsyncAwait() {
  const promiseResult = await incrementBy10(40);
  console.log("AsyncAwait: " + promiseResult);

  const result2 = await multiplyBy10(promiseResult);
  console.log("AsyncAwait: " + result2);
}

console.log("First");
callPromise();
callPromiseAsyncAwait();
console.log("Second");
