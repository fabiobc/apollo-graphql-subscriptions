"use client";

import { gql, useSubscription } from '@apollo/client';


// Define mutation

const SUBSCRIBE_TO_LINK = gql`
    subscription WhoLikesMeLiveUpdates {
        whoLikesMeLiveUpdates(profileId: "<profile ID>") {
            id
        }
    }
`;
let acc = []
export function SubscribeToLinkComponent() {
  // Pass mutation to useMutation
  const { data, loading, error} = useSubscription(SUBSCRIBE_TO_LINK);

  if (loading) return 'Waiting for info...';

  if (data) {
    acc.push(data)
  }
  const listItems = acc.map(data =>
    <li>{`Received data: ${JSON.stringify(data)}`}</li>
  );

  return (
    <div>
      {acc.length &&
        <ul>{listItems}</ul>
      }
      {
        error &&
        <div>
          <h2>Oops, there was an error!</h2>
          <p>{`${JSON.stringify(error)}`}</p>
        </div>
      }
    </div>
  )
}
