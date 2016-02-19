
export const re = function(c) {
  return c.re ? c.re : 0;
}

export const im = function(c) {
  return c.im ? c.im : 0;
}

export const csum = function(c1, c2) {
  return {re: re(c1) + re(c2), im: im(c1) + im(c2)};
}

export const csub = function(c1, c2) {
  return {re: re(c1) - re(c2), im: im(c1) - im(c2)};
}

export const cmul = function(c1, c2) {
  return {re: re(c1) * re(c2) - im(c1) * im(c2), im: re(c1) * im(c2) + re(c2) * im(c1)};
}

export const cmod = function(c) {
  return Math.sqrt(re(c) * re(c) + im(c) * im(c));
}

export const carg = function(c) {
  return Math.atan(re(c) / im(c));
}

export const toPolar = function(c) {
  return {
    r: cmod(c),
    arg: carg(c)
  };
}
