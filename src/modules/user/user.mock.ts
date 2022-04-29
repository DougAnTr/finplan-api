import {faker} from '@faker-js/faker'

export const getUserMock = () => ({
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: 'password',
})
