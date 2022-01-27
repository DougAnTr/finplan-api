import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { addResolversToSchema, makeExecutableSchema } from "@graphql-tools/schema";

export const schema = makeExecutableSchema({
  typeDefs
});


export default addResolversToSchema({schema, resolvers})