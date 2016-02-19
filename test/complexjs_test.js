import {expect} from 'chai';
import {re, im, csum, csub, cmul} from '../src/complex';

describe('complexjs', () => {

  const pi = 3.14159268;
  var c1, c2, c3, c4;

  before(() => {
    c1 = {re: 1, im: 1};
    c2 = {re: 3, im: 4};
    c3 = {r: 1, theta: pi/2};
    c4 = {r: 1, theta: pi};
  });

  it('handles get real part', () => {
    const realPart = re(c1);
    expect(realPart).to.equal(1);
  });

  it('handles get complex part', () => {
    const complexPart = im(c1);
    expect(complexPart).to.equal(1);
  })

  it('handles sum', () => {
    const result = csum(c1, c2);
    expect(result.re).to.equal(4);
    expect(result.im).to.equal(5);
  });

  it('handles substract', () => {
    const result = csub(c1, c2);
    expect(result.re).to.equal(-2);
    expect(result.im).to.equal(-3);
  })

  it('handles product', () => {
    const result = cmul(c1, c2);
    expect(result.re).to.equal(-1);
    expect(result.im).to.equal(7);
  })

});
