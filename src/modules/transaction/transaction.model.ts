import {Field, ID, InputType, ObjectType} from 'type-graphql'
import {getModelForClass, prop} from '@typegoose/typegoose'

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

@ObjectType()
export class Transaction {
  @Field(() => ID)
    _id: string

  @prop()
  @Field()
    monthId: string

  @prop()
  @Field()
    userId: string

  @prop()
  @Field()
    description: string

  @prop()
  @Field({description: 'positive for income, negative for expense | int values only'})
    amount: number

  @prop()
  @Field()
    type: TransactionType
}

@InputType()
export class CreateTransactionInput {
  @Field()
    monthId: string

  @Field()
    userId: string

  @Field()
    description: string

  @Field()
    amount: number

  @Field()
    type: TransactionType
}

export const TransactionModel = getModelForClass(Transaction)
