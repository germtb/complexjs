# complexjs

This is a library for complex numbers calculations in javascript using plain objects immutably.

It has been designed to be used for geometry applications, for which a little API has been included.

## Complex number calculations

Creating a complex number is as simples as this:

```javascript
// Cartesian form
const c_cartesian = {
  re: 1,
  im; 0
};

// Polar form
const c_polar = {
  r: 1,
  arg: Math.PI / 2
};
```
Both forms can be mixed, and the form of the first number will be preserved:

```javascript
csum(c_cartesian, c_polar); // => {re: 1, im: 1}
csum(c_polar, c_cartesian); // => {r: 1.414, arg: 0.785}
```

All the basic functions are provided. All of them are pure functions:

```javascript
cmul(c_cartesian, c_polar); // => {re: 0, im: 1}
cdiv(c_cartesian, c_polar); // => {re: 0, im: -1}
cmod(c_cartesian); // => 1
conjugate(c_polar); // => {r: 1, arg: - 1.5707}
```

## Using plain objects

The API is designed so that any object can be passed to the functions, and any property other than `re` and `im` (or `r` and `arg`) will remain unchanged. This can be useful to compose plain objects.

```javascript
const c_object = {
  rgb: [255, 255, 255],
  re: 1,
  im: 1
};

const c_number = {
  re: 5,
  im: -1
};

csum(c_object, c_number) // => {rgb: [255, 255, 255], re: 6, im: 0}
```

In case both objects have properties, they will be merged. The first parameter will override the second one if the have a property with the same name.

## Geometry applications

Complex numbers serve as an elegant representation of 2d geometry. To make its use even simpler, some methods have been created to wrap the algebra to match its geometric meaning.

```javascript
vector(1, 2) // => {re: 1, im: 2}

const square = [
  vector(0, 0),
  vector(1, 0),
  vector(1, 1),
  vector(0, 1)
];

const scaledSquare = square.map(c => scale(c, 2));
const translatedSquare = scaledSquare.map(c => translate(c, vector(-1, -1)));
const rotatedSquare = translatedSquare.map(c => rotate(c, Math.PI / 2));

// => [
//   vector(1, -1),
//   vector(1, 1),
//   vector(-1, 1),
//   vector(-1, -1)
// ];

```
