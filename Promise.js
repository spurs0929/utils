// 根據PromiseA+重寫Promise
const isFunction = value => typeof value === "function";
class MyPromise {
  constructor(executor) {
    // 初始化參數
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;

    // 收集所有成功的回調函數
    this.onFulfilledCallbacks = [];
    // 收集所有失敗的回調函數
    this.onRejectedCallbacks = [];

    // 定義resolve函數
    let resolve = value => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        // 發布
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };
    // 定義reject函數
    let reject = reason => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        // 發布
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    // 使用try catch捕獲throw new Error時拋出的異常
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // x可以是任何JavaScript的合法值或Promise
  then(onFulfilled, onRejected) {
    // 給onFulfilled和onRejected預設值(Promise A+ 2.2.1)
    onFulfilled = isFunction(onFulfilled) ? onFulfilled : data => data;
    onRejected = isFunction(onRejected)
      ? onRejected
      : err => {
          throw err;
        };

    const p2 = new MyPromise((resolve, reject) => {
      let x;
      if (this.state === "fulfilled") {
        setTimeout(() => {
          try {
            x = onFulfilled(this.value);
            //resolve(x);
            resolvePromise(p2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }

      if (this.state === "rejected") {
        setTimeout(() => {
          try {
            x = onRejected(this.reason);
            resolvePromise(p2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }

      // 處理Promise內有非同步程式
      if (this.state === "pending") {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              x = onFulfilled(this.value);
              resolvePromise(p2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              x = onRejected(this.reason);
              resolvePromise(p2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });
      }
    });

    return p2;
  }
}

function resolvePromise(p2, x, resolve, reject) {
  // 判斷成功回調函數/失敗回調函數是否被調用(Promise A+ 2.3.3.3.3.)
  let called;
  
  // Promise A+ 2.3.1.
  if (p2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise #<MyPromise>"));
  }

  // Promise A+ 2.3.3.  
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    try {
      // Promise A+ 2.3.3.1.
      let then = x.then; // 可能拋出錯誤
      
      // Promise A+ 2.3.3.3.
      if (typeof then === "function") {
        // Promise A+ 2.3.3.3.1.
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(p2, y, resolve, reject);
          },
          // Promise A+ 2.3.3.3.2. 
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        if (called) return;
        called = true;
        // Promise A+ 2.3.3.4.
        resolve(x);
      }
    } catch (err) {
      if (called) return;
      called = true;
      // Promise A+ 2.3.3.2.
      reject(err);
    }
  } else {
    // Promise A+ 2.3.4.
    resolve(x);
  }
}