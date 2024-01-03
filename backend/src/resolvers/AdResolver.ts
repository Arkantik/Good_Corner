import { Arg, Query, Resolver } from "type-graphql";
import Ad from "../entities/Ad";
import { GraphQLError } from "graphql";

@Resolver(Ad)
export default class AdResolver {
  @Query(() => [Ad])
  AdS() {
    return Ad.find({ relations: { category: true, tags: true } });
  }

  @Query(() => Ad)
  async getAdById(@Arg("id") id: string) {
    const ad = await Ad.findOne({
      where: { id: parseInt(id, 10) },
      relations: { category: true, tags: true },
    });
    if (!ad) throw new GraphQLError("Ad not found");
    return ad;
  }
}
