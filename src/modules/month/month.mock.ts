import {faker} from '@faker-js/faker'

export const getMonthMock = (userId: string) => ({
  userId,
  year: faker.date.recent().getFullYear(),
  number: faker.datatype.number({min: 0, max: 11}),
})
