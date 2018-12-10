const a = {b: 123, c: Math.random().toString(36).substr(2, 10)};
const d = [1, 2, 3, 4, 5]

d.forEach(i => console.log(i+ ' ' + a.c))