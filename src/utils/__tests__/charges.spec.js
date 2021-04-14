import { calcCharge } from '../charges'

const rowFixture = [
  {
    id: 20239,
    cityId: 5071,
    condo_size: '<10',
    condo_count: 189,
    service_none: 1817,
    service_none_std: 710,
    service_elevator: 2979,
    service_elevator_std: 947,
    service_heater: 2928,
    service_heater_std: 800,
    service_elevator_heater_employee: 0,
    service_elevator_heater_employee_std: 0,
    service_elevator_heater: 0,
    service_elevator_heater_std: 0,
    createdAt: '2018-12-09',
    updatedAt: '2018-12-09'
  },
  {
    id: 20259,
    cityId: 5071,
    condo_size: '11-49',
    condo_count: 2173,
    service_none: 1248,
    service_none_std: 463,
    service_elevator: 2053,
    service_elevator_std: 862,
    service_heater: 2059,
    service_heater_std: 834,
    service_elevator_heater_employee: 0,
    service_elevator_heater_employee_std: 0,
    service_elevator_heater: 0,
    service_elevator_heater_std: 0,
    createdAt: '2018-12-09',
    updatedAt: '2018-12-09'
  },
  {
    id: 20279,
    cityId: 5071,
    condo_size: '50-200',
    condo_count: 465,
    service_none: 1146,
    service_none_std: 725,
    service_elevator: 1521,
    service_elevator_std: 707,
    service_heater: 0,
    service_heater_std: 0,
    service_elevator_heater_employee: 2561,
    service_elevator_heater_employee_std: 737,
    service_elevator_heater: 2033,
    service_elevator_heater_std: 1037,
    createdAt: '2018-12-09',
    updatedAt: '2018-12-09'
  },
  {
    id: 20299,
    cityId: 5071,
    condo_size: '>200',
    condo_count: 70,
    service_none: 1732,
    service_none_std: 1163,
    service_elevator: 597,
    service_elevator_std: 382,
    service_heater: 0,
    service_heater_std: 0,
    service_elevator_heater_employee: 2987,
    service_elevator_heater_employee_std: 839,
    service_elevator_heater: 2362,
    service_elevator_heater_std: 1017,
    createdAt: '2018-12-09',
    updatedAt: '2018-12-09'
  },
  {
    id: 45447,
    cityId: 11373,
    condo_size: '<10',
    condo_count: 189,
    service_none: 1817,
    service_none_std: 710,
    service_elevator: 2979,
    service_elevator_std: 947,
    service_heater: 2928,
    service_heater_std: 800,
    service_elevator_heater_employee: 0,
    service_elevator_heater_employee_std: 0,
    service_elevator_heater: 0,
    service_elevator_heater_std: 0,
    createdAt: '2019-07-28',
    updatedAt: '2019-07-28'
  },
  {
    id: 45467,
    cityId: 11373,
    condo_size: '11-49',
    condo_count: 2173,
    service_none: 1248,
    service_none_std: 463,
    service_elevator: 2053,
    service_elevator_std: 862,
    service_heater: 2059,
    service_heater_std: 834,
    service_elevator_heater_employee: 0,
    service_elevator_heater_employee_std: 0,
    service_elevator_heater: 0,
    service_elevator_heater_std: 0,
    createdAt: '2019-07-28',
    updatedAt: '2019-07-28'
  },
  {
    id: 45487,
    cityId: 11373,
    condo_size: '50-200',
    condo_count: 465,
    service_none: 1146,
    service_none_std: 725,
    service_elevator: 1521,
    service_elevator_std: 707,
    service_heater: 0,
    service_heater_std: 0,
    service_elevator_heater_employee: 2561,
    service_elevator_heater_employee_std: 737,
    service_elevator_heater: 2033,
    service_elevator_heater_std: 1037,
    createdAt: '2019-07-28',
    updatedAt: '2019-07-28'
  },
  {
    id: 45507,
    cityId: 11373,
    condo_size: '>200',
    condo_count: 70,
    service_none: 1732,
    service_none_std: 1163,
    service_elevator: 597,
    service_elevator_std: 382,
    service_heater: 0,
    service_heater_std: 0,
    service_elevator_heater_employee: 2987,
    service_elevator_heater_employee_std: 839,
    service_elevator_heater: 2362,
    service_elevator_heater_std: 1017,
    createdAt: '2019-07-28',
    updatedAt: '2019-07-28'
  }
]

describe('calcul charge', () => {
  test('return mean min max numbers', () => {
    const result = calcCharge(rowFixture, 50, true, true, true)
    expect(result).toEqual(
      expect.objectContaining({
        mean: expect.any(Number),
        min: expect.any(Number),
        max: expect.any(Number)
      })
    )
  })
})
