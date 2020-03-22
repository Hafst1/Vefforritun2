require('./extensions');

// const obj = { x: 1, y: 2, z: 3 };
// console.log(obj.toArray()); // [ 1, 2, 3 ]

const obj2 = {
  x: 1,
  y: {
    z: 2,
    k: {
      m: 1,
      n: {
        p: 1
      }
    }
  }
};
console.log(obj2.flatten()); // { x: 1, z: 2, m: 1, p: 1 }

// const obj3 = {
//   a: 1,
//   b: 2,
//   c: [ 1, 2, 3, 4 ],
//   d: {
//     x: 1,
//     y: 2,
//     z: 3,
//   },
// };
// console.log(obj3.toJson()); // {"a":1,"b":2,"c":[1,2,3,4],"d":{"x":1,"y":2,"z":3}}

// console.log(obj3.containsProperty('z')); // true

// const obj5 = {
//   a: 1,
//   b: 2,
//   c: 1,
// };
// console.log(obj5.invert()); // { '1': 'c', '2': 'b' }

// const obj6 = { 'a': [{ 'b': { 'c1': 10 } }] };
// console.log(obj6.result('a[0].b.c1')); // 10
