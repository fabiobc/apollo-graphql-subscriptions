import { Link } from './link.entity';
import Redis from 'ioredis';

export class LinkService{
  private redis;

  constructor() {
    this.redis = new Redis({
      port: 6379, // Redis port
      host: "127.0.0.1", // Redis host
      db: 0, // Defaults to 0
    });
  }

  private getRedisLinkId(linkId: number): string {
    return `link:${linkId}`;
  }

  public async createLink(newLinkId: number): Promise<Link> {
    await this.redis.set(this.getRedisLinkId(newLinkId), 0, 'NX');
    return this.getLink(newLinkId);
  }

  public async getLink(linkId: number): Promise<Link> {
    const storedValue = await this.redis.get(this.getRedisLinkId(linkId))
    if (storedValue === null) {
      throw new Error('Unable to get link');
    }
    const voteCount = parseInt(storedValue);
    if (isNaN(voteCount)) {
      throw new Error('Invalid voteCount stored');
    }
    return {
      id: linkId,
      voteCount,
    };
  }

  public async voteFor(linkId: number): Promise<Link> {
    await this.redis.incr(this.getRedisLinkId(linkId));
    return this.getLink(linkId);
  }
}
