import {
  csum,
  cmul,
  csub,
  cmod
} from './complex';

export const translate = function(c, translation) {
  return csum(c, translation);
};

export const scale = function(c, factor) {
  return cmul(c, {re: factor});
};

export const rotate = function(c, delta, pivot = {re: 0, im: 0}) {
  c = csub(c, pivot);
  c = cmul(c, {r: 1, arg: delta });
  c = csum(c, pivot);
  return c;
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
