
export function isCartesian(c) {
  return 're' in c || 'im' in c;
}

export function isPolar(c) {
  return 'r' in c && 'arg' in c;
}

export function re(c) {
  return isCartesian(c) ? re_cartesian(c) : re_polar(c);
}

export function re_cartesian(c) {
  return c.re ? c.re : 0;
}

export function re_polar(c) {
  return c.r * Math.cos(c.arg);
}

export function im(c) {
  return isCartesian(c) ? im_cartesian(c) : im_polar(c);
}

export function im_cartesian(c) {
  return c.im ? c.im : 0;
}

export function im_polar(c) {
  return c.r * Math.sin(c.arg);
}

export function csum(c1, c2) {
  return isCartesian(c1) ? csum_cartesian(c1, toCartesian(c2)) : csum_polar(c1, toPolar(c2));
}

export function csum_cartesian(c1, c2) {
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
  return isCartesian(c1) ? csub_cartesian(c1, toCartesian(c2)) : csub_polar(c1, toPolar(c2));
}

export function csub_cartesian(c1, c2) {
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
  return isCartesian(c1) ? cmul_cartesian(c1, toCartesian(c2)) : cmul_polar(c1, toPolar(c2));
}

export function cmul_cartesian(c1, c2) {
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
  return isCartesian(c1) ? cdiv_cartesian(c1, toCartesian(c2)) : cdiv_polar(c1, toPolar(c2));
}

export function cdiv_cartesian(c1, c2) {
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
  return isCartesian(c) ? cmod_cartesian(c) : cmod_polar(c);
}

export function cmod_cartesian(c) {
  return Math.sqrt(re(c) * re(c) + im(c) * im(c));
}

export function cmod_polar(c) {
  return c.r;
}

export function cmod2(c) {
  return isCartesian(c) ? cmod2_cartesian(c) : cmod2_polar(c);
}

export function cmod2_cartesian(c) {
  return re(c) * re(c) + im(c) * im(c);
}

export function cmod2_polar(c) {
  return c.r * c.r;
}

export function carg(c) {
  return isCartesian(c) ? carg_cartesian(c) : carg_polar(c);
}

export function carg_cartesian(c) {
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

export function toCartesian(c) {
  return isCartesian(c) ? c : toCartesian_polar(c);
}

export function toCartesian_polar(c) {
  return {
    ...c,
    r: undefined,
    arg: undefined,
    re: re_polar(c),
    im: im_polar(c)
  }
}

export function toPolar(c) {
  return isCartesian(c) ? toPolar_cartesian(c) : c;
}

export function toPolar_cartesian(c) {
  return {
    ...c,
    re: undefined,
    im: undefined,
    r: cmod(c),
    arg: carg(c)
  }
}

export function conjugate(c) {
  return isCartesian(c) ? conjugate_cartesian(c) : conjugate_polar(c);
}

export function conjugate_cartesian(c) {
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
  return isCartesian(c1) ? cequals_cartesian(c1, toCartesian(c2)) : cequals_polar(c1, toPolar(c2));
}

export function cequals_cartesian(c1, c2) {
  return c1.re === c2.re &&  c1.im === c2.im;
}

export function cequals_polar(c1, c2) {
  return c1.r === c2.r && c1.arg === c2.arg;
}
