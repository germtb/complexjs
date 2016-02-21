import {expect} from 'chai';
import {
  re,
  im,
  csum,
  csub,
  cmul,
  cmod,
  carg,
  toPolar,
  conjugate,
  isPolar,
  isEuler
} from '../src/complex';

describe('complexjs', () => {

  var c1, c2, c3, c4, c5, c6, c7, c8, c9, c0;
  var p0;

  before(() => {
    c1 = {re: 1, im: 1};
    c2 = {re: -1, im: 1};
    c3 = {re: -1, im: -1};
    c4 = {re: 1, im: -1};
    c5 = {re: 3, im: 4};

    c6 = {re: 1, im: 0};
    c7 = {re: 0, im: 1};
    c8 = {re: -1, im: 0};
    c9 = {re: 0, im: -1};
    c0 = {re: 0, im: 0};

    p0 = {r: 1, arg: 0};
  });

  it('handles get real part', () => {
    expect(re(c1)).to.equal(1);
  });

  it('handles get complex part', () => {
    expect(im(c1)).to.equal(1);
  });

  it('handles sum', () => {
    expect(csum(c1, c5)).to.deep.equal({re: 4, im: 5});
  });

  it('handles substract', () => {
    expect(csub(c1, c5)).to.deep.equal({re: -2, im: -3});
  });

  it('handles product', () => {
    expect(cmul(c1, c5)).to.deep.equal({re: -1, im: 7});
  });

  it('handles get modulus', () => {
    expect(cmod(c1)).to.equal(Math.sqrt(2));
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
    expect(carg(c6)).to.equal(0);
  });

  it('handles get between the first and second quadrant', () => {
    expect(carg(c7)).to.equal(Math.PI / 2);
  });

  it('handles get between the second and third quadrant', () => {
    expect(carg(c8)).to.equal(- Math.PI);
  });

  it('handles get between the third and forth quadrant', () => {
    expect(carg(c9)).to.equal(- Math.PI / 2);
  });

  it('handles conversion to polar', () => {
    expect(toPolar(c1)).to.deep.equal({r: Math.sqrt(2), arg: Math.PI / 4});
  })

  it('handles get conjugate', () => {
    expect(conjugate(c1)).to.deep.equal({re: 1, im: -1});
  });

  it('handles is polar', () => {
    expect(isPolar(c0)).to.equal(false);
    expect(isPolar(p0)).to.equal(true);
  });

  it('handles is euler', () => {
    expect(isEuler(c0)).to.equal(true);
    expect(isEuler(p0)).to.equal(false);
  });

});
