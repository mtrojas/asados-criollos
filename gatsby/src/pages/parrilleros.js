import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const ParrillerosGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const ParrilleroStyle = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: relative;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

export default function ParrillerosPage({ data, pageContext }) {
  const parrilleros = data.parrilleros.nodes;
  return (
    <>
      <SEO title={`Parrilleros - Página ${pageContext.currentPage || 1}`} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.parrilleros.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/parrilleros"
      />
      <ParrillerosGrid>
        {parrilleros.map((parrillero) => (
          <ParrilleroStyle>
            <Link
              key={parrillero.id}
              to={`/parrillero/${parrillero.slug.current}`}
            >
              <h2>
                <span className="mark">{parrillero.name}</span>
              </h2>
            </Link>
            <Img fluid={parrillero.image.asset.fluid} />
            <p className="description">{parrillero.description}</p>
          </ParrilleroStyle>
        ))}
      </ParrillerosGrid>
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 4) {
    parrilleros: allSanityPerson(skip: $skip, limit: $pageSize) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
