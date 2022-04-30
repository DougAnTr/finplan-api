import {getModelForClass, prop} from '@typegoose/typegoose'
import {Field} from 'type-graphql'

export class UserToken {
  @Field()
    _id: string

  @prop({required: true})
  @Field()
    userId: string

  @prop({required:true})
  @Field()
    token: string
}

export const UserTokenModel = getModelForClass(UserToken)
