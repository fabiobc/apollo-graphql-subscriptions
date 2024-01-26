import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field(type => Int)
  id: number;

  @Field(type => Int)
  voteCount: number;
}