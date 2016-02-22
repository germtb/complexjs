import {expect} from 'chai';
import {
  vector,
  translate,
  rotate,
  scale,
  distance
} from '../src/geometry';
import {
  csum,
  cmul,
} from '../src/complex';

describe('acceptance tests', () => {

  const epsilon = 0.0001;
  const square = [
    {re: 0, im: 0},
    {re: 1, im: 0},
    {re: 1, im: 1},
    {re: 0, im: 1}
  ];
  const segment = [
    {re: 0, im: 0},
    {re: 0, im: 1}
  ];
  const c0 = {re: 1, im: 0};
  const c1 = {r: 1, arg: Math.PI / 2};

  it('handles sum between euler and polar', () => {
    const eulerPolar = csum(c0, c1);
    expect(eulerPolar.re).to.equal(1);
    expect(eulerPolar.im).to.equal(1);
    expect(eulerPolar.r).to.equal(undefined);
    expect(eulerPolar.arg).to.equal(undefined);
  });

  it('handles sum between polar and euler', () => {
    const polarEuler = csum(c1, c0);
    expect(polarEuler.r).to.equal(1);
    expect(polarEuler.arg).to.be.closeTo(0, epsilon);
    expect(polarEuler.re).to.equal(undefined);
    expect(polarEuler.im).to.equal(undefined);
  });

  it('handles product between euler and polar', () => {
    const eulerPolar = cmul(c0, c1);
    expect(eulerPolar.re).to.be.closeTo(0, epsilon);
    expect(eulerPolar.im).to.be.closeTo(1, epsilon);
    expect(eulerPolar.r).to.equal(undefined);
    expect(eulerPolar.arg).to.equal(undefined);
  });

  it('handles product between polar and euler', () => {
    const polarEuler = cmul(c1, c0);
    expect(polarEuler.r).to.equal(1, epsilon);
    expect(polarEuler.arg).to.be.closeTo(Math.PI / 2, epsilon);
    expect(polarEuler.re).to.equal(undefined);
    expect(polarEuler.im).to.equal(undefined);
  });

  it('handles chained operations', () => {
    const scaledSquare = square.map(c => scale(c, 2));
    const translatedSquare = scaledSquare.map(c => translate(c, vector(-1, -1)));
    const rotatedSquare = translatedSquare.map(c => rotate(c, Math.PI / 2));

    expect(rotatedSquare[0].re).to.be.closeTo(1, epsilon);
    expect(rotatedSquare[0].im).to.be.closeTo(-1, epsilon);

    expect(rotatedSquare[1].re).to.be.closeTo(1, epsilon);
    expect(rotatedSquare[1].im).to.be.closeTo(1, epsilon);

    expect(rotatedSquare[2].re).to.be.closeTo(-1, epsilon);
    expect(rotatedSquare[2].im).to.be.closeTo(1, epsilon);

    expect(rotatedSquare[3].re).to.be.closeTo(-1, epsilon);
    expect(rotatedSquare[3].im).to.be.closeTo(-1, epsilon);
  });

  it('keeps distance when on translation', () => {
    const d0 = distance(segment[0], segment[1]);
    const translatedSegment = segment.map(c => translate(c, vector(5, 3)));
    const _d0 = distance(translatedSegment[0], translatedSegment[1]);
    expect(d0).to.equal(_d0);
  });

  it('keeps distance when on rotation', () => {
    const d0 = distance(segment[0], segment[1]);
    const rotatedSegment = segment.map(c => rotate(c, Math.PI / 4, vector(5, 3)));
    const _d0 = distance(rotatedSegment[0], rotatedSegment[1]);
    expect(d0).to.be.closeTo(_d0, epsilon);
  });

  it('keeps proportions when on scale', () => {
    const d01 = distance(square[0], square[1]);
    const d12 = distance(square[1], square[2]);
    const p012 = d01 / d12;
    const scaledSquare = square.map(c => scale(c, 3, vector(5, 3)));
    const _d01 = distance(scaledSquare[0], scaledSquare[1]);
    const _d12 = distance(scaledSquare[1], scaledSquare[2]);
    const _p012 = _d01 / _d12;
    expect(p012).to.equal(_p012);
  });

});
