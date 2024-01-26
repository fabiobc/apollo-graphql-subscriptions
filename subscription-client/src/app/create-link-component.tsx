"use client";

import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';


// Define mutation

const CREATE_LINK = gql`
    mutation createLink($linkId: Int!){
        createLink(linkId: $linkId) {
            id
        }
    }
`;


export function CreateLinkComponent() {
  const [linkId, setLinkId] = useState(0)
  // Pass mutation to useMutation
  const [createLink, { data, loading, error , reset}] = useMutation(CREATE_LINK);

  if (loading) return 'Submitting...';

  return (
    <div>
      {
        data &&
        <h2>{`Link ${data.createLink.id} created`}</h2>
      }
      <form onSubmit={e => {
        e.preventDefault();
        createLink({variables: { linkId: linkId} });
      }}>
        <label> Enter the link ID </label>
        <input
          className="text-black px-2"
          type="number"
          value={linkId}
          onChange={(e) => setLinkId(parseInt(e.target.value))}
        />
        <button className="border-2 px-2 m-2" type="submit"> Create a Link </button>
        {
          error &&
          <div>
            <h2>Oops, there was an error!</h2>
            <p>{`${error.message}`}</p>
            <button
              className="border-2 px-2 m-2"
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