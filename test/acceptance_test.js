import {expect} from 'chai';
import {
  csum,
  cmul
} from '../src/complex';

describe('complexjs', () => {

  const epsilon = 0.0001;

  it('handles sum between euler and polar', () => {
    const c0 = {re: 1, im: 0};
    const c1 = {r: 1, arg: 0};
    expect(csum(c0, c1)).to.deep.equal({re: 2, im: 0});
    expect(csum(c1, c0)).to.deep.equal({r: 2, arg: 0});
  });

  it('handles product between euler and polar', () => {
    const c0 = {re: 1, im: 0};
    const c1 = {r: 1, arg: Math.PI / 4};
    expect(cmul(c0, c1).re).to.be.closeTo(Math.sqrt(2) / 2, epsilon);
    expect(cmul(c0, c1).im).to.be.closeTo(Math.sqrt(2) / 2, epsilon);
    expect(cmul(c1, c0).r).to.be.closeTo(1, epsilon);
    expect(cmul(c1, c0).arg).to.be.closeTo(Math.PI / 4, epsilon);
  });

});
