import { SubscribeToLinkComponent } from '@/app/subscribe-to-link-component';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Subscription Example</h1>
      <SubscribeToLinkComponent></SubscribeToLinkComponent>
    </main>
  );
}
