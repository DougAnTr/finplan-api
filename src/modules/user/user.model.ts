import { getModelForClass, prop,   } from '@typegoose/typegoose'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => ID)
    id: string

  @prop()
  @Field()
    name: string

  @prop()
  @Field()
    lastName: string

  @prop()
  @Field()
    email: string

  @prop()
  @Field()
    password: string

  @Field()
    createdAt: Date

  @Field()
    updatedAt: Date
}

@InputType()
export class CreateUserInput {
  @Field()
    name: string

  @Field()
    lastName: string

  @Field()
    email: string

  @Field()
    password: string
}

export const UserModel = getModelForClass(User)

