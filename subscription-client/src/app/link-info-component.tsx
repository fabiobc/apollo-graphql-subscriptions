"use client";

import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';


// Define mutation

const QUERY_FOR_LINK = gql`
    query getLink($linkId: Int!){
        link(linkId: $linkId) {
            id
            voteCount
        }
    }
`;


export function LinkInfoComponent() {
  const [linkId, setLinkId] = useState(0)
  // Pass mutation to useMutation
  const { data, loading, error, refetch} = useQuery(QUERY_FOR_LINK, {
    variables: {
      linkId,
    }
  });

  if (loading) return 'Getting info...';

  return (
    <div>
      {data &&
        <h2>{`Link ${data.link.id} has ${data.link.voteCount} votes`}</h2>
      }
      <form onSubmit={e => {
        e.preventDefault();
        refetch({ variables: { linkId: linkId } });
      }}>
        <label> Enter the link ID </label>
        <input
          type="number"
          className="text-black px-2"
          value={linkId}
          onChange={(e) => setLinkId(parseInt(e.target.value))}
        />
        <button className="border-2 px-2 m-2" type="submit"> Get link info</button>
      </form>
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