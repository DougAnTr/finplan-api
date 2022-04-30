import {Field, InputType, ObjectType} from 'type-graphql'
import {User} from '../user/user.model'

@InputType()
export class SignInInput {
  @Field()
    email: string

  @Field()
    password: string
}

type SignInAuth = {
  token: string
  refreshToken: string
}

@ObjectType()
export class SignInResponse {
  @Field()
    auth: SignInAuth

  @Field()
    user: User
}
