import {expect} from 'chai';
import {
  csum,
  cmul,
  csub
} from '../src/complex';

describe('complexjs', () => {

  const epsilon = 0.0001;

  it('handles sum between euler and polar', () => {
    const c0 = {re: 1, im: 0};
    const c1 = {r: 1, arg: 0};
    expect(csum(c0, c1).re).to.equal(2);
    expect(csum(c0, c1).im).to.equal(0);
    expect(csum(c1, c0).re).to.equal(2);
    expect(csum(c1, c0).im).to.equal(0);
  });

  it('handles product between euler and polar', () => {
    const c0 = {re: 1, im: 0};
    const c1 = {r: 1, arg: Math.PI / 4};
    expect(cmul(c0, c1).re).to.be.closeTo(Math.sqrt(2) / 2, epsilon);
    expect(cmul(c0, c1).im).to.be.closeTo(Math.sqrt(2) / 2, epsilon);
    expect(cmul(c1, c0).r).to.be.closeTo(1, epsilon);
    expect(cmul(c1, c0).arg).to.be.closeTo(Math.PI / 4, epsilon);
  });

  it('handles chained operations', () => {
    const square = [
      {re: 0, im: 0},
      {re: 1, im: 0},
      {re: 1, im: 1},
      {re: 0, im: 1}
    ];
    const scaledSquare = square.map(c => cmul(c, {re: 2}));
    const rotatedSquare = scaledSquare.map(c => {
      c = csub(c, {re:2, im:2});
      c = cmul(c, {r: 1, arg: Math.PI });
      c = csum(c, {re:2, im:2});
      return c;
    });

    expect(rotatedSquare[0].re).to.be.closeTo(4, epsilon);
    expect(rotatedSquare[0].im).to.be.closeTo(4, epsilon);

    expect(rotatedSquare[1].re).to.be.closeTo(2, epsilon);
    expect(rotatedSquare[1].im).to.be.closeTo(4, epsilon);

    expect(rotatedSquare[2].re).to.be.closeTo(2, epsilon);
    expect(rotatedSquare[2].im).to.be.closeTo(2, epsilon);

    expect(rotatedSquare[3].re).to.be.closeTo(4, epsilon);
    expect(rotatedSquare[3].im).to.be.closeTo(2, epsilon);
  });

  it('asdasdas dsa sa', () => {
  });

});
