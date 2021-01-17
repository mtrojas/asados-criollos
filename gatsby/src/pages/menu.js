import React from 'react';
import { graphql } from 'gatsby';
import AsadoList from '../components/AsadoList';
import ToppingsFilter from '../components/ToppingsFilter';
import SEO from '../components/SEO';

export default function MenuPage({ data, pageContext }) {
  const asados = data.asados.nodes;
  return (
    <>
      <SEO
        title={
          pageContext.topping ? `Asados con ${pageContext.topping}` : `Menu`
        }
      />
      <ToppingsFilter activeTopping={pageContext.topping} />
      <AsadoList asados={asados} />
    </>
  );
}

export const query = graphql`
  query MenuQuery($toppingRegex: String) {
    asados: allSanityAsado(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
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
