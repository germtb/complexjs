'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.isCartesian = isCartesian;
exports.isPolar = isPolar;
exports.re = re;
exports.re_cartesian = re_cartesian;
exports.re_polar = re_polar;
exports.im = im;
exports.im_cartesian = im_cartesian;
exports.im_polar = im_polar;
exports.csum = csum;
exports.csum_cartesian = csum_cartesian;
exports.csum_polar = csum_polar;
exports.csub = csub;
exports.csub_cartesian = csub_cartesian;
exports.csub_polar = csub_polar;
exports.cmul = cmul;
exports.cmul_cartesian = cmul_cartesian;
exports.cmul_polar = cmul_polar;
exports.cdiv = cdiv;
exports.cdiv_cartesian = cdiv_cartesian;
exports.cdiv_polar = cdiv_polar;
exports.cmod = cmod;
exports.cmod_cartesian = cmod_cartesian;
exports.cmod_polar = cmod_polar;
exports.cmod2 = cmod2;
exports.cmod2_cartesian = cmod2_cartesian;
exports.cmod2_polar = cmod2_polar;
exports.carg = carg;
exports.carg_cartesian = carg_cartesian;
exports.carg_polar = carg_polar;
exports.toCartesian = toCartesian;
exports.toCartesian_polar = toCartesian_polar;
exports.toPolar = toPolar;
exports.toPolar_cartesian = toPolar_cartesian;
exports.conjugate = conjugate;
exports.conjugate_cartesian = conjugate_cartesian;
exports.conjugate_polar = conjugate_polar;
exports.cequals = cequals;
exports.cequals_cartesian = cequals_cartesian;
exports.cequals_polar = cequals_polar;
function isCartesian(c) {
  return 're' in c || 'im' in c;
}

function isPolar(c) {
  return 'r' in c && 'arg' in c;
}

function re(c) {
  return isCartesian(c) ? re_cartesian(c) : re_polar(c);
}

function re_cartesian(c) {
  return c.re ? c.re : 0;
}

function re_polar(c) {
  return c.r * Math.cos(c.arg);
}

function im(c) {
  return isCartesian(c) ? im_cartesian(c) : im_polar(c);
}

function im_cartesian(c) {
  return c.im ? c.im : 0;
}

function im_polar(c) {
  return c.r * Math.sin(c.arg);
}

function csum(c1, c2) {
  return isCartesian(c1) ? csum_cartesian(c1, toCartesian(c2)) : csum_polar(c1, toPolar(c2));
}

function csum_cartesian(c1, c2) {
  return _extends({}, c2, c1, {
    re: re(c1) + re(c2),
    im: im(c1) + im(c2)
  });
}

function csum_polar(c1, c2) {
  return _extends({}, c2, c1, toPolar({ re: re(c1) + re(c2), im: im(c1) + im(c2) }));
}

function csub(c1, c2) {
  return isCartesian(c1) ? csub_cartesian(c1, toCartesian(c2)) : csub_polar(c1, toPolar(c2));
}

function csub_cartesian(c1, c2) {
  return _extends({}, c2, c1, {
    re: re(c1) - re(c2),
    im: im(c1) - im(c2)
  });
}

function csub_polar(c1, c2) {
  return _extends({}, c2, c1, toPolar({
    re: re(c1) - re(c2),
    im: im(c1) - im(c2) }));
}

function cmul(c1, c2) {
  return isCartesian(c1) ? cmul_cartesian(c1, toCartesian(c2)) : cmul_polar(c1, toPolar(c2));
}

function cmul_cartesian(c1, c2) {
  return _extends({}, c2, c1, {
    re: re(c1) * re(c2) - im(c1) * im(c2),
    im: re(c1) * im(c2) + re(c2) * im(c1)
  });
}

function cmul_polar(c1, c2) {
  return _extends({}, c2, c1, {
    r: c1.r * c2.r,
    arg: normalize(c1.arg + c2.arg)
  });
}

function cdiv(c1, c2) {
  return isCartesian(c1) ? cdiv_cartesian(c1, toCartesian(c2)) : cdiv_polar(c1, toPolar(c2));
}

function cdiv_cartesian(c1, c2) {
  var mul = cmul(c1, conjugate(c2));
  var mod2 = cmod2(c2);
  return _extends({}, c2, c1, {
    re: mul.re / mod2,
    im: mul.im / mod2
  });
}

function cdiv_polar(c1, c2) {
  return _extends({}, c2, c1, {
    r: c1.r / c2.r,
    arg: normalize(c1.arg - c2.arg)
  });
}

function cmod(c) {
  return isCartesian(c) ? cmod_cartesian(c) : cmod_polar(c);
}

function cmod_cartesian(c) {
  return Math.sqrt(re(c) * re(c) + im(c) * im(c));
}

function cmod_polar(c) {
  return c.r;
}

function cmod2(c) {
  return isCartesian(c) ? cmod2_cartesian(c) : cmod2_polar(c);
}

function cmod2_cartesian(c) {
  return re(c) * re(c) + im(c) * im(c);
}

function cmod2_polar(c) {
  return c.r * c.r;
}

function carg(c) {
  return isCartesian(c) ? carg_cartesian(c) : carg_polar(c);
}

function carg_cartesian(c) {
  var x = re(c);
  var y = im(c);

  if (y === 0) {
    return x > 0 ? 0 : Math.PI;
  } else if (x === 0) {
    return y > 0 ? Math.PI / 2 : -Math.PI / 2;
  }

  var arg = Math.atan2(x, y);

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
  } else if (a <= -Math.PI) {
    return normalize(a + 2 * Math.PI);
  } else {
    return a;
  }
}

function carg_polar(c) {
  return c.arg;
}

function toCartesian(c) {
  return isCartesian(c) ? c : toCartesian_polar(c);
}

function toCartesian_polar(c) {
  return _extends({}, c, {
    r: undefined,
    arg: undefined,
    re: re_polar(c),
    im: im_polar(c)
  });
}

function toPolar(c) {
  return isCartesian(c) ? toPolar_cartesian(c) : c;
}

function toPolar_cartesian(c) {
  return _extends({}, c, {
    re: undefined,
    im: undefined,
    r: cmod(c),
    arg: carg(c)
  });
}

function conjugate(c) {
  return isCartesian(c) ? conjugate_cartesian(c) : conjugate_polar(c);
}

function conjugate_cartesian(c) {
  return _extends({}, c, {
    re: re(c),
    im: -im(c)
  });
}

function conjugate_polar(c) {
  return _extends({}, c, {
    r: c.r,
    arg: -c.arg
  });
}

function cequals(c1, c2) {
  return isCartesian(c1) ? cequals_cartesian(c1, toCartesian(c2)) : cequals_polar(c1, toPolar(c2));
}

function cequals_cartesian(c1, c2) {
  return c1.re === c2.re && c1.im === c2.im;
}

function cequals_polar(c1, c2) {
  return c1.r === c2.r && c1.arg === c2.arg;
}

