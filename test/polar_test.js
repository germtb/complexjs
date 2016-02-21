import {expect} from 'chai';
import {
  re,
  im,
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

describe('polar form', () => {

  var c0, c1, c2, c3, c4, c5, c6, c7, c8;
  const epsilon = 0.0001;

  before(() => {
    c0 = {r: 3, arg: Math.PI / 2};

    c1 = {r: 1, arg:  Math.PI / 4};
    c2 = {r: 1, arg:  3 * Math.PI / 4};
    c3 = {r: 1, arg: - 3 * Math.PI / 4};
    c4 = {r: 1, arg: - Math.PI / 4};
    c5 = {r: 1, arg: 0};
    c6 = {r: 1, arg:  Math.PI / 2};
    c7 = {r: 1, arg: Math.PI};
    c8 = {r: 1, arg: - Math.PI / 2};
  });

  it('handles get real part', () => {
    expect(re(c1)).to.be.closeTo(Math.sqrt(2) / 2, epsilon);
  });

  it('handles get complex part', () => {
    expect(im(c1)).to.be.closeTo(Math.sqrt(2) / 2, epsilon);
  });

  it('handles sum', () => {
    expect(csum(c1, c2).r).to.be.closeTo(Math.sqrt(2), epsilon);
    expect(csum(c1, c2).arg).to.be.closeTo(Math.PI / 2, epsilon);
  });

  it('handles substract', () => {
    expect(csub(c1, c2).r).to.be.closeTo(Math.sqrt(2), epsilon);
    expect(csub(c1, c2).arg).to.be.closeTo(Math.PI, epsilon);
  });

  it('handles product', () => {
    expect(cmul(c1, c0)).to.deep.equal({r: 3, arg: 3 * Math.PI / 4});
  });

  it('handles division', () => {
    expect(cdiv(c1, c0)).to.deep.equal({r: 1/3, arg: - Math.PI / 4});
  });

  it('handles get modulus', () => {
    expect(cmod(c1)).to.equal(1);
  });

  it('handles get modulus square', () => {
    expect(cmod2(c1)).to.equal(1);
  });

  it('handles get arg in the first quadrant', () => {
    expect(carg(c1)).to.equal(Math.PI / 4);
  });

  it('handles get arg in the second quadrant', () => {
    expect(carg(c2)).to.equal(3 * Math.PI / 4);
  });

  it('handles get arg in the third quadrant', () => {
    expect(carg(c3)).to.be.closeTo(- 3 * Math.PI / 4, epsilon);
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
    expect(toPolar(c1)).to.deep.equal(c1);
  })

  it('handles get conjugate', () => {
    expect(conjugate(c1)).to.deep.equal({r: 1, arg:  - Math.PI / 4});
  });

});
