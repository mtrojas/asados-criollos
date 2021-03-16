import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculateAsadoPrice from '../utils/calculateAsadoPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import useAsado from '../utils/useAsado';
import AsadoOrder from '../components/AsadoOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export default function QuieroPage({ data }) {
  const asados = data.asados.nodes;
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });
  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = useAsado({
    asados,
    values,
  });

  if (message) {
    return <p>{message}</p>;
  }
  return (
    <>
      <SEO title="Quiero mi asado!" />
      <OrderStyles onSubmit={submitOrder}>
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
        <fieldset className="menu">
          <legend>Elige tu asado</legend>
          {asados.map((asado) => (
            <MenuItemStyles key={asado.id}>
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
                  <button
                    type="button"
                    key={size}
                    onClick={() =>
                      addToOrder({
                        id: asado.id,
                        size,
                      })
                    }
                  >
                    {size} {formatMoney(calculateAsadoPrice(asado.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Resumen</legend>
          <AsadoOrder
            order={order}
            removeFromOrder={removeFromOrder}
            asados={asados}
          />
        </fieldset>
        <fieldset>
          <h3>Total {formatMoney(calculateOrderTotal(order, asados))}</h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Enviando tu orden...' : 'Hacer mi pedido'}
          </button>
        </fieldset>
      </OrderStyles>
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
