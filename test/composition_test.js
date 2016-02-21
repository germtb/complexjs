import {expect} from 'chai';
import {
  csum,
  csub,
  cmul,
  cmod,
  cmod2,
  cdiv,
  carg,
  toPolar,
  conjugate,
} from '../src/complex';

describe('composition', () => {

  var c0, c1, o0, o1, p0, p1;

  before(() => {
    o0 = {r: 255, g: 255, b: 255};
    o1 = {r: 0, g: 0, b: 0};

    c0 = {re: 3, im: 4, object: o0};
    c1 = {re: 1, im: 1, object: o1};

    p0 = {r: 1, arg: Math.PI, object: o0};
    p1 = {r: 1, arg: Math.PI / 2, object: o1};
  });

  it('is preserved for euler sum', () => {
    expect(csum(c0, c1).object).to.equal(o1);
  });

  it('is preserved for euler substract', () => {
    expect(csub(c0, c1).object).to.equal(o1);
  });

  it('is preserved for euler product', () => {
    expect(cmul(c0, c1).object).to.equal(o1);
  });

  it('is preserved for euler division', () => {
    expect(cdiv(c0, c1).object).to.equal(o1);
  });

  it('is preserved for conversion to euler polar', () => {
    expect(toPolar(c0).object).to.equal(o0);
  });

  it('is preserved for get euler conjugate', () => {
    expect(conjugate(c0).object).to.equal(o0);
  });

});
