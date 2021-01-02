import React from 'react';
import { graphql } from 'gatsby';
import AsadoList from '../components/AsadoList';

export default function MenuPage({ data }) {
  const asados = data.asados.nodes;
  return (
    <>
      <AsadoList asados={asados} />
    </>
  );
}

export const query = graphql`
  query MenuQuery {
    asados: allSanityAsado {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
