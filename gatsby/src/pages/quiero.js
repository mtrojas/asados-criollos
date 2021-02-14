import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculateAsadoPrice from '../utils/calculateAsadoPrice';
import formatMoney from '../utils/formatMoney';

export default function QuieroPage({ data }) {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });
  const asados = data.asados.nodes;
  return (
    <>
      <SEO title="Quiero mi asado!" />
      <form>
        <fieldset>
          <legend>Tus datos</legend>
          <label htmlFor="name">
            Nombre
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Elige tu asado</legend>
          {asados.map((asado) => (
            <div key={asado.id}>
              <Img
                width="50"
                height="50"
                fluid={asado.image.asset.fluid}
                alt={asado.name}
              />
              <div>
                <h2>{asado.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button type="button">
                    {size} {formatMoney(calculateAsadoPrice(asado.price, size))}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </fieldset>
        <fieldset>
          <legend>Resumen</legend>
        </fieldset>
      </form>
    </>
  );
}

export const query = graphql`
  query {
    asados: allSanityAsado {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
