// Proxy要更为强大一些，
// 那这个强大具体体现在Object.defineProperty只能监听到对象属性的读取或者是写入，
// 而Proxy除读写外还可以监听对象中属性的删除，对对象当中方法的调用等等。

const proxy = new Proxy(
  {
    x: 1,
    y: 2,
    z: 3,
    fn: function () {
      return this.x * this.y ** this.z;
    },
  },
  {
    get: (target, prop, receiver) => {
      switch (prop) {
        case "x":
          return target.x;
        case "y":
          return target.y;
        case "z":
          return target.z;
        case "fn":
          return target.fn;
      }
    },
    set: (target, prop, value) => {},
    apply: (target, _this, args) => {
      // Any way to observe the applies of function fn ????
    },
  }
);

console.log("x =>", proxy.x);
console.log("y =>", proxy.y);
console.log("z =>", proxy.z);
console.log(`fn(${proxy.x}*${proxy.y}**${proxy.z}) =>`, proxy.fn());
