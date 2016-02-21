
export const isEuler = function(c) {
  return 're' in c || 'im' in c;
};

export const isPolar = function(c) {
  return 'r' in c && 'arg' in c;
};

export const re = function(c) {
  return isEuler(c) ? re_euler(c) : re_polar(c);
};

export const re_euler = function(c) {
  return c.re ? c.re : 0;
};

export const re_polar = function(c) {
  return c.r * Math.cos(c.arg);
};

export const im = function(c) {
  return isEuler(c) ? im_euler(c) : im_polar(c);
};

export const im_euler = function(c) {
  return c.im ? c.im : 0;
};

export const im_polar = function(c) {
  return c.r * Math.sin(c.arg);
};

export const csum = function(c1, c2) {
  return isEuler(c1) ? csum_euler(c1, toEuler(c2)) : csum_polar(c1, toPolar(c2));
};

export const csum_euler = function(c1, c2) {
  return Object.assign({}, c1, c2, {
    re: re(c1) + re(c2),
    im: im(c1) + im(c2)
  });
};

export const csum_polar = function(c1, c2) {
  return toPolar({
    re: re(c1) + re(c2),
    im: im(c1) + im(c2)
  });
};

export const csub = function(c1, c2) {
  return isEuler(c1) ? csub_euler(c1, toEuler(c2)) : csub_polar(c1, toPolar(c2));
};

export const csub_euler = function(c1, c2) {
  return Object.assign({}, c1, c2, {
    re: re(c1) - re(c2),
    im: im(c1) - im(c2)
  });
};

export const csub_polar = function(c1, c2) {
  return toPolar({
    re: re(c1) - re(c2),
    im: im(c1) - im(c2)
  });
};

export const cmul = function(c1, c2) {
  return isEuler(c1) ? cmul_euler(c1, toEuler(c2)) : cmul_polar(c1, toPolar(c2));
};

export const cmul_euler = function(c1, c2) {
  return Object.assign({}, c1, c2, {
    re: re(c1) * re(c2) - im(c1) * im(c2),
    im: re(c1) * im(c2) + re(c2) * im(c1)
  });
};

export const cmul_polar = function(c1, c2) {
  return {
    r: c1.r * c2.r,
    arg: normalize(c1.arg + c2.arg)
  };
};

export const cdiv = function(c1, c2) {
  return isEuler(c1) ? cdiv_euler(c1, toEuler(c2)) : cdiv_polar(c1, toPolar(c2));
};

export const cdiv_euler = function(c1, c2) {
  const mul = cmul(c1, conjugate(c2));
  const mod2 = cmod2(c2);
  return Object.assign({}, c1, c2, {
    re: mul.re / mod2,
    im: mul.im / mod2
  });
};

export const cdiv_polar = function(c1, c2) {
  return {
    r: c1.r / c2.r,
    arg: normalize(c1.arg - c2.arg)
  };
};

export const cmod = function(c) {
  return isEuler(c) ? cmod_euler(c) : cmod_polar(c);
};

export const cmod_euler = function(c) {
  return Math.sqrt(re(c) * re(c) + im(c) * im(c));
};

export const cmod_polar = function(c) {
  return c.r;
};

export const cmod2 = function(c) {
  return isEuler(c) ? cmod2_euler(c) : cmod2_polar(c);
};

export const cmod2_euler = function(c) {
  return re(c) * re(c) + im(c) * im(c);
};

export const cmod2_polar = function(c) {
  return c.r * c.r;
};

export const carg = function(c) {
  return isEuler(c) ? carg_euler(c) : carg_polar(c);
};

export const carg_euler = function(c) {
  const x = re(c);
  const y = im(c);

  if ( y === 0) {
    return x > 0 ? 0 : Math.PI;
  } else if (x === 0) {
    return y > 0 ? Math.PI / 2 : - Math.PI / 2;
  }

  const arg = Math.atan2(x, y);

  if (x >= 0 && y >= 0) {
    return normalize(arg);
  } else if (x < 0 && y > 0) {
    return normalize(arg + Math.PI);
  } else if (x <= 0 && y <= 0) {
    return normalize(arg);
  } else if (x > 0 && y < 0) {
    return normalize(arg - Math.PI);
  }
};

const normalize = function(a) {
  if (a > Math.PI) {
    return normalize(a - 2 * Math.PI);
  } else if (a <= - Math.PI) {
    return normalize(a + 2 * Math.PI);
  } else {
    return a;
  }
};

export const carg_polar = function(c) {
  return c.arg;
};

export const toEuler = function(c) {
  return isEuler(c) ? c : toEuler_polar(c);
};

export const toEuler_polar = function(c) {
  return {
    re: re_polar(c),
    im: im_polar(c)
  };
};

export const toPolar = function(c) {
  return isEuler(c) ? toPolar_euler(c) : c;
};

export const toPolar_euler = function(c) {
  return Object.assign({}, c, {
    r: cmod(c),
    arg: carg(c)
  });
};

export const conjugate = function(c) {
  return isEuler(c) ? conjugate_euler(c) : conjugate_polar(c);
};

export const conjugate_euler = function(c) {
  return Object.assign({}, c, {
    re: re(c),
    im: -im(c)
  });
};

export const conjugate_polar = function(c) {
  return {
    r: c.r,
    arg: -c.arg
  };
};

export const cequals = function(c1, c2) {
  return isEuler(c1) ? cequals_euler(c1, toEuler(c2)) : cequals_polar(c1, toPolar(c2));
};

export const cequals_euler = function(c1, c2) {
  return c1.re === c2.re &&  c1.im === c2.im;
};

export const cequals_polar = function(c1, c2) {
  return c1.r === c2.r && c1.arg === c2.arg;
};