import {expect} from 'chai';
import {
  re,
  im,
  csum,
  csub,
  cmul,
  rmul,
  cmod,
  cmod2,
  cdiv,
  cpow,
  carg,
  toPolar,
  conjugate,
  lerp
} from '../src/complex';

describe('cartesian form', () => {

  const epsilon = 0.0001;
  var c0, c1, c2, c3, c4, c5, c6, c7, c8;

  before(() => {
    c0 = {re: 3, im: 4};

    c1 = {re: 1, im: 1};
    c2 = {re: -1, im: 1};
    c3 = {re: -1, im: -1};
    c4 = {re: 1, im: -1};


    c5 = {re: 1, im: 0};
    c6 = {re: 0, im: 1};
    c7 = {re: -1, im: 0};
    c8 = {re: 0, im: -1};
  });

  it('handles get real part', () => {
    expect(re(c1)).to.equal(1);
  });

  it('handles get complex part', () => {
    expect(im(c1)).to.equal(1);
  });

  it('handles sum', () => {
    expect(csum(c1, c0)).to.deep.equal({re: 4, im: 5});
  });

  it('handles substract', () => {
    expect(csub(c1, c0)).to.deep.equal({re: -2, im: -3});
  });

  it('handles product', () => {
    expect(cmul(c1, c0)).to.deep.equal({re: -1, im: 7});
  });

  it('handles product with a real number', () => {
    expect(rmul(c1, 2)).to.deep.equal({re: 2, im: 2});
  });

  it('handles division', () => {
    expect(cdiv(c1, c0)).to.deep.equal({re: 7/25, im: -1/25});
  });

  it('handles power', () => {
    expect(cpow(c6, 2).re).to.be.closeTo(-1, epsilon);
    expect(cpow(c6, 2).im).to.be.closeTo(0, epsilon);
  });

  it('handles get modulus', () => {
    expect(cmod(c1)).to.equal(Math.sqrt(2));
  });

  it('handles get modulus square', () => {
    expect(cmod2(c1)).to.equal(2);
  });

  it('handles get arg in the first quadrant', () => {
    expect(carg(c1)).to.equal(Math.PI / 4);
  });

  it('handles get arg in the second quadrant', () => {
    expect(carg(c2)).to.equal(3 * Math.PI / 4);
  });

  it('handles get arg in the third quadrant', () => {
    expect(carg(c3)).to.equal(- 3 * Math.PI / 4);
  });

  it('handles get arg in the fourth quadrant', () => {
    expect(carg(c4)).to.equal(- Math.PI / 4);
  });

  it('handles get between the forth and first quadrant', () => {
    expect(carg(c5)).to.equal(0);
  });

  it('handles get between the first and second quadrant', () => {
    expect(carg(c6)).to.equal(Math.PI / 2);
  });

  it('handles get between the second and third quadrant', () => {
    expect(carg(c7)).to.equal(Math.PI);
  });

  it('handles get between the third and forth quadrant', () => {
    expect(carg(c8)).to.equal(- Math.PI / 2);
  });

  it('handles conversion to polar', () => {
    expect(toPolar(c1).r).to.equal(Math.sqrt(2));
    expect(toPolar(c1).arg).to.equal(Math.PI / 4);
  });

  it('handles get conjugate', () => {
    expect(conjugate(c1)).to.deep.equal({re: 1, im: -1});
  });

  it('handles lerp', () => {
    expect(lerp(c5, c6, 0.5).re).to.equal(0.5);
    expect(lerp(c5, c6, 0.5).im).to.equal(0.5);
  });

});
