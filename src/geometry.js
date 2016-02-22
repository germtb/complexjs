import {
  csum,
  cmul,
  csub,
  cmod
} from './complex';

export const translate = function(c, translation) {
  return csum(c, translation);
};

export const scale = function(c, factor, pivot = undefined) {
  return pivot ?
    csum(cmul(csub(c, pivot), {re: factor}), pivot) :
    cmul(c, {re: factor});
};

export const rotate = function(c, delta, pivot = undefined) {
  return pivot ?
    csum(cmul(csub(c, pivot), {r: 1, arg: delta }), pivot) :
    cmul(c, {r: 1, arg: delta });
};

export const distance = function(c1, c2) {
  return cmod(csub(c1, c2));
};

export const vector = function(x, y) {
  return {
    re: x,
    im: y
  };
};
