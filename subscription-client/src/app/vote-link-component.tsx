"use client";

import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';


// Define mutation

const VOTE_FOR_LINK = gql`
    mutation voteLink($linkId: Int!){
        voteLink(linkId: $linkId) {
            id
        }
    }
`;

export function VoteLinkComponent() {
  const [linkId, setLinkId] = useState(0)
  // Pass mutation to useMutation
  const [voteForLink, { loading, error , reset}] = useMutation(VOTE_FOR_LINK);

  if (loading) return 'Submitting...';

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        voteForLink({variables: { linkId: linkId} });
      }}>
        <label> Enter the link ID </label>
        <input
          className="text-black px-2"
          type="number"
          value={linkId}
          onChange={(e) => setLinkId(parseInt(e.target.value))}
        />
        <button className="border-2 px-2 m-2" type="submit">Vote for link</button>
        {
          error &&
          <div>
            <h2>Oops, there was an error!</h2>
            <p>{`${error.message}`}</p>
            <button
              type="button"
              onClick={() => reset()}
            >
              Ok
            </button>
          </div>
        }
        </form>
    </div>
  )
}