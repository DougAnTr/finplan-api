import {graphqlCaller} from '../../test-utils/graphql-caller'
import {connect, disconnect} from '../../config/mongodbConnection'
import { UserModel } from './user.model'

const createUserMutation = `
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
`

describe('UserResolver', () => {
  beforeAll(async () => {
    await connect()
  })

  afterAll(async () => {
    await disconnect()
  })

  describe('createUser', () => {
    afterEach(async () => {
      await UserModel.deleteMany()
    })

    it('Creates a user', async () => {
      const response = await graphqlCaller({
        source: createUserMutation,
        variableValues: {
          data: {
            name: 'Username',
            lastName: 'LastName',
            email: 'valid@email.com',
            password: 'valid_password',
          },
        },
      })

      expect(response?.data?.createUser.id).toBeTruthy()
    })
  })
})
