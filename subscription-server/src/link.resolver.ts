import { pubSub } from './pubsub';
import { Args, Mutation, Query, Resolver, Subscription, Int } from '@nestjs/graphql';
import { Link } from './link.entity';
import { LinkService } from './link.service';

@Resolver(() => Link)
export class LinkResolver {
  constructor(private linkService: LinkService) {}

  @Query(() => Link)
  link(@Args('linkId', { type: () => Int}) linkId: number): Promise<Link> {
    return this.linkService.getLink(linkId);
  }

  @Mutation(() => Link)
  async createLink(@Args('linkId', { type: () => Int}) linkId: number): Promise<Link> {
    return this.linkService.createLink(linkId);
  }

  @Mutation(() => Link)
  async voteLink(@Args('linkId', { type: () => Int}) linkId: number): Promise<Link> {
    const link = await this.linkService.voteFor(linkId);
    await pubSub.publish('voteCount', { voteCount: link });
    return link;
  }

  @Subscription(() => Link, {
    resolve: (payload) => payload.voteCount,
  })
  allVotesReceived() {
    return pubSub.asyncIterator('voteCount');
  }

  @Subscription(() => Link, {
    filter: (payload, variables) =>
      payload.voteCount.id === variables.linkId,
    resolve: (payload) => payload.voteCount,
  })
  voteReceived(@Args('linkId', { type: () => Int}) linkId: number) {
    return pubSub.asyncIterator('voteCount');
  }
}