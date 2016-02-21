import {expect} from 'chai';
import {
  isPolar,
  isEuler,
  cequals
} from '../src/complex';

describe('form manipilation', () => {

  var c0, c1, c2;

  before(() => {
    c0 = {re: 1, im: 1};
    c1 = {r: 1, arg: 0};
    c2 = {re: 1, im:0};
  });

  it('handles is polar', () => {
    expect(isPolar(c0)).to.equal(false);
    expect(isPolar(c1)).to.equal(true);
  });

  it('handles is euler', () => {
    expect(isEuler(c0)).to.equal(true);
    expect(isEuler(c1)).to.equal(false);
  });

  it('handles equals', () => {
    expect(cequals(c1, c2)).to.equals(true);
  });

});
