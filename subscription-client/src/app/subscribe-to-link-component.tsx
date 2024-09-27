"use client";

import { gql, useSubscription } from '@apollo/client';
import { useState } from 'react';


// Define mutation

const SUBSCRIBE_TO_LINK = gql`
    subscription WhoLikesMeLiveUpdates {
        profile: whoLikesMeLiveUpdates(profileId: "<Not your profile ID>") {
            age
            ageRange
            allowPWM
            analyticsId
            bio
            completionStatus
            dateOfBirth
            desires
            desiringFor
            distanceMax
            gender
            id
            imaginaryName
            interests
            invalidPhotosCount
            isIncognito
            isMajestic
            isMinor
            isUplift
            isVerified
            lastSeen
            location {
                __typename
            }
            lookingFor
            pairCount
            recentlyOnline
            sexuality
            status
            streamToken
            streamUserId
            upliftExpirationTimestamp
        }
    }
`;

export function SubscribeToLinkComponent() {
  const [receivedData, setReceivedData] = useState("");
  // Pass mutation to useMutation
  const { data, loading, error} = useSubscription(SUBSCRIBE_TO_LINK);

  if (loading) return 'Waiting for info...';

  return (
    <div>
      {data &&
        <h2>{`Received data: ${setReceivedData(receivedData + JSON.stringify(data)) && receivedData}`}</h2>
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
