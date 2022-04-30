import {Maybe} from 'type-graphql'
import {graphql, GraphQLSchema} from 'graphql'
import { createSchema } from '../../modules'

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: unknown;
  }>;
}

let schema: GraphQLSchema

export const graphqlCaller = async ({source, variableValues}: Options) => {
  if(!schema) {
    schema = await createSchema()
  }

  return graphql({
    schema,
    source,
    variableValues
  })
}
