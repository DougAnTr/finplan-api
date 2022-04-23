import { Arg, Mutation, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { CreateUserService } from './services/createUser/createUser.service'
import { CreateUserInput, User } from './user.model'

@Service()
@Resolver(User)
export class UserResolver {
  constructor(private readonly createUserService: CreateUserService) {}

  @Mutation(() => User)
  async createUser(@Arg('data') newUserData: CreateUserInput): Promise<User> {
    return this.createUserService.execute(newUserData)
  }
}