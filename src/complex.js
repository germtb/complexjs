
export function isEuler(c) {
  return 're' in c || 'im' in c;
}

export function isPolar(c) {
  return 'r' in c && 'arg' in c;
}

export function re(c) {
  return isEuler(c) ? re_euler(c) : re_polar(c);
}

export function re_euler(c) {
  return c.re ? c.re : 0;
}

export function re_polar(c) {
  return c.r * Math.cos(c.arg);
}

export function im(c) {
  return isEuler(c) ? im_euler(c) : im_polar(c);
}

export function im_euler(c) {
  return c.im ? c.im : 0;
}

export function im_polar(c) {
  return c.r * Math.sin(c.arg);
}

export function csum(c1, c2) {
  return isEuler(c1) ? csum_euler(c1, toEuler(c2)) : csum_polar(c1, toPolar(c2));
}

export function csum_euler(c1, c2) {
  return {
    ...c2, ...c1,
    re: re(c1) + re(c2),
    im: im(c1) + im(c2)
  }
}

export function csum_polar(c1, c2) {
  return {
    ...c2, ...c1,
    ...toPolar({re: re(c1) + re(c2), im: im(c1) + im(c2)})
  }
}

export function csub(c1, c2) {
  return isEuler(c1) ? csub_euler(c1, toEuler(c2)) : csub_polar(c1, toPolar(c2));
}

export function csub_euler(c1, c2) {
  return {
    ...c2, ...c1,
    re: re(c1) - re(c2),
    im: im(c1) - im(c2)
  }
}

export function csub_polar(c1, c2) {
  return {
    ...c2, ...c1,
    ...toPolar({
      re: re(c1) - re(c2),
      im: im(c1) - im(c2)})
  }
}

export function cmul(c1, c2) {
  return isEuler(c1) ? cmul_euler(c1, toEuler(c2)) : cmul_polar(c1, toPolar(c2));
}

export function cmul_euler(c1, c2) {
  return {
    ...c2, ...c1,
    re: re(c1) * re(c2) - im(c1) * im(c2),
    im: re(c1) * im(c2) + re(c2) * im(c1)
  }
}

export function cmul_polar(c1, c2) {
  return {
    ...c2, ...c1,
    r: c1.r * c2.r,
    arg: normalize(c1.arg + c2.arg)
  }
}

export function cdiv(c1, c2) {
  return isEuler(c1) ? cdiv_euler(c1, toEuler(c2)) : cdiv_polar(c1, toPolar(c2));
}

export function cdiv_euler(c1, c2) {
  const mul = cmul(c1, conjugate(c2));
  const mod2 = cmod2(c2);
  return {
    ...c2, ...c1,
    re: mul.re / mod2,
    im: mul.im / mod2
  }
}

export function cdiv_polar(c1, c2) {
  return {
    ...c2, ...c1,
    r: c1.r / c2.r,
    arg: normalize(c1.arg - c2.arg)
  }
}

export function cmod(c) {
  return isEuler(c) ? cmod_euler(c) : cmod_polar(c);
}

export function cmod_euler(c) {
  return Math.sqrt(re(c) * re(c) + im(c) * im(c));
}

export function cmod_polar(c) {
  return c.r;
}

export function cmod2(c) {
  return isEuler(c) ? cmod2_euler(c) : cmod2_polar(c);
}

export function cmod2_euler(c) {
  return re(c) * re(c) + im(c) * im(c);
}

export function cmod2_polar(c) {
  return c.r * c.r;
}

export function carg(c) {
  return isEuler(c) ? carg_euler(c) : carg_polar(c);
}

export function carg_euler(c) {
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
}

function normalize(a) {
  if (a > Math.PI) {
    return normalize(a - 2 * Math.PI);
  } else if (a <= - Math.PI) {
    return normalize(a + 2 * Math.PI);
  } else {
    return a;
  }
}

export function carg_polar(c) {
  return c.arg;
}

export function toEuler(c) {
  return isEuler(c) ? c : toEuler_polar(c);
}

export function toEuler_polar(c) {
  return {
    ...c,
    r: undefined,
    arg: undefined,
    re: re_polar(c),
    im: im_polar(c)
  }
}

export function toPolar(c) {
  return isEuler(c) ? toPolar_euler(c) : c;
}

export function toPolar_euler(c) {
  return {
    ...c,
    re: undefined,
    im: undefined,
    r: cmod(c),
    arg: carg(c)
  }
}

export function conjugate(c) {
  return isEuler(c) ? conjugate_euler(c) : conjugate_polar(c);
}

export function conjugate_euler(c) {
  return {
    ...c,
    re: re(c),
    im: -im(c)
  }
}

export function conjugate_polar(c) {
  return {
    ...c,
    r: c.r,
    arg: -c.arg
  }
}

export function cequals(c1, c2) {
  return isEuler(c1) ? cequals_euler(c1, toEuler(c2)) : cequals_polar(c1, toPolar(c2));
}

export function cequals_euler(c1, c2) {
  return c1.re === c2.re &&  c1.im === c2.im;
}

export function cequals_polar(c1, c2) {
  return c1.r === c2.r && c1.arg === c2.arg;
}
