import {Field, ID, ObjectType} from 'type-graphql'
import {getModelForClass, prop} from '@typegoose/typegoose'

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

@ObjectType()
export class Transaction {
  @Field(() => ID)
    id: string

  @prop()
  @Field()
    monthId: string

  @prop()
  @Field()
    description: string

  @prop()
  @Field({description: 'positive for income, negative for expense'})
    amount: number

  @prop()
  @Field()
    type: TransactionType
}

export const TransactionModel = getModelForClass(Transaction)
