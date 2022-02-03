import { getModelForClass, prop } from "@typegoose/typegoose";
import "reflect-metadata";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Month {
  @Field(type => ID)
  id: string;

  @prop()
  @Field({description: 'The number of the month following js pattern from 0 to 11'})
  number: number;

  @prop()
  @Field()
  year: number;
}

@InputType()
export class AddMonthInput implements Partial<Month>{
  @Field({description: 'The number of the month following js pattern from 0 to 11'})
  number: number;

  @Field()
  year: number;
}

export const MonthModel = getModelForClass(Month)