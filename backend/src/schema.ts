import { buildSchema } from "type-graphql";
import TagsResolver from "./resolvers/TagResolver";
import AdsResolver from "./resolvers/AdResolver";
import CategoriesResolver from "./resolvers/CategoryResolver";
import UserResolver from "./resolvers/UserResolver";
import { authChecker } from "./auth";

export default buildSchema({
  resolvers: [TagsResolver, AdsResolver, CategoriesResolver, UserResolver],
  authChecker,
});
