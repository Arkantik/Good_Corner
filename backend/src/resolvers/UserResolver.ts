import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  User,
  NewUserInput,
  LoginInput,
  UpdateUserInput,
} from "../entities/User";
import { GraphQLError } from "graphql";
import { verify } from "argon2";
import jwt from "jsonwebtoken";
import env from "../env";
import { Context } from "../utils";
import mailer from "../mailer";
import crypto from "crypto";

@Resolver()
class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data", { validate: true }) data: NewUserInput) {
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser !== null) throw new GraphQLError("EMAIL_ALREADY_TAKEN");

    const newUser = new User();
    Object.assign(newUser, data);

    const token = crypto.randomBytes(32).toString("hex");

    newUser.emailConfirmationToken = token;

    const res = await mailer.sendMail({
      from: env.EMAIL_FROM,
      to: newUser.email,
      subject: "Bienvenue sur The Good Corner",
      text: "Bienvenue parmi nous ${newUser.nickname} ! Pour confirmer votre email, cliquez sur ce lien : ${env.FRONTEND_URL}/confirmEmail?token=${token}",
    });

    const newUserWithId = await newUser.save();
    return newUserWithId;
  }

  @Mutation(() => String)
  async login(@Arg("data") data: LoginInput, @Ctx() ctx: Context) {
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser === null) throw new GraphQLError("INVALID_CREDENTIALS");
    const passwordValid = await verify(
      existingUser.hashedPassword,
      data.password
    );
    if (!passwordValid) throw new GraphQLError("INVALID_CREDENTIALS");
    if (!existingUser.emailVerified)
      throw new GraphQLError("EMAIL_NOT_VERIFIED");

    const token = jwt.sign({ userId: existingUser.id }, env.JWT_PRIVATE_KEY);

    ctx.res.cookie("token", token, { httpOnly: true });
    return token;
  }

  @Mutation(() => String)
  async logout(@Ctx() ctx: Context) {
    ctx.res.clearCookie("token");
    return "LOGGED_OUT";
  }

  @Authorized()
  @Mutation(() => User)
  async updateProfile(
    @Ctx() ctx: Context,
    @Arg("data", { validate: true }) data: UpdateUserInput
  ) {
    if (!ctx.currentUser)
      throw new GraphQLError("you need to be logged in to updateyour profile");

    if (data.avatar) ctx.currentUser.avatar = data.avatar;
    if (data.nickname) ctx.currentUser.nickname = data.nickname;

    return ctx.currentUser.save();
  }

  @Mutation(() => String)
  async confirmEmail(@Arg("token") token: string) {
    const user = await User.findOneBy({ emailConfirmationToken: token });
    if (user === null) throw new GraphQLError("INVALID_TOKEN");
    user.emailVerified = true;
    user.emailConfirmationToken = null;

    user.save();
    return "EMAIL_CONFIRMED";
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: Context) {
    if (!ctx.currentUser) throw new GraphQLError("NOT_AUTHENTICATED");
    return User.findOneOrFail({
      where: { id: ctx.currentUser?.id },
      relations: { ads: true },
    });
  }
}

export default UserResolver;
