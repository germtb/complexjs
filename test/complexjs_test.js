import {expect} from 'chai';
import {
  re,
  im,
  csum,
  csub,
  cmul,
  cmod,
  carg,
  toPolar
} from '../src/complex';

describe('complexjs', () => {

  var c1, c2, c3, c4;

  before(() => {
    c1 = {re: 1, im: 1};
    c2 = {re: 3, im: 4};
    c3 = {r: 1, arg: Math.PI/2};
    c4 = {r: 1, arg: Math.PI};
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
    const result = csum(c1, c2);
    expect(result.re).to.equal(4);
    expect(result.im).to.equal(5);
  });

  it('handles substract', () => {
    const result = csub(c1, c2);
    expect(result.re).to.equal(-2);
    expect(result.im).to.equal(-3);
  });

  it('handles product', () => {
    const result = cmul(c1, c2);
    expect(result.re).to.equal(-1);
    expect(result.im).to.equal(7);
  });

  it('handles get modulus', () => {
    const result = cmod(c1);
    expect(result).to.equal(Math.sqrt(2));
  });

  it('handles get arg', () => {
    const result = carg(c1);
    expect(result).to.equal(Math.PI / 4);
  });

  it('handles conversion to polar', () => {
    const result = toPolar(c1);
    expect(result.r).to.equal(Math.sqrt(2));
    expect(result.arg).to.equal(Math.PI / 4);
  })

});
