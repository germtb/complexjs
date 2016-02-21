import {expect} from 'chai';
import {
  translate,
  scale,
  rotate
} from '../src/geometry';

describe('euler form', () => {

  const epsilon = 0.0001;

  var c1, c2, c3;

  before(() => {
    c1 = {re: 1, im: 1};
    c2 = {re: -1, im: 1};
    c3 = {re: 0, im: 1};
  });

  it('handles translation', () => {
    expect(translate(c1, c2)).to.deep.equal({
      re: 0,
      im: 2
    });
  });

  it('handles scaling', () => {
    expect(scale(c1, 2)).to.deep.equal({
      re: 2,
      im: 2
    });
  });

  it('handles rotation around center', () => {
    expect(rotate(c1, Math.PI / 2).re).to.be.closeTo(-1, epsilon);
    expect(rotate(c1, Math.PI / 2).im).to.be.closeTo(1, epsilon);
  });

  it('handles rotation around pivot', () => {
    expect(rotate(c1, Math.PI / 2, c3).re).to.be.closeTo(0, epsilon);
    expect(rotate(c1, Math.PI / 2, c3).im).to.be.closeTo(2, epsilon);
  });

});
