import { jest } from '@jest/globals';

// mock before any imports to register the mocks before subbing with the real modules
jest.unstable_mockModule('../src/services/geocode.service.js', () => ({
  geocodeCity: jest.fn()
}));

jest.unstable_mockModule('../src/services/weather.service.js', () => ({
  getAverageTemperature: jest.fn()
}));

// dynamic imports to work with ESM and jest after mocking then load modules instead of static imports where its loaded before mocks
const { geocodeCity } = await import('../src/services/geocode.service.js');
const { getAverageTemperature } = await import('../src/services/weather.service.js');
const { getAverageWeather } = await import('../src/controllers/weather.controller.js');
const { AppError } = await import('../src/utils/errors.js');


// import { getAverageWeather } from '../src/controllers/weather.controller.js';
// import { AppError } from '../src/utils/errors.js';
// import { geocodeCity } from '../src/services/geocode.service.js';
// import { getAverageTemperature } from '../src/services/weather.service.js';


// // mock services //doesnt work cs jest uses comonjs by default and we're using esm
// jest.mock('../src/services/geocode.service.js', () => ({
//   geocodeCity: jest.fn()
// }));

// jest.mock('../src/services/weather.service.js', () => ({
//   getAverageTemperature: jest.fn()
// }));

// helper to fake response object
function mockRes() {
  return {
    json: jest.fn(),
    status: jest.fn().mockReturnThis()
  };
}

describe('weather.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('throws validation error when params missing', async () => {
    const req = { query: {} };
    const res = mockRes();
    const next = jest.fn();

    await getAverageWeather(req, res, next);

    expect(next).toHaveBeenCalled();
    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(AppError);
    expect(err.code).toBe('VALIDATION_ERROR');
  });

  test('returns data on success', async () => {
    geocodeCity.mockResolvedValue({
      name: 'Kuala Lumpur',
      country: 'MY',
      latitude: 3.1,
      longitude: 101.7
    });

    getAverageTemperature.mockResolvedValue({
      averageTemperature: 29,
      unit: 'C',
      startDate: '2026-02-01',
      endDate: '2026-02-02',
      count: 2
    });

    const req = { query: { city: 'Kuala Lumpur', days: '2' } };
    const res = mockRes();
    const next = jest.fn();

    await getAverageWeather(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        city: 'Kuala Lumpur, MY',
        averageTemperature: 29
      })
    );
  });
});