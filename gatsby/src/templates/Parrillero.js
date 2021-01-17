import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

export default function ParrilleroPage({ data: { parrillero } }) {
  console.log(parrillero);
  return (
    <div className="center">
      <Img fluid={parrillero.image.asset.fluid} />
      <h2>
        <span className="mark">{parrillero.name}</span>
      </h2>
      <p>{parrillero.description}</p>
    </div>
  );
}

export const query = graphql`
  query($slug: String!) {
    parrillero: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
