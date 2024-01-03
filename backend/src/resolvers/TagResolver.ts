import { Arg, Mutation, Resolver } from "type-graphql";
import Tag, { TagInput } from "../entities/Tag";
import { validate } from "class-validator";
import { GraphQLError } from "graphql";

@Resolver(Tag)
export default class TagResolver {
  @Mutation(() => Tag)
  async createTag(@Arg("data") data: TagInput) {
    const newTag = Tag.create({ name: data.name });
    const errors = await validate(newTag);
    if (errors.length > 0)
      throw new GraphQLError("Invalid data", { extensions: { errors } });
    return newTag.save();
  }
}
