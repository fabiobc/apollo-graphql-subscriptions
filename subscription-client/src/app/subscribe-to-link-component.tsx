"use client";

import { gql, useSubscription } from '@apollo/client';
import { useState } from 'react';


// Define mutation

const SUBSCRIBE_TO_LINK = gql`
    subscription OnVoteReceived {
        allVotesReceived {
            id
            voteCount
        }
    }
`;


export function SubscribeToLinkComponent() {
  const [linkId, setLinkId] = useState(0)
  // Pass mutation to useMutation
  const { data, loading, error} = useSubscription(SUBSCRIBE_TO_LINK);

  if (loading) return 'Waiting for info...';

  return (
    <div>
      {data &&
        <h2>{`Link ${data.allVotesReceived.id} now has ${data.allVotesReceived.voteCount} votes`}</h2>
      }
      {
        error &&
        <div>
          <h2>Oops, there was an error!</h2>
          <p>{`${error.message}`}</p>
        </div>
      }
    </div>
  )
}