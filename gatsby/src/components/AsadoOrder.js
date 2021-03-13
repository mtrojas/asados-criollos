import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculateAsadoPrice from '../utils/calculateAsadoPrice';
import formatMoney from '../utils/formatMoney';

export default function AsadoOrder({ order, asados, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const asado = asados.find((asado) => asado.id === singleOrder.id);
        return (
          <MenuItemStyles key={`${singleOrder.id}-${index}`}>
            <Img fluid={asado.image.asset.fluid} />
            <h2>{asado.name}</h2>
            <p>
              {formatMoney(calculateAsadoPrice(asado.price, singleOrder.size))}
              <button
                type="button"
                className="remove"
                title={`Eliminar ${singleOrder.size} ${asado.name} de mi orden`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
