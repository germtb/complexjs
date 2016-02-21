import {expect} from 'chai';
import {
  isPolar,
  isEuler
} from '../src/complex';

describe('complexjs', () => {

  var complexEuler;
  var complexPolar;

  before(() => {
    complexEuler = {re: 1, im: 1};
    complexPolar = {r: 1, arg: 0};
  });

  it('handles is polar', () => {
    expect(isPolar(complexEuler)).to.equal(false);
    expect(isPolar(complexPolar)).to.equal(true);
  });

  it('handles is euler', () => {
    expect(isEuler(complexEuler)).to.equal(true);
    expect(isEuler(complexPolar)).to.equal(false);
  });

});
