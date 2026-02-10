import { computeAverageTemperature } from '../src/services/weather.service.js';

describe('weather.service', () => {
  test('calculates average correctly', () => {
    const result = computeAverageTemperature([28, 30]);
    expect(result).toBe(29);
  });

  test('ignores invalid values', () => {
    const result = computeAverageTemperature([28, null, 30]);
    expect(result).toBe(29);
  });

  test('returns null for empty input', () => {
    const result = computeAverageTemperature([]);
    expect(result).toBeNull();
  });
});
