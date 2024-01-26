import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LinkService } from '#src/link.service';
import { LinkResolver } from '#src/link.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': {
          path: '/subscriptions',
        },
      },
      introspection: true,
      playground: {
        subscriptionEndpoint: '/subscriptions',
      },
      autoSchemaFile: './schema.gql',
    })
  ],
  providers: [
    LinkService,
    LinkResolver,
  ]
})
export class AppModule {}