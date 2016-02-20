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
  conjugate
} from '../src/complex';

describe('complexjs', () => {

  var c1, c2, c3, c4, c5, c6, c7, c8, c9, c0;

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
  });

  it('handles get real part', () => {
    const realPart = re(c1);
    expect(realPart).to.equal(1);
  });

  it('handles get complex part', () => {
    const complexPart = im(c1);
    expect(complexPart).to.equal(1);
  });

  it('handles sum', () => {
    const result = csum(c1, c5);
    expect(result.re).to.equal(4);
    expect(result.im).to.equal(5);
  });

  it('handles substract', () => {
    const result = csub(c1, c5);
    expect(result.re).to.equal(-2);
    expect(result.im).to.equal(-3);
  });

  it('handles product', () => {
    const result = cmul(c1, c5);
    expect(result.re).to.equal(-1);
    expect(result.im).to.equal(7);
  });

  it('handles get modulus', () => {
    const result = cmod(c1);
    expect(result).to.equal(Math.sqrt(2));
  });

  it('handles get arg in the first quadrant', () => {
    const result = carg(c1);
    expect(result).to.equal(Math.PI / 4);
  });

  it('handles get arg in the second quadrant', () => {
    const result = carg(c2);
    expect(result).to.equal(3 * Math.PI / 4);
  });

  it('handles get arg in the third quadrant', () => {
    const result = carg(c3);
    expect(result).to.equal(- 3 * Math.PI / 4);
  });

  it('handles get arg in the fourth quadrant', () => {
    const result = carg(c4);
    expect(result).to.equal(- Math.PI / 4);
  });

  it('handles get between the forth and first quadrant', () => {
    const result = carg(c6);
    expect(result).to.equal(0);
  });

  it('handles get between the first and second quadrant', () => {
    const result = carg(c7);
    expect(result).to.equal(Math.PI / 2);
  });

  it('handles get between the second and third quadrant', () => {
    const result = carg(c8);
    expect(result).to.equal(- Math.PI);
  });

  it('handles get between the third and forth quadrant', () => {
    const result = carg(c9);
    expect(result).to.equal(- Math.PI / 2);
  });

  it('handles conversion to polar', () => {
    const result = toPolar(c1);
    expect(result.r).to.equal(Math.sqrt(2));
    expect(result.arg).to.equal(Math.PI / 4);
  })

  it('handles get conjugate', () => {
    const result = conjugate(c1);
    expect(result.re).to.equal(1);
    expect(result.im).to.equal(-1);
  });

});
