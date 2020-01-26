"use strict";

var foo;
console.log(typeof(foo));
foo = "hello";
console.log(typeof(foo));
foo = 3;
console.log(typeof(foo));
foo = 3.14;
console.log(typeof(foo));
foo = [3.14, 3, 17];
console.log(typeof(foo));
foo = true;
console.log(typeof(foo));
var bar = null;
console.log("Type of bar is " + typeof bar);
var arr = [];
console.log(typeof arr);