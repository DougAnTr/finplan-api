import lodash from "lodash";
import {monthResolver} from "./month.resolver";

const resolvers = {
  Query: {

  },
  Mutation:{

  },
};

export default lodash.merge(resolvers, monthResolver)
