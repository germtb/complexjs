import {expect} from 'chai';
import {
  vector,
  translate,
  scale,
  rotate,
  distance
} from '../src/complex';

describe('cartesian form', () => {

  const epsilon = 0.0001;

  var c1, c2, c3;

  before(() => {
    c1 = vector(1, 1);
    c2 = vector(-1, 1);
    c3 = vector(0, 1);
  });

  it('handles create vector', () => {
    expect(vector(0, 2)).to.deep.equal({
      re: 0,
      im: 2
    });
  });

  it('handles translation', () => {
    expect(translate(c1, c2)).to.deep.equal(vector(0, 2));
  });

  it('handles scaling around center', () => {
    expect(scale(c1, 2)).to.deep.equal(vector(2, 2));
  });

  it('handles scaling around pivot', () => {
    expect(scale(c1, 2, c1)).to.deep.equal(vector(1, 1));
  });

  it('handles rotation around center', () => {
    expect(rotate(c1, Math.PI / 2).re).to.be.closeTo(-1, epsilon);
    expect(rotate(c1, Math.PI / 2).im).to.be.closeTo(1, epsilon);
  });

  it('handles rotation around pivot', () => {
    expect(rotate(c1, Math.PI / 2, c3).re).to.be.closeTo(0, epsilon);
    expect(rotate(c1, Math.PI / 2, c3).im).to.be.closeTo(2, epsilon);
  });

  it('handles get distance', () => {
    expect(distance(c1, c3)).to.be.closeTo(1, epsilon);
  });

});
