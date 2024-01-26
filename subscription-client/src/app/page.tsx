import { VoteLinkComponent } from './vote-link-component'
import { LinkInfoComponent } from '@/app/link-info-component';
import { CreateLinkComponent } from '@/app/create-link-component';
import { SubscribeToLinkComponent } from '@/app/subscribe-to-link-component';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Query Example</h1>
      <LinkInfoComponent></LinkInfoComponent>
      <h1>Mutation Examples</h1>
      <CreateLinkComponent></CreateLinkComponent>
      <VoteLinkComponent></VoteLinkComponent>
      <h1>Subscription Example</h1>
      <SubscribeToLinkComponent></SubscribeToLinkComponent>
    </main>
  );
}
