import "reflect-metadata";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Month {
  @Field(type => ID)
  id: string;

  @Field({description: 'The number of the month following js pattern from 0 to 11'})
  number: number;

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