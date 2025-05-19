import { calculatePoints } from '../rewardUtils';

describe('calculatePoints', () => {
  it('should return 0 points for $30 (below threshold)', () => {
    expect(calculatePoints(30)).toBe(0);
  });

  it('should return 20 points for $70 (between 50 and 100)', () => {
    expect(calculatePoints(70)).toBe(20);
  });

  it('should return 90 points for $120 (above 100)', () => {
    expect(calculatePoints(120)).toBe(90);
  });

  it('should return 0 points for $49.99 (fractional under 50)', () => {
    expect(calculatePoints(49.99)).toBe(0);
  });

  it('should return 90 for $120.75 (fractional above 100)', () => {
    expect(calculatePoints(120.75)).toBe(91);
  });

  it('should return correct points for exactly $50', () => {
    expect(calculatePoints(50)).toBe(0);
  });

  it('should return 50 for exactly $100', () => {
    expect(calculatePoints(100)).toBe(50);
  });

  it('should return 1 for $51', () => {
    expect(calculatePoints(51)).toBe(1);
  });

  it('should return 52 for $101', () => {
    expect(calculatePoints(101)).toBe(52);
  });
});
