import {
  csum,
  cmul,
  csub,
  cmod
} from './complex';

export function translate(c, translation) {
  return csum(c, translation);
}

export function scale(c, factor, pivot = undefined) {
  return pivot ?
    csum(cmul(csub(c, pivot), {re: factor}), pivot) :
    cmul(c, {re: factor});
}

export function rotate(c, delta, pivot = undefined) {
  return pivot ?
    csum(cmul(csub(c, pivot), {r: 1, arg: delta }), pivot) :
    cmul(c, {r: 1, arg: delta });
}

export function distance(c1, c2) {
  return cmod(csub(c1, c2));
}

export function vector(x, y) {
  return {
    re: x,
    im: y
  };
}
