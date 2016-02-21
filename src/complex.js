
export const isEuler = function(c) {
  return 're' in c || 'im' in c;
}

export const isPolar = function(c) {
  return 'r' in c && 'arg' in c;
}

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
  return {
    re: re(c1) * re(c2) - im(c1) * im(c2),
    im: re(c1) * im(c2) + re(c2) * im(c1)
  };
}

export const cdiv = function(c1, c2) {
  const mod = cmod2(c2);
  const mul = cmul(c1, conjugate(c2));
  return {
    re: mul.re / mod,
    im: mul.im / mod
  };
}

export const cmod = function(c) {
  return Math.sqrt(re(c) * re(c) + im(c) * im(c));
}

export const cmod2 = function(c) {
  return re(c) * re(c) + im(c) * im(c);
}

export const carg = function(c) {
  const x = re(c);
  const y = im(c);

  if ( y == 0) {
    return x > 0 ? 0 : - Math.PI;
  } else if (x == 0) {
    return y > 0 ? Math.PI / 2 : - Math.PI / 2;
  }

  const arg = Math.atan2(x, y);

  if (x > 0 && y > 0) {
    return arg;
  } else if (x < 0 && y > 0) {
    return arg + Math.PI;
  } else if (x < 0 && y < 0) {
    return arg;
  } else if (x > 0 && y < 0) {
    return arg - Math.PI;
  }
}

export const toPolar = function(c) {
  return {
    r: cmod(c),
    arg: carg(c)
  };
}

export const conjugate = function(c) {
  return {
    re: re(c),
    im: -im(c)
  }
}
