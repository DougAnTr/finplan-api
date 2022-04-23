import { getModelForClass, prop,   } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'

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

export const UserModel = getModelForClass(User)