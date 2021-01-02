import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const AsadoGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const AsadoStyles = styled.div`
  display: grid;
  /* Take your row sizing not from the AsadoStyles div, but from the AsadoGridStyles  */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

function SingleAsado({ asado }) {
  return (
    <AsadoStyles>
      <Link to={`/asado/${asado.slug.current}`}>
        <h2>
          <span className="mark">{asado.name}</span>
        </h2>
      </Link>
      <p>{asado.toppings.map((topping) => topping.name).join(' | ')}</p>
      <Img fluid={asado.image.asset.fluid} alt={asado.name} />
    </AsadoStyles>
  );
}

export default function AsadoList({ asados }) {
  return (
    <AsadoGridStyles>
      {asados.map((asado) => (
        <SingleAsado key={asado.id} asado={asado} />
      ))}
    </AsadoGridStyles>
  );
}
