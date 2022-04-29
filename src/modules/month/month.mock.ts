import {faker} from '@faker-js/faker'

export const getMonthMock = (userId: string) => ({
  userId,
  year: faker.date.recent().getFullYear(),
  number: faker.random.number({ max: 12}),
})
