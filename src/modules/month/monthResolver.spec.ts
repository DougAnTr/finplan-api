import {graphqlCaller} from '../../utils/test-utils/graphql-caller'
import {connect, disconnect} from '../../config/mongodbConnection'
import {MonthModel} from './month.model'
import { User, UserModel } from '../user/user.model'
import {getUserMock} from '../user/user.mock'
import {getMonthMock} from './month.mock'

const createMonthMutation = `
  mutation CreateMonth($data: CreateMonthInput!) {
    createMonth(data: $data) {
      _id
      number
      year
    }
  }
`

const listMonthsQuery = `
  query {
    listMonths {
      _id
      number
      year
    }
  }
`

describe('MonthResolver', () => {
  let user: User

  beforeAll(async () => {
    await connect()
    user = await UserModel.create(getUserMock())
  })

  afterAll(async () => {
    await MonthModel.deleteMany()
    await UserModel.deleteMany()
    await disconnect()
  })

  describe('createMonth', () => {
    afterAll(async () => {
      await MonthModel.deleteMany()
    })

    it('Creates a month', async () => {
      const response = await graphqlCaller({
        source: createMonthMutation,
        variableValues: {
          data: getMonthMock(user._id.toString()),
        },
      })

      console.log(response)
      expect(response?.data?.createMonth).toBeTruthy()
    })
  })

  describe('list months', () => {
    beforeAll(async () => {
      for(let i = 0; i < 2; i++){
        await MonthModel.create(getMonthMock(user._id))
      }
    })

    it('Returns a list of months', async () => {
      const response = await graphqlCaller({
        source: listMonthsQuery,
      })

      expect(response?.data?.listMonths.length).toBe(2)
    })
  })
})
